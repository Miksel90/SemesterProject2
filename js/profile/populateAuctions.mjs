import { profileAuctions } from "./profileAuctions.mjs";
import { editIMediaInputs } from "../auctions/addMediaField.mjs";
const { addImageButton, removeImageButton } = editIMediaInputs();

removeImageButton.addEventListener("click", function () {
  const existingMediaContainer = document.getElementById("editMediaGallery");
  const mediaFields =
    existingMediaContainer.getElementsByClassName("editAuctionMedia");

  if (mediaFields.length > 0) {
    existingMediaContainer.removeChild(mediaFields[mediaFields.length - 1]);
  }
});

export function populateAuctions(json) {
  const profileAuctions = document.querySelector(".profileAuctions");
  const editMediaGallery = document.getElementById("editMediaGallery");

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

      const editAuctionButton = document.createElement("button");
      editAuctionButton.id = `editAuctionButton-${auction.id}`;
      editAuctionButton.classList.add(
        "btn",
        "btn-primary",
        "btn-sm",
        "text-center",
        "border",
        "border-info",
        "border-2"
      );
      editAuctionButton.textContent = "Edit auction";
      editAuctionButton.style.width = "120px";
      editAuctionButton.style.fontSize = "16px";

      editAuctionContainer.appendChild(editAuctionButton);

      const editAuctionModal = document.getElementById("editAuctionModal");
      editAuctionButton.addEventListener("click", (e) => {
        e.preventDefault();

        editAuctionModal.classList.add("show");
        editAuctionModal.style.display = "block";
        const auctionTitleInput =
          editAuctionModal.querySelector("#editAuctionTitle");
        const auctionBodyInput =
          editAuctionModal.querySelector("#editAuctionBody");
        const auctionTagsInput =
          editAuctionModal.querySelector("#editAuctionTags");

        const medias = auction.media;
        editMediaGallery.innerHTML = "";
        medias.forEach((input) => {
          const inputContainer = document.createElement("div");
          inputContainer.className = "editAuctionMedia";
          const inputs = document.createElement("input");
          inputs.classList.add("form-control", "mt-1", "media-input");
          inputs.type = "text";
          inputContainer.append(inputs);
          inputs.value = input;

          editMediaGallery.append(inputContainer);
        });

        auctionTitleInput.value = auction.title;
        auctionBodyInput.value = auction.description;
        auctionTagsInput.value = auction.tags;

        editAuctionModal.setAttribute("data-auction-id", auction.id);
      });

      const closeEditAuctionModal = document.getElementById("editAuctionModal");
      closeEditAuctionModal.addEventListener("click", (e) => {
        if (
          e.target === closeEditAuctionModal ||
          e.target.classList.contains("btn-close")
        ) {
          closeEditAuctionModal.classList.remove("show");
          closeEditAuctionModal.style.display = "none";
        }
      });

      auctionInfo.appendChild(auctionMedia);
      auctionInfo.appendChild(auctionCreated);
      auctionInfo.appendChild(numberOfBids);

      auctionContainer.appendChild(editAuctionContainer);
      auctionInfo.appendChild(editAuctionButton);
    }

    auctionContainer.appendChild(auctionInfo);
    profileAuctions.appendChild(editAuctionModal);
    profileAuctions.append(auctionContainer);
  });
}
