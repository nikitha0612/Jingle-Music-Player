console.log("Welcome to Jingle")

let songIndex = 0;
let audioElement = new Audio('songs/mehbooba.mp3');
let mainPlay = document.getElementById('mainPlay');
let songBar = document.getElementById('songBar');
let gif = document.getElementById('gif');
let mainSongName = document.getElementById('mainSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Mehbooba", filePath: "songs/mehbooba.mp3", coverPath: "covers/mehbooba.jpg"},
    {songName: "Naatu Naatu", filePath: "songs/Naatu Naatu.mp3", coverPath: "covers/naatu naatu.jpg"},
    {songName: "Meri Jaan", filePath: "songs/Meri Jaan.mp3", coverPath: "covers/Meri Jaan.jpg"},
    {songName: "Ra Ra Rakkamma", filePath: "songs/Ra Ra Rakkamma.mp3", coverPath: "covers/Ra Ra Rakkamma.jpg"},
    {songName: "Wellerman", filePath: "songs/Wellerman.mp3", coverPath: "covers/Wellerman.jpg"},
    {songName: "Channa Mereya", filePath: "songs/Channa Mereya.mp3", coverPath: "covers/Channa Mereya.jpg"},



]

songItems.forEach((element , i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText  = songs[i].songName;
    
    
})

//play click and listen to events and update progress bar
mainPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <=0){
        audioElement.play();
        mainPlay.classList.remove('fa-circle-play');
        mainPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        mainPlay.classList.remove('fa-pause');
        mainPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//listen to event
audioElement.addEventListener('timeupdate', () => {
    prog = parseInt((audioElement.currentTime/audioElement.duration)*100);
    songBar.value = prog;
})

songBar.addEventListener('change' , () =>{
    audioElement.currentTime = songBar.value * audioElement.duration/100;

})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-circle-play');
    })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
    element.addEventListener('click' , (e) => {
	makeAllPlays();
   	songIndex = parseInt(e.target.id);
        	e.target.classList.remove('fa-circle-play');
        	e.target.classList.add('fa-pause');
        	audioElement.src = `${songs[songIndex].filePath}`;
        	mainSongName.innerText = songs[songIndex].songName;
        	audioElement.currentTime = 0;
        	audioElement.play();
        	gif.style.opacity = 1;
        	mainPlay.classList.remove('fa-circle-play');
        	mainPlay.classList.add('fa-pause');

    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=1){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    mainSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    mainPlay.classList.remove('fa-circle-play');
    mainPlay.classList.add('fa-pause');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    console.log(audioElement);
    mainSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    mainPlay.classList.remove('fa-circle-play');
    mainPlay.classList.add('fa-pause');
})

