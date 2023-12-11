import { API_BASE_URL, authURL, register_endpoint } from "../consts/consts.mjs";

/**
 * Asynchronously registers a new user by making a POST request to the specified URL.
 * @async
 * @function
 * @name registerUser
 * @param {string} url - The URL for registering the user.
 * @param {Object} userData - The user data for registration.
 * @property {string} userData.username - The desired username for registration.
 * @property {string} userData.email - The user's email for registration.
 * @property {string} userData.password - The user's password for registration.
 * @throws {Error} If the user registration fails.
 */
export async function registerUser(url, userData) {
  const registerButton = document.getElementById("registerButton");

  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    registerButton.innerText = "Registering...";
    registerButton.disabled = true;

    const response = await fetch(url, postData);
    // console.log(response);
    const json = await response.json();

    if (response.ok) {
      registerButton.innerText = "Success!";
      registerButton.classList.add("success");

      setTimeout(function () {
        window.location.href = "index.html";
      }, 1000);
    } else {
      //   console.log(json);
      registerButton.innerText = "Register";
      registerButton.disabled = false;
    }
  } catch (error) {
    console.log(error);

    registerButton.innerText = "Register";
    registerButton.disabled = false;
  }
}

document
  .getElementById("registerForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const userName = document.getElementById("userName").value;
    const userEmail = document.getElementById("userEmail").value;
    const userPassword = document.getElementById("userPassword").value;

    if (!userName) {
      document.getElementById("userNameFeedback").style.display = "block";
      return;
    } else {
      document.getElementById("userNameFeedback").style.display = "none";
    }

    if (!userEmail || !isValidEmail(userEmail)) {
      document.getElementById("userEmailFeedback").style.display = "block";
      return;
    } else {
      document.getElementById("userEmailFeedback").style.display = "none";
    }

    if (!userPassword || userPassword.length < 8) {
      document.getElementById("userPasswordFeedback").style.display = "block";
      return;
    } else {
      document.getElementById("userPasswordFeedback").style.display = "none";
    }

    const userData = {
      name: userName,
      email: userEmail,
      password: userPassword,
    };

    const registerUrl = `${API_BASE_URL}${authURL}${register_endpoint}`;
    await registerUser(registerUrl, userData);

    function isValidEmail(email) {
      const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const noroffEmailReg = /@noroff\.no$/;
      return emailReg.test(email) && noroffEmailReg.test(email);
    }
  });
