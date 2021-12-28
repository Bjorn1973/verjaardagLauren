export default class Button {
  constructor(holder) {
    this.holder = holder;
    this.btn = null;
    this.init();
    this.render();
    this.events();
  }
  init() {
    this.holder.insertAdjacentHTML(
      "beforeend",
      `<button class='particles-btn' data-particle='50' data-radius='700'>Klik hier</button>`
    );
    this.btn = document.querySelector(".particles-btn");
  }
  render() {}
  events() {
    this.btn.addEventListener("click", () => {
      let radius = parseInt(this.btn.getAttribute("data-radius"));
      let particles = this.btn.getAttribute("data-particle");

      for (let i = 0; i < particles; i++) {
        this.btn.insertAdjacentHTML(
          "beforeend",
          "<span class=particle></span>"
        );
      }

      this.btn.classList.add("active");
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
        particlesToRemove.forEach((el) => this.btn.removeChild(el));
        this.btn.classList.remove("active");
        this.btn.style.display = "none";
      }
    });
  }
}
