let startTime;
let timerInterval;
let elapsed = 0;
let lapCount = 0;
let isRunning = false;

function updateDisplay(time) {
  const hrs = Math.floor(time / 3600000);
  const mins = Math.floor((time % 3600000) / 60000);
  const secs = Math.floor((time % 60000) / 1000);
  const ms = Math.floor((time % 1000) / 10);

  document.getElementById("hours").textContent = String(hrs).padStart(2, "0");
  document.getElementById("minutes").textContent = String(mins).padStart(2, "0");
  document.getElementById("seconds").textContent = String(secs).padStart(2, "0");
  document.getElementById("milliseconds").textContent = String(ms).padStart(2, "0");
}

function toggleTimer() {
  const toggleBtn = document.getElementById("toggleBtn");
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
    toggleBtn.textContent = "START";
  } else {
    startTime = Date.now() - elapsed;
    timerInterval = setInterval(() => {
      elapsed = Date.now() - startTime;
      updateDisplay(elapsed);
    }, 10);
    isRunning = true;
    toggleBtn.textContent = "STOP";
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsed = 0;
  lapCount = 0;
  isRunning = false;
  updateDisplay(0);
  document.getElementById("lapList").innerHTML = "";
  document.getElementById("toggleBtn").textContent = "START";
}

function recordLap() {
  if (elapsed === 0) return;

  lapCount++;
  const lapTime = formatTime(elapsed);
  const lapList = document.getElementById("lapList");
  const newLap = document.createElement("li");
  newLap.textContent = `Lap ${lapCount}: ${lapTime}`;
  lapList.prepend(newLap);
}

function formatTime(time) {
  const hrs = Math.floor(time / 3600000);
  const mins = Math.floor((time % 3600000) / 60000);
  const secs = Math.floor((time % 60000) / 1000);
  const ms = Math.floor((time % 1000) / 10);

  return `${String(hrs).padStart(2, "0")}h ${String(mins).padStart(2, "0")}m ${String(secs).padStart(2, "0")}s ${String(ms).padStart(2, "0")}`;
}
