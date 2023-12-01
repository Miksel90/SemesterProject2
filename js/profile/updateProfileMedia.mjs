import { API_BASE_URL, profileURL } from "../consts/consts.mjs";

export function newProfileAvatarMedia() {
  const profileMediaForm = document.getElementById("updateProfileMediaForm");
  const inputElement = document.getElementById("updateProfileMedia");
  const editProfileMediaButton = document.getElementById(
    "editProfileMediaButton"
  );

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
