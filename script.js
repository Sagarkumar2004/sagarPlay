console.log("welcome to music")

//Init the variables
let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let gifSongName =document.getElementById("gifSongName")
let songlist = Array.from(document.getElementsByClassName("songlist"))


let songs = [
    {songName: "Back in Time", filePath: "song/1.mp3", converPath: "other/1.jpg"},
    {songName: "Fighter", filePath: "song/2.mp3", converPath: "other/2.jpg"},
    {songName: "Backgroud music", filePath: "song/3.mp3", converPath: "other/3.jpg"},
    {songName: "Obsessed", filePath: "song/4.mp3", converPath: "other/4.avif"},
    {songName: "Tere Vaaste", filePath: "song/5.mp3", converPath: "other/5.avif"},
    {songName: "Raatan Lambiyan", filePath: "song/6.mp3", converPath: "other/6.jpeg"}

]

songlist.forEach((element, i) => {
   
    element.getElementsByTagName("img")[0].src =songs[i].converPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    
});


// audioElement.play();

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = "1";

    }
    else{
        masterPlay.classList.add('fa-play-circle')
        masterPlay.classList.remove('fa-pause-circle');
        audioElement.pause()
        gif.style.opacity = "0";

    }
})



// listen to events
audioElement.addEventListener('timeupdate', ()=>{
    
    // update range
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress
})

myProgressBar.addEventListener('change', ()=>{

    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})


// song play and pause in list song

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songPlay")).forEach((element)=>{
        element.classList.toggle("fa-play-circle")
        element.classList.toggle("fa-play-circle");
       
        })

}

Array.from(document.getElementsByClassName("songPlay")).forEach((element)=>{
    element.addEventListener("click", (e)=>{
   makeAllPlays();
   gif.style.opacity = "1";
   songIndex = parseInt(e.target.id);
    e.target.classList.toggle("fa-play-circle");
    e.target.classList.add("fa-pause-circle");
    gifSongName.innerText = songs[songIndex - 1].songName;
    audioElement.src = `song/${songIndex}.mp3`;
    audioElement.currentTime = "0";
    audioElement.play()
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById("next").addEventListener("click", ()=>{
    if(songIndex > 6){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    gifSongName.innerText = songs[songIndex - 1].songName;
    audioElement.src = `song/${songIndex}.mp3`;

    audioElement.currentTime = "0";
    audioElement.play()
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
document.getElementById("pervious").addEventListener("click", ()=>{
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    gifSongName.innerText = songs[songIndex - 1].songName;
    audioElement.src = `song/${songIndex}.mp3`;
    audioElement.currentTime = "0";
    audioElement.play()
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})