document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // ELEMENTS
  // =========================
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

  const clouds = [];

  // =========================
  // CLOCK
  // =========================
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

  // =========================
  // MODAL
  // =========================
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

  // =========================
  // CLOUD VALIDATION
  // =========================
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

  // =========================
  // CLOUDS
  // =========================
  function generateCloudData() {
    return {
      id: Date.now(),
      title: elements.cloudTitleInput.value.trim(),
      desc: elements.cloudDescInput.value.trim(),
      top: Math.floor(Math.random() * 70) + 10,
      left: Math.floor(Math.random() * 70) + 10
    };
  }

  function createCloudNote(cloud) {
    const cloudNote = document.createElement("div");
    cloudNote.className = "cloud-note";
    cloudNote.style.top = `${cloud.top}%`;
    cloudNote.style.left = `${cloud.left}%`;

    const cloudTitle = document.createElement("h3");
    cloudTitle.textContent = cloud.title;

    const cloudDesc = document.createElement("p");
    cloudDesc.textContent = cloud.desc;

    cloudNote.append(cloudTitle, cloudDesc);

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

    console.log("New cloud:", cloudData);
    console.log("All clouds:", clouds);

    renderCloud(cloudData);
    closeModal();
  }

  // =========================
  // TEMP BUTTONS
  // =========================
  function handleDeleteClick() {
    console.log("Delete clicked");
  }

  function handleTodoClick() {
    console.log("To-do clicked");
  }

  // =========================
  // EVENTS
  // =========================
  elements.addCloudBtn.addEventListener("click", openModal);
  elements.cancelBtn.addEventListener("click", closeModal);
  elements.createCloudBtn.addEventListener("click", handleCreateCloud);
  elements.deleteCloudBtn.addEventListener("click", handleDeleteClick);
  elements.todoBtn.addEventListener("click", handleTodoClick);
  elements.cloudTitleInput.addEventListener("input", handleTitleInput);

  // =========================
  // STARTUP
  // =========================
  updateClock();
  setInterval(updateClock, 1000);
});