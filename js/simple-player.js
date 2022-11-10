
//Shorcut function for "getElementById"
let get = function (id) {
    return document.getElementById(id)
}
//CONSTANTS AND VARIABLES
const heroContainer = get("heroContainer")
const currentTime = get("currentTime")
const totalTime = get("totalTime")
const playPauseButton = get("playPauseButton")
const seekBar = get("seekBar")
const volumeBar = get("volumeBar")
const speakerImage = get("speakerImage")
const volumeOutput = get("volumeOutput")
const song1 = get("song1")
const song2 = get("song2")
const song3 = get("song3")
const song4 = get("song4")
const audio = new Audio("audio/cruisin.webm");
let muteState = 'unmute'
let isSeeking = false
let audioSample = ["songaudio/cruisin.webm1", "audio/downtown.webm", "audio/jazzyfrenchy.webm", "audio/nature.webm"]


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
    playPauseButton.className = "fa fa-pause fa-lg"
}

// event triggers when audio is paused 
audio.onpause = () => {
    playPauseButton.className = "fa fa-play fa-lg"
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
    playPauseButton.className = "fa fa-play fa-lg"

}

//SEEKBAR LISTENERS
//event triggered on interaction with seek bar
seekBar.oninput = () => {
    isSeeking = true
}
seekBar.addEventListener('input', (e) => {
    showRangeProgress(e.target);
});


//event triggered when seek bar is changed
seekBar.onchange = () => {
    audio.currentTime = seekBar.value
    isSeeking = false
}

//VOLUMEBAR LISTENER
volumeBar.addEventListener('input', (e) => {
    showRangeProgress(e.target);
});
//event triggered when volume bar is changed
volumeBar.onchange = () => {
    audio.volume = volumeBar.value / 100
}

// changes song on trigger
song1.onclick = () => {
    audio.src = audioSample[0]
    playPauseButton.className = "fa fa-play fa-lg"
}

song2.onclick = () => {
    audio.src = audioSample[1]
    playPauseButton.className = "fa fa-play fa-lg"
}

song3.onclick = () => {
    audio.src = audioSample[2]
    playPauseButton.className = "fa fa-play fa-lg"
}

song4.onclick = () => {
    audio.src = audioSample[3]
    playPauseButton.className = "fa fa-play fa-lg"
}

//mutes or unmutes on trigger
speakerImage.onclick = () => {
    if(muteState === 'unmute'){
        speakerImage.className = "fa fa-volume-off fa-lg"
        muteState = 'mute'
    } else {
        speakerImage.className = "fa fa-volume-up fa-lg"
        muteState = 'unmute'
    }
}

//LIVE CHANGE OF WIDTH PROPERTY FOR SLIDERS
const showRangeProgress = (rangeInput) => {
    if(rangeInput === seekBar) heroContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
    else if(rangeInput === rangeInput.min) heroContainer.style.setProperty('seek-before-width', 0);
    else heroContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
}


// muteState.onchange = () => {
//     if(muteState === 'mute'){
//         volumeBar.value = 0              FIX LATER
//     }
// }

//creates an event that allows the html value to update the number displayed for the volume
volumeBar.addEventListener('input', (e) => {
    const value = e.target.value;
  
    volumeOutput.textContent = value;
    audio.volume = value / 100;
  });

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




