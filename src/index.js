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
  blog: "https://data.creco.today/blog",
};
const is404 =
  window.location.href !== "https://creco.today/" &&
  window.location.href !== "http://localhost:8080/" &&
  !domain[alias];
function loadComment() {
  const s = document.createElement("script");
  s.src = "https://utteranc.es/client.js";
  s.setAttribute("repo", "CreatiCoding/creco.today");
  s.setAttribute("issue-term", "pathname");
  s.setAttribute("label", "💬");
  s.setAttribute("theme", "github-light");
  s.setAttribute("crossorigin", "anonymous");
  s.setAttribute("async", true);
  document.body.appendChild(s);
}
async function getData() {
  path = path === "/" ? "/README.md" : path || "/README.md";
  if (is404) {
    path = "/404/README.md";
  }
  let target = `${domain[alias] || domain["main"]}${path}`;
  if (window.location.search.indexOf("test") !== -1) {
    target = domain["about"] + "/README.md";
  }
  const res = await fetch(target);
  const data = await res.text();
  if (data.indexOf("AccessDenied") !== -1) {
    if (target.split("").pop() === "/") {
      target += "README.md";
    } else {
      target += "/README.md";
    }
    const res = await fetch(target);
    const data = await res.text();
    return data;
  }
  return data;
}

async function load() {
  var sdconv = new showdown.Converter({
    simplifiedAutoLink: true,
    strikethrough: true,
    tables: true,
  });
  App.classList.add("markdown-body");

  const data = await getData();

  const title =
    pathname
      .split("/")
      .filter((e) => e)
      .pop() || "CRECO";
  const prefix = alias.toUpperCase() || "HOME";
  document.title = `${prefix} | ${title}`;
  App.innerHTML = sdconv.makeHtml(data);
  hljs.highlightAll();
  if (!is404) {
    loadComment();
  }
}

const Label = (className, html, fc) => {
  const el = document.createElement("div");
  el.innerHTML = html;
  el.className = className;
  el.onclick = fc;
  return el;
};
const ImageTag = (className, src, fc) => {
  const el = document.createElement("div");
  const image = new Image();
  image.src = src;
  el.append(image);
  el.className = className;
  el.onclick = fc;
  return el;
};

const Wrapper = document.createElement("div");
Wrapper.style = "max-width: 760px;margin: 0 auto;";

const LeftHeader = Label("", "", function () {});
const RightHeader = Label("share text", "About Me", function () {
  window.location.href = "https://creco.today/about";
});
LeftHeader.append(
  Label("home", "🏠", function () {
    window.location.href = "https://creco.today";
  }),
  ImageTag("profile", Profile, function () {
    window.location.href = "https://github.com/CreatiCoding";
  }),
  Label("name text ani-checkcheck", "CreatiCoding", function () {
    window.location.href = "https://creco.today";
  })
);
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
