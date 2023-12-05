export function populateSingleAuction(data) {
  document.title = data.title + " | " + data.seller.name;

  const auctionBox = document.querySelector(".auctionBox");
  auctionBox.classList.add("bg-success", "bg-opacity-50");
  auctionBox.innerHTML = "";

  const auctionContainer = document.createElement("div");
  auctionContainer.classList.add("p-3", "container");

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
  auctionCreated.classList.add("card-text", "fst-italic");
  auctionCreated.textContent = formattedDate;

  sellerBox.appendChild(sellerAvatar);
  sellerBox.appendChild(auctionSeller);
  sellerBox.appendChild(auctionCreated);

  auctionContainer.appendChild(sellerBox);

  const auctionTitle = document.createElement("h2");
  auctionTitle.classList.add(
    "fw-bold",
    "fs-1",
    "mt-4",
    "text-primary",
    "auctionTitle"
  );
  auctionTitle.textContent = data.title;

  const auctionDescription = document.createElement("p");
  auctionDescription.classList.add(
    "text-primary",
    "fs-4",
    "mt-3",
    "border-bottom",
    "border-secondary",
    "border-2"
  );
  auctionDescription.textContent = data.description;

  auctionContainer.appendChild(auctionTitle);
  auctionContainer.appendChild(auctionDescription);

  const auctionInfo = document.createElement("ul");
  auctionInfo.classList.add("list-unstyled");

  const li1 = document.createElement("li");
  li1.classList.add("text-primary", "fs-6");

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
  li2.classList.add("text-primary", "mt-2", "auctionBidder", "fs-6");
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
  li4.classList.add("text-primary", "mt-1", "auctionSeller", "fs-6");
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

  const bidOnAuction = document.createElement("div");
  bidOnAuction.classList.add("col-md-4");

  const newBidText = document.createElement("p");
  newBidText.classList.add("text-primary", "fs-3");
  newBidText.textContent = "Want to have this for yourself? Bid today!";

  const newBidButton = document.createElement("button");
  newBidButton.classList.add(
    "btn",
    "btn-primary",
    "border",
    "border-secondary",
    "text-white",
    "btn-sm",
    "rounded"
  );

  newBidButton.style.width = "150px";
  newBidButton.style.height = "70px";
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
  bidBox.appendChild(newBidText);
  bidBox.appendChild(newBidButton);
  bidBox.appendChild(bidOnAuction);

  const bidHistoryBox = document.createElement("div");
  bidHistoryBox.classList.add("col-md-12");

  const bidHistoryButton = document.createElement("button");
  bidHistoryButton.classList.add(
    "btn",
    "btn-lg",
    "btn-primary",
    "border",
    "border-secondary",
    "d-flex",
    "justify-content-end",
    "mb-2"
  );
  bidHistoryButton.setAttribute("type", "button");
  bidHistoryButton.setAttribute("data-bs-toggle", "collapse");
  bidHistoryButton.setAttribute("data-bs-target", "#bidHistoryCollapse");
  bidHistoryButton.setAttribute("aria-expanded", "false");
  bidHistoryButton.setAttribute("aria-controls", "bidHistoryCollapse");
  bidHistoryButton.textContent = "Bidding History";

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

  const mediaGallery = document.createElement("div");
  mediaGallery.classList.add("container", "d-flex", "flex-wrap", "gap-2");

  const auctionMedia = data.media;

  auctionMedia.forEach((image, index) => {
    const media = document.createElement("img");
    media.classList.add(
      "cover",
      "mt-5",
      "img-thumbnail",
      "bg-secondary",
      "border",
      "border-secondary",
      "mb-5"
    );
    media.style.height = "250px";
    media.style.width = "250px";
    media.src = image;
    media.alt = "hello ";

    mediaGallery.appendChild(media);
  });

  bidHistoryCollapse.appendChild(bidHistoryList);
  bidHistoryBox.appendChild(bidHistoryButton);
  bidHistoryBox.appendChild(bidHistoryCollapse);
  bidBox.appendChild(bidOnAuction);
  auctionContainer.appendChild(bidBox);

  auctionContainer.appendChild(mediaGallery);
  auctionContainer.appendChild(bidHistoryBox);

  auctionBox.append(auctionContainer);
}
