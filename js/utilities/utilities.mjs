import { setupScrollBehavior } from "./backToTop.mjs";
import { hideProfileNavItem } from "./hideProfile.mjs";
setupScrollBehavior();
hideProfileNavItem();
const redirectLink = document.getElementById("redirectLink");
const accessToken = localStorage.getItem("accessToken");

redirectLink.addEventListener("click", function (event) {
  event.preventDefault();

  if (accessToken) {
    window.location.href = "/profile/index.html";
  } else {
    window.location.href = "/index.html";
  }
});
