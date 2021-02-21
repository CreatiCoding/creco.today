import showdown from "showdown";
import "./style.css";
import Profile from "./profile.png";
import "./md.scss";
import hljs from "highlight.js";
import "highlight.js/scss/agate.scss";
import "./gtag.js";
if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}
const App = document.querySelector("#app");
const Header = document.querySelector("#header");
const url = window.location.href.replace(window.location.origin, "");
const alias = url.split("/")[1];
let path = url.replace(`/${alias}`, "");
const pathname = window.location.pathname;
const domain = {
  leetcode: "https://data.creco.today/DailyLeetCodeJS",
  main: "https://data.creco.today/CreatiCoding",
  about: "https://data.creco.today/about",
};
function loadComment() {
  document.body.innerHTML += `<script
      src="https://utteranc.es/client.js"
      repo="CreatiCoding/creco.today"
      issue-term="pathname"
      label="💬"
      theme="github-light"
      crossorigin="anonymous"
      async
    ></script>`;
}
function load() {
  var sdconv = new showdown.Converter({
    simplifiedAutoLink: true,
    strikethrough: true,
    tables: true,
  });
  App.classList.add("markdown-body");
  path = path === "/" ? "/README.md" : path || "/README.md";

  if (!domain[alias]) {
    path = "/404/README.md";
  }
  let target = `${domain[alias] || domain["main"]}${path}`;
  if (window.location.search.indexOf("test") !== -1) {
    target = domain["leetcode"] + "/day-01.md";
  }
  fetch(target)
    .then((response) => response.text())
    .then((data) => {
      const title =
        pathname
          .split("/")
          .filter((e) => e)
          .pop() || "CRECO";
      const prefix = alias.toUpperCase() || "HOME";
      document.title = `${prefix} | ${title}`;
      App.innerHTML = sdconv.makeHtml(data);
      hljs.highlightAll();
      if (domain[alias]) {
        loadComment();
      }
    });
}

const profile = new Image();
profile.src = Profile;
const Label = (className, html, fc) => {
  const el = document.createElement("div");
  el.innerHTML = html;
  el.className = className;
  el.onclick = fc;
  return el;
};
const Wrapper = document.createElement("div");
Wrapper.style = "max-width: 760px;margin: 0 auto;";
const LeftHeader = Label("", "", function () {
  window.location.href = "https://github.com/CreatiCoding";
});
const RightHeader = Label("share text", "Hello", function () {});
LeftHeader.append(profile, Label("name text", "CreatiCoding"));
Header.appendChild(Wrapper).append(LeftHeader, RightHeader);

load();
window.addEventListener(
  "hashchange",
  function () {
    load();
    window.scroll(0, 0);
  },
  false
);

// if (module.hot) {
//   module.hot.accept("./print.js", function () {
//     console.log("Accepting the updated printMe module!");
//     printMe();
//   });
// }
