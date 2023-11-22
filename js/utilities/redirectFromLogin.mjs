import { userName, token } from "../consts/consts.mjs";

export function redirectToProfile(userName, token, isLogout = false) {
  if (userName && token && !isLogout) {
    window.location.href = "profile/index.html";
  }
}
