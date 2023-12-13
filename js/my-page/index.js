const server = "https://43.203.46.19/"; // adding for .env
const name = document.querySelector(".profile-name");
const saveProfile = document.querySelector("#save_user_profile");
const imageListArea = document.querySelector(".profile-img-box");
const createProfile = document.querySelector("#create_profile");
const area = document.querySelector(".drop-area");
const draggableElements = document.querySelectorAll(".draggable");

let selectedUserProfileNum = "";
const userIdx = JSON.parse(localStorage.getItem("info")).id;

init();

function init() {
  getUserImageList();
  setProfileName();
  createProfile.addEventListener("click", handleSaveMultipleImage);
  saveProfile.addEventListener("click", handleUpdateUserProfile);
}

function setProfileName() {
  name.value = JSON.parse(localStorage.getItem("info")).name;
}

function handleUpdateUserProfile() {
  if (selectedUserProfileNum === "") {
    alert("변경할 메인 프로필 이미지를 선택해주세요.");
    return false;
  }
  const data = {
    id: userIdx,
    imageDataUrl: selectedUserProfileNum,
    name: name.value,
  };

  fetch(`${server}users/updateProfile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .then((result) => {
      console.log("msg:", result);
      if (result.message === "success") {
        console.log("성공");
        console.log("New User Name, New Profile ID", result.data);
        const storeData = localStorage.getItem("info");
        let parsedData = JSON.parse(storeData);
        parsedData.name = result.data.name;
        parsedData.profile_img = result.data.imageDataUrl;

        let updatedData = JSON.stringify(parsedData);

        localStorage.setItem("info", updatedData);

        alert("프로필 업데이트 성공.");
        location.href = "./main.html";
      }
      if (result.message === "duplicated") {
        alert("중복되는 이름 입니다.");
      }
    })
    .catch((error) => {
      console.error("에러:", error);
    });
}

function handleSaveMultipleImage() {
  if (isDropAreaEmpty(area)) {
    alert("프로필 이미지를 완성해주세요.");
  } else {
    handleCaptureImage();
  }
}

function isDropAreaEmpty(area) {
  const hasContent = area.querySelector(".draggabled") !== null;
  return !hasContent;
}

function handleCaptureImage() {
  hideDraggableElements();
  html2canvas(area).then((canvas) => {
    const imageDataUrl = canvas.toDataURL("image/png");
    console.log("imageDataUrl =>", imageDataUrl);
    sendDataToServer(imageDataUrl);
    showDraggableElements();
  });
}

function hideDraggableElements() {
  draggableElements.forEach((element) => {
    element.style.display = "none";
  });
}

function showDraggableElements() {
  draggableElements.forEach((element) => {
    element.style.display = "block";
  });
}

function sendDataToServer(imageDataUrl) {
  const data = { imageDataUrl, idx: userIdx };

  fetch(`${server}users/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .then((result) => {
      console.log("msg:", result);
      if (result.message === "success") {
        clearImageListArea();
        getUserImageList();
      }
    })
    .catch((error) => {
      console.error("에러:", error);
    });
}

function handleResponse(response) {
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

function clearImageListArea() {
  imageListArea.innerHTML = "";
}

function getUserImageList() {
  const data = { idx: userIdx };

  fetch(`${server}users/getProfileList`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .then((result) => {
      console.log("msg:", result);
      if (result.message === "success") {
        renderUserProfileImages(result.data);
      }
    })
    .catch((error) => {
      console.error("에러:", error);
    });
}

function renderUserProfileImages(profileData) {
  profileData.forEach((obj, index) => {
    const imgElement = document.createElement("img");
    imgElement.src = obj.profile_img;
    imgElement.id = `image_${index + 1}`;
    applyImageStyle(imgElement);
    addClickEventToImage(imgElement);
    imageListArea.appendChild(imgElement);
  });
}

function applyImageStyle(imgElement) {
  imgElement.style.width = "115px";
  imgElement.style.height = "110px";
  imgElement.style.margin = "10px";
}

function addClickEventToImage(imgElement) {
  imgElement.addEventListener("click", () => {
    selectedUserProfileNum = imgElement.src;
    console.log("유저가 선택한 프로필 =>", selectedUserProfileNum);
    clearSelectedImages();
    imgElement.classList.add("selected-img");
  });
}

function clearSelectedImages() {
  document.querySelectorAll(".selected-img").forEach((img) => {
    img.classList.remove("selected-img");
  });
}
