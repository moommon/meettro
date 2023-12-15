(() => {
  let xpos = 0,
    ypos = 0,
    targ = null;
  let isDragging = false;
  let currentDropZone = null;

  let currentFontSize = 16; // 초기 폰트 크기 (예: 16px)
  const maxFontSize = 300; // 최대 폰트 크기 (예: 50px)
  const fontSizeIncrement = 2; // 폰트 크기를 증가시킬 간격 (예: 2px)
  // draggable 클래스를 가진 모든 DOM 요소 선택
  const drags = document.querySelectorAll(".draggable");

  // 모든 드래그 가능한 요소에 대한 드래그 이벤트 정의
  drags.forEach((drag) => {
    drag.addEventListener("dragstart", dragStart);
    drag.addEventListener("dragend", dragEnd);
  });

  const dropArea = document.querySelector(".drop-area");

  // 드롭 영역에 대한 드래그 이벤트 정의
  dropArea.addEventListener("drop", dragDrop);
  dropArea.addEventListener("dragover", dragOver);

  // drag start 이벤트 => 특정 객체를 드래그 하는 순간 해당 이벤트 발생.
  function dragStart(e) {
    if (isDragging) return;
    e.dataTransfer.setData("text/plain", e.target.textContent);
    this.className += " dragging";
    setTimeout(() => (this.className = "draggable"), 0);

    targ = e.target;

    xpos = e.clientX - targ.getBoundingClientRect().left;
    ypos = e.clientY - targ.getBoundingClientRect().top;
    targ.style.zIndex = 10;
  }

  function clonedDragStart(e) {
    if (isDragging) return;
    e.dataTransfer.setData("text/plain", e.target.textContent);
    this.className += " dragging";
    setTimeout(() => (this.className = "draggabled"), 0);

    targ = e.target;

    xpos = e.clientX - targ.getBoundingClientRect().left;
    ypos = e.clientY - targ.getBoundingClientRect().top;
    targ.style.zIndex = 10;
  }

  function dragDrop(e) {
    e.preventDefault();
    if (isDragging) return;
    isDragging = true;

    console.log(`tagClassList =>${targ.className}`);
    console.log("targ", targ);
    if (targ.className === "draggabled") {
      console.log("draggable 포함");
      // 이미 클론된 요소를 드롭 영역 내부에서 이동
      const x =
        e.clientX -
        xpos -
        e.target.closest(".drop-area").getBoundingClientRect().left;
      const y =
        e.clientY -
        ypos -
        e.target.closest(".drop-area").getBoundingClientRect().top;
      // const x = e.clientX - xpos - 92.5;
      // const y = e.clientY - ypos - 214.5;

      // console.log("e.client", e.clientX, e.clientY);
      // console.log("pos", xpos, ypos);
      console.log(
        "getBounding",
        e.target.getBoundingClientRect().left,
        e.target.getBoundingClientRect().top
      );
      // console.log("x,y", x, y);
      targ.style.left = x + "px";
      targ.style.top = y + "px";
      // if (currentDropZone === dropArea) {
      //   targ.style.left = x + "px";
      //   targ.style.top = y + "px";
      // }
    } else {
      console.log("draggable 포함 X");
      // 클론된 요소가 드롭 영역 내부로 이동
      const data = e.dataTransfer.getData("text/plain");

      const clonedElement = document.createElement("p");
      clonedElement.className = "draggabled";
      clonedElement.textContent = data;
      clonedElement.draggable = true;
      clonedElement.style.position = "absolute";

      const x =
        e.clientX -
        xpos -
        e.target.closest(".drop-area").getBoundingClientRect().left;
      const y =
        e.clientY -
        ypos -
        e.target.closest(".drop-area").getBoundingClientRect().top;
      // const x = e.clientX - xpos - 92.5;
      // const y = e.clientY - ypos - 214.5;

      clonedElement.style.left = x + "px";
      clonedElement.style.top = y + "px";

      dropArea.appendChild(clonedElement);
      clonedElement.addEventListener("dragstart", clonedDragStart); // 클론된 요소에 대한 드래그 이벤트 핸들러 추가
      clonedElement.addEventListener("dragend", dragEnd);
      clonedElement.addEventListener("wheel", (event) => {
        event.preventDefault(); // 기본 스크롤 동작을 막습니다.

        // 휠 이벤트의 deltaY 값에 따라 폰트 크기를 증가 또는 감소시킵니다.
        if (event.deltaY > 0) {
          // 휠을 아래로 스크롤할 때
          currentFontSize += fontSizeIncrement;
        } else {
          // 휠을 위로 스크롤할 때
          currentFontSize -= fontSizeIncrement;
        }
        // 최소 폰트 크기를 10으로 설정합니다.
        if (currentFontSize < 16) {
          currentFontSize = 16;
        }

        // 최대 폰트 크기를 초과하지 않도록 검사합니다.
        if (currentFontSize > maxFontSize) {
          currentFontSize = maxFontSize;
        }

        // 최소 폰트 크기를 설정하려면 추가적인 조건을 추가할 수 있습니다.

        // 현재 폰트 크기를 엘리먼트에 적용합니다.
        clonedElement.style.fontSize = currentFontSize + "px";

        // 휠 이벤트 발생 시 폰트 크기와 이벤트를 로그에 기록합니다.
        console.log("wheel event - 폰트 크기:", currentFontSize);
      });
    }

    isDragging = false;
    targ.style.zIndex = 1;
    currentDropZone = null;
  }

  function dragOver(e) {
    e.preventDefault();
    // 드롭 영역과 관련된 로직은 필요하다면 추가할 수 있음
  }

  function dragEnd() {
    isDragging = false;
    targ.style.zIndex = 1;

    // 객체가 드롭 영역 내에 있는지 확인
    const rect = dropArea.getBoundingClientRect();
    if (
      xpos >= rect.left &&
      xpos <= rect.right &&
      ypos >= rect.top &&
      ypos <= rect.bottom
    ) {
      currentDropZone = dropArea;
    } else {
      currentDropZone = null;
    }
  }
  function resetToInitialState() {
    // 모든 클론된 요소를 삭제
    const clonedElements = document.querySelectorAll(".draggabled");
    clonedElements.forEach((element) => {
      element.remove();
    });
  }
  const resetButton = document.querySelector("#profile_reset");
  resetButton.addEventListener("click", resetToInitialState);
})();
