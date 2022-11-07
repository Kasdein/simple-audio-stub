
//Shorcut function for "getElementById"
let get = function (id) {
    return document.getElementById(id)
}
//CONSTANTS AND VARIABLES
const currentTime = get("currentTime")
const totalTime = get("totalTime")
const playPauseButton = get("playPauseButton")
const seekBar = get("seekBar")
const volumeBar = get("volumeBar")
const song1 = get("song1")
const song2 = get("song2")
const song3 = get("song3")
const song4 = get("song4")
const audio = new Audio("audio/cruisin.webm");
let isSeeking = false
let audioSample = ["songaudio/cruisin.webm1", "audio/downtown.webm", "audio/jazzyfrenchy.webm", "audio/nature.webm"]

// sets original volume to 50%
volumeBar.value = 50

//BUTTON LISTENER 
//audio is played when triggered
playPauseButton.onclick = () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause()
    }
}

// AUDIO EVENT LISTENERS
// event triggered once audio loaded
audio.oncanplaythrough = () => {
    seekBar.disabled = false
    volumeBar.disabled = false
}

// event triggered when audio plays 
audio.onplay = () => {
    playPauseButton.src = "images/pause.svg"
}

// event triggers when audio is paused 
audio.onpause = () => {
    playPauseButton.src = "images/play.svg"
}

// event triggered on metadata load 
audio.onloadedmetadata = () => {
    totalTime.innerHTML = formatTime(audio.duration)
    currentTime.innerHTML = formatTime(0)
    seekBar.max = Math.floor(audio.duration)
}

// event triggered when playtime updates
audio.ontimeupdate = () => {
    currentTime.innerHTML = formatTime(audio.currentTime)
    if (!isSeeking) {
        seekBar.value = Math.floor(audio.currentTime)
    }
}


//event triggered when audio ends
audio.onended = () => {
    currentTime.innerHTML = formatTime(0)
    seekBar.value = (0)
    playPauseButton.src = "images/play.svg"
}

//SEEKBAR LISTENERS
//event triggered on interaction with seek bar
seekBar.oninput = () => {
    isSeeking = true
}

//event triggered when seek bar is changed
seekBar.onchange = () => {
    audio.currentTime = seekBar.value
    isSeeking = false
}

//event triggered when volume bar is changed
volumeBar.onchange = () => {
    audio.volume = volumeBar.value / 100
}

// changes song on trigger
song1.onclick = () => {
    audio.src = audioSample[0]
    playPauseButton.src = "images/play.svg"
}

song2.onclick = () => {
    audio.src = audioSample[1]
    playPauseButton.src = "images/play.svg"
}

song3.onclick = () => {
    audio.src = audioSample[2]
    playPauseButton.src = "images/play.svg"
}

song4.onclick = () => {
    audio.src = audioSample[3]
    playPauseButton.src = "images/play.svg"
}

// UTILITY FUNCTIONS
// takes total seconds (number) and returns a formatted string 
function formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = Math.floor((secs - (hours * 3600)) - minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours > 0) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}

