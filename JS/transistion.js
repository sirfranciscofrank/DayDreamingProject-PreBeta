const startBtn = document.querySelector(".start-btn");
const hero = document.querySelector(".hero");

startBtn.addEventListener("click", () => {
  hero.classList.add("zooming");

  setTimeout(() => {
    // go to next page or show app board
    window.location.href = "loading.html";
  }, 1800);
});