const User = require("../model/userModel");
const Product = require("../model/productModal"); // Updated the correct import
const Cart = require("../model/cartModel");       // Updated the correct import

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
                products: [
                    { productId }
                ],
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
        const cartData = await getOrCreateCart(userId, userData.username, productId);

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

        res.json({ success: true });
    } catch (err) {
        next(err);
    }
};

module.exports = { addToCart };
