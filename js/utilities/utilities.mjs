import { setupScrollBehavior } from "./backToTop.mjs";
setupScrollBehavior();

const redirectLink = document.getElementById("redirectLink");
const accessToken = localStorage.getItem("accessToken");
redirectLink.addEventListener("click", function (event) {
  event.preventDefault();

  if (accessToken) {
    window.location.href = "/profile/index.html";
  }
});
