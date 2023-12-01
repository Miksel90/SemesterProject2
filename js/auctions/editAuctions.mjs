import { API_BASE_URL, listing_endpoint } from "../consts/consts.mjs";

const modal = document.getElementById("editAuctionModal");
const modalForm = modal.querySelector("#editAuctionForm");
const auctionTitleInput = modal.querySelector("#editAuctionTitle");
const auctionBodyInput = modal.querySelector("#editAuctionBody");
const auctionTagsInput = modal.querySelector("#editAuctionTags");
const imageFieldsContainer = document.getElementById("editMediaGallery");

const editAuctionButton = document.getElementById("editAuctionButton");

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

    console.log(response);

    if (response.ok) {
      modal.classList.remove("show");
      modal.style.display = "none";

      window.location.reload();
    } else {
      console.error("Failed to edit the post.");
    }
  } catch (error) {
    console.error(error);
    console.error("failed to edit post:", error);
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
