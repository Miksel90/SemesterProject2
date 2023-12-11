/**
 * Sets up scroll behavior for a "back to top" button.
 * It attaches an event listener to the window scroll event to toggle the button's visibility.
 * Additionally, it adds a click event listener to the "back-to-up" button, scrolling to the top of the page smoothly when clicked.
 * @returns {void}
 */
export function setupScrollBehavior() {
  window.onscroll = () => {
    toggleTopButton();
  };

  document.getElementById("back-to-up").addEventListener("click", scrollToTop);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /**
   * Toggles the visibility of a "back to top" button based on the scroll position of the document.
   * If the scroll position is greater than 30 pixels, the button is displayed; otherwise, it is hidden.
   * The function specifically targets an element with the ID "back-to-up" for toggling visibility.
   * @returns {void}
   */
  function toggleTopButton() {
    if (
      document.body.scrollTop > 30 ||
      document.documentElement.scrollTop > 30
    ) {
      document.getElementById("back-to-up").classList.remove("d-none");
    } else {
      document.getElementById("back-to-up").classList.add("d-none");
    }
  }
}
