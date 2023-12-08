export function hideProfileNavItem(token) {
  const profileNavItem = document.getElementById("profileNavText");

  if (!token) {
    profileNavItem.style.display = "none";
    logoutButton.innerHTML = "Login";
  }
}
