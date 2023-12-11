import { API_BASE_URL, profileURL } from "../consts/consts.mjs";

/**
 * Initializes the functionality for updating the user's profile avatar media.
 * It includes event listeners for the profile media form submission and handles
 * the asynchronous upload of the new profile avatar using the provided media.
 * @throws {Error} If there is an issue uploading the profile avatar or handling UI updates.
 * @returns {void}
 */
export function newProfileAvatarMedia() {
  const profileMediaForm = document.getElementById("updateProfileMediaForm");
  const inputElement = document.getElementById("updateProfileMedia");
  const editProfileMediaButton = document.getElementById(
    "editProfileMediaButton"
  );

  /**
   * Uploads the user's profile avatar by sending a PUT request to the server.
   * The function includes the user's access token and the image data in the request body.
   * It updates the avatar using the specified URL and handles the UI updates accordingly.
   * @param {string} postMedia - Image data of the new profile avatar.
   * @throws {Error} If there is an issue uploading the profile avatar or handling UI updates.
   * @returns {void}
   */
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

      editProfileMediaButton.innerText = "Adding Filters...";
      editProfileMediaButton.disabled = true;

      if (response.ok) {
        const modal = document.getElementById("editAvatarModal");
        setTimeout(() => {
          editProfileMediaButton.innerText = "You Look Ravishing!";
          setTimeout(() => {
            window.location.reload();
            modal.classList.remove("show");
            modal.style.display = "none";
          }, 1200);
        }, 1200);
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
}
