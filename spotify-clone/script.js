console.log("spotify clone")

//initialize variables

let songIndex = 0;
let songs = [{
        songName: "Warriyo - Mortals [NCS Release]",
        filePath: "songs/1.mp3",
        coverPath: "covers/10.jpg"
    },
    {
        songName: "Cielo - Huma-Huma",
        filePath: "songs/2.mp3",
        coverPath: "covers/9.jpg"
    },
    {
        songName: "DEAF KEV - Invincible [NCS Release]-320k",
        filePath: "songs/3.mp3",
        coverPath: "covers/8.jpg"
    },
    {
        songName: "Different Heaven & EH!DE - My Heart [NCS Release]",
        filePath: "songs/4.mp3",
        coverPath: "covers/7.jpg"
    },
    {
        songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release",
        filePath: "songs/5.mp3",
        coverPath: "covers/6.jpg"
    },
    {
        songName: "Song 1",
        filePath: "songs/6.mp3",
        coverPath: "covers/5.jpg"
    },
    {
        songName: "Song 2",
        filePath: "songs/7.mp3",
        coverPath: "covers/4.jpg"
    },
    {
        songName: "Song 3",
        filePath: "songs/8.mp3",
        coverPath: "covers/3.jpg"
    },
    {
        songName: "Song 4",
        filePath: "songs/9.mp3",
        coverPath: "covers/2.jpg"
    },
    {
        songName: "Song 5",
        filePath: "songs/10.mp3",
        coverPath: "covers/1.jpg"
    }
]
let songItemPlay= Array.from(document.getElementsByClassName('songItemPlay'));

let audioDuration = [];
let assignAudio = () => {
    songs.forEach((e, i) => {
        audioDuration.push(new Audio(e.filePath));
    })
}
let audioElement = new Audio(songs[0].filePath);

let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let timestamp = Array.from(document.getElementsByClassName('time'));

let duration = []

assignAudio();


songItem.forEach((element, i) => {

    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
   

})




masterPlay.addEventListener('click', () => {

    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        songItemPlay.forEach((e)=>{
            e.classList.remove('fa-circle-pause');
            e.classList.add('fa-circle-play');
        })


    }
})

//listen to events
audioElement.addEventListener('timeupdate', () => {

    // update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);

    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {

        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        
        
        songIndex = parseInt(e.target.id);
        audioElement.src = `songs/${songIndex+1}.mp3`;
        
            if(e.target.classList.contains('fa-circle-pause')){
                console.log('vhagar')
                e.target.classList.remove('fa-circle-pause');
                e.target.classList.add('fa-circle-play');
                audioElement.pause();
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
                gif.style.opacity = 0;
                
            }
            else{
            makeAllPlays();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        masterSongName.innerHTML = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        }
       
        

    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex > 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerHTML = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerHTML = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})