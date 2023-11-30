export function initializeImageForm() {
  document.addEventListener("DOMContentLoaded", function () {
    const addImageButton = document.getElementById("addImageButton");
    const imageFieldsContainer = document.getElementById("mediaGallery");

    const maxImageFields = 8;

    addImageButton.addEventListener("click", function () {
      if (imageFieldsContainer.children.length < maxImageFields) {
        const newImageField = document.createElement("div");
        newImageField.classList.add("imageField");

        const newImageInput = document.createElement("input");
        newImageInput.type = "text";
        newImageInput.classList.add("form-control", "mt-2", "media-input");
        newImageInput.name = "media";
        newImageInput.placeholder = "Add Image";
        newImageInput.required = false;

        newImageField.appendChild(newImageInput);
        imageFieldsContainer.appendChild(newImageField);
      } else {
        alert("You have reached the maximum limit of image fields (8).");
      }
    });

    removeImageButton.addEventListener("click", function () {
      const imageFields =
        imageFieldsContainer.getElementsByClassName("imageField");
      if (imageFields.length > 0) {
        imageFieldsContainer.removeChild(imageFields[imageFields.length - 1]);
      }
    });
  });
}
