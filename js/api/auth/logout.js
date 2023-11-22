function logoutUser() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");

  //   window.location.href = "/index.html";
}

document.getElementById("logoutButton").addEventListener("click", function (e) {
  e.preventDefault();
  console.log("Logout button clicked");
  logoutUser();
});
