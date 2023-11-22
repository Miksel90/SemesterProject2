import { API_BASE_URL, profileURL, userName } from "../../consts/consts.mjs";
import { populateProfile } from "./populateProfileInfo.mjs";
import { showLoader, hideLoader } from "../../utilties/loader.mjs";

export async function createProfile(url) {
  try {
    showLoader();

    const token = localStorage.getItem("accessToken");
    console.log(token);
    const fetchProfileInfo = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchProfileInfo);
    const json = await response.json();
    populateProfile(json);
    hideLoader();

    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

export const profileInfo = `${API_BASE_URL}${profileURL}${userName}`;

createProfile(profileInfo);