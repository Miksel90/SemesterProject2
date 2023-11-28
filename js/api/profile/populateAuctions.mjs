import { profileAuctions } from "./profileAuctions.mjs";

export function populateAuctions(json) {
  const profileAuctions = document.querySelector(".profileAuctions");
  profileAuctions.innerHTML = "";

  json.forEach((auction) => {
    const auctionContainer = document.createElement("a");
    auctionContainer.href = `/feed/auctionSpecific.html?id=${auction.id}`;
    auctionContainer.classList.add("p-3", "text-decoration-none");

    const auctionInfo = document.createElement("div");
    auctionInfo.classList.add(
      "card",
      "d-flex",
      "p-3",
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
      auctionMedia.alt = "Auction main Image - Read description for more Info";
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

      const editAuctionContainer = document.createElement("div");
      editAuctionContainer.classList.add(
        "d-flex",
        "flex-wrap",
        "justify-content-center",
        "align-items-center",
        "mb-1"
      );

      const openModal = document.createElement("button");
      openModal.id = `edit_${auction.id}`;
      openModal.classList.add(
        "btn",
        "btn-primary",
        "btn-sm",
        "text-center",
        "border",
        "border-info",
        "border-2"
      );
      openModal.textContent = "Edit auction";
      openModal.style.width = "120px";
      openModal.style.fontSize = "16px";

      const modal = document.getElementById("createAuctionModal");

      openModal.addEventListener("click", (e) => {
        e.preventDefault();

        const auctionButton = modal.querySelector(".mainButton");
        auctionButton.style.display = "none";

        const auctionTitleInput = modal.querySelector("#auctionTitle");
        const auctionBodyInput = modal.querySelector("#auctionBody");
        const auctionTagsInput = modal.querySelector("#auctionTags");
        // const auctionMediaInputs = modal.querySelectorAll(".media-input");

        auctionTitleInput.value = auction.title;
        auctionBodyInput.value = auction.description;
        auctionTagsInput.value = auction.tags;
        // auctionMediaInputs.value = auction.media;

        const auctionEnds = modal.querySelector(".auctionEndsAt");
        auctionEnds.style.display = "none";
        const endsAtLabel = modal.querySelector("label[for='auctionEndsAt']");
        endsAtLabel.style.display = "none";

        const auctionMedia = modal.querySelector(".auctionMedia");
        auctionMedia.style.display = "none";
        const auctionMediaLabel = modal.querySelector(
          "label[for='auctionMedia']"
        );
        auctionMediaLabel.style.display = "none";

        modal.setAttribute("data-auction-id", auction.id);

        modal.classList.add("show");
        modal.style.display = "block";

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.id = "deleteAuctionButton";
        deleteButton.classList.add(
          "btn",
          "btn-danger",
          "border",
          "border-primary",
          "btn-lg",
          "mt-2",
          "ml-auto"
        );
        deleteButton.textContent = "Delete Auction";

        const modalFooter = createAuctionModal.querySelector(".modal-footer");
        modalFooter.appendChild(deleteButton);
      });

      const closeModal = document.getElementById("createAuctionModal");
      closeModal.addEventListener("click", (e) => {
        if (
          e.target === closeModal ||
          e.target.classList.contains("btn-close")
        ) {
          closeModal.classList.remove("show");
          closeModal.style.display = "none";

          const auctionButton = document.querySelector(".mainButton");
          auctionButton.style.display = "block";

          const deleteButton = document.getElementById("deleteAuctionButton");
          if (deleteButton) {
            deleteButton.remove();
          }
          const auctionEnds = modal.querySelector(".auctionEndsAt");
          auctionEnds.style.display = "block";
          const endsAtLabel = modal.querySelector("label[for='auctionEndsAt']");
          endsAtLabel.style.display = "block";

          const auctionMedia = modal.querySelector(".auctionMedia");
          auctionMedia.style.display = "block";
          const auctionMediaLabel = modal.querySelector(
            "label[for='auctionMedia']"
          );
          auctionMediaLabel.style.display = "block";
        }
      });

      auctionInfo.appendChild(auctionMedia);
      auctionInfo.appendChild(auctionCreated);
      auctionInfo.appendChild(numberOfBids);

      auctionContainer.appendChild(editAuctionContainer);
      auctionInfo.appendChild(openModal);
    }

    auctionContainer.appendChild(auctionInfo);
    profileAuctions.append(auctionContainer);
  });
}
