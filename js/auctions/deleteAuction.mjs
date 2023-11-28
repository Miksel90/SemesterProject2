import { API_BASE_URL, listing_endpoint } from "../consts/consts.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("createAuctionModal");

  /**
   * Delete a post.
   *
   * @param {string} auctionId - The ID of the post to delete.
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
      const auctionId = modal.getAttribute("data-auction-id");
      //   console.log("Auction ID:", auctionId);

      await deletePost(auctionId);
    }
  });
});
