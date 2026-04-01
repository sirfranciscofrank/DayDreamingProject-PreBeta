//timer logic
document.addEventListener("DOMContentLoaded", () => {
  function showTime() {
    const now = new Date();

    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    const weekday = now.getDay();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const days = [
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday"
    ];

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const formattedTime = `${days[weekday]}, ${day} ${months[month]} ${year}, ${hours}:${minutes}:${seconds}`;

    const timestampText = document.querySelector(".timestamp-text");
    if (timestampText) {
      timestampText.textContent = formattedTime;
    }
  }

  showTime();
  setInterval(showTime, 1000);
});

// Cloud Control Logic
const addCloudBtn = document.getElementById("addCloudBtn");
const deleteCloudBtn = document.getElementById("deleteCloudBtn");
const todoBtn = document.getElementById("todoBtn");

const cloudContainer = document.getElementById("cloudContainer");
const cloudModal = document.getElementById("cloudModal");
const createCloudBtn = document.getElementById("createCloudBtn");
const cancelBtn = document.getElementById("cancelBtn");

const cloudTitleInput = document.getElementById("cloudTitle");
const cloudDescInput = document.getElementById("cloudDesc");

let cloudCount = 0;

addCloudBtn.addEventListener("click", openModal);
cancelBtn.addEventListener("click", closeModal);
createCloudBtn.addEventListener("click", handleCreateCloud);

deleteCloudBtn.addEventListener("click", () => {
  console.log("Delete clicked");
});

todoBtn.addEventListener("click", () => {
  console.log("To-do clicked");
});

function openModal() {
  cloudModal.classList.remove("hidden");
}

function closeModal() {
  cloudModal.classList.add("hidden");
  resetModalInputs();
}

function resetModalInputs() {
  cloudTitleInput.value = "";
  cloudDescInput.value = "";
}

function handleCreateCloud() {
  const title = cloudTitleInput.value.trim();
  const desc = cloudDescInput.value.trim();


  if (!title) {
    alert("Please enter a title");
    return;
  }

  cloudCount++;
  const newCloud = createCloudNote(cloudCount, title, desc);
  cloudContainer.appendChild(newCloud);

  closeModal();
}

function createCloudNote(count, title, desc) {
  const cloudNote = document.createElement("div");
  cloudNote.classList.add("cloud-note");

  const cloudTitle = document.createElement("h3");
  cloudTitle.textContent = title;

  const cloudDesc = document.createElement("p");
  cloudDesc.textContent = desc || `Cloud ${count}`;

  const randomTop = Math.floor(Math.random() * 70) + 10;
  const randomLeft = Math.floor(Math.random() * 70) + 10;

  cloudNote.style.position = "absolute";
  cloudNote.style.top = `${randomTop}%`;
  cloudNote.style.left = `${randomLeft}%`;

  cloudNote.appendChild(cloudTitle);

  return cloudNote;
}