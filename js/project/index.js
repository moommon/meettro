const server = "https://43.203.46.19/";

const projectTitle = document.querySelector(".project-name");
const userName = document.querySelector(".profile-name");
const m_profile = document.querySelector("#m_profile");
const profileBox = document.querySelector(".profile-box");

getProjectName();
getProjectUserList();

// projectTitle.innerHTML = JSON.parse(localStorage.getItem("info")).project_id;
userName.innerHTML = JSON.parse(localStorage.getItem("info")).name;
m_profile.src = JSON.parse(localStorage.getItem("info")).profile_img;

async function getProjectName() {
  const data = {
    id: JSON.parse(localStorage.getItem("info")).project_id,
  };

  fetch(`${server}project/getProjectInfo`, {
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
        console.log("ProjectInfo", result.userList);
        projectTitle.innerHTML = result.data.project_name;
      }
    })
    .catch((error) => {
      alert(
        "프로젝트를 불러오는 중 에러가 발생했습니다. 관리자에게 문의하세요."
      );
      console.error("에러:", error);
    });
}

// 전체 유저 리스트를 서버에서 받아와서 화면에 그려주는 함수
async function getProjectUserList() {
  const data = {
    project_id: JSON.parse(localStorage.getItem("info")).project_id,
  };

  fetch(`${server}project/getAllUserList`, {
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
        console.log("받아온 결과값:", result.data);
        // 서버에서 받아온 데이터를 기반으로 HTML 동적 생성
        result.data.forEach((user) => {
          // div 요소 생성
          const userDiv = document.createElement("div");
          userDiv.className = `profile project-profile-${user.id}`;
          // 프로필 이미지 생성
          const profileImgBox = document.createElement("div");
          profileImgBox.className = "profile-img-box";
          const profileImg = document.createElement("img");
          profileImg.src = user.profile_img; // 프로필 이미지 경로에 맞게 수정
          profileImg.className = "profile-img";

          profileImgBox.appendChild(profileImg);
          // 사용자 이름 생성
          const userNameDiv = document.createElement("div");
          userNameDiv.className = "profile-name";

          // 여기서는 사용자 이름이 없어서 임의의 텍스트를 넣었는데, 실제 사용자 이름을 적절히 가져와야 합니다.
          userNameDiv.textContent = `${user.name}`;
          // 프로필 이미지 및 사용자 이름을 userDiv에 추가
          userDiv.appendChild(profileImgBox);
          userDiv.appendChild(userNameDiv);
          // userDiv를 profileBox에 추가
          profileBox.appendChild(userDiv);
        });
      }
    })
    .catch((error) => {
      alert(
        "프로젝트를 불러오는 중 에러가 발생했습니다. 관리자에게 문의하세요."
      );
      console.error("에러:", error);
    });
}

const projectImage = document.querySelector(".project-tt");

// 마우스가 이미지에 진입할 때 애니메이션 일시 중지
projectImage.addEventListener("mouseenter", function () {
  projectImage.style.animationPlayState = "paused";
});

// 마우스가 이미지에서 나갈 때 애니메이션 다시 시작
projectImage.addEventListener("mouseleave", function () {
  projectImage.style.animationPlayState = "running";
});
