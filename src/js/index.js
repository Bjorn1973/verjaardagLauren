import "../css/style.scss";

const button = document.querySelector(".particles-btn");
const song = document.querySelector(".song");

button.addEventListener("click", () => {
  let radius = parseInt(button.getAttribute("data-radius"));
  let particles = button.getAttribute("data-particle");

  for (let i = 0; i < particles; i++) {
    button.insertAdjacentHTML("beforeend", "<span class=particle></span>");
  }

  button.classList.add("active");
  const children = [...document.querySelectorAll(".particle")];

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const from = {
    opacity: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  const to = () => ({
    opacity: 0,
    top: getRandomInt(-radius, +radius) + "px",
    left: getRandomInt(-radius, +radius) + "px",
    right: getRandomInt(-radius, +radius) + "px",
    bottom: getRandomInt(-radius, +radius) + "px",
  });

  const animations = children.map(
    (child) => child.animate([from, to()], 600).finished
  );

  Promise.all(animations).then(cleanUp.bind(this));

  function cleanUp() {
    const particlesToRemove = [...document.querySelectorAll(".particle")];
    particlesToRemove.forEach((el) => button.removeChild(el));
    button.classList.remove("active");
    button.style.display = "none";
  }
  function playAudio() {
    song.play();
  }
  playAudio();
});
