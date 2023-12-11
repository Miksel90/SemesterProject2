/**
 * Displays the loader by removing the "visually-hidden" class from the loader container.
 * @returns {void}
 */
export function showLoader() {
  const loaderContainer = document.getElementById("loaderContainer");
  if (loaderContainer) {
    loaderContainer.classList.remove("visually-hidden");
  }
}

/**
 * Hides the loader by adding the "visually-hidden" class to the loader container.
 * @returns {void}
 */
export function hideLoader() {
  const loaderContainer = document.getElementById("loaderContainer");
  if (loaderContainer) {
    loaderContainer.classList.add("visually-hidden");
  }
}
