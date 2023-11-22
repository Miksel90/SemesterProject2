import {
  API_BASE_URL,
  authURL,
  register_endpoint,
} from "../../consts/consts.mjs";

async function registerUser(url, userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    if (response.ok) {
      window.location.href = "index.html";
    }
    console.log(json);
  } catch (error) {
    console.log(error);
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
