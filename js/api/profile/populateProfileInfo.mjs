import { profileInfo } from "./profileInfo.mjs";

export function populateProfile(json) {
  const profileBox = document.querySelector(".profileBox");

  const profileContainer = document.createElement("div");
  profileContainer.classList.add(
    "bg-success",
    "text-center",
    "p-2",
    "d-flex",
    "flex-column",
    "justify-content-between",
    "align-items-center"
  );
  profileContainer.id = profileInfo.id;

  const profileAvatar = document.createElement("img");
  profileAvatar.classList.add("img-fluid", "rounded-circle", "p-1");
  profileAvatar.style.width = "100px";

  if (json.avatar && json.avatar.trim() !== "") {
    profileAvatar.src = json.avatar;
    profileAvatar.alt = "Profile image of " + json.name;
  } else {
    profileAvatar.src = "/images/default-avatar.jpg";
    profileAvatar.alt = "Profile image of " + json.name;
  }
  profileContainer.append(profileAvatar);

  const profileName = document.createElement("h1");
  profileName.classList.add("text-white", "bolder", "display-1");
  const capitalizedFirstName =
    json.name.charAt(0).toUpperCase() + json.name.slice(1);

  profileName.innerText = capitalizedFirstName;
  profileContainer.append(profileName);

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

  profileContainer.appendChild(editButton);

  profileBox.append(profileContainer);
}
