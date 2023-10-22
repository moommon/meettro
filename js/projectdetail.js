// const groundEl = document.querySelector(".projectdetial-ground");

// function createGroundBlank() {
//   const createSpan = document.createElement("span");
//   createSpan();
// }

// createGroundBlank();

// 라인을 추가하는 함수
function addLine() {
  const line = document.createElement("span");
  // line.onclick = rotateLine();
  line.style.height = "50px";
  line.style.width = "50px";
  line.style.borderLeft = "2px solid #222222";
  line.style.marginRight = "10px";
  line.style.marginBottom = "10px";
  line.style.display = "inline-block";
  document.getElementById("ground-line-contianer").appendChild(line);
}

// 30개의 라인을 추가합니다.
for (let i = 0; i < 500; i++) {
  addLine();
}

// function rotateLine() {
//   const line = document.getElementById("ground-line-contianer");
//   line.style.transform = "rotate(90deg)";
// }
