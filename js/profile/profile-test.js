((_) => {
  let xpos = 0,
    ypos = 0,
    draggedClassName = null,
    targ = null;
  (isDragging = false), (currentDropZone = null);

  // draggable 클래스를 가진 모든 DOM 요소 선택
  const drags = document.querySelectorAll(".draggable");

  // 모든 드래그 가능한 요소에 대한 드래그 이벤트 정의
  drags.forEach((drag) => {
    drag.addEventListener("dragstart", dragStart);
    drag.addEventListener("dragend", dragEnd);
  });

  // // 클론된 요소들에 대해서 드래그 가능하도록 이벤트 정의
  // const dragedElement = document.querySelectorAll(".draggabled");

  // dragedElement.forEach((drag)=> {
  //   drag.addEventListener("dragstart",() => {

  //   });
  //   drag.addEventListener("dragend",() => {

  //   });
  // });

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

    // 드래그 중인 요소값을 저장
    draggedClassName = e.target.className;
    console.log(e.target.className);

    targ = e.target;

    xpos = e.clientX - targ.getBoundingClientRect().left;
    ypos = e.clientY - targ.getBoundingClientRect().top;
    targ.style.zIndex = 10;
  }

  function dragDrop(e) {
    e.preventDefault();
    if (isDragging) return;
    isDragging = true;

    console.log(`draggedClassName => ${draggedClassName}`);
    if (draggedClassName === "draggable dragging") {
      console.log("첫번째로 드래그 한 요소 ==> 클론");
      const data = e.dataTransfer.getData("text/plain");

      const clonedElement = document.createElement("p");
      clonedElement.className = "draggable";
      clonedElement.textContent = data;
      clonedElement.draggable = true;
      clonedElement.style.position = "absolute";

      const x = e.clientX - xpos - e.target.getBoundingClientRect().left;
      const y = e.clientY - ypos - e.target.getBoundingClientRect().top;

      clonedElement.style.left = x + "px";
      clonedElement.style.top = y + "px";

      dropArea.appendChild(clonedElement);
    } else {
      console.log(
        "중첩된 요소가 아니라 이미 클론된 요소이기 때문에 위치만 이동"
      );
      const x = e.clientX - xpos - e.target.getBoundingClientRect().left;
      const y = e.clientY - ypos - e.target.getBoundingClientRect().top;
      targ.style.left = x + "px";
      targ.style.top = y + "px";
    }

    // const data = e.dataTransfer.getData("text/plain");

    // const clonedElement = document.createElement("p");
    // clonedElement.className = "draggabled";
    // clonedElement.textContent = data;
    // clonedElement.draggable = true;
    // clonedElement.style.position = "absolute";

    // const x = e.clientX - xpos - e.target.getBoundingClientRect().left;
    // const y = e.clientY - ypos - e.target.getBoundingClientRect().top;

    // clonedElement.style.left = x + "px";
    // clonedElement.style.top = y + "px";

    // dropArea.appendChild(clonedElement);
    draggedClassName = null; // 초기화
  }

  function dragOver(e) {
    console.log("drag Over");
    e.preventDefault();
    // const rect = dropArea.getBoundingClientRect();
    // const x = e.clientX - xpos - rect.left;
    // const y = e.clientY - ypos - rect.top;

    // 클론된 요소의 위치를 업데이트하여 드래그 앤 드롭을 처리
    // const clonedElement = document.querySelector(".draggabled");
    // if (clonedElement) {
    //   console.log("clonedElemnt");
    //   clonedElement.style.left = x + "px";
    //   clonedElement.style    .top = y + "px";
    // }

    // // 객체가 드롭 영역 내에 있는지 확인
    // if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
    //   currentDropZone = dropArea;
    // } else {
    //   currentDropZone = null;
    // }
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
      console.log("dropArea", dropArea);
      currentDropZone = dropArea;
    } else {
      console.log("dropArea null");
      currentDropZone = null;
    }
    console.log("Drag End");
  }
})();
