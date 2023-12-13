// 이미지 요소를 선택합니다.
const defaultImage = document.querySelector(".sample1-0");
const hoverImage = document.querySelector(".sample-project");
const profileImages = document.querySelectorAll(".profile-img");

// 초기에는 default 이미지만 표시합니다.
hoverImage.style.display = "none";

// 각 프로필 이미지에 호버 이벤트 리스너를 추가합니다.
profileImages.forEach((profile, index) => {
  profile.addEventListener("mouseenter", () => {
    // 호버 시에 해당 이미지를 보이도록 합니다.
    if (index === 0) {
      defaultImage.style.display = "none";
      defaultImage.style.display = "none";
      document.querySelector(".sample1-1").style.display = "inline-block";
    } else if (index === 1) {
      defaultImage.style.display = "none";
      defaultImage.style.display = "none";
      document.querySelector(".sample1-2").style.display = "inline-block";
    } else if (index === 2) {
      defaultImage.style.display = "none";
      defaultImage.style.display = "none";
      document.querySelector(".sample1-3").style.display = "inline-block";
    } else if (index === 3) {
      defaultImage.style.display = "none";
      defaultImage.style.display = "none";
      document.querySelector(".sample1-4").style.display = "inline-block";
    } else if (index === 4) {
      defaultImage.style.display = "none";
      defaultImage.style.display = "none";
      document.querySelector(".sample1-5").style.display = "inline-block";
    }
  });
  profile.addEventListener("mouseleave", () => {
    // 마우스를 뗄 때 다시 click 이미지로 돌아갑니다.
    defaultImage.style.display = "inline-block";
    document.querySelector(".sample1-1").style.display = "none";
    document.querySelector(".sample1-2").style.display = "none";
    document.querySelector(".sample1-3").style.display = "none";
    document.querySelector(".sample1-4").style.display = "none";
    document.querySelector(".sample1-5").style.display = "none";
  });
});
