import { token } from "../consts/consts.mjs";

export function hideProfileNavItem(token) {
  const profileNavItem = document.getElementById("profileNavText");

  if (!token) {
    profileNavItem.style.display = "none";
  }
}
