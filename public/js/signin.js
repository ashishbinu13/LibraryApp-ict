const form = $("#form");
const uname = $("#uname");
const password = $("#password");

form.on("submit", (e) => {
  var trigger = validate();
  if (trigger) {
    e.preventDefault();
  }
});

function validate() {
  const unameVal = uname.val().trim();
  const passwordVal = password.val().trim();

  console.log(unameVal);
  console.log(passwordVal);

  if (unameVal === "") {
    console.log(unameVal);
    displayError(uname, "User Name cannot be blank");
  } else if (unameVal !== "admin") {
    displayError(uname, "Invalid username");
  } else {
    displaySuccess(uname);
  }

  if (passwordVal === "") {
    displayError(password, "Password cannot be blank");
  } else if (passwordVal !== "12345") {
    displayError(password, "Wrong password");
  } else {
    displaySuccess(password);
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
    uname[0].classList.contains("error") ||
    password[0].classList.contains("error")
  ) {
    return true;
  } else {
    return false;
  }
}
