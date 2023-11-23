import { profileInfo } from "./profileInfo.mjs";

export function populateProfile(json) {
  const profileBox = document.querySelector(".profileBox");

  const profileContainer = document.createElement("div");
  profileContainer.classList.add(
    "p-2",
    "bg-success",
    "border",
    "border-primary"
  );
  profileContainer.id = profileInfo.id;

  const profileDetails = document.createElement("div");
  profileContainer.appendChild(profileDetails);

  const profileBody = document.createElement("div");
  profileBody.classList.add(
    "d-flex",
    "justify-content-around",
    "align-items-center",
    "mb-3",
    "fs-1",
    "mt-3"
  );

  const profileAvatar = document.createElement("img");
  profileAvatar.classList.add(
    "img-fluid",
    "rounded-circle",
    "border",
    "border-primary",
    "border-2",
    "p-1",
    "d-md-none"
  );
  profileAvatar.style.width = "100px";

  if (json.avatar && json.avatar.trim() !== "") {
    profileAvatar.src = json.avatar;
    profileAvatar.alt = "Profile image of " + json.name;
  } else {
    profileAvatar.src = "/images/default-avatar.jpg";
    profileAvatar.alt = "Profile image of " + json.name;
  }

  const profileName = document.createElement("p");
  profileName.classList.add("text-white", "bolder", "fs-sm-2", "fs-md-1");
  const capitalizedFirstName =
    json.name.charAt(0).toUpperCase() + json.name.slice(1);

  profileName.innerText = capitalizedFirstName;

  profileBody.append(profileAvatar);
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
  li1.classList.add("text-white", "fs-4");
  li1.innerText = "Credits: " + parseInt(json.credits, 10);

  const li2 = document.createElement("li");
  li2.classList.add("text-white", "fs-4");
  li2.innerText = "Current Listings: " + json._count.listings;

  const li3 = document.createElement("li");
  li3.classList.add("text-white", "fs-4");
  li3.innerText = "Auctions Won: " + json.wins.length;

  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);

  profileContainer.appendChild(ul);

  profileDetails.appendChild(profileBody);

  const userInfoDetails = document.createElement("div");
  userInfoDetails.classList.add("d-flex", "row", "justify-content-center");

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

  userInfoDetails.append(editButton);

  profileContainer.appendChild(userInfoDetails);

  profileBox.append(profileContainer);

  const bannerImage = document.querySelector(".bannerImage");

  const largeAvatar = document.createElement("img");
  largeAvatar.classList.add("img-fluid", "border", "border-primary");
  largeAvatar.style.width = "1000px";
  largeAvatar.style.height = "296px";

  if (json.avatar && json.avatar.trim() !== "") {
    largeAvatar.src = json.avatar;
    largeAvatar.alt = "Profile image of " + json.name;
  } else {
    largeAvatar.src = "/images/default-avatar.jpg";
    largeAvatar.alt = "Profile image of " + json.name;
  }

  bannerImage.append(largeAvatar);
}
