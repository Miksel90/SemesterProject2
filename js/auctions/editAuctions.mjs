import { API_BASE_URL, listing_endpoint } from "../consts/consts.mjs";

const modal = document.getElementById("editAuctionModal");
const modalForm = modal.querySelector("#editAuctionForm");
const auctionTitleInput = modal.querySelector("#editAuctionTitle");
const auctionBodyInput = modal.querySelector("#editAuctionBody");
const auctionTagsInput = modal.querySelector("#editAuctionTags");
const imageFieldsContainer = document.getElementById("editMediaGallery");
const editAuctionButton = document.getElementById("editAuctionButton");

/**
 * Asynchronously edits an auction by making a PUT request to the specified URL.
 * @async
 * @function
 * @name editAuction
 * @param {string} url - The URL for editing the auction.
 * @param {string} auctionId - The ID of the auction to be edited.
 * @param {string} auctionTitle - The edited title of the auction.
 * @param {string} auctionDescription - The edited description of the auction.
 * @param {(string|string[])} auctionTags - The edited tags of the auction.
 * @param {HTMLInputElement[]} auctionMedia - The array of edited media input elements.
 * @throws {Error} If the auction edit fails.
 */
async function editAuction(
  auctionId,
  auctionTitle,
  auctionDescription,
  auctionTags,
  auctionMedia
) {
  const token = localStorage.getItem("accessToken");
  const url = `${API_BASE_URL}${listing_endpoint}/${auctionId}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: auctionId,
        title: auctionTitle,
        description: auctionDescription,
        tags: Array.isArray(auctionTags) ? auctionTags : [auctionTags],
        media: auctionMedia.map((input) => input.value),
      }),
    });

    editAuctionButton.innerText = "Uploading...";
    editAuctionButton.disabled = true;

    console.log(response);

    if (response.ok) {
      setTimeout(() => {
        editAuctionButton.innerText = "Auction Created";
        setTimeout(() => {
          window.location.reload();
          modal.classList.remove("show");
          modal.style.display = "none";
        }, 1200);
      }, 1200);
    } else {
      console.error("Failed to edit Auction.");
    }
  } catch (error) {
    console.error(error);
    console.error("failed to edit Auction:", error);
  }
}

editAuctionButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const editedTitle = auctionTitleInput.value;
  const editedBody = auctionBodyInput.value;
  const editedTags = auctionTagsInput.value;

  const auctionMediaInputs =
    imageFieldsContainer.querySelectorAll(".form-control");
  const editedMedia = Array.from(auctionMediaInputs);

  const auctionId = modal.getAttribute("data-auction-id");
  console.log("auction ID:", auctionId);

  await editAuction(
    auctionId,
    editedTitle,
    editedBody,
    editedTags,
    editedMedia
  );
});
