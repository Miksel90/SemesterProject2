import {
  API_BASE_URL,
  profileURL,
  userName,
  token,
} from "../consts/consts.mjs";
import { loggedInUser } from "./loggedInProfile.mjs";
import { showLoader, hideLoader } from "../utilities/loader.mjs";
// import { allAuctions } from "./fetchAllAuctions.mjs";

export const profileInfo = `${API_BASE_URL}${profileURL}${userName}`;

/**
 * Asynchronously fetches the logged-in user's profile information.
 * @function
 * @name fetchLoggedInUser
 * @param {string} url - The URL for fetching the logged-in user's profile information.
 * @returns {Promise<void>}
 * @throws {Error} - If an error occurs during the fetch operation.
 */
async function fetchLoggedInUser(url) {
  try {
    showLoader();

    if (token) {
      const fetchProfileInfo = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(url, fetchProfileInfo);
      const data = await response.json();

      loggedInUser(data);

      hideLoader();
    } else {
      const loggedInBox = document.querySelector(".loggedInBox");
      loggedInBox.classList.add("text-white", "fs-2", "p-2");
      loggedInBox.innerHTML = "You need to log in to bid on auctions!";
    }
  } catch (error) {
    console.log(error);
  }
}

fetchLoggedInUser(profileInfo);
