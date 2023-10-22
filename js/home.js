let canvasWidth = window.innerWidth;

const canvas = document.getElementById("home-canvas");
canvas.width = canvasWidth;
canvas.height = 1600;

window.onresize = function (event) {
  canvas.width = window.innerWidth;
  backImg.src = "/images/ground.png";
  backImg.onload = function () {
    context.drawImage(backImg, 0, 0, canvas.width, canvas.height);
  };
};

let start_background_color = "white";
let context = canvas.getContext("2d");
context.fillStyle = start_background_color;
context.fillRect(0, 0, canvas.width, canvas.height);

let backImg = new Image();
backImg.src = "/images/ground.png";
backImg.onload = function () {
  // 이미지가 로드된 후에 실행됩니다.
  // 이미지를 화면에 그리거나 배경 이미지로 설정할 수 있습니다.
  // 이 예제에서는 이미지를 배경으로 설정합니다.
  context.drawImage(backImg, 0, 0, canvas.width, canvas.height);
};

let is_drawing = false;

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mouseover", start, false);
canvas.addEventListener("mousemove", draw, false);

function start(event) {
  is_drawing = true;

  context.beginPath();
  context.moveTo(
    event.clientX - canvas.offsetLeft,
    event.pageY - canvas.offsetTop
  );
  event.preventDefault();
}

function draw(event) {
  if (is_drawing) {
    context.lineTo(
      event.clientX - canvas.offsetLeft,
      event.pageY - canvas.offsetTop
    );
    context.strokeStyle = "#222";
    context.lineWidth = "50";
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }

  //   console.log(event.clientX - canvas.offsetLeft, event.clientY + 800);

  //   event.preventDefault();
}
console.log(canvasWidth);
