const openButton = document.querySelector("#open_btn");
const modal = document.querySelector(".modal");
const login_text = document.querySelector("#login-text");

const closeButton = modal.querySelector(".btn-close");
const modalBackground = modal.querySelector(".modal__background");
const modalSection = modal.querySelector("#modal_section");
const login = modal.querySelector("#login");
const signup = modal.querySelector("#signup");
const showLogin = modal.querySelector("#show_login_section");
const loginBtn = modal.querySelector("#login_btn");
const inputUsername = modal.querySelector(".input-username");

const server = "http://3.35.27.85:80/"; // local serve url

function displayModal() {
  modal.classList.add("hidden");
  showLogin.classList.add("hidden");
}

function openModal() {
  if (localStorage.getItem("info")) {
    localStorage.removeItem("info");
    login_text.innerText = "login";
  } else {
    console.log("open Modal");
    modal.classList.remove("hidden");
    modalSection.classList.remove("hidden");
    showLogin.classList.add("hidden");
  }
}

function closeModal() {
  console.log("close Modal");
  modal.classList.add("hidden");
  showLogin.classList.add("hidden");
}

function showLoginSection() {
  modalSection.classList.toggle("hidden");
  showLogin.classList.toggle("hidden");
}

//request Login
function handleLogin() {
  console.log("login btn click");
  goLogin(inputUsername.value);
}

function goLogin(name) {
  const data = { name };
  fetch(`${server}users/login/`, {
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
      return response.json();
    })
    .then((result) => {
      console.log("response:", result);
      console.log("msg:", result.message);
      if (result.message !== "success" || result.message === "No Exist") {
        alert("존재하지 않는 회원입니다.");
      } else {
        const info = {
          id: result.id,
          name: result.name,
          profile_img: result.profile_img,
          project_id: result.project_id,
        };
        localStorage.setItem("info", JSON.stringify(info));
        alert("로그인 성공");
        login_text.innerText = "logout";
        inputUsername.value = "";
        closeModal();
      }
    })
    .catch((error) => {
      console.error("에러:", error);
    });
}

function goSignupPage() {
  console.log("clicckck");
  location.href = "./profile-draw.html";
}

openButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
modalBackground.addEventListener("click", displayModal);

login.addEventListener("click", showLoginSection);
signup.addEventListener("click", goSignupPage);
loginBtn.addEventListener("click", handleLogin);
