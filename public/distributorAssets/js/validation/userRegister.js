const form = document.getElementById("form");
const username = document.getElementById("username");
const adharnumber = document.getElementById("adharnumber");
const phonenumber = document.getElementById("phonenumber");
const email = document.getElementById("email");
const password = document.getElementById("password");

const name_error = document.getElementById("name_error");
const email_error = document.getElementById("email_error");
const adhar_error = document.getElementById("adhar_error");
const phone_error = document.getElementById("phone_error");
const pass_error = document.getElementById("pass_error");

form.addEventListener("submit", (e) => {
  var email_check =/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  var phonePattern = /^\d{10}$/;

  // name //

  if (username.value === "" || username.value == null) {
    e.preventDefault();
    name_error.innerHTML = "Name is required";
  } else if (username.value.length < 5 | username.value.length > 10) {
    e.preventDefault();
    name_error.innerHTML = "Name between 5 to 10 letters";
  } else {
    name_error.innerHTML = "";
  }

  // email //

  if (!email.value.match(email_check)) {
    e.preventDefault();
    email_error.innerHTML = "Valid Email is required";
  } else {
    email_error.innerHTML = "";
  }

  // password //

  if (password.value.length <= 6) {
    e.preventDefault();
    pass_error.innerHTML = "Password must be more than 6 characters";
  } else {
    pass_error.innerHTML = "";
  }

  if (password.value.length >= 20) {
    e.preventDefault();
    pass_error.innerHTML = "Password cannot be more than 20 characters";
  }
  if (password.value === "password") {
    e.preventDefault();
    pass_error.innerHTML = "Password cannot be password";
  }

  // Number //

  if (!phonePattern.test(phonenumber.value) ) {
    e.preventDefault();
    phone_error.innerHTML = "Number must be 10 Digit";
  } else if (isNaN(phonenumber.value)) {
    e.preventDefault();
    phone_error.innerHTML = "Enter Valid number";
  } else {
    phone_error.innerHTML = "";
  }

  // adhar Number //

  if (adharnumber.value.length < 12) {
    e.preventDefault();
    adhar_error.innerHTML = "Adhar Number must be 12 Digit";
  } else if (isNaN(adharnumber.value)) {
    e.preventDefault();
    adhar_error.innerHTML = "Enter Adhaar Number Valid number";
  } else {
    adhar_error.innerHTML = "";
  }
});
