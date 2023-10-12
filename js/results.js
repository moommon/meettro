import { results, testtypes } from "./data.js";

const testtype = new URLSearchParams(location.search).get("testtype");
console.log(testtype);
const result = results[testtypes[testtype]];

const titleEl = document.querySelector(".page-title");
const toolEl = document.querySelector(".page-tool");
const characterEl = document.querySelector(".tool-img");
const boxEls = document.querySelectorAll(".box");
const jobEls = document.querySelectorAll(".job");
const lectureEl = document.querySelector(".lecture");
const lectureImgEl = document.querySelector(".lecture img");

titleEl.innerHTML = result.title;
toolEl.innerHTML = result.tool;
characterEl.src = result.character;
boxEls.forEach(function (boxEl, index) {
  boxEl.innerHTML = result.results[index];
});
jobEls.forEach(function (jobEl, index) {
  jobEl.innerHTML = result.jobs[index];
});
lectureEl.href = result.lectureUrl;
lectureImgEl.src = result.lectureImg;
