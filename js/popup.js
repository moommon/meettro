const SERVER = config.SERVER_URL;

// 패턴
var modalPatterns = document.querySelector(".modal-patterns");
var triggerPatterns = document.querySelector(".trigger-patterns");
var closeButtonPatterns = document.querySelector(".close-button-patterns");
var closeButtonPatterns2 = document.querySelector(".btn-apply");

function toggleModalPatterns() {
  modalPatterns.classList.toggle("show-modal-patterns");
}

function windowOnClickPatterns(event) {
  if (event.target === modalPatterns) {
    toggleModalPatterns();
  }
}

triggerPatterns.addEventListener("click", toggleModalPatterns);
closeButtonPatterns.addEventListener("click", toggleModalPatterns);
closeButtonPatterns2.addEventListener("click", toggleModalPatterns);
window.addEventListener("click", windowOnClickPatterns);

const modalTeam = document.querySelector(".modal-team");
// const triggerTeam = document.querySelector(".trigger-team"); // 나중에 프로젝트 생성쪽 작업할 때 살려
const closeButtonTeam = document.querySelector(".close-button-team");
const profileBox = document.querySelector(".profile-box");

//show Team Modal
async function toggleModalTeam(value) {
  console.log("팀원 리스트 모달창 활성화");
  modalTeam.classList.toggle("show-modal-team");
  if (value) {
    await getUserList();
    clearUserList();
  }
}

//모달에서 유저 리스트 제거하는 함수.
function clearUserList() {
  const teamListPersonElements =
    document.querySelectorAll(".team-list-person ");
  // 각 요소를 제거
  teamListPersonElements.forEach((element) => {
    element.remove();
  });
}

function windowOnClickTeam(event) {
  if (event.target === modalTeam) {
    toggleModalTeam();
  }
}

window.addEventListener("click", windowOnClickTeam);

// triggerTeam.addEventListener("click", toggleModalTeam);
closeButtonTeam.addEventListener("click", () => {
  toggleModalTeam(false);
  const teamListPersonElement = document.querySelector(".team-list-person ");

  if (teamListPersonElement) {
    // 해당 요소를 제거
    teamListPersonElement.remove();
  }
});

// todo
const modalTodo = document.querySelector(".modal-todo");
const teamMenu = document.querySelector(".team-menu");
const closeButtonTodo = document.querySelector(".close-button-todo");

teamMenu.addEventListener("click", async () => {
  await toggleModalTeam(true);
});

// window.addEventListener("click", windowOnClickTodo);

