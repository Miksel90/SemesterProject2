import { profileBids } from "./profileBids.mjs";

export function populateBids(json) {
  const profileBids = document.querySelector(".profileBids");
  profileBids.innerHTML = "";

  json.forEach((auction) => {
    const bidsContainer = document.createElement("a");
    bidsContainer.href = `/feed/auctionSpecific.html?id=${auction.id}`;
    bidsContainer.classList.add("text-decoration-none");

    const bidsInfo = document.createElement("div");
    bidsInfo.classList.add(
      "card",
      "d-flex",
      "p-2",
      "border",
      "border-secondary"
    );

    const bidsTitle = document.createElement("p");
    bidsTitle.classList.add("fs-4", "text-primary", "text-center");
    bidsTitle.textContent = auction.listing.title;

    bidsInfo.appendChild(bidsTitle);

    if (
      auction.listing.media &&
      Array.isArray(auction.listing.media) &&
      auction.listing.media.length > 0 &&
      typeof auction.listing.media[0] === "string" &&
      auction.listing.media[0].trim() !== ""
    ) {
      const bidsMedia = document.createElement("img");
      bidsMedia.classList.add(
        "img-fluid",
        "object-fit-contain",
        "rounded",
        "mb-1",
        "mx-auto",
        "d-block"
      );

      bidsMedia.style.height = "150px";
      bidsMedia.src = auction.listing.media[0];

      bidsInfo.appendChild(bidsMedia);
    }

    const ul = document.createElement("ul");
    ul.classList.add("list-unstyled", "fs-5", "p-2");

    const li1 = document.createElement("li");
    li1.classList.add("text-primary", "text-start");
    li1.textContent = " My bid: " + auction.amount;

    const li2 = document.createElement("li");
    li2.classList.add("text-primary");

    const bidAtDate = new Date(auction.created);
    const bidsDate = bidAtDate.toLocaleDateString();
    li2.textContent = "Bidded on: " + bidsDate;

    ul.appendChild(li1);
    ul.appendChild(li2);

    bidsInfo.appendChild(ul);

    const bidAuctionCreated = document.createElement("p");
    bidAuctionCreated.classList.add(
      "fs-5",
      "text-primary",
      "text-decoration-underline",
      "text-danger"
    );

    const createdAtDate = new Date(auction.listing.endsAt);
    const createdDate = createdAtDate.toLocaleDateString();
    bidAuctionCreated.textContent = "Auction Ends: " + createdDate;

    bidsInfo.appendChild(bidAuctionCreated);
    profileBids.append(bidsInfo);

    profileBids.append(bidsContainer);
  });
}
