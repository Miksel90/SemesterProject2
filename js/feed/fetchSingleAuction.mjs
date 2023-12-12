import { API_BASE_URL, listing_endpoint } from "../consts/consts.mjs";
import { showLoader, hideLoader } from "../utilities/loader.mjs";
import { populateSingleAuction } from "./populateSpecificAuction.mjs";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const auctionId = urlParams.get("id");

/**
 * Asynchronously fetches details for a single auction from the specified URL.
 * @async
 * @function
 * @name fetchSingleAuction
 * @throws {Error} If there is an error fetching the single auction.
 */
async function fetchSingleAuction() {
  try {
    showLoader();
    const auctionURL = `${API_BASE_URL}${listing_endpoint}/${auctionId}?_seller=true&_bids=true&_active=true`;

    const fetchSpecificData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(auctionURL, fetchSpecificData);
    const data = await response.json();
    console.log(data);

    populateSingleAuction(data);
    hideLoader();
    if (!response.ok) {
      console.error(
        `Error fetching post with ID ${auctionId}:${response.statusText}`
      );
      return;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchSingleAuction();
