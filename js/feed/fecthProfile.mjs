import {
  API_BASE_URL,
  profileURL,
  userName,
  token,
} from "../consts/consts.mjs";
import { loggedInUser } from "./loggedInState.mjs";

async function fetchLoggedInUser(url) {
  try {
    if (token) {
      const fetchProfileInfo = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(url, fetchProfileInfo);
      const json = await response.json();

      console.log(json);

      loggedInUser(json);
    } else {
      const loggedInBox = document.querySelector(".loggedInBox");
      loggedInBox.classList.add("text-danger", "fs-2", "p-2");
      loggedInBox.innerHTML = "You Need To Log in to bid on Auctions";
    }
  } catch (error) {
    console.log(error);
  }
}

export const profileInfo = `${API_BASE_URL}${profileURL}${userName}`;
fetchLoggedInUser(profileInfo);
