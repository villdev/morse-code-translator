const serverUrlEng =
  "https://api.funtranslations.com/translate/morse.json?text=";
const serverUrlMorse =
  "http://api.funtranslations.com/translate/morse2english.json?speed=30%20WPM&text=";
const serverUrlEngAudio =
  "http://api.funtranslations.com/translate/morse/audio.json?text=";
const engInput = document.querySelector(".translate-english textarea");
const translateBtn = document.querySelector(".translate-btn");
const playBtn = document.querySelector(".play-btn");
const copyBtn = document.querySelector(".copy-btn");
const morseOutput = document.querySelector(".translate-morse textarea");
const audioElement = document.querySelector("audio");

translateBtn.addEventListener("click", (e) => {
  const engQuery = engInput.value;
  const endpoint = serverUrlEng + engQuery;
  fetch(endpoint)
    .then((res) => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .then((json) => {
      const morse = json.contents.translated;
      //   morseOutput.style.fontWeight = "600";
      morseOutput.value = morse;
    })
    .catch((err) => console.log(err));
  const audioEndpoint = serverUrlEngAudio + engQuery;
  fetch(audioEndpoint)
    .then((res) => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .then((json) => {
      const audioSrc = json.contents.translated.audio;
      audioElement.src = audioSrc;
    })
    .catch((err) => console.log(err));
});

playBtn.addEventListener("click", (e) => {
  if (playBtn.innerText === "Play" && playBtn.src !== "#") {
    playBtn.innerText = "Stop";
    audioElement.play();
  } else {
    playBtn.innerText = "Play";
    audioElement.pause();
  }
});
audioElement.onended = function () {
  playBtn.innerText = "Play";
};

copyBtn.addEventListener("click", (e) => {
  morseOutput.select();
  document.execCommand("copy");
  copyBtn.innerText = "Copied";
  setTimeout(() => {
    copyBtn.innerText = "Copy";
  }, 2000);
});
