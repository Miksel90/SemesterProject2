import { API_BASE_URL, profileURL, userName } from "../consts/consts.mjs";
import { populateBids } from "./populateBids.mjs";

export const profileBids = `${API_BASE_URL}${profileURL}${userName}/bids?_listings=true`;

/**
 * Fetches data for the user's bids from the specified URL and populates the user interface.
 * The function sends a GET request with the user's access token to retrieve bid data.
 * Once the data is obtained, the `populateBids` function is called to update the UI.
 * @param {string} url - The URL to fetch user bid data.
 * @throws {Error} If there is an issue fetching or populating bid data.
 * @returns {void}
 */
export async function createBids(url) {
  try {
    const token = localStorage.getItem("accessToken");
    const fetchProfileAuctions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(profileBids, fetchProfileAuctions);

    const json = await response.json();

    populateBids(json);
  } catch (error) {
    console.log(error);
  }
}
