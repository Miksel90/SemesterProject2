import { profileBids } from "./profileBids.mjs";

/**
 * Populate the user's profile with bid information based on the provided JSON data.
 * @param {Object[]} json - The JSON data containing information about the user's bids.
 * @throws {Error} If there is an issue with populating the user's profile with bid information.
 * @returns {void}
 */
export function populateBids(json) {
  const profileBids = document.querySelector(".profileBids");
  profileBids.innerHTML = "";

  json.forEach((auction) => {
    const bidsContainer = document.createElement("a");
    bidsContainer.href = `/feed/auctionSpecific.html?id=${auction.listing.id}`;
    bidsContainer.classList.add("p-3", "text-decoration-none");
    bidsContainer.style.minWidth = "300px";

    const bidsInfo = document.createElement("div");
    bidsInfo.classList.add(
      "card",
      "d-flex",
      "p-3",
      "border",
      "border-secondary"
    );

    const bidsTitleWrapper = document.createElement("div");
    bidsTitleWrapper.classList.add("text-wrap");

    const bidsTitle = document.createElement("h3");
    bidsTitle.classList.add(
      "fw-bold",
      "fs-4",
      "p-1",
      "text-primary",
      "text-center",
      "auctionTitle"
    );
    bidsTitle.textContent = auction.listing.title;

    if (auction.listing.title.length > 20) {
      bidsTitle.textContent = auction.listing.title.slice(0, 20) + "...";
    } else {
      bidsTitle.textContent = auction.listing.title;
    }

    bidsTitleWrapper.appendChild(bidsTitle);
    bidsInfo.appendChild(bidsTitleWrapper);

    if (auction.listing.media && auction.listing.media.length > 0) {
      const bidsMediaContainer = document.createElement("div");
      bidsMediaContainer.classList.add("allAuctionMedia");

      const bidsMedia = document.createElement("img");
      bidsMedia.classList.add(
        "cover",
        "rounded",
        "mb-1",
        "mx-auto",
        "img-thumbnail",
        "bg-secondary"
      );

      bidsMedia.style.height = "200px";
      bidsMedia.style.width = "200px";
      bidsMedia.alt = "Auction main Image - Read description for more Info";
      bidsMedia.src = auction.listing.media[0];

      bidsInfo.appendChild(bidsMedia);
    }

    const ul = document.createElement("ul");
    ul.classList.add("list-unstyled", "fs-5", "p-2");

    const li1 = document.createElement("li");
    li1.classList.add("text-primary", "text-start");

    const bidSpan = document.createElement("div");
    bidSpan.classList.add("fw-bold", "fs-5");
    bidSpan.textContent = auction.amount;

    li1.innerHTML = " My bid: " + bidSpan.outerHTML;

    const li2 = document.createElement("li");
    li2.classList.add("text-primary");

    const bidAtDate = new Date(auction.created);
    const bidsDate = bidAtDate.toLocaleDateString();
    const bidAtDateSpan = document.createElement("div");
    bidAtDateSpan.classList.add("fw-bold", "fs-5");
    bidAtDateSpan.textContent = bidsDate;

    li2.innerHTML = "Bidded on: " + bidAtDateSpan.outerHTML;

    ul.appendChild(li1);
    ul.appendChild(li2);

    bidsInfo.appendChild(ul);

    const auctionEnds = document.createElement("p");
    auctionEnds.classList.add("text-primary", "fs-6");

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

        dateSpan.textContent = `${days}d ${hours}h ${minutes}m`;
      } else {
        dateSpan.textContent = "Auction has ended";
      }
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    auctionEnds.innerHTML = "Auction ends: " + dateSpan.outerHTML;

    bidsInfo.appendChild(auctionEnds);
    profileBids.append(bidsInfo);

    bidsContainer.appendChild(bidsInfo);

    profileBids.append(bidsContainer);
  });
}
