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