import { setupScrollBehavior } from "./backToTop.mjs";
// import { redirectToProfile } from "./redirectFromLogin.mjs";
// redirectToProfile();
setupScrollBehavior();

const accessToken = localStorage.getItem("accessToken");
const redirectLink = document.getElementById("redirectLink");

redirectLink.addEventListener("click", function (event) {
  event.preventDefault();

  if (accessToken) {
    window.location.href = "/profile/index.html";
  }
});
