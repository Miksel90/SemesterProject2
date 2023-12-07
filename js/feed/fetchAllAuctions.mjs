import { API_BASE_URL, listing_endpoint } from "../consts/consts.mjs";
import { showLoader, hideLoader } from "../utilities/loader.mjs";
import { populateAllAuctions } from "./populateAllAuctions.mjs";

const allAuctions = `${API_BASE_URL}${listing_endpoint}?&_seller=true&_bids=true&_count=true&_active=true`;
let allAuctionResults = "";

async function fetchAllAuctions(url) {
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

    hideLoader();
    allAuctionResults = data;
    return allAuctionResults;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function generatePage() {
  const data = await fetchAllAuctions(allAuctions);
  populateAllAuctions(data);
}

generatePage();

export { fetchAllAuctions, allAuctions, allAuctionResults };
