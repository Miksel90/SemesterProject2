import { profileInfo } from "./profileInfo.mjs";

export function populateProfile(json) {
  const profileBox = document.querySelector(".profileBox");

  const profileContainer = document.createElement("div");
  profileContainer.classList.add(
    "p-1",
    "border",
    "border-secondary",
    "row",
    "justify-content-evenly",
    "profileBanner"
  );
  profileContainer.id = profileInfo.id;

  const profileDetails = document.createElement("div");
  profileDetails.classList.add("col-md-6");

  const profileAvatarContainer = document.createElement("div");
  profileAvatarContainer.classList.add(
    "col-md-6",
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );

  const profileAvatar = document.createElement("img");
  profileAvatar.classList.add(
    "img-fluid",
    "object-fit-cover",
    "rounded-circle",
    "border",
    "border-2",
    "border-secondary",
    "d-none",
    "d-md-block",
    "mt-2"
  );
  profileAvatar.style.width = "200px";

  if (json.avatar && json.avatar.trim() !== "") {
    profileAvatar.src = json.avatar;
    profileAvatar.alt = "Profile image of " + json.name;
  } else {
    profileAvatar.src = "/images/default-avatar.jpg";
    profileAvatar.alt = "Profile image of " + json.name;
  }

  profileAvatarContainer.appendChild(profileAvatar);
  profileContainer.append(profileAvatarContainer);

  const profileBody = document.createElement("div");
  profileBody.classList.add(
    "d-flex",
    "flex-column",
    "justify-content-around",
    "align-items-center",
    "mb-3",
    "fs-1",
    "mt-3"
  );

  const profileName = document.createElement("h1");
  profileName.classList.add(
    "text-white",
    "bolder",
    "fs-1",
    "custom-text",
    "bg-dark",
    "bg-opacity-10"
  );
  const capitalizedFirstName =
    json.name.charAt(0).toUpperCase() + json.name.slice(1);

  profileName.innerText = capitalizedFirstName;
  profileBody.append(profileName);

  const ul = document.createElement("ul");
  ul.classList.add(
    "list-unstyled",
    "mt-2",
    "fs-5",
    "ms-md-5",
    "p-1",
    "d-block",
    "text-white",
    "custom-text",
    "bg-dark",
    "bg-opacity-10"
  );

  const li1 = document.createElement("li");
  li1.classList.add("fs-4");
  li1.innerText = "Credits: " + parseInt(json.credits, 10);

  const li2 = document.createElement("li");
  li2.classList.add("fs-4");
  li2.innerText = "Listings: " + json._count.listings;

  const li3 = document.createElement("li");
  li3.classList.add("fs-4");
  li3.innerText = "Auctions Won: " + json.wins.length;

  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);

  profileBody.appendChild(ul);

  profileDetails.appendChild(profileBody);

  profileContainer.appendChild(profileDetails);

  const userInfoDetails = document.createElement("div");
  userInfoDetails.classList.add(
    "d-flex",
    "row",
    "justify-content-md-end",
    "justify-content-center",
    "gap-3"
  );

  const editAvatarButton = document.createElement("button");
  editAvatarButton.classList.add(
    "btn",
    "btn-primary",
    "border",
    "border-secondary",
    "text-white",
    "btn-sm",
    "rounded"
  );

  editAvatarButton.style.width = "100px";
  editAvatarButton.style.height = "50px";
  editAvatarButton.innerText = "Edit Avatar";

  editAvatarButton.addEventListener("click", (e) => {
    e.preventDefault();

    const editModal = document.getElementById("editAvatarModal");
    editModal.classList.add("show");
    editModal.style.display = "block";
  });

  const closeEditModal = document.getElementById("editAvatarModal");
  closeEditModal.addEventListener("click", (e) => {
    if (
      e.target === closeEditModal ||
      e.target.classList.contains("btn-close")
    ) {
      closeEditModal.classList.remove("show");
      closeEditModal.style.display = "none";
    }
  });

  const createAuctionButton = document.createElement("button");
  createAuctionButton.classList.add(
    "btn",
    "btn-primary",
    "border",
    "border-secondary",
    "text-white",
    "btn-sm",
    "rounded"
  );

  createAuctionButton.style.width = "100px";
  createAuctionButton.style.height = "50px";
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

  userInfoDetails.append(createAuctionButton);
  userInfoDetails.append(editAvatarButton);

  profileContainer.appendChild(userInfoDetails);

  profileBox.append(profileContainer);
}
