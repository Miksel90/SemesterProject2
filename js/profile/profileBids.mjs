import { API_BASE_URL, profileURL, userName } from "../consts/consts.mjs";
import { populateBids } from "./populateBids.mjs";

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

    // console.log(json);
  } catch (error) {
    console.log(error);
  }
}

export const profileBids = `${API_BASE_URL}${profileURL}${userName}/bids?_listings=true`;
// createBids();
