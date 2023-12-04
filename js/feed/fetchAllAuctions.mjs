import { API_BASE_URL, listing_endpoint } from "../consts/consts.mjs";
import { showLoader, hideLoader } from "../utilities/loader.mjs";
import { populateAllAuctions } from "./populateAllAuctions.mjs";

export async function fetchAllAuctions(url) {
  try {
    showLoader();
    const fetchAllAuctions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchAllAuctions);

    const data = await response.json();
    console.log(data);
    populateAllAuctions(data);

    hideLoader();
    allAuctionResults = data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export const allAuctions = `${API_BASE_URL}${listing_endpoint}?&_seller=true&_bids=true&_count=true&_active=true`;
let allAuctionResults = "";

fetchAllAuctions(allAuctions);
