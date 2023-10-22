// 이미지 요소를 선택합니다.
const defaultImage = document.querySelector(".projectdetial-sample-default");
const clickImage = document.querySelector(".projectdetial-sample-click");
const hoverImage = document.querySelector(".projectdetial-sample");
const profileImages = document.querySelectorAll(".profile-img");

// 초기에는 default 이미지만 표시합니다.
clickImage.style.display = "none";
hoverImage.style.display = "none";

// ".projectdetial-sample-default" 이미지를 클릭하면 바뀌도록 설정
defaultImage.addEventListener("click", () => {
  defaultImage.style.display = "none";
  clickImage.style.display = "inline-block";
});

// 각 프로필 이미지에 호버 이벤트 리스너를 추가합니다.
profileImages.forEach((profile, index) => {
  profile.addEventListener("mouseenter", () => {
    // 호버 시에 해당 이미지를 보이도록 합니다.
    if (index === 0) {
      defaultImage.style.display = "none";
      clickImage.style.display = "none";
      document.querySelector(".projectdetial-sample01").style.display =
        "inline-block";
    } else if (index === 1) {
      clickImage.style.display = "none";
      clickImage.style.display = "none";
      document.querySelector(".projectdetial-sample02").style.display =
        "inline-block";
    } else if (index === 2) {
      clickImage.style.display = "none";
      clickImage.style.display = "none";
      document.querySelector(".projectdetial-sample03").style.display =
        "inline-block";
    } else if (index === 3) {
      clickImage.style.display = "none";
      clickImage.style.display = "none";
      document.querySelector(".projectdetial-sample04").style.display =
        "inline-block";
    }
  });
  profile.addEventListener("mouseleave", () => {
    // 마우스를 뗄 때 다시 click 이미지로 돌아갑니다.
    defaultImage.style.display = "none";
    clickImage.style.display = "inline-block";
    document.querySelector(".projectdetial-sample01").style.display = "none";
    document.querySelector(".projectdetial-sample02").style.display = "none";
    document.querySelector(".projectdetial-sample03").style.display = "none";
    document.querySelector(".projectdetial-sample04").style.display = "none";
  });
});
