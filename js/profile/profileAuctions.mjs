import { API_BASE_URL, profileURL, userName } from "../consts/consts.mjs";
import { populateAuctions } from "./populateAuctions.mjs";

/**
 * Fetches data for the user's auctions from the specified URL and populates the user interface.
 * The function sends a GET request with the user's access token to retrieve auction data.
 * Once the data is obtained, the `populateAuctions` function is called to update the UI.
 * @param {string} url - The URL to fetch user auction data.
 * @throws {Error} If there is an issue fetching or populating auction data.
 * @returns {void}
 */
export async function createAuctions(url) {
  try {
    const token = localStorage.getItem("accessToken");
    // console.log(token);
    const fetchProfileAuctions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(profileAuctions, fetchProfileAuctions);

    const json = await response.json();

    populateAuctions(json);

    // console.log(json);
  } catch (error) {
    console.log(error);
  }
}

export const profileAuctions = `${API_BASE_URL}${profileURL}${userName}/listings?_active=true&bids=true`;
