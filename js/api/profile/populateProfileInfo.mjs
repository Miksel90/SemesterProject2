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
    "bg-success",
    "bg-opacity-25"
  );
  profileContainer.id = profileInfo.id;

  const profileDetails = document.createElement("div");
  profileDetails.classList.add("col-md-6");

  const profileAvatar = document.createElement("img");
  profileAvatar.classList.add(
    "img-fluid",
    "img-thumbnail",
    "d-none",
    "d-md-block"
  );
  profileAvatar.style.width = "300px";

  if (json.avatar && json.avatar.trim() !== "") {
    profileAvatar.src = json.avatar;
    profileAvatar.alt = "Profile image of " + json.name;
  } else {
    profileAvatar.src = "/images/default-avatar.jpg";
    profileAvatar.alt = "Profile image of " + json.name;
  }

  profileContainer.append(profileAvatar);
  profileContainer.appendChild(profileDetails);

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

  const profileName = document.createElement("p");
  profileName.classList.add("text-primary", "bolder", "fs-1");
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
    "d-block"
  );

  const li1 = document.createElement("li");
  li1.classList.add("text-primary", "fs-4");
  li1.innerText = "Credits: " + parseInt(json.credits, 10);

  const li2 = document.createElement("li");
  li2.classList.add("text-primary", "fs-4");
  li2.innerText = "Current Listings: " + json._count.listings;

  const li3 = document.createElement("li");
  li3.classList.add("text-primary", "fs-4");
  li3.innerText = "Auctions Won: " + json.wins.length;

  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);

  profileBody.appendChild(ul);

  profileDetails.appendChild(profileBody);

  const userInfoDetails = document.createElement("div");
  userInfoDetails.classList.add(
    "d-flex",
    "row",
    "justify-content-md-end",
    "justify-content-center",
    "gap-3"
  );

  const editButton = document.createElement("button");
  editButton.classList.add(
    "btn",
    "btn-primary",
    "border",
    "border-info",
    "text-white",
    "btn-sm",
    "rounded"
  );

  editButton.style.width = "100px";
  editButton.style.height = "50px";
  editButton.innerText = "Edit Profile";

  editButton.addEventListener("click", (e) => {
    e.preventDefault();

    const editModal = document.getElementById("editModal");
    editModal.classList.add("show");
    editModal.style.display = "block";
  });

  const closeEditModal = document.getElementById("editModal");
  closeEditModal.addEventListener("click", (e) => {
    if (
      e.target === closeEditModal ||
      e.target.classList.contains("btn-close")
    ) {
      closeEditModal.classList.remove("show");
      closeEditModal.style.display = "none";
    }
  });

  const createButton = document.createElement("button");
  createButton.classList.add(
    "btn",
    "btn-primary",
    "border",
    "border-info",
    "text-white",
    "btn-sm",
    "rounded"
  );

  createButton.style.width = "100px";
  createButton.style.height = "50px";
  createButton.innerText = "Create Auction";

  userInfoDetails.append(createButton);
  userInfoDetails.append(editButton);

  profileContainer.appendChild(userInfoDetails);

  profileBox.append(profileContainer);
}
