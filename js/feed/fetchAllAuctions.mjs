import { API_BASE_URL, listing_endpoint } from "../consts/consts.mjs";
import { showLoader, hideLoader } from "../utilities/loader.mjs";
import { populateAllAuctions } from "./populateAllAuctions.mjs";

const allAuctions = `${API_BASE_URL}${listing_endpoint}?&_seller=true&_bids=true&_count=true&_active=true`;
let allAuctionResults = "";

/**
 * Asynchronously fetches all auctions from the specified URL.
 * @async
 * @function
 * @name fetchAllAuctions
 * @param {string} url - The URL for fetching all auctions.
 * @returns {Promise<Array>} A promise that resolves to an array of auction data.
 * @throws {Error} If there is an error fetching the auctions.
 */
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

    hideLoader();
    allAuctionResults = data;
    return allAuctionResults;
  } catch (error) {
    console.error("Error:", error);
  }
}

export { fetchAllAuctions, allAuctions, allAuctionResults };

/**
 * Asynchronously generates the page by fetching all auctions and populating the UI.
 * @async
 * @function
 * @name generatePage
 */
async function generatePage() {
  const data = await fetchAllAuctions(allAuctions);
  populateAllAuctions(data);
}

generatePage();
