import { API_BASE_URL, listing_endpoint } from "../consts/consts.mjs";

window.addEventListener("DOMContentLoaded", (event) => {
  const modal = document.getElementById("createAuctionModal");
  const auctionTitleInput = modal.querySelector("#auctionTitle");
  const auctionBodyInput = modal.querySelector("#auctionBody");
  const auctionTagsInput = modal.querySelector("#auctionTags");
  const editAuctionButton = document.getElementById("editAuctionButton");

  let auctionMedia = [];
  auctionMedia.forEach((input) => {
    if (input.value !== "") {
      auctionMedia.push(input.value);
    }
  });

  const mediaGallery = modal.querySelectorAll(`input[data-type="url"]`);
  for (let i = 0; i < mediaGallery.length; i++) {
    mediaGallery[i].value = auctionMedia[i] || "";
    mediaGallery[i].classList.remove("hidden");
    mediaGallery[i].disabled = false;
  }

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
          media: auctionMedia,
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

    const auctionId = modal.getAttribute("data-auction-id");
    console.log("auction ID:", auctionId);

    const editedTitle = auctionTitleInput.value;
    const editedBody = auctionBodyInput.value;
    const editedTags = auctionTagsInput.value;

    const editedMedia = mediaGallery.querySelectorAll(`input[data-type="url"]`);
    for (let i = 0; i < editedMedia.length; i++) {
      if (editedMedia[i].value === "") {
        editedMedia[i].value = auctionMedia[i];
        editedMedia[i].classList.remove("hidden");
        editedMedia[i].disabled = false;
      }
    }

    await editAuction(
      auctionId,
      editedTitle,
      editedBody,
      editedTags,
      Array.from(editedMedia).map((input) => input.value)
    );
  });
});
