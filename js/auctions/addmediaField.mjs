export async function initializeImageForm() {
  document.addEventListener("DOMContentLoaded", function () {
    const addImageButton = document.getElementById("addImageButton");
    const mediaGallery = document.getElementById("mediaGallery");

    const maxImageFields = 8;

    addImageButton.addEventListener("click", function () {
      if (mediaGallery.children.length < maxImageFields) {
        const newImageField = document.createElement("div");
        newImageField.classList.add("imageField");

        const newImageInput = document.createElement("input");
        newImageInput.type = "text";
        newImageInput.classList.add("form-control", "mt-2", "media-input");
        newImageInput.name = "media";
        newImageInput.placeholder = "Add Image";
        newImageInput.required = false;

        newImageField.appendChild(newImageInput);
        mediaGallery.appendChild(newImageField);
      } else {
        alert("You have reached the maximum limit of image fields (8).");
      }
    });
  });
}
