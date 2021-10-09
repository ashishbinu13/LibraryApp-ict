const bookName = document.getElementById("bookName");
const bookAuthor = document.getElementById("bookAuthor");
const bookGenre = document.getElementById("bookGenre");
const formSubmit = document.getElementById("formSubmit");
const popup = document.getElementById("popup");
const form = document.getElementById("bookForm");
const msg = document.getElementById("msg");
const ok = document.getElementById("ok");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  msg.innerHTML = `<h3>Hurrayy!</h3>
                                <p>${bookName.value} has been added to the Library</p>
                                <small>Happy Reading!</small><br>`;
  popup.style.visibility = "visible";

  ok.onclick = () => {
    popup.style.visibility = "hidden";
    form.submit();
  };
});
