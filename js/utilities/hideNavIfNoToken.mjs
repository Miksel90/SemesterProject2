/**
 * Hides the profile navigation item and updates the logout button text based on the presence of a user token.
 * If no token is provided, it hides the profile navigation item and sets the logout button text to "Login".
 * @param {string|null} token - The user token, or null if no user is authenticated.
 * @returns {void}
 */
export function hideProfileNavItem(token) {
  const profileNavItem = document.getElementById("profileNavText");

  if (!token) {
    profileNavItem.style.display = "none";
    logoutButton.innerHTML = "Login";
  }
}
