import { API_BASE_URL, authURL, loginURL } from "../../consts/consts.mjs";

export async function loginUser(url, userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(url, postData);
    // console.log(response);

    if (response.ok) {
      const json = await response.json();
      // console.log(json);
      const accessToken = json.accessToken;
      const userName = json.name;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userEmail", userEmail);

      window.location.href = "/profile/index.html";
    } else {
      console.log("Login failed");
    }
  } catch (error) {
    console.log(error);
  }
}

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const userEmail = document.getElementById("userEmail").value;
    const userPassword = document.getElementById("userPassword").value;

    const userData = {
      email: userEmail,
      password: userPassword,
    };

    const fullUrl = `${API_BASE_URL}${authURL}${loginURL}`;

    loginUser(fullUrl, userData);
  });
