((_) => {
  let xpos = 0,
    ypos = 0,
    targ = null;

  // draggable 클래스를 가진 모든 DOM 요소 선택
  const drags = document.querySelectorAll(".draggable");

  // 모든 드래그 가능한 요소에 대한 드래그 이벤트 정의
  drags.forEach((drag) => {
    drag.addEventListener("dragstart", dragStart);
    drag.addEventListener("dragend", dragEnd);
  });

  const drop = document
    .querySelector(".drop-area")
    .addEventListener("drop", dragDrop);
  const dover = document
    .querySelector(".drop-area")
    .addEventListener("dragover", dragOver);

  function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.textContent);
    this.className += " dragging";
    setTimeout(() => (this.className = "draggable"), 0);

    targ = e.target;

    xpos = e.clientX - targ.getBoundingClientRect().left;
    ypos = e.clientY - targ.getBoundingClientRect().top;
    targ.style.zIndex = 10;
  }

  function dragDrop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");

    // 복제된 객체 생성
    const clonedElement = document.createElement("div");
    clonedElement.className = "draggable";
    clonedElement.textContent = data;
    clonedElement.draggable = true;
    clonedElement.style.position = "absolute";
    clonedElement.style.left =
      e.clientX -
      document.querySelector(".drop-area").getBoundingClientRect().left +
      "px";
    clonedElement.style.top =
      e.clientY -
      document.querySelector(".drop-area").getBoundingClientRect().top +
      "px";
    // 드롭 영역에 복제된 객체 추가
    document.querySelector(".drop-area").appendChild(clonedElement);
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnd() {
    targ.style.zIndex = 1;
  }
})();
