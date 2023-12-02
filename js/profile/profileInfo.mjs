import { API_BASE_URL, profileURL, userName } from "../consts/consts.mjs";
import { populateProfile } from "./populateProfileInfo.mjs";
import { showLoader, hideLoader } from "../utilities/loader.mjs";
import { createAuctions } from "./profileAuctions.mjs";
import { createBids } from "./profileBids.mjs";
import { newProfileAvatarMedia } from "./updateProfileMedia.mjs";
import { populateWins } from "./populateWins.mjs";

newProfileAvatarMedia();

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

    createBids(json);
    createAuctions(json);
    populateProfile(json);
    populateWins(json);
    // loggedInUser(data);
    hideLoader();

    // console.log(json);
  } catch (error) {
    console.log(error);
  }
}

export const profileInfo = `${API_BASE_URL}${profileURL}${userName}`;
createProfile(profileInfo);
