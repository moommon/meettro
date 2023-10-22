const button = document.querySelector("button");
const area = document.querySelector(".drop-area");
const draggableElements = document.querySelectorAll(".draggable");

button.addEventListener("click", (event) => {
  // draggable 요소들을 숨김
  draggableElements.forEach((element) => {
    element.style.display = "none";
  });
  // html2canvas 라이브러리로 area dom 영역을 캡쳐
  html2canvas(area).then(function (canvas) {
    // 캔버스에서 이미지 데이터 URL을 가져옴.
    var imageDataUrl = canvas.toDataURL("image/png");

    // 데이터 URL을 PNG 파일로 다운로드 => 임시(추후에 서버작업 하면 필요없음 )
    var a = document.createElement("a");
    a.href = imageDataUrl;
    a.download = "captured-image.png";
    a.click();

    // 캡처가 완료후 감춰놨던 요소들 다시 보이도록 설정 => 깜빡 거리는 이슈가 있긴함
    draggableElements.forEach((element) => {
      element.style.display = "block";
    });
  });
});
