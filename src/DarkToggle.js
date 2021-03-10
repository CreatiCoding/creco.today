import "./DarkToggle.scss";
export default class DarkToggle {
  constructor({ $target }) {
    this.$target = $target;
    this.render();
  }
  render() {
    this.$target.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <g fill="none" stroke-width="2">
        <path 
          d="M36.4 20.4a16 16 0 1 0 16 16 16 16 0 0 0-16-16zm0 28a12 12 0 0 1-10.3-5.8l2.5.3A13.7 13.7 0 0 0 42 25.8a12 12 0 0 1-5.6 22.6z" 
          fill="#202020">
        </path>
        <path 
          d="M36.4 16.4a2 2 0 0 0 2-2v-8a2 2 0 1 0-4 0v8a2 2 0 0 0 2 2zm-20 20a2 2 0 0 0-2-2h-8a2 2 0 0 0 0 4h8a2 2 0 0 0 2-2zm3-14.1a2 2 0 0 0 2.8-2.8l-5.7-5.7a2 2 0 0 0-2.8 2.8zM59 13.8a2 2 0 0 0-2.8 0l-5.7 5.7a2 2 0 1 0 2.8 2.8l5.7-5.7a2 2 0 0 0 0-2.8zM19.4 50.5l-5.7 5.7a2 2 0 1 0 2.9 2.8l5.7-5.7a2 2 0 1 0-2.8-2.8z" 
          fill="#202020">
        </path>
      </g>
    </svg>
  `;
    this.$target.addEventListener("click", function () {
      if (document.body.classList.contains("dark")) {
        document.body.classList.remove("dark");
      } else {
        document.body.classList.add("dark");
      }
    });
  }
}
