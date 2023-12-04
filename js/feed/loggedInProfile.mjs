import { profileInfo } from "./fetchLoggedInUser.mjs";

export function loggedInUser(data) {
  const loggedInBox = document.querySelector(".loggedInBox");
  loggedInBox.innerHTML = "";

  const profileContainer = document.createElement("div");
  profileContainer.classList.add(
    "d-flex",
    "flex-column",
    "flex-sm-row",
    "justify-content-evenly",
    "align-items-center"
  );
  profileContainer.id = profileInfo.id;

  const profileAvatar = document.createElement("img");
  profileAvatar.classList.add(
    "img-fluid",
    "rounded-circle",
    "border",
    "border-2",
    "border-secondary"
  );
  profileAvatar.style.width = "120px";

  if (data.avatar && data.avatar.trim() !== "") {
    profileAvatar.src = data.avatar;
    profileAvatar.alt = "Profile image of " + data.name;
  } else {
    profileAvatar.src = "/images/default-avatar.jpg";
    profileAvatar.alt = "Profile image of " + data.name;
  }

  const profileName = document.createElement("p");
  profileName.classList.add("text-primary", "fs-3", "margin-unset");
  const capitalizedFirstName =
    data.name.charAt(0).toUpperCase() + data.name.slice(1);

  profileName.innerText = capitalizedFirstName;

  const profileCredits = document.createElement("p");
  profileCredits.classList.add("text-primary", "fs-3", "margin-unset");
  profileCredits.innerText = "Credits: " + parseInt(data.credits, 10);

  const createAuctionButton = document.createElement("button");
  createAuctionButton.classList.add(
    "btn",
    "btn-primary",
    "border",
    "border-info",
    "text-white",
    "rounded",
    "p-2",
    "btn-lg"
  );

  createAuctionButton.innerText = "Create Auction";

  const createAuctionModal = document.getElementById("createAuctionModal");
  createAuctionButton.addEventListener("click", (e) => {
    e.preventDefault();
    createAuctionModal.classList.add("show");
    createAuctionModal.style.display = "block";
  });

  const closeCreateAuctionModal = document.getElementById("createAuctionModal");
  closeCreateAuctionModal.addEventListener("click", (e) => {
    if (
      e.target === closeCreateAuctionModal ||
      e.target.classList.contains("btn-close")
    ) {
      closeCreateAuctionModal.classList.remove("show");
      closeCreateAuctionModal.style.display = "none";
    }
  });

  profileContainer.appendChild(profileAvatar);
  profileContainer.appendChild(profileName);
  profileContainer.appendChild(profileCredits);
  profileContainer.append(createAuctionButton);

  loggedInBox.append(profileContainer);
}
