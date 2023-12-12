const allBtn = document.querySelector("#allBtn");
const myBtn = document.querySelector("#myBtn");

const all_section = document.querySelector("#all_section");
const my_section = document.querySelector("#my_section");

const my_profile = document.querySelector("#my-profile");
const myPageClick = document.querySelector(".myPageClick");

const newProject = document.querySelector("#newProject");

newProject.addEventListener("click", handleProject);

function handleProject() {
  if (!localStorage.getItem("info")) {
    alert("로그인 이후에 이용 가능합니다.");
  } else {
    location.href = "./newproject.html";
  }
}

function handleMyProfile() {
  if (!localStorage.getItem("info")) {
    alert("로그인 이후에 이용 가능합니다.");
  } else {
    location.href = "./new_my_profile_page.html";
  }
}

my_profile.addEventListener("click", handleMyProfile);

allBtn.addEventListener("click", () => {
  allBtn.style.fontWeight = "bold";
  myBtn.style.fontWeight = "";
  my_section.style.display = "none";
  all_section.style.display = "block";
});

myBtn.addEventListener("click", () => {
  if (!localStorage.getItem("info")) {
    alert("로그인 또는 회원가입 후 meettro를 이용해주세요.");
  } else {
    allBtn.style.fontWeight = "";
    myBtn.style.fontWeight = "bold";
    my_section.style.display = "block";
    all_section.style.display = "none";
  }
});

//마이페이지로 넘어가는 페이지
myPageClick.addEventListener("click", () => {
  console.log(localStorage.getItem("info"));
  console.log(JSON.parse(localStorage.getItem("info")).project_id);

  JSON.parse(localStorage.getItem("info")).project_id !== null
    ? (location.href = "./projectpage.html")
    : alert("아직 프로젝트를 생성하지 않았어요");
});

// 건물 높이

document.addEventListener("DOMContentLoaded", function () {
  // Get all elements with class "dim" and "building-height"
  const dimElements = document.querySelectorAll(".dim");
  const buildingHeightElements = document.querySelectorAll(".building-height");

  // Iterate over each pair of elements
  for (let i = 0; i < dimElements.length; i++) {
    const dimElement = dimElements[i];
    const buildingHeightElement = buildingHeightElements[i];

    // Add event listeners to each pair
    dimElement.addEventListener("mouseover", () =>
      showBuildingHeight(buildingHeightElement)
    );
    dimElement.addEventListener("mouseout", () =>
      hideBuildingHeight(buildingHeightElement)
    );
  }

  function showBuildingHeight(element) {
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
  }

  function hideBuildingHeight(element) {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
  }
});
