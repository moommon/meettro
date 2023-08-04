const hScroll = document.getElementsByClassName("horizontal-scroll-box");
const slider = document.getElementsByClassName("slider");
const s_wid = slider[0].offsetWidth;
const s_li = slider[0].children;
let win_wid = window.innerWidth;
let s_move_max = (s_wid - win_wid / 2) * -1;
let s_pos = 0;
let li_pos = 0;
let pct = 0;

hScroll[0].addEventListener("wheel", function (e) {
  move_slider(e.deltaY);
});
function move_slider(amount) {
  s_pos -= amount;
  if (s_pos < s_move_max) {
    s_pos = s_move_max;
    return;
  } else if (s_pos > 0) {
    s_pos = 0;
    return;
  }
  slider[0].style.transform = `translateX(${s_pos}px)`;
  //   li_upDown(amount);
}
