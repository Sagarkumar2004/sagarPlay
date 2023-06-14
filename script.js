console.log("welcome to music");
window.addEventListener("load", () => {

  //Init the variables
  let songIndex = 0;
  let audioElement = new Audio("Song/1.mp3");
  let masterPlay = document.getElementById("masterPlay");
  let myProgressBar = document.getElementById("myProgressBar");
  let gif = document.getElementById("gif");
  let gifSongName = document.getElementById("gifSongName");
  let songlist = Array.from(document.getElementsByClassName("songlist"));
  let songPlay = Array.from(document.getElementsByClassName("songPlay"));

  let songs = [
    {
      songName: "issa vibe",
      filePath: "Song/1.mp3",
      converPath: "other/1.jpg"
    },

    {
      songName: "Fighter",
      filePath: "Song/2.mp3",
      converPath: "other/2.jpg"
    },
    {
      songName: "Backgroud music",
      filePath: "Song/3.mp3",
      converPath: "other/3.jpg",
    },
    {
      songName: "Obsessed",
      filePath: "Song/4.mp3",
      converPath: "other/4.avif"
    },
    {
      songName: "Tere Vaaste",
      filePath: "Song/5.mp3",
      converPath: "other/5.avif",
    },
    {
      songName: "Raatan Lambiyan",
      filePath: "Song/6.mp3",
      converPath: "other/6.jpeg",
    },
  ];

  songlist.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].converPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  });

  gifSongName.innerText = "";

  // audioElement.play();

  // Handle master play and pause
  masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
      audioElement.play();
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
      gif.style.opacity = "1";
      // gifSongName.innerText = songs[songIndex - 1].songName;


    } else {
      masterPlay.classList.add("fa-play-circle");
      masterPlay.classList.remove("fa-pause-circle");
      audioElement.pause();
      gif.style.opacity = "0";
      gifSongName.innerText = "";

    }
  });

  // listen to events

  // update range

  audioElement.addEventListener("timeupdate", () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
  });

  myProgressBar.addEventListener("change", () => {
    audioElement.currentTime =
      (myProgressBar.value * audioElement.duration) / 100;
  });

  // song play and pause in list song

  const makeAllPlays = () => {
    songPlay.forEach((element) => {
      element.classList.add("fa-play-circle");
      element.classList.remove("fa-pause-circle");
    });
  };
  const makeAllPause = () => {
    songPlay.forEach((element) => {
      element.classList.add("fa-play-circle");
      element.classList.remove("fa-pause-circle");
    });
  };

  songPlay.forEach((element) => {
    element.addEventListener("click", (e) => {
      if (audioElement.paused) {
        makeAllPlays();
        gif.style.opacity = "1";
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");

        gifSongName.innerText = songs[songIndex - 1].songName;
        audioElement.src = `Song/${songIndex}.mp3`;
        audioElement.currentTime = "0";
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = "1";
      } else {
        makeAllPause();
        gif.style.opacity = "0";
        songIndex = parseInt(e.target.id);
        e.target.classList.add("fa-play-circle");
        e.target.classList.remove("fa-pause-circle");

        gifSongName.innerText = "";
        audioElement.currentTime = "0";
        audioElement.pause();
        masterPlay.classList.add("fa-play-circle");
        masterPlay.classList.remove("fa-pause-circle");
      }
    });
  });

  // Next main icon

  document.getElementById("next").addEventListener("click", () => {
    if (songIndex > 6) {
      songIndex = 0;
    } else {
      songIndex += 1;
    }
    gifSongName.innerText = songs[songIndex - 1].songName;
    audioElement.src = `Song/${songIndex}.mp3`;
    audioElement.currentTime = "0";
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
  });

  // Pervious main Icon
  document.getElementById("pervious").addEventListener("click", () => {
    if (songIndex <= 0) {
      songIndex = 0;
    } else {
      songIndex -= 1;
    }
    gifSongName.innerText = songs[songIndex - 1].songName;
    audioElement.src = `song/${songIndex}.mp3`;
    audioElement.currentTime = "0";
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
  });

})
