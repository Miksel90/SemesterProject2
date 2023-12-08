import { setupScrollBehavior } from "./backToTop.mjs";
setupScrollBehavior();

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

let loginAnchor = document.getElementById("loginAnchor");

if (loginAnchor) {
  loginAnchor.addEventListener("click", function (event) {
    event.preventDefault();

    let loginForm = document.getElementById("loginForm");

    if (loginForm) {
      loginForm.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
}
