import { allAuctions } from "./fetchAllAuctions.mjs";

export function populateAllAuctions(data) {
  const allAuctionsContainer = document.querySelector(".allAuctions");
  allAuctionsContainer.innerHTML = "";

  data.forEach((auction) => {
    if (
      auction.media &&
      Array.isArray(auction.media) &&
      auction.media.length > 0 &&
      typeof auction.media[0] === "string" &&
      auction.media[0].trim() !== ""
    ) {
      const auctionContainer = document.createElement("a");
      auctionContainer.href = `/feed/auctionSpecific.html?id=${auction.id}`;
      auctionContainer.classList.add("p-3", "text-decoration-none");

      const auctionInfo = document.createElement("div");
      auctionInfo.classList.add("card", "p-3", "border", "border-secondary");
      auctionInfo.style.maxWidth = "300px";
      auctionInfo.style.height = "600px";

      const auctionTitle = document.createElement("p");
      auctionTitle.classList.add(
        "fw-bold",
        "fs-4",
        "text-primary",
        "text-center",
        "auctionTitle"
      );
      auctionTitle.textContent = auction.title;

      const auctionMedia = document.createElement("img");
      auctionMedia.classList.add("img-fluid", "rounded", "mt-1", "mb-3");

      auctionMedia.alt = "Auction main Image - Read description for more Info";
      auctionMedia.src = auction.media[0];

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

      auctionInfo.appendChild(auctionMedia);
      auctionInfo.appendChild(auctionTitle);

      auctionInfo.appendChild(ul);

      auctionContainer.appendChild(auctionInfo);
      allAuctionsContainer.appendChild(auctionContainer);
    }
  });
}
