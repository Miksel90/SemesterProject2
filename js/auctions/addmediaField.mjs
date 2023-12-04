export function initializeImageForm() {
  const addImageButton = document.querySelector(".addImageButton");
  const removeImageButton = document.querySelector(".removeImageButton");
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
      newImageInput.required = true;

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
}

export function editIMediaInputs() {
  const addImageButton = document.getElementById("editAddImageButton");
  const removeImageButton = document.getElementById("editRemoveImageButton");
  const imageEditMediaGallery = document.getElementById("editMediaGallery");
  const maxImageFields = 8;

  addImageButton.addEventListener("click", function () {
    if (imageEditMediaGallery.children.length < maxImageFields) {
      const newImageField = document.createElement("div");
      newImageField.classList.add("imageField");

      const newImageInput = document.createElement("input");
      newImageInput.type = "text";
      newImageInput.classList.add("form-control", "mt-2", "media-input");
      newImageInput.name = "media";
      newImageInput.placeholder = "Add Image";
      newImageInput.required = true;

      newImageField.appendChild(newImageInput);
      imageEditMediaGallery.appendChild(newImageField);
    } else {
      alert("You have reached the maximum limit of image fields (8).");
    }
  });

  removeImageButton.addEventListener("click", function () {
    const imageFields =
      imageEditMediaGallery.getElementsByClassName("imageField");
    if (imageFields.length > 0) {
      imageEditMediaGallery.removeChild(imageFields[imageFields.length - 1]);
    }
  });

  return { addImageButton, removeImageButton };
}
