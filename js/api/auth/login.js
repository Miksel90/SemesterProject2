import { API_BASE_URL, authURL, login_endpoint } from "../../consts/consts.mjs";

async function loginUser(url, userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    loginButton.innerText = "trying to log in...";
    loginButton.disabled = true;

    const response = await fetch(url, postData);
    console.log(response);

    const json = await response.json();
    console.log(json);

    if (response.ok) {
      const accessToken = json.accessToken;
      const userName = json.name;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userEmail", userData.email);

      // Change the button text to "Success!" after 1.5 seconds
      setTimeout(() => {
        loginButton.innerText = "Success!";
        // Redirect after another 1.5 seconds (adjust the timing as needed)
        setTimeout(() => {
          window.location.href = "/profile/index.html";
        }, 1500);
      }, 1500);
    } else {
      // Handle login failure
      console.log("Login failed");
      loginButton.innerText = "Login"; // Reset button text
      loginButton.disabled = false; // Enable the button

      // Display an error message to the user
      const errorMessage = document.getElementById("errorMessage");
      errorMessage.innerText =
        "Login failed. Please check your email and password.";
    }
  } catch (error) {
    console.log(error);
  }
}

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Clear any previous error messages
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.innerText = "";

    const userEmail = document.getElementById("userEmail").value;
    const userPassword = document.getElementById("userPassword").value;

    const userData = {
      email: userEmail,
      password: userPassword,
    };

    const loginUrl = `${API_BASE_URL}${authURL}${login_endpoint}`;

    loginUser(loginUrl, userData);
  });
