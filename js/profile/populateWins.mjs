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
          `${API_BASE_URL}${listing_endpoint}/${winId}`,
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
          "border-secondary",
          "bg-primary"
        );

        const winTitle = document.createElement("p");
        winTitle.classList.add(
          "fs-4",
          "text-secondary",
          "text-center",
          "fw-bold"
        );
        winTitle.textContent = `${winData.title}`;

        winInfo.appendChild(winTitle);

        if (Array.isArray(winData.media)) {
          winData.media.forEach((mediaUrl) => {
            const winMedia = document.createElement("img");
            winMedia.classList.add(
              "img-fluid",
              "object-fit-contain",
              "rounded",
              "mb-1",
              "mx-auto",
              "d-block"
            );

            winMedia.style.height = "150px";
            winMedia.src = mediaUrl;
            winMedia.alt =
              "Auction main Image - Read description for more Info";

            winInfo.appendChild(winMedia);
          });
        }

        const endsAtDate = new Date(winData.endsAt);
        const formattedEndDate = endsAtDate.toLocaleDateString();

        const auctionEndsAt = document.createElement("p");
        auctionEndsAt.classList.add(
          "text-secondary",
          "border",
          "border-primary",
          "fs-5",
          "justify-content-start",
          "p-2"
        );
        auctionEndsAt.textContent = `Auction Ended: ${formattedEndDate}`;

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
