import { token } from "../consts/consts.mjs";
import { hideProfileNavItem } from "../utilities/hideNavIfNoToken.mjs";

hideProfileNavItem(token);

/**
 * Logs out the user by removing relevant information from local storage and redirecting to the index page.
 * @function
 * @name logoutUser
 */
function logoutUser() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");

  window.location.href = "/index.html";
}

document.getElementById("logoutButton").addEventListener("click", function (e) {
  e.preventDefault();
  logoutUser();
});
