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
    const json = await response.json();

    if (response.ok) {
      const accessToken = json.accessToken;
      const userName = json.name;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userEmail", userData.email);

      setTimeout(() => {
        loginButton.innerText = "Success!";
        setTimeout(() => {
          window.location.href = "/profile/index.html";
        }, 1500);
      }, 1500);
    } else {
      console.log("Login failed");
      loginButton.innerText = "Login";
      loginButton.disabled = false;

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
