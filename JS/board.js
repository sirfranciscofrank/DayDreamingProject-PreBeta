// TIMER LOGIC
document.addEventListener("DOMContentLoaded", () => { // wait until all HTML is loaded before running this code
  function showTime() { // function that gets the current time and shows it on screen
    const now = new Date(); // create a Date object with the current date and time

    const day = now.getDate(); // get day of the month, like 1-31
    const month = now.getMonth(); // get month index, 0 = Jan, 11 = Dec
    const year = now.getFullYear(); // get full year, like 2026
    const weekday = now.getDay(); // get weekday index, 0 = Sunday, 6 = Saturday

    const hours = String(now.getHours()).padStart(2, "0"); // get hours and force 2 digits, like 09
    const minutes = String(now.getMinutes()).padStart(2, "0"); // get minutes and force 2 digits
    const seconds = String(now.getSeconds()).padStart(2, "0"); // get seconds and force 2 digits

    const days = [ // array of weekday names
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday"
    ];

    const months = [ // array of month names
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const formattedTime = `${days[weekday]}, ${day} ${months[month]} ${year}, ${hours}:${minutes}:${seconds}`; 
    // build a readable string like: Wednesday, 1 Apr 2026, 09:25:03

    const timestampText = document.querySelector(".timestamp-text"); // select the element that displays the clock
    if (timestampText) { // make sure that element exists before changing it
      timestampText.textContent = formattedTime; // put the formatted time inside the element
    }
  }

  showTime(); // run once immediately so user sees time right away
  setInterval(showTime, 1000); // run showTime every 1000ms = every 1 second
});


// CLOUD CONTROL LOGIC
const addCloudBtn = document.getElementById("addCloudBtn"); // select Add Cloud button
const deleteCloudBtn = document.getElementById("deleteCloudBtn"); // select Delete button
const todoBtn = document.getElementById("todoBtn"); // select To-do button

const cloudContainer = document.getElementById("cloudContainer"); // select container where cloud notes will be placed
const cloudModal = document.getElementById("cloudModal"); // select modal popup
const createCloudBtn = document.getElementById("createCloudBtn"); // select Create button inside modal
const cancelBtn = document.getElementById("cancelBtn"); // select Cancel button inside modal

const cloudTitleInput = document.getElementById("cloudTitle"); // select title input field
const cloudDescInput = document.getElementById("cloudDesc"); // select description textarea field

const clouds = []; // array to store all cloud data objects

addCloudBtn.addEventListener("click", openModal); // when Add button is clicked, open modal
cancelBtn.addEventListener("click", closeModal); // when Cancel is clicked, close modal
createCloudBtn.addEventListener("click", handleCreateCloud); // when Create is clicked, make a new cloud

deleteCloudBtn.addEventListener("click", () => { // temporary test event for delete button
  console.log("Delete clicked"); // log to console for now
});

todoBtn.addEventListener("click", () => { // temporary test event for todo button
  console.log("To-do clicked"); // log to console for now
});

function openModal() { // function to show the modal
  cloudModal.classList.remove("hidden"); // remove hidden class so modal appears
}

function closeModal() { // function to hide the modal
  cloudModal.classList.add("hidden"); // add hidden class so modal disappears
  resetModalInputs(); // clear the input fields after closing
}

function resetModalInputs() { // function to clear modal inputs
  cloudTitleInput.value = ""; // empty title input
  cloudDescInput.value = ""; // empty description input
}

function handleCreateCloud() { // function that runs when user clicks Create
  const title = cloudTitleInput.value.trim(); // get title input text and remove extra spaces
  const desc = cloudDescInput.value.trim(); // get description input text and remove extra spaces

  if (!title) { // if title is empty
    alert("Please enter a title"); // show warning message
    return; // stop the function so no cloud is created
  }

  const cloudData = { // create one object to store this cloud's data
    id: Date.now(), // unique id based on current timestamp
    title: title, // save title text
    desc: desc, // save description text
    top: Math.floor(Math.random() * 70) + 10, // random top position from 10 to 79
    left: Math.floor(Math.random() * 70) + 10 // random left position from 10 to 79
  };

  clouds.push(cloudData); // add this cloud object into the clouds array

  console.log("New cloud:", cloudData); // show the new cloud object in console
  console.log("All clouds:", clouds); // show the whole clouds array in console

  const cloudElement = createCloudNote(cloudData); // turn cloud data into a real HTML element
  cloudContainer.appendChild(cloudElement); // place that element inside cloudContainer on the page

  closeModal(); // close modal after creating cloud
}

function createCloudNote(cloud) { // function that creates one cloud HTML element
  const cloudNote = document.createElement("div"); // create a new div for the cloud
  cloudNote.classList.add("cloud-note"); // add cloud-note class for styling

  const cloudTitle = document.createElement("h3"); // create title element
  cloudTitle.textContent = cloud.title; // put cloud title text into h3

  const cloudDesc = document.createElement("p"); // create description element
  cloudDesc.textContent = cloud.desc || "No description"; // use cloud description, or fallback text if empty

  cloudNote.style.position = "absolute"; // make cloud position absolute
  cloudNote.style.top = `${cloud.top}%`; // place cloud vertically using top value
  cloudNote.style.left = `${cloud.left}%`; // place cloud horizontally using left value

  cloudNote.appendChild(cloudTitle); // put title inside cloud note
  cloudNote.appendChild(cloudDesc); // put description under title inside cloud note

  return cloudNote; // send the finished cloud element back
}