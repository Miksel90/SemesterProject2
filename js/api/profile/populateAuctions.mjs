import { profileAuctions } from "./profileAuctions.mjs";

export function populateAuctions(json) {
  const profileAuctions = document.querySelector(".profileAuctions");
  profileAuctions.innerHTML = "";

  json.forEach((auction) => {
    const auctionContainer = document.createElement("a");
    auctionContainer.href = `/feed/auctionSpecific.html?id=${auction.id}`;
    auctionContainer.classList.add(
      "p-2",
      "text-decoration-none",
      "text-secondary"
    );

    const auctionInfo = document.createElement("div");
    auctionInfo.classList.add(
      "card",
      "d-flex",
      "p-4",
      "border",
      "border-secondary"
    );

    const auctionTitle = document.createElement("p");
    auctionTitle.classList.add(
      "fw-bold",
      "fs-4",
      "text-primary",
      "text-center"
    );
    auctionTitle.textContent = auction.title;

    auctionInfo.appendChild(auctionTitle);

    if (
      auction.media &&
      Array.isArray(auction.media) &&
      auction.media.length > 0 &&
      typeof auction.media[0] === "string" &&
      auction.media[0].trim() !== ""
    ) {
      const auctionMedia = document.createElement("img");
      auctionMedia.classList.add(
        "img-fluid",
        "object-fit-contain",
        "rounded",
        "mt-2",
        "mb-3",
        "mx-auto",
        "d-block"
      );

      auctionMedia.style.height = "150px";
      auctionMedia.src = auction.media[0];

      const auctionCreated = document.createElement("p");
      auctionCreated.classList.add(
        "text-primary",
        "fs-5",
        "justify-content-start"
      );
      const endsAtDate = new Date(auction.endsAt);
      const formattedDate = endsAtDate.toLocaleDateString();

      auctionCreated.textContent = "End date: " + formattedDate;

      const numberOfBids = document.createElement("p");
      numberOfBids.classList.add(
        "text-primary",
        "fs-5",
        "justify-content-start"
      );
      numberOfBids.textContent = "Bids: " + auction._count.bids;

      auctionInfo.appendChild(auctionMedia);
      auctionInfo.appendChild(auctionCreated);
      auctionInfo.appendChild(numberOfBids);
    }

    auctionContainer.appendChild(auctionInfo);
    profileAuctions.append(auctionContainer);
  });
}
