import { fetchAllAuctions, allAuctions } from "./fetchAllAuctions.mjs";

/**
 * Search auctions based on the input provided in the search bar and filter the displayed results.
 * @async
 * @function
 * @name searchAuctions
 * @throws {Error} If there is an issue with searching and filtering auctions.
 * @returns {Promise<void>} A promise that resolves once the search and filter operation is complete.
 */
async function searchAuctions() {
  const searchInput = document.getElementById("searchBar").value.toLowerCase();
  const auctionCards = document.querySelectorAll(".card");

  auctionCards.forEach((auction) => {
    const auctionTitleElement = auction.querySelector(".auctionTitle");
    const auctionBidderElement = auction.querySelector(".auctionBidder");
    const auctionSellerElement = auction.querySelector(".auctionSeller");

    if (auctionTitleElement && auctionBidderElement && auctionSellerElement) {
      const auctionTitle = auctionTitleElement.textContent.toLowerCase();
      const auctionBidder = auctionBidderElement.textContent.toLowerCase();
      const auctionSeller = auctionSellerElement.textContent.toLowerCase();

      if (
        auctionTitle.includes(searchInput) ||
        auctionBidder.includes(searchInput) ||
        auctionSeller.includes(searchInput)
      ) {
        auction.style.display = "block";
      } else {
        auction.style.display = "none";
      }
    }
  });
}

/**
 * Searches for posts based on user input after content has been loaded.
 */

document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");

  searchBar.addEventListener("input", searchAuctions);

  fetchAllAuctions(allAuctions);
});
