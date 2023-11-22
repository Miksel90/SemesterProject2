export function redirectToProfile(userName, token) {
  if (userName && token) {
    window.location.href = "profile/index.html";
  }
}
