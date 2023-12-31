import { profileAuctions } from "./profileAuctions.mjs";
import { editIMediaInputs } from "../auctions/addMediaField.mjs";

editIMediaInputs();

/**
 * Populate the user's profile with auction cards based on the provided JSON data.
 * Additionally, users can edit an auction by clicking the "Edit auction" button.
 * @param {Object[]} json - The JSON data containing information about the user's auctions.
 * @throws {Error} If there is an issue with populating the user's profile with auction cards.
 * @returns {void}
 */
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

    const auctionTitleWrapper = document.createElement("div");
    auctionTitleWrapper.classList.add("text-wrap");

    const auctionTitle = document.createElement("h3");
    auctionTitle.classList.add(
      "fw-bold",
      "fs-4",
      "text-primary",
      "text-center",
      "auctionTitle"
    );
    auctionTitle.textContent = auction.title;

    if (auction.title.length > 20) {
      auctionTitle.textContent = auction.title.slice(0, 20) + "...";
    } else {
      auctionTitle.textContent = auction.title;
    }

    auctionTitleWrapper.appendChild(auctionTitle);
    auctionInfo.appendChild(auctionTitleWrapper);

    if (auction.media && auction.media.length > 0) {
      const auctionMedia = document.createElement("img");
      auctionMedia.classList.add(
        "cover",
        "img-thumbnail",
        "bg-secondary",
        "rounded",
        "mt-2",
        "mb-3",
        "mx-auto",
        "d-block"
      );

      auctionMedia.style.height = "200px";
      auctionMedia.style.width = "200px";
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

      ul.appendChild(li1);
      ul.appendChild(li2);

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
            "text-primary",
            "bg-white",
            "p-2",
            "rounded-1",
            "fs-6",
            "border",
            "border-secondary",
            "auctionTag"
          );
          tagText.textContent = " " + tag;

          tagContainer.appendChild(tagText);
        });
      }

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
        "border-secondary",
        "border-2",
        "mt-3"
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
      auctionInfo.appendChild(tagContainer);

      auctionContainer.appendChild(editAuctionContainer);
      auctionInfo.appendChild(editAuctionButton);
    }

    auctionContainer.appendChild(auctionInfo);
    profileAuctions.appendChild(editAuctionModal);
    profileAuctions.append(auctionContainer);
  });
}
