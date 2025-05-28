const timer = document.getElementById("timer");
const text = document.getElementById("text");
const session = document.querySelector("h3");
const focus = document.getElementById("focus");
const breakb = document.getElementById("break");
const startbtn = document.getElementById("start");
const resetbtn = document.getElementById("reset");
const pausebtn = document.getElementById("pause");

let interval = null;
let cinterval = null;
let pause = false;
let flag = true; // true = focus, false = break
let minutes = 25;
let seconds = 0;
let alarm = new Audio('loud_alarm_sound.mp3');

update_display();
text.textContent = "Breathe in. Clear your space. Begin when ready.";

function focusm() {
  clearInterval(interval);
  interval = null;

  flag = true;
  minutes = 25;
  seconds = 0;
  update_display();
  text.textContent = "Time to Focus - No Distractions";

  focus.disabled = false;
  breakb.disabled = false;
  startbtn.disabled = false;
  resetbtn.disabled = false;
  pausebtn.style.display = "none";
  pause = false;
  pausebtn.textContent = "Pause";
}

function breakm() {
  clearInterval(interval);
  interval = null;

  flag = false;
  minutes = 5;
  seconds = 0;
  update_display();
  text.textContent = "Break Time - Relax and Recharge";

  focus.disabled = false;
  breakb.disabled = false;
  startbtn.disabled = false;
  resetbtn.disabled = false;
  pausebtn.style.display = "none";
  pause = false;
  pausebtn.textContent = "Pause";
}

function change() {
  let { x, y } = getColor();
  document.body.style.backgroundColor = x;
  document.querySelector('h3').style.color = y;
  document.getElementById('text').style.color = y;
  document.getElementById('timer').style.color = y;
}

function start() {
  if (interval !== null) return;

  if (cinterval !== null) {
    clearInterval(cinterval);
    cinterval = null;
  }

  text.textContent = flag ? "Time to Focus - No Distractions" : "Break Time - Relax and Recharge";
  pausebtn.style.display = "inline-block";
  pausebtn.disabled = false;
  pausebtn.textContent = "Pause";
  pause = false;

  focus.disabled = true;
  breakb.disabled = true;
  startbtn.disabled = true;
  resetbtn.disabled = false;

  change();
  interval = setInterval(update_timer, 1000);
  cinterval = setInterval(change, 60 * 1000);
}

function reset() {
  clearInterval(interval);
  clearInterval(cinterval);
  interval = null;
  cinterval = null;

  flag = true;
  minutes = 25;
  seconds = 0;
  update_display();
  text.textContent = "Breathe in. Clear your space. Begin when ready.";

  focus.disabled = false;
  breakb.disabled = false;
  startbtn.disabled = false;
  resetbtn.disabled = false;

  alarm.pause();
  alarm.currentTime = 0;

  pausebtn.style.display = "none";
  pausebtn.textContent = "Pause";
  pause = false;
}

function update_timer() {
  if (seconds === 0) {
    if (minutes === 0) {
      complete();
      return;
    }
    minutes--;
    seconds = 59;
  } else {
    seconds--;
  }
  update_display();
}

function complete() {
  clearInterval(interval);
  clearInterval(cinterval);
  interval = null;
  cinterval = null;
  alarm.play();

  text.textContent = flag ? "Extend break??" : "One more session??";
  pausebtn.style.display = "none";
  pausebtn.textContent = "Pause";
  pause = false;
}


function update_display() {
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
  timer.textContent = `${displayMinutes}:${displaySeconds}`;
}

function pause_resume() {
  if (!pause) {
    clearInterval(interval);
    interval = null;
    pause = true;
    text.textContent = "Paused. Take a breath.";
    pausebtn.textContent = "Resume";
  } else {
    interval = setInterval(update_timer, 1000);
    text.textContent = flag ? "Time to Focus - No Distractions" : "Break Time - Relax and Recharge";
    pause = false;
    pausebtn.textContent = "Pause";
  }
}

function getColor() {
  const box_colors = ['#02343F', '#331B3F', '#0A174E', '#1E4174', '#101820', '#195190', '#2D2926'];
  const text_colors = ['#F0EDCC', '#ACC7B4', '#F5D042', '#DDA94B', '#F2AA4C', '#A2A2A1', '#ed6f63'];
  const index = Math.floor(Math.random() * box_colors.length);
  return {
    x: box_colors[index],
    y: text_colors[index]
  };
}

window.onload = function () {
  change();
};
