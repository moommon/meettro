import { SECOND, SHOVEL_NUMBER } from "../constant/ground.js";
import {
  getConstantVowel,
  checkAngle,
  checkSecond,
} from "../constant/utils.js";
import { fetchData } from "../service/fetch.js";

//todo modal
const targetTime = document.querySelector(".target-time");
const todoText = document.querySelector("#todo-text");
const todoAddBtn = document.querySelector(".add-button");
const todoListContainer = document.querySelector("#todo-list");

// 땅, 삽 생성하기
const landBoxEl = document.querySelector(".land .inner");
const createSpace = document.createElement("div");
const createShovel = document.createElement("div");

createSpace.setAttribute("class", "space");
createShovel.setAttribute("class", "shovel");

for (let i = 0; i < SHOVEL_NUMBER; i++) {
  landBoxEl.appendChild(createSpace.cloneNode(true), null);
}

const spaceEls = document.querySelectorAll(".land .inner .space");
spaceEls.forEach((el) => {
  el.appendChild(createShovel.cloneNode(true), null);
});

// 삽의 상태 객체 생성
const shovelEls = document.querySelectorAll(".land .inner .space .shovel");
const shovelArr = [];
for (let i = 0; i < SHOVEL_NUMBER; i++) {
  shovelArr.push({
    id: i,
    stat: "standing", // standing ,digging
    angle: 0,
    second: 0,
    vacancy: true,
  });
}

const datas = {
  user_id: JSON.parse(localStorage.getItem("info")).id,
  project_id: JSON.parse(localStorage.getItem("info")).project_id,
};

const getTodo = await fetchData("project/getTodoList", "POST", datas);

const popUp = document.createElement("div");
popUp.setAttribute("class", "popUp");
const btnTodo = document.createElement("button");
btnTodo.innerHTML = "+";
btnTodo.style.backgroundColor = "transparent";
btnTodo.style.border = "none";
btnTodo.style.fontSize = "20px";

btnTodo.style.marginBottom = "20px";
btnTodo.setAttribute("class", "plusButton");
popUp.appendChild(btnTodo);

getTodo.data.forEach((item, index) => {
  const listItem = document.createElement("p");
  listItem.setAttribute("class", "listItem");
  listItem.innerHTML = item.todo;
  popUp.appendChild(listItem);
});

const modal = document.getElementById("todo_modal");
const closeButton = modal.querySelector(".close-button-todo");

function handleAddTodoList() {
  if (targetTime.value.trim() === "" || todoText.value.trim() === "") {
    alert("할 일과 목표시간을 모두 입력해주세요.");
    return;
  } else {
    const data = {
      user_id: JSON.parse(localStorage.getItem("info")).id,
      project_id: JSON.parse(localStorage.getItem("info")).project_id,
      todo: todoText.value,
      todo_time: targetTime.value,
    };
    // todoList 추가
    addTodoList("project/addTodoList", "POST", data);
  }
}

// 팝업 창 업데이트 함수
async function updatePopup() {
  // 기존의 팝업 창 내용 삭제
  while (popUp.firstChild) {
    popUp.removeChild(popUp.firstChild);
  }

  // 새로운 Todo 항목 추가
  const getTodo = await fetchData("project/getTodoList", "POST", datas);

  const btnTodo = document.createElement("button");
  btnTodo.innerHTML = "+";
  btnTodo.style.backgroundColor = "transparent";
  btnTodo.style.border = "none";
  btnTodo.style.fontSize = "30px";
  btnTodo.setAttribute("class", "plusButton");
  popUp.appendChild(btnTodo);

  getTodo.data.forEach((item, index) => {
    const listItem = document.createElement("p");
    listItem.setAttribute("class", "listItem");
    listItem.innerHTML = item.todo;
    popUp.appendChild(listItem);
  });
}

async function addTodoList(endpoint, method, object) {
  try {
    const responseData = await fetchData(endpoint, method, object);
    console.log("TodoList 추가 결과:", responseData.data);
    if (responseData.message) {
      console.log(" responseData.data", responseData.data);
      const list = responseData.data;
      const teamListPerson = document.createElement("div");
      teamListPerson.classList.add("team-list-person");

      const leftContent = document.createElement("div");
      leftContent.classList.add("left-content");
      leftContent.textContent = list.todo; // todo 값 추가
      teamListPerson.appendChild(leftContent);

      const rightContent = document.createElement("div");
      rightContent.classList.add("right-content");
      rightContent.textContent = `${list.todo_time}시간`; // todo_time 값 추가
      teamListPerson.appendChild(rightContent);

      todoListContainer.appendChild(teamListPerson);

      targetTime.value = "";
      todoText.value = "";

      updatePopup();
    }
  } catch (error) {
    console.error("TodoList 추가 에러:", error);
    throw error;
  }
}

// modal list 제거
function delList() {
  const teamListPersonElements = document.querySelectorAll(".team-list-person");
  // 각 요소를 제거
  teamListPersonElements.forEach((element) => {
    element.remove();
  });
}

