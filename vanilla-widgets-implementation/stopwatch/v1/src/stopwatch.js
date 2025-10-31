const CENTI_IN_MS = 10;
const SEC_IN_MS = 1000;
const MINUTE_IN_MS = 60 * SEC_IN_MS;
const HOUR_IN_MS = 60 * MINUTE_IN_MS;

const formattedTimeStr = (duration) => {
  const format = (x) => Math.floor(x).toString().padStart(2, '0');

  const hour = format(duration / HOUR_IN_MS);
  const minute = format((duration % HOUR_IN_MS) / MINUTE_IN_MS);
  const seconds = format((duration % MINUTE_IN_MS) / SEC_IN_MS);
  const centi = format((duration % SEC_IN_MS) / CENTI_IN_MS);

  return `${hour}:${minute}:${seconds}:${centi}`;
};

let duration = 0;
let lastTick = null;
let animationFrameID = null;

const startTimer = () => {
  $startButton.disabled = true;
  $pauseButton.disabled = false;

  lastTick = performance.now();

  const animateFrame = (now) => {
    if (lastTick === null) {
      return;
    }
    const delta = now - lastTick;
    duration += delta;
    lastTick = now;
    $mmss.innerHTML = formattedTimeStr(duration);
    window.requestAnimationFrame(animateFrame);
  };

  animationFrameID = window.requestAnimationFrame(animateFrame);
};

const pauseTimer = () => {
  $startButton.disabled = false;
  $pauseButton.disabled = true;
  lastTick = null;
};

const resetTimer = () => {
  $startButton.disabled = false;
  $pauseButton.disabled = true;
  window.cancelAnimationFrame(animationFrameID);
  duration = 0;
  $mmss.innerHTML = formattedTimeStr(duration);
  lastTick = null;
};

const $mmss = document.getElementById('time');

const $startButton = document.getElementById('startButton');
$startButton.addEventListener('click', startTimer);

const $pauseButton = document.getElementById('pauseButton');
$pauseButton.disabled = true;
$pauseButton.addEventListener('click', pauseTimer);

const $resetButton = document.getElementById('resetButton');
$resetButton.addEventListener('click', resetTimer);
