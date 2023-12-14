/**
 * Populates the UI with details of a single auction. This function dynamically creates and appends elements to display auction information.
 * @function
 * @name populateSingleAuction
 * @param {Object} data - The auction data to be displayed.
 *   @property {string} data.title - The title of the auction.
 *   @property {string} data.description - The description of the auction.
 *   @property {Object} data.seller - The seller information.
 *     @property {string} data.seller.name - The name of the seller.
 *     @property {string} data.seller.avatar - The avatar URL of the seller.
 *   @property {Array<string>} data.media - An array of URLs representing auction media (images).
 *   @property {string} data.endsAt - The end date and time of the auction.
 *   @property {Array<Object>} data.bids - An array of bids made on the auction.
 *     @property {string} data.bids[].bidderName - The name of the bidder.
 *     @property {number} data.bids[].amount - The amount of the bid.
 *     @property {string} data.bids[].created - The date and time when the bid was made.
 * @throws {Error} If there is an issue populating the UI with auction data.
 */
export function populateSingleAuction(data) {
  document.title = data.title + " | " + data.seller.name;

  const auctionBox = document.querySelector(".auctionBox");
  auctionBox.innerHTML = "";
  auctionBox.classList.add("bg-success", "bg-opacity-50");

  const auctionContainer = document.createElement("div");
  auctionContainer.classList.add("container");

  const sellerBox = document.createElement("div");
  sellerBox.classList.add(
    "d-flex",
    "container",
    "justify-content-evenly",
    "align-items-center",
    "flex-wrap",
    "mb-3",
    "fs-1",
    "mt-3",
    "p-2",
    "border-bottom",
    "border-4",
    "border-secondary"
  );

  const sellerAvatar = document.createElement("img");
  sellerAvatar.classList.add("img-fluid", "rounded-circle");
  sellerAvatar.style.width = "100px";
  sellerAvatar.style.height = "100px";

  if (data.seller && data.seller.avatar && data.seller.avatar.trim() !== "") {
    sellerAvatar.src = data.seller.avatar;
    sellerAvatar.alt = "Profile-image of " + data.seller.name;
  } else {
    sellerAvatar.src = "/images/default-avatar.jpg";
    sellerAvatar.alt = "Profile-image of " + data.seller.name;
  }

  const auctionSeller = document.createElement("h2");
  auctionSeller.classList.add("margin-unset");
  auctionSeller.textContent = data.seller.name;

  const createdDate = new Date(data.created);
  const formattedDate = createdDate.toLocaleDateString();
  const auctionCreated = document.createElement("p");
  auctionCreated.classList.add("card-text", "fs-4");
  auctionCreated.textContent = "Listed " + formattedDate;

  sellerBox.appendChild(sellerAvatar);
  sellerBox.appendChild(auctionSeller);
  sellerBox.appendChild(auctionCreated);

  auctionContainer.appendChild(sellerBox);

  const auctionTitle = document.createElement("h1");
  auctionTitle.classList.add(
    "fw-bold",
    "fs-1",
    "mt-4",
    "text-primary",
    "auctionTitle"
  );
  auctionTitle.textContent = data.title;

  const auctionDescription = document.createElement("h2");
  auctionDescription.classList.add("text-primary", "fs-4", "mt-3", "mb-3");
  auctionDescription.textContent = data.description;

  auctionContainer.appendChild(auctionTitle);
  auctionContainer.appendChild(auctionDescription);

  const auctionInfo = document.createElement("ul");
  auctionInfo.classList.add("list-unstyled");

  const li1 = document.createElement("li");
  li1.classList.add("text-primary", "fs-5");

  const endsAtDate = new Date(data.endsAt);

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
  li2.classList.add("text-primary", "mt-2", "auctionBidder", "fs-5");
  const highestBidSpan = document.createElement("div");
  highestBidSpan.classList.add("fw-bold", "fs-4");
  if (data.bids.length > 0) {
    const lastBid = data.bids[data.bids.length - 1];
    highestBidSpan.textContent =
      lastBid.amount + " Credits" + " by " + lastBid.bidderName;
  } else {
    highestBidSpan.textContent = "No bids yet";
  }

  li2.innerHTML = " Current Bid " + highestBidSpan.outerHTML;

  const li4 = document.createElement("li");
  li4.classList.add("text-primary", "mt-1", "auctionSeller", "fs-5");
  const sellerName = document.createElement("div");
  sellerName.classList.add("fs-4", "fw-bold");
  sellerName.textContent = data.seller.name;

  li4.innerHTML = "Seller" + sellerName.outerHTML;

  auctionInfo.appendChild(li1);
  auctionInfo.appendChild(li2);
  auctionInfo.appendChild(li4);

  auctionContainer.appendChild(auctionInfo);

  const bidBox = document.createElement("div");
  bidBox.classList.add("row");

  const newBidButton = document.createElement("button");
  newBidButton.classList.add(
    "btn",
    "btn-primary",
    "border",
    "border-secondary",
    "text-white",
    "rounded",
    "fs-3",
    "col-md-2",
    "mt-3",
    "mx-auto"
  );

  newBidButton.innerText = "Log in to Bid!";

  const token = localStorage.getItem("accessToken");

  if (token) {
    newBidButton.innerText = "Bid Here!";
    newBidButton.addEventListener("click", (e) => {
      e.preventDefault();
      const openBidOnAuctionModal =
        document.getElementById("bidOnAuctionModal");
      openBidOnAuctionModal.classList.add("show");
      openBidOnAuctionModal.style.display = "block";
    });
  } else {
    newBidButton.disabled = true;
  }

  const closeBidAuctionModal = document.getElementById("bidOnAuctionModal");
  closeBidAuctionModal.addEventListener("click", (e) => {
    if (
      e.target === closeBidAuctionModal ||
      e.target.classList.contains("btn-close")
    ) {
      closeBidAuctionModal.classList.remove("show");
      closeBidAuctionModal.style.display = "none";
    }
  });

  bidBox.appendChild(newBidButton);

  const bidHistoryBox = document.createElement("div");
  bidHistoryBox.classList.add("col-md-12", "p-0");

  const bidHistoryButton = document.createElement("button");
  bidHistoryButton.classList.add(
    "btn",
    "btn-lg",
    "btn-primary",
    "border",
    "border-secondary",
    "d-flex",
    "justify-content-end",
    "mb-2",
    "mt-3"
  );
  bidHistoryButton.style.borderRadius = "0px";
  bidHistoryButton.setAttribute("type", "button");
  bidHistoryButton.setAttribute("data-bs-toggle", "collapse");
  bidHistoryButton.setAttribute("data-bs-target", "#bidHistoryCollapse");
  bidHistoryButton.setAttribute("aria-expanded", "false");
  bidHistoryButton.setAttribute("aria-controls", "bidHistoryCollapse");
  bidHistoryButton.textContent = "Bid History";

  const bidHistoryCollapse = document.createElement("div");
  bidHistoryCollapse.classList.add("collapse", "mt-2");
  bidHistoryCollapse.setAttribute("id", "bidHistoryCollapse");

  const bidHistoryList = document.createElement("ul");
  bidHistoryList.classList.add(
    "list-group",
    "border",
    "border-secondary",
    "d-flex"
  );

  data.bids.forEach((bid, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add(
      "list-group-item",
      "d-flex",
      "flex-wrap",
      "justify-content-evenly",
      "bg-success",
      "bg-opacity-50"
    );

    listItem.innerHTML = `
      <strong>Bidder: </strong> ${bid.bidderName},  
      <strong>Amount: </strong> $${bid.amount}, 
      <strong>Date: </strong> ${new Date(bid.created).toLocaleString()}`;

    bidHistoryList.appendChild(listItem);
  });

  bidHistoryCollapse.appendChild(bidHistoryList);
  bidHistoryBox.appendChild(bidHistoryButton);
  bidHistoryBox.appendChild(bidHistoryCollapse);
  auctionContainer.appendChild(bidBox);

  auctionInfo.appendChild(bidHistoryBox);

  const auctionMedia = data.media;

  const mediaGallery = document.createElement("div");
  mediaGallery.classList.add(
    "imageGallery",
    "carousel",
    "slide",
    "mt-3",
    "mb-3",
    "border",
    "border-secondary"
  );
  mediaGallery.id = "auctionCarousel";

  const carouselInner = document.createElement("div");
  carouselInner.classList.add("carousel-inner");

  const indicators = document.createElement("ol");
  indicators.classList.add("carousel-indicators");
  indicators.style.listStyleType = "none";

  const createControl = (direction) => {
    const control = document.createElement("a");
    control.className = `carousel-control-${direction}`;
    control.href = "#auctionCarousel";
    control.role = "button";
    control.dataset.bsSlide = direction;

    const controlIcon = document.createElement("span");
    controlIcon.className = `carousel-control-${direction}-icon`;
    controlIcon.classList.add("p-4");
    controlIcon.setAttribute("aria-hidden", "true");

    const controlText = document.createElement("span");
    controlText.className = "sr-only";
    controlText.textContent = direction === "prev" ? "Previous" : "Next";

    control.appendChild(controlIcon);
    control.appendChild(controlText);

    return control;
  };

  auctionMedia.forEach((imageSrc, index) => {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    if (index === 0) carouselItem.classList.add("active");

    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add(
      "d-flex",
      "justify-content-center",
      "align-items-center"
    );

    const img = document.createElement("img");
    img.src = imageSrc;
    img.classList.add("d-block", "w-100");
    img.style.height = "600px";
    img.style.objectFit = "cover";
    img.alt = "Auction Image " + (index + 1);

    imageWrapper.appendChild(img);
    carouselItem.appendChild(imageWrapper);
    carouselInner.appendChild(carouselItem);

    const smallImg = document.createElement("li");
    smallImg.dataset.bsTarget = "#auctionCarousel";
    smallImg.dataset.bsSlideTo = index;
    if (index === 0) {
      smallImg.classList.add("active");
    }
    smallImg.style.backgroundImage = `url('${imageSrc}')`;
    smallImg.style.backgroundSize = "cover";
    smallImg.style.backgroundPosition = "center";
    smallImg.style.height = "50px";
    smallImg.style.width = "50px";
    smallImg.style.border = "1px solid #d4af37";

    indicators.appendChild(smallImg);
  });

  mediaGallery.appendChild(carouselInner);
  mediaGallery.appendChild(indicators);

  const prevControl = createControl("prev");
  const nextControl = createControl("next");

  mediaGallery.appendChild(prevControl);
  mediaGallery.appendChild(nextControl);

  auctionContainer.appendChild(mediaGallery);

  const carousel = new bootstrap.Carousel(mediaGallery);

  prevControl.addEventListener("click", (e) => {
    e.preventDefault();
    carousel.prev();
  });

  nextControl.addEventListener("click", (e) => {
    e.preventDefault();
    carousel.next();
  });

  indicators.querySelectorAll("li").forEach((indicator) => {
    indicator.addEventListener("click", () => {
      const slideToIndex = parseInt(indicator.dataset.bsSlideTo);
      carousel.to(slideToIndex);
    });
  });

  auctionBox.append(auctionContainer);
}
