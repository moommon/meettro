const startBtn = document.querySelector(".start-btn");
const projectnameInput = document.querySelector(".projectname-input");

const server = config.SERVER_URL;

// createProject handler
async function handleCreateProject() {
  console.log("projectnameInput.value?", projectnameInput.value);
  console.log("IDX?", JSON.parse(localStorage.getItem("info")).id);

  const data = {
    projectName: projectnameInput.value,
    idx: JSON.parse(localStorage.getItem("info")).id,
  };

  fetch(`${server}project`, {
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
      if (result.message === "success") {
        console.log("ProjectId", result.data);
        const storeData = localStorage.getItem("info");
        let parsedData = JSON.parse(storeData);
        parsedData.project_id = result.data;

        let updatedData = JSON.stringify(parsedData);

        localStorage.setItem("info", updatedData);

        alert("프로젝트가 생성되었습니다.");
        location.href = "./projectpage.html";
      }
    })
    .catch((error) => {
      alert("프로젝트 생성중 에러가 발생했습니다. 관리자에게 문의하세요.");
      console.error("에러:", error);
    });
}

startBtn.addEventListener("click", handleCreateProject);
