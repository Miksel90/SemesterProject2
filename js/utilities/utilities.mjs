import { setupScrollBehavior } from "./backToTop.mjs";
import { hideProfileNavItem } from "./hideProfile.mjs";
import { token } from "../consts/consts.mjs";
setupScrollBehavior();
hideProfileNavItem(token);
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
