import { API_BASE_URL, profileURL, userName } from "../consts/consts.mjs";
import { populateProfile } from "./populateProfileInfo.mjs";
import { showLoader, hideLoader } from "../utilities/loader.mjs";
import { createAuctions } from "./profileAuctions.mjs";
import { createBids } from "./profileBids.mjs";
import { newProfileAvatarMedia } from "./updateProfileMedia.mjs";
import { populateWins } from "./populateWins.mjs";

export const profileInfo = `${API_BASE_URL}${profileURL}${userName}`;

newProfileAvatarMedia();

/**
 * Fetches user profile information from the specified URL, including bids, auctions, wins,
 * and other details. The function sends a GET request with the user's access token to retrieve
 * profile data. Once the data is obtained, it calls functions to create and populate various
 * @param {string} url - The URL to fetch user profile data.
 * @throws {Error} If there is an issue fetching or processing profile data.
 * @returns {void}
 */
export async function createProfile(url) {
  try {
    showLoader();

    const token = localStorage.getItem("accessToken");
    const fetchProfileInfo = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchProfileInfo);
    const json = await response.json();

    hideLoader();
    return json;
    // console.log(json);
  } catch (error) {
    console.log(error);
  }
}

/**
 * Asynchronously generates the page by fetching all auctions and populating the UI.
 * @async
 * @function
 * @name buildPage
 */
async function buildProfile() {
  const json = await createProfile(profileInfo);
  createBids(json);
  createAuctions(json);
  populateProfile(json);
  populateWins(json);
}

buildProfile();
