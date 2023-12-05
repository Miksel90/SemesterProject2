import { API_BASE_URL, listing_endpoint } from "../consts/consts.mjs";

const createBidButton = document.getElementById("createBidButton");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const auctionId = urlParams.get("id");

export async function bidOnAuction(auctionId, userData) {
  const token = localStorage.getItem("accessToken");
  const url = `${API_BASE_URL}${listing_endpoint}/${auctionId}/bids`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    createBidButton.innerText = "Posting Bid...";
    createBidButton.disabled = true;

    if (response.ok) {
      setTimeout(() => {
        createBidButton.innerText = "Success!";
        setTimeout(() => {
          window.location.reload();
          modal.classList.remove("show");
          modal.style.display = "none";
        }, 1000);
      }, 1000);
    } else {
      console.log("Failed to bid on Auction");
      createBidButton.innerText = " Bid Posted";
      createBidButton.disabled = false;

      const errorMessage = document.getElementById("errorMessage");
      errorMessage.innerText = "Invalid Bid, please try again!";
    }
  } catch (error) {
    console.error(error);
  }
}

document
  .getElementById("bidOnAuctionForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const bidAmount = parseFloat(document.getElementById("amount").value);

    const userData = {
      amount: bidAmount,
    };

    await bidOnAuction(auctionId, userData);
  });
