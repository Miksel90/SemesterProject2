import { allAuctions } from "./fetchAllAuctions.mjs";

/**
 * Populates the UI with a list of auctions based on the provided data.
 * @function
 * @name populateAllAuctions
 * @param {Array} data - An array of auction data to be displayed.
 * @property {string} data.id - The unique identifier for each auction.
 * @property {string} data.title - The title of the auction.
 * @property {Array} data.media - An array of URLs representing auction media (images).
 * @property {string} data.endsAt - The end date and time of the auction.
 * @property {Array} data.bids - An array of bids made on the auction.
 * @property {Object} data._count - An object containing counts related to the auction (e.g., bids count).
 * @property {Array} data.tags - An array of tags associated with the auction.
 * @throws {Error} If there is an issue populating the UI with auction data.
 */
export function populateAllAuctions(data) {
  const allAuctionsContainer = document.querySelector(".allAuctions");
  allAuctionsContainer.innerHTML = "";

  let sortAuctions = document.querySelector("#sortAuctions");
  let sortedResult = data;
  sortAuctions.addEventListener("change", async () => {
    sortedResult = [...data].sort((a, b) => {
      const timeA = new Date(a.endsAt).getTime();
      const timeB = new Date(b.endsAt).getTime();
      switch (sortAuctions.value) {
        case "priceHtoL":
          return getLatestBids(b) - getLatestBids(a);
        case "priceLtoH":
          return getLatestBids(a) - getLatestBids(b);
        case "ending":
          return timeA - timeB;
        default:
          return 0;
      }
    });
    generatePage(sortedResult);
  });

  function getLatestBids(listing) {
    const bids = listing.bids;
    if (bids && bids.length > 0) {
      return parseFloat(bids[bids.length - 1].amount);
    }
    return 0;
  }

  function generatePage(result) {
    allAuctionsContainer.innerHTML = "";

    result.forEach((auction) => {
      if (auction.media && auction.media.length > 0) {
        const auctionLinkContainer = document.createElement("a");
        auctionLinkContainer.href = `/feed/auctionSpecific.html?id=${auction.id}`;
        auctionLinkContainer.classList.add(
          "p-3",
          "text-decoration-none",
          "card",
          "mt-4",
          "border",
          "border-secondary"
        );
        auctionLinkContainer.style.width = "300px";
        auctionLinkContainer.style.overflow = "hidden";

        const auctionInfo = document.createElement("div");
        auctionInfo.classList.add(
          "p-1",
          "d-flex",
          "flex-column",
          "align-items-center",
          "justify-content-center"
        );

        const auctionTitleWrapper = document.createElement("div");
        auctionTitleWrapper.classList.add("text-wrap");

        const auctionTitle = document.createElement("h2");
        auctionTitle.classList.add(
          "fw-bold",
          "fs-2",
          "text-primary",
          "text-center",
          "auctionTitle",
          "mb-4"
        );
        auctionTitle.textContent = auction.title;

        if (auction.title.length > 20) {
          auctionTitle.textContent = auction.title.slice(0, 15) + "...";
        } else {
          auctionTitle.textContent = auction.title;
        }

        auctionTitleWrapper.appendChild(auctionTitle);
        auctionInfo.appendChild(auctionTitleWrapper);

        const auctionImageContainer = document.createElement("div");
        auctionImageContainer.classList.add(
          "container",
          "justify-content-center",
          "align-items-center",
          "d-flex",
          "mb-3"
        );

        const auctionMedia = document.createElement("img");
        auctionMedia.classList.add("allAuctionMedia");

        auctionMedia.alt =
          "Auction main Image - Read description for more Info";
        auctionMedia.src = auction.media[0];

        auctionImageContainer.appendChild(auctionMedia);
        auctionInfo.appendChild(auctionImageContainer);

        const ul = document.createElement("ul");
        ul.classList.add("list-unstyled", "fs-6");

        const li1 = document.createElement("li");
        li1.classList.add("text-primary");

        const endsAtDate = new Date(auction.endsAt);

        const dateSpan = document.createElement("div");
        dateSpan.classList.add("fw-bold", "fs-4");

        function updateCountdown() {
          const currentDate = new Date();
          const timeRemaining = endsAtDate - currentDate;

          if (timeRemaining > 0) {
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
              (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
              (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            dateSpan.textContent = `${days}d ${hours}h ${minutes}m`;
          } else {
            dateSpan.textContent = "Auction has ended";
          }
        }
        updateCountdown();
        setInterval(updateCountdown, 1000);

        li1.innerHTML = "Auction ends: " + dateSpan.outerHTML;

        const li2 = document.createElement("li");
        li2.classList.add("text-primary", "mt-2");

        const bidSPan = document.createElement("div");
        bidSPan.classList.add("fw-bold", "fs-5");
        bidSPan.textContent = auction._count.bids;

        li2.innerHTML = "Bids: " + bidSPan.outerHTML;

        const li3 = document.createElement("li");
        li3.classList.add("text-primary", "mt-2", "auctionBidder");
        const highestBidSpan = document.createElement("div");
        highestBidSpan.classList.add("fw-bold", "fs-5");
        if (auction.bids.length > 0) {
          const lastBid = auction.bids[auction.bids.length - 1];
          highestBidSpan.textContent =
            lastBid.amount + " Credits" + " by " + lastBid.bidderName;
        } else {
          highestBidSpan.textContent = "No bids yet";
        }

        li3.innerHTML = "Highest bid " + highestBidSpan.outerHTML;

        const li4 = document.createElement("li");
        li4.classList.add("text-primary", "mt-1", "auctionSeller");
        const sellerName = document.createElement("div");
        sellerName.classList.add("fs-5", "fw-bold");
        sellerName.textContent = auction.seller.name;

        li4.innerHTML = "Seller" + sellerName.outerHTML;

        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);
        ul.appendChild(li4);

        auctionInfo.appendChild(ul);

        const tagContainer = document.createElement("div");
        tagContainer.classList.add(
          "d-flex",
          "flex-wrap",
          "justify-content-start",
          "mt-3",
          "gap-2"
        );

        if (auction.tags && Array.isArray(auction.tags)) {
          auction.tags.forEach((tag) => {
            const tagText = document.createElement("p");
            tagText.classList.add(
              "text-white",
              "bg-primary",
              "p-2",
              "rounded-4",
              "auctionTag"
            );
            tagText.textContent = " " + tag;

            tagContainer.appendChild(tagText);
          });
        }

        auctionInfo.appendChild(tagContainer);

        auctionLinkContainer.appendChild(auctionInfo);

        allAuctionsContainer.appendChild(auctionLinkContainer);
      }
    });
  }

  generatePage(sortedResult);
}
