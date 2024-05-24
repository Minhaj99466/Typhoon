const form = document.getElementById("form");
const productname = document.getElementById("productname");
const price = document.getElementById("price");
const brand = document.getElementById("brand");
const modelnumber = document.getElementById("modelnumber");
const quantity = document.getElementById("quantity");
const warranty = document.getElementById("warranty");
const discription = document.getElementById("discription");


const productname_error = document.getElementById("productname_error");
const price_error = document.getElementById("price_error");
const brand_error = document.getElementById("brand_error");
const modelnumber_error = document.getElementById("modelnumber_error");
const quantity_error = document.getElementById("quantity_error");
const warranty_error = document.getElementById("warranty_error");
const discription_error = document.getElementById("discription-error");


form.addEventListener("submit", (e) => {
    let pricePattern = /^(?:[1-9]\d{0,3}|[1-9]|0)$/;
    let quantityPattern = /^(?:[1-9]\d?|100)$/;
    let warrantyPattern = /^(?:[1-9]\d?|15)$/;
    let minDescriptionLength = 150;
  //========== ProductName ==============//

  if (productname.value === "" || productname.value == null) {
    e.preventDefault();
    productname_error.innerHTML = "Name is required";
  } else {
    productname_error.innerHTML = "";
  }

  //============== Price ===================//

  if ((price.value == null) | (price.value == "")) {
    e.preventDefault();
    price_error.innerHTML = "Enter Price for Your Product";
  } else if (parseInt(price.value, 10) > 9999) {
    e.preventDefault();
    price_error.innerHTML = "Price is too high";
  } else if (!pricePattern.test(price.value)) {
    e.preventDefault();
    price_error.innerHTML = "Enter a Valid Price";
  } else {
    price_error.innerHTML = "";
  }

  //============== Brand ---------------------//


  if (brand.value === "" || brand.value == null) {
    e.preventDefault();
    brand_error.innerHTML = "Brand Name is required";
  } else {
    brand_error.innerHTML = "";
  }
  //============== Model Number ---------------------//


  if (modelnumber.value === "" || modelnumber.value == null) {
    e.preventDefault();
    modelnumber_error.innerHTML = " Enter Model Number";
  } else {
    modelnumber_error.innerHTML = "";
  }

  //=============== Quantity =========================//


  if ((quantity.value == null) | (quantity.value == "")) {
    e.preventDefault();
    quantity_error.innerHTML = "Enter Quantity for Your Product";
  } else if (parseInt(quantity.value, 10) > 100) {
    e.preventDefault();
    quantity_error.innerHTML = "Enter a Valid Quantity (1-100)";
  } else if (!quantityPattern.test(quantity.value)) {
    e.preventDefault();
    quantity_error.innerHTML = "Enter a Valid Quantity";
  } else {
    quantity_error.innerHTML = "";
  }
  
  //=============== Warranty =========================//


  if ((warranty.value == null) | (warranty.value == "")) {
    e.preventDefault();
    warranty_error.innerHTML = "Enter Warranty for Your Product";
  } else if (parseInt(warranty.value, 10) > 15) {
    e.preventDefault();
    warranty_error.innerHTML = "Enter a Valid Warranty (1-15)";
  } else if (!warrantyPattern.test(warranty.value)) {
    e.preventDefault();
    warranty_error.innerHTML = "Enter a Valid Warranty";
  } else {
    warranty_error.innerHTML = "";
  }


  //=============== Descripion =========================//

    if (discription.value == "") {
      e.preventDefault();
      discription_error.innerHTML = "Please Enter your discription";
    } else if (discription.value.length < minDescriptionLength) {
        e.preventDefault();
        discription_error.innerHTML = `Description must be at least ${minDescriptionLength} characters long`;
      } else {
        discription_error.innerHTML = "";
      }
});
