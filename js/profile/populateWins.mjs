import { API_BASE_URL, listing_endpoint } from "../consts/consts.mjs";

export async function populateWins(json) {
  const profileWins = document.querySelector(".profileWins");
  profileWins.innerHTML = "";

  if (Array.isArray(json.wins)) {
    const token = localStorage.getItem("accessToken");

    const fetchAllProfileWins = json.wins.map(async (winId) => {
      try {
        const fetchProfileWins = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await fetch(
          `${API_BASE_URL}${listing_endpoint}/${winId}?_bids=true`,
          fetchProfileWins
        );
        const winData = await response.json();

        const winContainer = document.createElement("a");
        winContainer.href = `/feed/auctionSpecific.html?id=${winId}`;
        winContainer.classList.add("p-3", "text-decoration-none");

        const winInfo = document.createElement("div");
        winInfo.classList.add(
          "card",
          "d-flex",
          "p-3",
          "border",
          "border-secondary"
        );

        const winTitleWrapper = document.createElement("div");
        winTitleWrapper.classList.add("text-wrap");

        const winTitle = document.createElement("h3");
        winTitle.classList.add(
          "fw-bold",
          "fs-2",
          "text-primary",
          "text-center",
          "auctionTitle"
        );
        winTitle.textContent = `${winData.title}`;

        if (winData.title.length > 20) {
          winTitle.textContent = winData.title.slice(0, 20) + "...";
        } else {
          winTitle.textContent = `${winData.title}`;
        }

        winTitleWrapper.appendChild(winTitle);
        winInfo.appendChild(winTitleWrapper);

        if (Array.isArray(winData.media)) {
          winData.media.forEach((mediaUrl) => {
            const winMedia = document.createElement("img");
            winMedia.classList.add(
              "cover",
              "img-thumbnail",
              "bg-secondary",
              "rounded",
              "mb-1",
              "mx-auto",
              "d-block"
            );

            winMedia.style.height = "200px";
            winMedia.style.width = "250px";
            winMedia.src = mediaUrl;
            winMedia.alt =
              "Auction main Image - Read description for more Info";

            winInfo.appendChild(winMedia);
          });
        }

        const winningBid = document.createElement("p");
        winningBid.classList.add(
          "text-primary",
          "mt-2",
          "auctionBidder",
          "fs-5",
          "text-center"
        );
        const highestBidSpan = document.createElement("div");
        highestBidSpan.classList.add("fw-bold", "fs-3", "text-center");
        if (winData.bids.length > 0) {
          const lastBid = winData.bids[winData.bids.length - 1];
          highestBidSpan.textContent = lastBid.amount + " Credits";
        } else {
          highestBidSpan.textContent = "No bids yet";
        }

        winningBid.innerHTML = "Winning Bid: " + highestBidSpan.outerHTML;

        winInfo.appendChild(winningBid);

        const endsAtDate = new Date(winData.endsAt);
        const formattedEndDate = endsAtDate.toLocaleDateString();

        const auctionEndsAt = document.createElement("p");
        auctionEndsAt.classList.add(
          "text-primary",
          "fs-3",
          "p-2",
          "text-center"
        );

        const auctionEndsAtSpan = document.createElement("div");
        auctionEndsAtSpan.classList.add("fw-bold", "fs-3", "text-center");
        auctionEndsAtSpan.textContent = `${formattedEndDate}`;

        auctionEndsAt.innerHTML = "Auction Ended" + auctionEndsAtSpan.outerHTML;

        winInfo.appendChild(auctionEndsAt);
        winContainer.appendChild(winInfo);
        profileWins.appendChild(winContainer);
      } catch (error) {
        console.error(`Error fetching data for win ID ${winId}: ${error}`);
      }
    });

    await Promise.all(fetchAllProfileWins);
  } else {
    console.error("Invalid data");
  }
}
