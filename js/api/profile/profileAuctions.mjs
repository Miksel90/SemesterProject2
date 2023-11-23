import { API_BASE_URL, profileURL, userName } from "../../consts/consts.mjs";

export async function createRecentBids(url) {
  try {
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

    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

export const profileBids = `${API_BASE_URL}${profileURL}${userName}/listings`;
createRecentBids(profileBids);
