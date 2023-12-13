let loginAnchor = document.getElementById("loginAnchor");

/**
 * Handles the redirection logic based on the presence of a token in local storage.
 * @requires loginAnchor - A global variable referencing the HTML element to attach the click event listener.
 * @global
 * @function loginRedirect
 */
export function loginRedirect() {
  if (loginAnchor) {
    loginAnchor.addEventListener("click", function (event) {
      event.preventDefault();

      const token = localStorage.getItem("accessToken");

      if (token) {
        window.location.href = "/profile/index.html";
      } else {
        localStorage.setItem("scrollToLoginForm", "true");
        window.location.href = "/index.html";
      }
    });
  }

  window.onload = function () {
    if (localStorage.getItem("scrollToLoginForm") === "true") {
      let loginForm = document.getElementById("loginForm");

      if (loginForm) {
        loginForm.scrollIntoView({
          behavior: "smooth",
        });
      }

      localStorage.removeItem("scrollToLoginForm");
    }
  };
}
loginRedirect();
