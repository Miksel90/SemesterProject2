import { setupScrollBehavior } from "./backToTop.mjs";

/**
 * Adds a click event listener to the 'redirectLink' element. When clicked, it prevents the default
 * behavior, and based on the presence of an access token, redirects the user to either the profile
 * page or the index page.
 * @returns {void}
 */
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

/**
 * Adds a click event listener to the login anchor element. When clicked, it prevents the default
 * behavior, and scrolls the login form into view smoothly.
 * @returns {void}
 */
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

setupScrollBehavior();
