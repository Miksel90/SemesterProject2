import { initializeImageForm } from "./addMediaField.mjs";
import { API_BASE_URL, listing_endpoint } from "../consts/consts.mjs";

const token = localStorage.getItem("accessToken");
const modal = document.getElementById("createAuctionModal");
const createAuctionButton = document.getElementById("createAuctionButton");

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
    // console.log(response);

    if (response.ok) {
      const json = await response.json();

      const mediaInputs = document.querySelectorAll(
        "#mediaGallery input[name='media']"
      );
      mediaInputs.forEach((input) => (input.value = ""));

      createAuctionButton.innerText = "Posting...";
      createAuctionButton.disabled = true;

      setTimeout(() => {
        createAuctionButton.innerText = "Auction Created";
        setTimeout(() => {
          window.location.reload();
          modal.classList.remove("show");
          modal.style.display = "none";
        }, 1200);
      }, 1200);
    } else {
      console.log("Could not create a new auction");
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

    const mediaInputs = document.querySelectorAll(
      "#mediaGallery input[name='media']"
    );
    const auctionMedia = Array.from(mediaInputs).map((input) => input.value);

    if (auctionMedia.length === 0) {
      console.log("Please add at least one image.");
      return;
    }

    const newAuction = {
      title: auctionTitle,
      description: auctionBody,
      endsAt: new Date(auctionEndsAt).toISOString(),
      tags: auctionTags.split(",").map((tag) => tag.trim()),
      media: auctionMedia.length > 0 ? auctionMedia : [],
    };

    const newAuctionURL = `${API_BASE_URL}${listing_endpoint}`;

    createAuction(newAuctionURL, newAuction);
  });
