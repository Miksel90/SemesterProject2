import { API_BASE_URL, listing_endpoint } from "../consts/consts.mjs";

const modal = document.getElementById("editAuctionModal");

/**
 * Asynchronously deletes an auction by making a DELETE request to the specified URL.
 * @async
 * @function
 * @name deletePost
 * @param {string} auctionId - The ID of the auction to be deleted.
 * @throws {Error} If the post deletion fails.
 */
async function deletePost(auctionId) {
  const token = localStorage.getItem("accessToken");
  const url = `${API_BASE_URL}${listing_endpoint}/${auctionId}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    });

    if (response.ok) {
      modal.classList.remove("show");
      modal.style.display = "none";
      window.location.reload();
    } else {
      console.error("Failed to delete the post.");
    }
  } catch (error) {
    console.error(error);
  }
}

modal.addEventListener("click", async (e) => {
  if (e.target && e.target.id === "deleteAuctionButton") {
    e.preventDefault();
    const auctionId = editAuctionModal.getAttribute("data-auction-id");

    await deletePost(auctionId);
  }
});
