import showdown from "showdown";
import "./style.css";
import Profile from "./profile.png";
import "./md.scss";
import hljs from "highlight.js";
import "highlight.js/scss/agate.scss";

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
};
function load() {
  var sdconv = new showdown.Converter({
    simplifiedAutoLink: true,
    strikethrough: true,
  });
  App.classList.add("markdown-body");
  path = path === "/" ? "/README.md" : path || "/README.md";
  let target = `${domain[alias || "main"]}${path}`;
  if (window.location.search.indexOf("test") !== -1) {
    target = domain["leetcode"] + "/day-01.md";
  }
  fetch(target)
    .then((response) => response.text())
    .then((data) => {
      document.title =
        pathname
          .split("/")
          .filter((e) => e)
          .pop() || "Creco";
      App.innerHTML = sdconv.makeHtml(data);
      hljs.highlightAll();
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
