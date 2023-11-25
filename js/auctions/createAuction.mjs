import { initializeImageForm } from "./addMediaField.mjs";
import { API_BASE_URL, listing_endpoint } from "../consts/consts.mjs";
const token = localStorage.getItem("accessToken");
initializeImageForm();

async function createAuction(url, newAuction) {
  try {
    const auctionData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newAuction),
    };
    const response = await fetch(url, auctionData);
    console.log(response);

    if (response.ok) {
      const json = await response.json();
      // console.log(json);

      document.getElementById("auctionTitle").value = "";
      document.getElementById("auctionBody").value = "";
      document.getElementById("auctionEndsAt").value = "";
      document.getElementById("auctionTags").value = "";
      document.getElementById("auctionMedia").value = "";

      alert("Auction has been posted!");

      window.location.reload();
    } else {
      console.log("Could not create new auction");
    }
  } catch (error) {
    console.log(error);
  } finally {
    document.getElementById("createAuctionButton").disabled = false;
  }
}

document
  .getElementById("createNewAuctionForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const auctionTitle = document.getElementById("auctionTitle").value;
    const auctionBody = document.getElementById("auctionBody").value;
    const auctionEndsAt = document.getElementById("auctionEndsAt").value;
    const auctionTags = document.getElementById("auctionTags").value;
    const auctionMedia = document.getElementById("auctionMedia").value;

    const newAuction = {
      title: auctionTitle,
      description: auctionBody,
      endsAt: new Date(auctionEndsAt).toISOString(),
      tags: auctionTags.split(",").map((tag) => tag.trim()),
      media: auctionMedia.split(",").map((media) => media.trim()),
    };

    const newAuctionURL = `${API_BASE_URL}${listing_endpoint}`;

    createAuction(newAuctionURL, newAuction);
  });
