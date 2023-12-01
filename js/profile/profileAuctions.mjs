import { API_BASE_URL, profileURL, userName } from "../../consts/consts.mjs";
import { populateAuctions } from "./populateAuctions.mjs";

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

export const profileAuctions = `${API_BASE_URL}${profileURL}${userName}/listings?_active=true`;
