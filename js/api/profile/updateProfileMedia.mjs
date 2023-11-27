import { API_BASE_URL, profileURL } from "../../consts/consts.mjs";

export function newProfileAvatarMedia() {
  document.addEventListener("DOMContentLoaded", function () {
    const profileMediaForm = document.getElementById("updateProfileMediaForm");
    const inputElement = document.getElementById("updateProfileMedia");

    async function uploadProfileAvatar(postMedia) {
      const token = localStorage.getItem("accessToken");
      const userName = localStorage.getItem("userName");
      const updateMediaURL = `${API_BASE_URL}${profileURL}${userName}/media`;

      try {
        const response = await fetch(updateMediaURL, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            avatar: postMedia,
          }),
        });

        if (response.ok) {
          const modal = document.getElementById("editModal");
          modal.classList.remove("show");
          modal.style.display = "none";
          window.location.reload();
        } else {
          console.error("Failed to edit the post.");
        }
      } catch (error) {
        console.error(error);
      }
    }

    profileMediaForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const editedMedia = inputElement.value;
      await uploadProfileAvatar(editedMedia);
    });
  });
}

// newProfileAvatarMedia();
