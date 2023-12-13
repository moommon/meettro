const profilename = document.querySelector(".profilename-input"); // profile name
const area = document.querySelector(".drop-area");
const draggableElements = document.querySelectorAll(".draggable");
const test = document.querySelector("#profile-test-btn"); //test

/**
 * target url
 * 임시로 지정 추후 .env, ignore 에 추가
 * */
const server = "http://3.35.27.85:80/";

const json = {};
/**
 * 서버로 프로필 이미지, 닉네임을 넘기는 함수
 * @param name : 유저 이름
 * @param image : 유저가 지정한 프로필 이미지

 */
function saveProfile(name) {
  console.log(name);
  draggableElements.forEach((element) => {
    element.style.display = "none";
  });
  // html2canvas 라이브러리로 area dom 영역을 캡쳐
  html2canvas(area).then(function (canvas) {
    // 캔버스에서 이미지 데이터 URL을 가져옴.
    let imageDataUrl = canvas.toDataURL("image/png");

    // 데이터 URL을 PNG 파일로 다운로드 => 임시(추후에 서버작업 하면 필요없음 )
    let a = document.createElement("a");
    a.href = imageDataUrl;
    a.download = "captured-image.png";
    a.click();

    // 캡처가 완료후 감춰놨던 요소들 다시 보이도록 설정 => 깜빡 거리는 이슈가 있긴함
    draggableElements.forEach((element) => {
      element.style.display = "block";
    });
  });
}

function checkName() {
  console.log(profilename.value.length);
  if (profilename.value === "") {
    alert("닉네임을 입력해주세요");
    return false;
  } else if (profilename.value.length < 2 || profilename.value.length > 9) {
    alert("닉네임은 2글자 이상 8글자 이하로 넣어주세요");
    return false;
  } else {
    return true;
  }
}

function isDropAreaEmpty(area) {
  const isEmpty = area.querySelector(".draggabled") ?? null;
  return isEmpty;
}

function handleCaptureImage(imageDataUrl) {
  draggableElements.forEach((element) => {
    element.style.display = "none";
  });
  // html2canvas 라이브러리로 area dom 영역을 캡쳐
  html2canvas(area).then(function (canvas) {
    // 캔버스에서 이미지 데이터 URL을 가져옴.
    imageDataUrl = canvas.toDataURL("image/png");
    console.log("imageDataUrl =>", imageDataUrl);
    sendDataToServer(imageDataUrl, profilename.value);

    // 데이터 URL을 PNG 파일로 다운로드 => 임시(추후에 서버작업 하면 필요없음 )
    let a = document.createElement("a");
    a.href = imageDataUrl;
    a.download = "captured-image.png";
    a.click();

    // 캡처가 완료후 감춰놨던 요소들 다시 보이도록 설정 => 깜빡 거리는 이슈가 있긴함
    draggableElements.forEach((element) => {
      element.style.display = "block";
    });
  });
}

function handleCheckRegxep() {
  let imageDataUrl;

  // 프로필 이미지 유무 판단
  isDropAreaEmpty(area) === null
    ? sendDataToServer(imageDataUrl, profilename.value) // 이미지가 없는경우 undefined 값을 걍 넘김
    : handleCaptureImage(imageDataUrl); // 이미지가 있는경우 화면 캡쳐후 넘김
}

test.addEventListener("click", () => {
  checkName() ? handleCheckRegxep() : undefined;
});

// 이미지 데이터를 서버로 전송하는 함수
function sendDataToServer(imageDataUrl, name) {
  // 이미지 데이터를 JSON으로 랩핑

  const data = { name, imageDataUrl };
  // console.log(data);
  //sever url .env 추가
  fetch(`${server}users`, {
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
      console.log("msg:", result.message);
      if (result.message === "duplicated") {
        alert("중복되는 닉네임 입니다. 다른 닉네임을 사용하세요");
      } else {
        alert("회원가입에 성공했습니다.");
        profilename.value = "";
        localStorage.setItem("info", JSON.stringify(result));
        history.back();
      }
    })
    .catch((error) => {
      console.error("에러:", error);
    });
}
