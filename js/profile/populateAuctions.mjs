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
    auctionInfo.style.maxwidth = "300px";
    auctionInfo.style.minWidth = "300px";

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

      auctionMedia.style.height = "200px";
      auctionMedia.alt = "Auction main Image - Read description for more Info";
      auctionMedia.src = auction.media[0];

      const ul = document.createElement("ul");
      ul.classList.add("list-unstyled", "fs-6");

      const li1 = document.createElement("li");
      li1.classList.add("text-primary");
      const endsAtDate = new Date(auction.endsAt);
      const formattedDate = endsAtDate.toLocaleDateString();

      const dateSpan = document.createElement("div");
      dateSpan.classList.add("fw-bold", "fs-4");
      dateSpan.textContent = formattedDate;

      li1.innerHTML = "Auction ends: " + dateSpan.outerHTML;

      const li2 = document.createElement("li");
      li2.classList.add("text-primary", "mt-2");

      const bidSPan = document.createElement("div");
      bidSPan.classList.add("fw-bold", "fs-5");
      bidSPan.textContent = auction._count.bids;

      li2.innerHTML = "Bids: " + bidSPan.outerHTML;

      ul.appendChild(li1);
      ul.appendChild(li2);

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

      auctionInfo.appendChild(ul);

      auctionContainer.appendChild(editAuctionContainer);
      auctionInfo.appendChild(editAuctionButton);
    }

    auctionContainer.appendChild(auctionInfo);
    profileAuctions.appendChild(editAuctionModal);
    profileAuctions.append(auctionContainer);
  });
}
