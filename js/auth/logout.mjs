import { token } from "../consts/consts.mjs";
import { hideProfileNavItem } from "../utilities/hideNavIfNoToken.mjs";

hideProfileNavItem(token);

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
