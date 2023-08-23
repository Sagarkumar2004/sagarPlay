
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
  const navIcon = document.querySelector('.navIcon');
  const menubox = document.querySelector('.menuBox');
  const navbar = document.querySelector('.navbar');


  //menu
const mobileNav = function(){
  navIcon.classList.add('navGo');
  menubox.classList.remove('vClass');
  navbar.classList.remove('vClass');

}

 document.querySelector('.menuBox').addEventListener('click', function(){
  navIcon.classList.remove('navGo');
  menubox.classList.add('vClass');
  navbar.classList.add('vClass');
 })

 document.querySelector('.home').addEventListener('click', function(){
  navIcon.classList.add('navGo');
  menubox.classList.remove('vClass');
  navbar.classList.remove('vClass');

 })



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

  // Adding songs in playlist

  songlist.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].converPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  });



  // Handle master play and pause
  masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
      audioElement.play();
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
      gif.style.opacity = "1";
      gifSongName.innerText = songs[songIndex -1].songName;
      


    } else {
      masterPlay.classList.add("fa-play-circle");
      masterPlay.classList.remove("fa-pause-circle");
      audioElement.pause();
      gif.style.opacity = "0";
      gifSongName.innerText = "";
    

    }
  });

  // listen to events

  //auto play song

  audioElement.addEventListener('ended', () => {
    
    if (songIndex < songs.length) {
      gifSongName.innerText = songs[songIndex++].songName;
      audioElement.src = `Song/${songIndex}.mp3`;
      audioElement.currentTime = "0";
      audioElement.play()
    } else {

          if(confirm("The playlist has been ended , do want to play again") == true){
            audioElement.src = "Song/1.mp3";
            songIndex = 0
            gifSongName.innerText = songs[songIndex].songName;

            audioElement.play();
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
     } 
     else{
            masterPlay.classList.add("fa-play-circle");
            masterPlay.classList.remove("fa-pause-circle");
            gif.style.opacity = "0";
     }
      
    }
  });

  // update range0

  audioElement.addEventListener("timeupdate", () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
  });

  myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
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


        /////////////////////////////pending  auto enble play icon in playlist ////////////////

        audioElement.addEventListener('ended', () => {
          
          e.target.classList.add("fa-play-circle");
          e.target.classList.remove("fa-pause-circle");
          // if(songIndex < songIndex.length){
          //   songIndex = parseInt(e.target.id++);
          //   e.target.classList.add("fa-play-circle");
          //    e.target.classList.remove("fa-pause-circle");
          // }else{
          //   console.log(" song playlist is ended")
          // }



        })
        
       /////////////////////////////////////////////////////////////////////////////////////////////////////////

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


////////////////////////Login and sinup/////////////////////////////////////////////////

const sinup = document.querySelector('#sinup');
const login = document.querySelector('#login');
const UserName = document.querySelector('#UserName');
const password = document.querySelector('#password');
const LoginContainer = document.querySelector('.LoginContainer');
const Name = document.querySelector('#Name');
const number = document.querySelector('#number');
const email = document.querySelector('#email');
const NewUserName = document.querySelector('#NewUserName');
const NewPassword = document.querySelector('#NewPassword');
const repetPassword = document.querySelector('#repetPassword');
const loginBtn =document.querySelector('#loginBtn');
const anotherOption = document.querySelector('.anotherOption');
const forgetPass = document.querySelector('.forgetPass');
 
  
sinup.addEventListener("click", function(){
  
  sinup.style.background = '#1aa34a';
  login.style.background = 'linear-gradient(to right, rgb(255, 255, 255), rgb(255, 255, 255))';
  UserName.style.display = 'none';
  password.style.display = 'none';
  LoginContainer.classList.add("sinupContainer");
  LoginContainer.classList.remove("LoginContainer");
  Name.style.display = 'block';
  number.style.display = 'block';
  email.style.display = 'block';
  NewUserName.style.display = 'block';
  NewPassword.style.display = 'block';
  repetPassword.style.display = 'block';
  loginBtn.textContent = "Submit";
  anotherOption.textContent = "Continue with";
  forgetPass.textContent = "";

});

login.addEventListener("click", function(){
  login.style.background = '#1aa34a';
  sinup.style.background = 'linear-gradient(to right, rgb(255, 255, 255), rgb(255, 255, 255))';
  UserName.style.display = 'block';
  password.style.display = 'block';
  document.querySelector(".sinupContainer").classList.add("LoginContainer");
  document.querySelector(".sinupContainer").classList.remove("sinupContainer");
  Name.style.display = 'none';
  number.style.display = 'none';
  email.style.display = 'none';
  NewUserName.style.display = 'none';
  NewPassword.style.display = 'none';
  repetPassword.style.display = 'none';
  loginBtn.textContent = "Login";
  anotherOption.textContent = "Login with";
  forgetPass.textContent = "Forget Password";
  

});