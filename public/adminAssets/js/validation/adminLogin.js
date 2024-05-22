const form = document.getElementById("form");

const email = document.getElementById("email");
const password = document.getElementById("password");

const email_error = document.getElementById("email_error");
const pass_error = document.getElementById("pass_error");

form.addEventListener("submit", (e) => {
  var email_check =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  // email //
  if (!email.value.match(email_check)) {
    e.preventDefault();
    email_error.innerHTML = "Please Enter Valid Email";
  } else {
    email_error.innerHTML = "";
  }

  // password //

  if (password.value.length ==" ") {
    e.preventDefault();
    pass_error.innerHTML = "Please Enter Password";
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

});