// todolist 호출
async function getProjectTodoList(endpoint, method) {
  const data = {
    user_id: JSON.parse(localStorage.getItem("info")).id,
    project_id: JSON.parse(localStorage.getItem("info")).project_id,
  };
  try {
    const getTodoList = await fetchData(endpoint, method, data);
    if (getTodoList.message) {
      getTodoList.data.forEach((item) => {
        const teamListPerson = document.createElement("div");
        teamListPerson.classList.add("team-list-person");

        const leftContent = document.createElement("div");
        leftContent.classList.add("left-content");
        leftContent.textContent = item.todo; // todo 값 추가
        teamListPerson.appendChild(leftContent);

        const rightContent = document.createElement("div");
        rightContent.classList.add("right-content");
        rightContent.textContent = `${item.todo_time}시간`; // todo_time 값 추가
        teamListPerson.appendChild(rightContent);

        todoListContainer.appendChild(teamListPerson);
      });
    }
  } catch (error) {
    console.error("todolist 호출 에러");
    throw error;
  }
}

btnTodo.addEventListener("click", function (e) {
  e.stopPropagation();
  modal.classList.add("show-modal-todo");
  popUp.style.display = "none"; // popUp 숨기기
  getProjectTodoList("project/getTodoList", "POST");
});

closeButton.addEventListener("click", function () {
  modal.classList.remove("show-modal-todo");
  popUp.style.display = "block"; // popUp 보이기
  delList();
});

todoAddBtn.addEventListener("click", handleAddTodoList);

// 리스트 클릭 시 글자생성 후 땅파기 시작
const onClickPopUpList = (spaceIndex) => {
  const popUpListEls = document.querySelectorAll(".popUp .listItem");
  let letter;
  popUpListEls.forEach((popUpListEl) => {
    popUpListEl.addEventListener("click", (e) => {
      e.stopPropagation();
      letter = getConstantVowel(e.target.innerHTML);
      const res = document.createElement("p");
      res.setAttribute("class", "letter");
      res.innerHTML = letter;
      spaceEls[spaceIndex].removeChild(popUp);
      spaceEls[spaceIndex].appendChild(res);
      clickDiggingLands();
    });
  });
};

// 각각의 벽 넘어뜨리기
let timeoutID = null;
let isFirstCheck = true;

let curTime = 0;
const startDigging = (index) => {
  let shovelEl = shovelEls[index];
  let shovelVal = shovelArr[index];

  if (!isFirstCheck) {
    if (checkAngle(shovelEl)) shovelVal.angle = checkAngle(shovelEl);
    shovelVal.second = checkSecond(shovelVal.angle);
    curTime = shovelVal.second;
  }
  isFirstCheck = false;
  shovelVal.stat = "digging";
  shovelEl.style.animation = `rotate ${SECOND}s forwards linear`;
  shovelEl.style.transformOrigin = "bottom left";
};

// 시간차를 두고 넘어뜨리기 반복하기
const clickDiggingLands = () => {
  if (curIdx < shovelEls.length) {
    shovelArr[curIdx].vacancy = false;
    startDigging(curIdx);
    curIdx++;
    isDigging = true;
    if (curIdx < shovelEls.length) {
      // 넘어지는거 멈추기 위해 클릭했을 때 타이머 재생성 방지
      if (shovelArr[curIdx - 1].stat === "digging") {
        timeoutID = setTimeout(
          clickDiggingLands,
          (SECOND - shovelArr[curIdx - 1].second) * 1000
        );
      }
    }
  }
};

// 벽 쓰러지기 정지
const stopDigging = (index) => {
  isDigging = false;
  let shovelEl = shovelEls[index];
  let shovelVal = shovelArr[index];

  shovelEl.style.animationPlayState = "paused";
  shovelEl.style.transform = `rotate(${shovelVal.angle}deg)`;
  shovelVal.stat = "standing";
  if (checkAngle(shovelEl)) shovelVal.angle = checkAngle(shovelEl);

  shovelVal.second = checkSecond(shovelVal.angle);
  clearTimeout(timeoutID);
};

// 각각의 땅 클릭
// 빈 땅 클릭 시 : 팝업 생성 후 땅 파기 시작
// 비어있지 않는 땅 클릭 시 : 바로 땅 파기 시작
let isDigging = false;
let curIdx;
spaceEls.forEach((spaceEl, index) => {
  spaceEl.addEventListener("click", () => {
    if (!isDigging) curIdx = index;
    if (shovelArr[index].vacancy && !isDigging) {
      spaceEl.appendChild(popUp);
      onClickPopUpList(index);
    } else {
      shovelArr[index].stat === "digging"
        ? stopDigging(index)
        : isDigging
        ? alert("작업이 진행중입니다! 모두 완료된 후 다시 시작해주세요.")
        : clickDiggingLands();
    }
  });
});

// profile에 hover 시 배경색

const profile = document.querySelector(".projectpage-sky .profile-box ");

profile.addEventListener("mouseover", () => {
  shovelEls.forEach((el, index) => {
    if (shovelArr[index].stat === "digging")
      spaceEls[index].classList.add("painting");
  });
});

profile.addEventListener("mouseout", () => {
  shovelEls.forEach((el, index) => {
    if (shovelArr[index].stat === "digging")
      spaceEls[index].classList.remove("painting");
  });
});
