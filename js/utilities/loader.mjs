export function showLoader() {
  const loaderContainer = document.getElementById("loaderContainer");
  if (loaderContainer) {
    loaderContainer.classList.remove("visually-hidden");
  }
}

export function hideLoader() {
  const loaderContainer = document.getElementById("loaderContainer");
  if (loaderContainer) {
    loaderContainer.classList.add("visually-hidden");
  }
}
