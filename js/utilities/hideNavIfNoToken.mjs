import { token } from "../consts/consts.mjs";

export function hideProfileNavItem() {
  const profileNavItem = document.getElementById("profileNavText");

  if (!token) {
    profileNavItem.style.display = "none";
  }
}
