export function showLoader() {
  const loaderContainer = document.getElementById("loaderContainer");
  loaderContainer.style.display = "flex";
}

export function hideLoader() {
  const loaderContainer = document.getElementById("loaderContainer");
  loaderContainer.style.display = "none";
}
