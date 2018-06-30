window.addEventListener("load", () => {
  const logo = document.getElementsByClassName("logo");
  const logoLink = logo[0].parentElement;
  logoLink.onclick = function (event) {
    event.preventDefault();
    window.open("https://reactioncommerce.com/");
  };
});
