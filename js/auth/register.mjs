import { API_BASE_URL, authURL, register_endpoint } from "../consts/consts.mjs";

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

    const userData = {
      name: userName,
      email: userEmail,
      password: userPassword,
    };

    const registerUrl = `${API_BASE_URL}${authURL}${register_endpoint}`;
    await registerUser(registerUrl, userData);
  });
