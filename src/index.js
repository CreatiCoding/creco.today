import showdown from "showdown";
import "./style.css";
import "github-markdown-css/github-markdown.css";

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

const url = window.location.href.replace(window.location.origin, "");
const alias = url.split("/")[1];
const path = url.replace(`/${alias}`, "");
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
  const result = document.querySelector("#app");
  result.classList.add("markdown-body");
  fetch(`${domain[alias || "main"]}${path || "/README.md"}`)
    .then((response) => response.text())
    .then((data) => {
      document.title =
        pathname
          .split("/")
          .filter((e) => e)
          .pop() || "Creco";
      result.innerHTML = sdconv.makeHtml(data);
    });
}
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
