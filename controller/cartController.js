const User = require("../model/userModel");
const Product = require("../model/productModal");
const Cart = require("../model/cartModel"); 
const Order = require("../model/orderModel")

const getUserById = async (userId) => {
  return await User.findOne({ _id: userId });
};

const getProductById = async (productId) => {
  return await Product.findOne({ _id: productId });
};

const getOrCreateCart = async (userId, userName, productId) => {
  return await Cart.findOneAndUpdate(
    { userId: userId },
    {
      $setOnInsert: {
        userId: userId,
        userName: userName,
        products: [{ productId }],
      },
    },
    { upsert: true, new: true }
  );
};

const updateCartProduct = async (cart, productId, totalPrice) => {
  return await Cart.updateOne(
    { userId: cart.userId, "products.productId": productId },
    {
      $inc: {
        "products.$.count": 1,
        "products.$.totalPrice": totalPrice,
      },
    }
  );
};

const addNewProductToCart = async (cart, productId, productPrice) => {
  const totalPrice = productPrice;
  cart.products.push({
    productId: productId,
    productPrice: productPrice,
    totalPrice: totalPrice,
    count: 1,
  });
  await cart.save();
};

const addToCart = async (req, res, next) => {
  try {
    const userId = req.session.user_id;
    const productId = req.body.id;

    const userData = await getUserById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const productData = await getProductById(productId);
    if (!productData) {
      return res.json({ success: false, message: "Product not found" });
    }

    const productQuantity = productData.quantity;
    const cartData = await getOrCreateCart(
      userId,
      userData.username,
      productId
    );

    const cartProduct = cartData.products.find(
      (product) => product.productId.toString() === productId.toString()
    );

    const updatedQuantity = cartProduct ? cartProduct.count : 0;
    if (updatedQuantity + 1 > productQuantity) {
      return res.json({
        success: false,
        message: "Quantity limit reached!",
      });
    }

    if (cartProduct) {
      const totalPrice = productData.price;
      await updateCartProduct(cartData, productId, totalPrice);
    } else {
      await addNewProductToCart(cartData, productId, productData.price);
    }

    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

const loadCart = async (req, res) => {
  try {
    const cartData = await Cart.findOne({
      userId: req.session.user_id,
    }).populate("products.productId");
    let totalAmount;
    if (cartData) {
      const subTotal = await Cart.aggregate([
        { $match: { userId: req.session.user_id } },
        { $unwind: "$products" },
        { $group: { _id: null, total: { $sum: "$products.totalPrice" } } },
        { $project: { _id: 0 } },
      ]);
      totalAmount = subTotal.length > 0 ? subTotal[0].total : 0;
    }
    res.render("cart", {
      session: req.session.user_id,
      cart: cartData ? cartData.products : [],
      totalAmount,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteProductFromCart = async (req, res) => {
  try {
    if (!req.session.user_id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }
    if (!req.body.product) {
      return res
        .status(400)
        .json({ message: "Bad Request: Product ID is required" });
    }
    const result = await Cart.updateOne(
      { userId: req.session.user_id },
      { $pull: { products: { productId: req.body.product } } }
    );
    if (result.modifiedCount > 0) {
      return res.status(200).json({ message: "Product removed from cart" });
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (err) {
    console.error(err);
  }
};

const changeProductCount = async (req, res, next) => {
  try {
    const userId = req.session.user_id;
    const productId = req.body.product;
    let count = parseInt(req.body.count);
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const productInCart = cart.products.find(
      (p) => p.productId.toString() === productId
    );
    if (!productInCart) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found in cart" });
    }
    const productData = await Product.findById(productId);
    if (!productData) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const currentQuantity = productInCart.count;
    const newQuantity = currentQuantity + count;

    if (count > 0 && newQuantity > productData.quantity) {
      return res.json({ success: false, message: "Quantity limit reached!" });
    }

    if (count < 0 && (newQuantity < 1 || Math.abs(count) > currentQuantity)) {
      return res.json({ success: true });
    }

    const totalPrice = productData.price * newQuantity;
    await Cart.updateOne(
      { userId, "products.productId": productId },
      {
        $set: {
          "products.$.count": newQuantity,
          "products.$.totalPrice": totalPrice,
        },
      }
    );

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

const placeOrder = async (req, res, next) => {
  try {
    const {firstName,phone,email,country,city,address,postcode,totalAmount,paymentMethod} = req.body
    const cartData = await Cart.findOne({ userId: req.session.user_id});

    if (!cartData) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const products = cartData.products;

    // Build delivery address object
    const deliveryAddress = {
      name: firstName,
      number: phone,
      email: email,
      country: country,
      city: city,
      address:address,
      postcode: postcode,
    };

    // Status is directly set to 'placed' for COD
    const status = "placed";
    const order = new Order({
      deliveryAddress: deliveryAddress,
      userId: req.session.user_id,
      paymentMethod: paymentMethod,
      products: products.map(product => ({
        productId: product.productId,
        count: product.count,
        productPrice: product.productPrice,
        totalPrice: product.totalPrice,
        status: status,
      })),
      totalAmount: totalAmount,
      date: new Date(),
      status: status,
    });

    const orderData = await order.save();

    if (orderData) {
      await Cart.deleteOne({ userId: req.session.user_id});

      for (let i = 0; i < products.length; i++) {
        const pro = products[i].productId;
        const count = products[i].count;
        await Product.findByIdAndUpdate(pro, { $inc: { quantity: -count } });
      }

      res.json({ codsuccess: true, orderId: orderData._id });
    } else {
      res.redirect('/');
    }
  } catch (err) {
    next(err);
  }
};



module.exports = {
  addToCart,
  loadCart,
  deleteProductFromCart,
  changeProductCount,
  placeOrder,
};