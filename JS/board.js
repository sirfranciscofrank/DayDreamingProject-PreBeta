document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    addCloudBtn: document.getElementById("addCloudBtn"),
    deleteCloudBtn: document.getElementById("deleteCloudBtn"),
    todoBtn: document.getElementById("todoBtn"),
    cloudContainer: document.getElementById("cloudContainer"),
    cloudModal: document.getElementById("cloudModal"),
    createCloudBtn: document.getElementById("createCloudBtn"),
    cancelBtn: document.getElementById("cancelBtn"),
    cloudTitleInput: document.getElementById("cloudTitle"),
    cloudDescInput: document.getElementById("cloudDesc"),
    timestampText: document.querySelector(".timestamp-text")
  };

  let clouds = loadClouds();
  let isDeleteMode = false;

  // ── LocalStorage helpers ──────────────────────────────────────────
  function loadClouds() {
    try {
      return JSON.parse(localStorage.getItem("clouds")) || [];
    } catch {
      return [];
    }
  }

  function saveClouds() {
    localStorage.setItem("clouds", JSON.stringify(clouds));
  }
  // ─────────────────────────────────────────────────────────────────

  function updateClock() {
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

    const formattedTime =
      `${days[weekday]}, ${day} ${months[month]} ${year}, ${hours}:${minutes}:${seconds}`;

    if (elements.timestampText) {
      elements.timestampText.textContent = formattedTime;
    }
  }

  function openModal() {
    elements.cloudModal.classList.remove("hidden");
    resetTitleState();
    elements.cloudTitleInput.focus();
  }

  function closeModal() {
    elements.cloudModal.classList.add("hidden");
    resetModalInputs();
  }

  function resetModalInputs() {
    elements.cloudTitleInput.value = "";
    elements.cloudDescInput.value = "";
    resetTitleState();
  }

  function resetTitleState() {
    elements.cloudTitleInput.placeholder = "Enter title";
    elements.cloudTitleInput.classList.remove("input-error", "input-valid");
  }

  function showTitleError() {
    elements.cloudTitleInput.value = "";
    elements.cloudTitleInput.placeholder = "Title is required *";
    elements.cloudTitleInput.classList.add("input-error");
    elements.cloudTitleInput.classList.remove("input-valid");
    elements.cloudTitleInput.focus();
  }

  function showTitleValid() {
    elements.cloudTitleInput.placeholder = "Enter title";
    elements.cloudTitleInput.classList.remove("input-error");
    elements.cloudTitleInput.classList.add("input-valid");
  }

  function validateTitle() {
    const title = elements.cloudTitleInput.value.trim();

    if (!title) {
      showTitleError();
      return false;
    }

    showTitleValid();
    return true;
  }

  function handleTitleInput() {
    const title = elements.cloudTitleInput.value.trim();

    elements.cloudTitleInput.placeholder = "Enter title";

    if (!title) {
      elements.cloudTitleInput.classList.remove("input-error", "input-valid");
      return;
    }

    showTitleValid();
  }

  function generateCloudData() {
    return {
      id: Date.now(),
      title: elements.cloudTitleInput.value.trim(),
      desc: elements.cloudDescInput.value.trim(),
      top: Math.floor(Math.random() * 70) + 10,
      left: Math.floor(Math.random() * 70) + 10
    };
  }

  function deleteCloudById(cloudId, cloudElement) {
    const cloudIndex = clouds.findIndex(cloud => cloud.id === cloudId);

    if (cloudIndex !== -1) {
      clouds.splice(cloudIndex, 1);
      saveClouds(); // persist deletion
    }

    cloudElement.remove();
  }

  function createCloudNote(cloud) {
    const cloudNote = document.createElement("div");
    cloudNote.className = "cloud-note";
    cloudNote.dataset.id = cloud.id;
    cloudNote.style.top = `${cloud.top}%`;
    cloudNote.style.left = `${cloud.left}%`;

    const cloudTitle = document.createElement("h3");
    cloudTitle.textContent = cloud.title;

    const cloudDesc = document.createElement("p");
    cloudDesc.textContent = cloud.desc;

    cloudNote.append(cloudTitle, cloudDesc);

    cloudNote.addEventListener("click", () => {
      if (!isDeleteMode) return;

      deleteCloudById(cloud.id, cloudNote);
    });

    return cloudNote;
  }

  function renderCloud(cloud) {
    const cloudElement = createCloudNote(cloud);
    elements.cloudContainer.appendChild(cloudElement);
  }

  function handleCreateCloud() {
    if (!validateTitle()) return;

    const cloudData = generateCloudData();
    clouds.push(cloudData);
    saveClouds(); // persist new cloud

    renderCloud(cloudData);
    closeModal();
  }

  function handleDeleteClick() {
    isDeleteMode = !isDeleteMode;

    elements.deleteCloudBtn.classList.toggle("active-delete", isDeleteMode);
    elements.cloudContainer.classList.toggle("delete-mode", isDeleteMode);
  }

  function handleTodoClick() {
    alert("🚧 To-do feature is coming soon!");
  }

  elements.addCloudBtn.addEventListener("click", openModal);
  elements.cancelBtn.addEventListener("click", closeModal);
  elements.createCloudBtn.addEventListener("click", handleCreateCloud);
  elements.deleteCloudBtn.addEventListener("click", handleDeleteClick);
  elements.todoBtn.addEventListener("click", handleTodoClick);
  elements.cloudTitleInput.addEventListener("input", handleTitleInput);

  // Render any clouds saved from a previous session
  clouds.forEach(renderCloud);

  updateClock();
  setInterval(updateClock, 1000);
});