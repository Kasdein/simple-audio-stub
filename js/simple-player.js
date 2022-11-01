const currentTime = document.getElementById("currentTime")
const totalTime = document.getElementById("totalTime")
const playPauseButton = document.getElementById("playPauseButton")
const seekBar = document.getElementById("seekBar")
const volumeBar = document.getElementById("volumeBar")
const audio = new Audio("audio/Soft-Background-for-Interview.webm");
let isSeeking = false

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
    audio.volume = ".5"
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

volumeBar.onchange = () => {
    audio.volume = .value
    console.log(audio.volume)
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

