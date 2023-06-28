/*Oca WebTech*/
// Cache the DOM
const detailsContainer = document.querySelector(".details-container");
const playPauseBtn = document.querySelector(".play-pause-btn");
const stopBtn = document.querySelector(".stop-btn");
const range = document.querySelector(".range");
const fileInput = document.querySelector("#file");
const streamInput = document.querySelector(".stream");
const fileNameContainer = document.querySelector(".file-name");

// Global Variables
let file = null;
const defaultAudio = "../files/ad.mp3";
const details = {
  fileName: "Oca WebTech Intro",
};

// Audio Constructor
const audio = new Audio(defaultAudio);

const showWave = () => {
  detailsContainer.style.background = `url(../images/wave2.gif) no-repeat center center`;
  detailsContainer.style.backgroundSize = "cover";
};

const hideWave = () => {
  detailsContainer.style.background = `url(../images/audio.jpeg) no-repeat center center`;
};

playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  } else {
    playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    audio.pause();
    hideWave();
  }
});

// Stop Event
stopBtn.addEventListener("click", () => {
  audio.currentTime = 0;
  audio.pause();
  streamInput.disabled = false;
  playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
  hideWave();
});

// Range Input control Volume
range.addEventListener("input", (e) => {
  const rangeValue = e.target.value / 100;
  audio.volume = rangeValue;
});

// Helper Function to get file details
const fileDetails = (file) => {
  const size = (file.size / 1024 / 1024).toFixed(2);
  const fileName = file.name.split(".")[0];
  const ext = file.name.split(".")[1];
  const type = file.type;

  return { size, fileName, ext, type };
};

// File selection and Reading
fileInput.addEventListener("change", (e) => {
  file = e.target.files[0];
  const { size, ext } = fileDetails(file);
  const acceptedExtensions = ["mp3", "wav", "amr", "wav"];

  if (!acceptedExtensions.includes(ext)) {
    alert("File Format Not Supported");
    return;
  }

  if (size > 40) {
    alert("File Too Large");
    return;
  }

  const fileReader = new FileReader();

  fileReader.onloadend = function () {
    playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    fileNameContainer.innerHTML = "Click Play button";
    audio.src = this.result;
    hideWave();
  };
  fileReader.readAsDataURL(file);
});

// Listen to Playing Event
audio.addEventListener("playing", (e) => {
  console.log("Playing...");
  showWave();

  streamInput.disabled = true;
  if (file) {
    details.fileName = fileDetails(file).fileName;
  }

  fileNameContainer.innerHTML = details.fileName;
  playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
});

// Listen to End Event
audio.addEventListener("ended", (e) => {
  console.log("Ended.....");
  playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
  streamInput.disabled = false;
  hideWave();
  details.fileName = "Oca WebTech";
  fileNameContainer.innerHTML = details.fileName;
});

// Error Handler
audio.onerror = () => {
  alert("Something Went Wrong");
};

streamInput.addEventListener("change", (e) => {
  if (e.target.value) {
    audio.src = e.target.value;
    details.fileName = "Streaming...";
  }
});