async function getUserList() {
  const data = {
    type: "전체",
  };

  fetch(`${SERVER}users/getUserList`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // JSON 데이터를 파싱하여 반환
    })
    .then((result) => {
      console.log("response:", result);
      if (result.message) {
        console.log("ProjectInfo", result.data);

        // 서버에서 받아온 데이터
        const serverData = result.data;
        console.log("SERVER DATA ", serverData);

        // team-list div 선택
        const teamList = document.querySelector("#teamList");

        // 데이터를 기반으로 태그 생성
        serverData.forEach((user) => {
          console.log("user?", user);
          if (user.id !== JSON.parse(localStorage.getItem("info")).id) {
            // div 요소 생성
            const userDiv = document.createElement("div");
            userDiv.className = "team-list-person ";

            // 프로필 이미지 생성
            const profileImg = document.createElement("img");
            profileImg.className = "team-list-profile";
            profileImg.src = user.profile_img;
            userDiv.appendChild(profileImg);

            // 사용자 이름과 초대 부분을 담을 div 생성
            const userInfoContainer = document.createElement("div");
            userInfoContainer.className = "user-info-container";

            // 사용자 이름 생성
            const userNameDiv = document.createElement("div");
            userNameDiv.className = "team-list-name";
            userNameDiv.textContent = user.name;
            userInfoContainer.appendChild(userNameDiv);

            // 초대(span) 생성
            const inviteSpan = document.createElement("span");
            inviteSpan.style.right = "0"; // 오른쪽 끝으로 정렬
            inviteSpan.textContent = "초대";
            inviteSpan.id = "userProfile_" + user.id; // 각 객체의 id 값으로 설정
            userInfoContainer.appendChild(inviteSpan);

            // userDiv에 userInfoContainer 추가
            userDiv.appendChild(userInfoContainer);

            // team-list에 추가
            teamList.appendChild(userDiv);

            inviteSpan.addEventListener("click", async () => {
              // 클릭 이벤트가 발생했을 때 수행할 동작을 여기에 추가
              console.log(`초대 버튼이 클릭되었습니다. User ID: ${user.id}`);
              const clickedUserId = inviteSpan.id;
              console.log("clickedUserId", clickedUserId);

              try {
                const checkDuplicated = await checkDuplicatedUser(
                  user.id,
                  JSON.parse(localStorage.getItem("info")).project_id
                );
                console.log("Result With Checked Duplicated", checkDuplicated);

                //중복된 유저가 없는 경우 유저를 실제로 저장하고, 뷰를 생성하는 로직을 추가
                if (checkDuplicated) {
                  console.log("중복된 유저가 아니기 때문에 유저를 추가.");
                  const result = await addUserList(
                    user.id,
                    JSON.parse(localStorage.getItem("info")).project_id
                  );
                  //프로젝트에 유저가 잘 추가 되었을 경우
                  if (result) {
                    alert("프로젝트에 유저가 추가되었습니다.");
                    const newProfileDiv = document.createElement("div");
                    // newProfileDiv.className = `profile project-profile-${clickedUser.id}`;
                    newProfileDiv.className = `profile project-profile-${user.id}`;

                    // 프로필 이미지 생성
                    const profileImgBox = document.createElement("div");
                    profileImgBox.className = "profile-img-box";
                    const profileImg = document.createElement("img");
                    // profileImg.src = clickedUser.profile_img;
                    profileImg.src = user.profile_img;
                    profileImg.className = "profile-img";
                    profileImg.style =
                      "width: 90px; height: 90px; margin: 10px; border: 1.5px solid #000;  border-radius: 50%;";
                    profileImgBox.appendChild(profileImg);

                    // 사용자 이름 생성
                    const userNameDiv = document.createElement("div");
                    userNameDiv.className = "profile-name";
                    userNameDiv.style = "margin-bottom: 10px; margin-left:20px";
                    // userNameDiv.textContent = clickedUser.name;
                    userNameDiv.textContent = user.name;

                    // 프로필 이미지 및 사용자 이름을 newProfileDiv에 추가
                    newProfileDiv.appendChild(profileImgBox);
                    newProfileDiv.appendChild(userNameDiv);

                    // newProfileDiv를 profileBox에 추가
                    profileBox.appendChild(newProfileDiv);
                  }
                }
              } catch (error) {
                console.error("error", error);
              }
            });
          } else {
            console.log("이미 있는 유저여");
          }
        });
        // 스크롤바를 추가할 컨테이너에 스타일 적용
        teamList.style.overflow = "auto";
        teamList.style.maxHeight = "510px";
      } else {
        console.log("No DATA");
      }
    })
    .catch((error) => {
      alert(
        "프로젝트를 불러오는 중 에러가 발생했습니다. 관리자에게 문의하세요."
      );
      console.error("에러:", error);
    });
}

// 유저가 중복으로 들어가 있는지 체크
async function checkDuplicatedUser(user_id, project_id) {
  try {
    const data = {
      user_id,
      project_id,
    };
    const response = await fetch(`${SERVER}project/checkDuplicated`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    console.log("response:", result);

    // 중복이 아닌 경우
    if (result.message) {
      console.log("ProjectInfo", result.data);
      // 서버에서 받아온 데이터
      const serverData = result.data;
      console.log("SERVER DATA ", serverData);
      return true;
      // 중복된 유저가 있는 경우
    } else {
      alert("이미 추가된 유저에요.");
      return false;
    }
  } catch (error) {
    console.error("chekc duplicated error", error);
  }
}

// 프로젝트에 유저 추가
async function addUserList(user_id, project_id) {
  try {
    const data = {
      user_id,
      project_id,
    };

    const response = await fetch(`${SERVER}project/addProject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    console.log("response:", result);

    //성공적으로 데이터가 추가
    if (result.message) {
      console.log("ProjectInfo", result.data);
      return true;
    } else {
      console.log("실패");
      return false;
    }
  } catch (error) {
    alert("프로젝트를 불러오는 중 에러가 발생했습니다. 관리자에게 문의하세요.");
    console.error("에러:", error);
    return { success: false, data: null };
  }
}
