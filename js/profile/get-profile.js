const userProfile = document.querySelector("#user-profile");
let test = "test";
let test1 = "Test2";

sendDataToServer(test, test1);

function sendDataToServer(id, key) {
  // 이미지 데이터를 JSON으로 랩핑
  const data = {
    id,
    key,
  };

  /**
   * target url
   * 임시로 지정 추후 .env, ignore 에 추가
   * */
  console.log(data);
  // 서버로 POST 요청 보내기
  fetch(`${server}/api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.blob()) // 이미지 데이터로 변환
    .then((blob) => {
      console.log("success");
      const imageUrl = URL.createObjectURL(blob); // 이미지 URL 생성
      userProfile.src = imageUrl;
      //   const imageElement = document.createElement("img");
      //   imageElement.src = imageUrl;
      //   userProfile.appendChild(imageElement); // userProfile 요소에 이미지 추가
    })
    .catch((error) => {
      console.error("에러 발생:", error);
    });
}
