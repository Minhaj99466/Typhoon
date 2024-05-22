const form = document.getElementById("form");
const username = document.getElementById("distributer_name");
const licencenumber = document.getElementById("licence_number");
const phonenumber = document.getElementById("phonenumber");
const email = document.getElementById("email");
const password = document.getElementById("password");

const name_error = document.getElementById("name_error");
const email_error = document.getElementById("email_error");
const licence_error = document.getElementById("licence_error");
const phone_error = document.getElementById("phone_error");
const pass_error = document.getElementById("pass_error");

form.addEventListener("submit", (e) => {
  var email_check =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  var phonePattern = /^\d{10}$/;
  let regex = new RegExp(
    /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/
  );

  // name //

  if (username.value === "" || username.value == null) {
    e.preventDefault();
    name_error.innerHTML = "Name is required";
  } else if (username.value.length < 5) {
    e.preventDefault();
    name_error.innerHTML = "Name Must be more than 5 letters";
  } else {
    name_error.innerHTML = "";
  }

  // License //
  if ((licencenumber.value == null) | (licencenumber.value == "")) {
    e.preventDefault();
    licence_error.innerHTML = "Licence Number Cannot be Empty";
  } else if (!regex.test(licencenumber.value) == true) {
    e.preventDefault();
    licence_error.innerHTML =
      "Enter a Valid License Number eg:HR-0619850034761";
  } else {
    licence_error.innerHTML = "";
  }

  // email //

  if (!email.value.match(email_check)) {
    e.preventDefault();
    email_error.innerHTML = "Valid Email is required";
  } else {
    email_error.innerHTML = "";
  }

  // password //

  if (password.value == "") {
    e.preventDefault();
    pass_error.innerHTML = "Please Enter your password";
  } else if (password.value.length <= 6) {
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
  if (phonenumber.value == "") {
    e.preventDefault();
    phone_error.innerHTML = "Number Cannot be Empty";
  } else if (!phonePattern.test(phonenumber.value)) {
    e.preventDefault();
    phone_error.innerHTML = "Number must be 10 Digit";
  } else if (isNaN(phonenumber.value)) {
    e.preventDefault();
    phone_error.innerHTML = "Enter Valid number";
  } else {
    phone_error.innerHTML = "";
  }
});
