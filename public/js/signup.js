const form = $("#form");
const fname = $("#fname");
const lname = $("#lname");
const uname = $("#uname");
const email = $("#email");
const mob = $("#mob");
const password = $("#password");
const cpass = $("#cpass");

let lower = /(?=.*[a-z])/;
let upper = /(?=.*[A-Z])/;
let num = /(?=.*[0-9])/;

form.on("submit", (e) => {
  var trigger = validate();
  if (trigger) {
    e.preventDefault();
  }
});

function validate() {
  const fNameVal = fname.val().trim();
  const lNameVal = lname.val().trim();
  const unameVal = uname.val().trim();
  const emailVal = email.val().trim();
  const mobVal = mob.val().trim();
  const passwordVal = password.val().trim();
  const cpassVal = cpass.val().trim();

  if (fNameVal === "") {
    displayError(fname, "First Name cannot be blank");
  } else {
    displaySuccess(fname);
  }

  if (lNameVal === "") {
    displayError(lname, "Last Name cannot be blank");
  } else {
    displaySuccess(lname);
  }

  if (unameVal === "") {
    displayError(uname, "User Name cannot be blank");
  } else {
    displaySuccess(uname);
  }

  checkEmail(emailVal);
  checkMob(mobVal);
  checkPassword(passwordVal);
  confirmPassword(cpassVal);

  function checkEmail(input) {
    var regexp =
      /^([a-z0-9\.-]{1,64})@([a-z0-9-]{2,200}).([a-z]{2,20})(.[a-z]{2,10})?$/i;
    if (regexp.test(input)) {
      displaySuccess(email);
    } else if (input === "") {
      displayError(email, "email cannot be blank");
    } else {
      displayError(email, "Invalid email");
    }
  }

  function checkMob(input) {
    var regexp =
      /^(\d{10})|((\d{3}[\-]){2}\d{4})|((\d{3}[\.]){2}\d{4})|((\d{3}[\ ]){2}\d{4})$/;
    if (input === "") {
      displayError(mob, "Mobile Number cannot be blank");
    } else if (input.length > 10) {
      displayError(mob, "Cannot be more than 10 digits");
    } else if (regexp.test(input)) {
      displaySuccess(mob);
    } else {
      displayError(mob, "Invalid Mobile Number");
    }
  }

  function checkPassword(input) {
    if (input === "") {
      displayError(password, "password cannot be blank");
    } else if (!lower.test(input) || !upper.test(input)) {
      displayError(password, "must include at least one upper&lower case");
    } else if (!num.test(input)) {
      displayError(password, "must include at least one number");
    } else if (input.length < 8) {
      displayError(password, "password must have at least 8 characters");
    } else {
      displaySuccess(password);
    }
  }

  function confirmPassword(input) {
    if (input === "") {
      displayError(cpass, "cannot be blank");
    } else if (input != passwordVal) {
      displayError(cpass, "passwords do not match");
    } else {
      displaySuccess(cpass);
    }
  }

  function displayError(input, message) {
    const formControl = input[0].parentElement;
    const small = formControl.querySelector("small");
    small.innerText = message;
    small.style.visibility = "visible";
    input[0].className = "form__input error";
  }

  function displaySuccess(input) {
    const formControl = input[0].parentElement;
    const small = formControl.querySelector("small");
    small.innerText = "";
    small.style.visibility = "hidden";
    input[0].className = "form__input success";
  }

  if (
    fname[0].classList.contains("error") ||
    lname[0].classList.contains("error") ||
    uname[0].classList.contains("error") ||
    email[0].classList.contains("error") ||
    mob[0].classList.contains("error") ||
    password[0].classList.contains("error") ||
    cpass[0].classList.contains("error")
  ) {
    return true;
  } else {
    return false;
  }
}
