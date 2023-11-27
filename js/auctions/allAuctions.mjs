import { API_BASE_URL, listing_endpoint } from "../consts/consts.mjs";

async function fetchAllAuctions(url) {
  try {
    const fetchAllAuctions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchAllAuctions);

    const json = await response.json();
    console.log(json);
    allAuctionsResult = json;
  } catch (error) {
    console.error("Error:", error);
  }
}

const allAuctions = `${API_BASE_URL}${listing_endpoint}`;
let allAuctionsResult = "";
fetchAllAuctions(allAuctions);
