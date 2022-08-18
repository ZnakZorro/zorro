console.log("players.js")
const audio = document.querySelector('#stream')
const playPauseButton = document.querySelector('[name="play-pause"]')
const playPauseButtonIcon = playPauseButton.querySelector('i.fas')
const volumeControl = document.querySelector('[name="volume"]')
const currentlyPlaying = document.querySelector('.currently-playing-title')
const volumeButton = document.querySelector('[name="mute"]')
const volumeButtonIcon = volumeButton.querySelector('i.fas')

let isPlaying = false
let fetchInterval = null
let currentVolume = 0.66

audio.volume = currentVolume


/**
 * Fetches the currently playing
 * @returns {Promise<any>}
 */
 const fetchCurrentlyPlaying = () => fetch('http://pl-play.adtonos.com/tok-fm')
 .then(response => response.text())
 .then(data => {
    console.log(data);
    //currentlyPlaying.innerText = data.currentSong
 })



 /**
 * Adjusts the icon of the "mute" button based on the given volume.
 * @param volume
 */
const adjustVolumeIcon = volume => {
    volumeButtonIcon.classList.remove('fa-volume-off')
    volumeButtonIcon.classList.remove('fa-volume-down')
    volumeButtonIcon.classList.remove('fa-volume-up')
    volumeButtonIcon.classList.remove('fa-volume-mute')
  
    if (volume >= 0.75) {
      volumeButtonIcon.classList.add('fa-volume-up')
    }
  
    if (volume < 0.75 && volume >= 0.2) {
      volumeButtonIcon.classList.add('fa-volume-down')
    }
  
    if (volume < 0.2 && volume > 0) {
      volumeButtonIcon.classList.add('fa-volume-off')
    }
  
    if (volume === 0) {
      volumeButtonIcon.classList.add('fa-volume-mute')
    }
  }






  volumeControl.addEventListener('input', () => {
    console.log(input)
    const volume = parseFloat(volumeControl.value)
  
    audio.volume = currentVolume = volume
    currentVolume = volume
  
    adjustVolumeIcon(volume)
  })
  
  volumeButton.addEventListener('click', () => {
    if (audio.volume > 0) {
      adjustVolumeIcon(0)
      audio.volume = 0
      volumeControl.value = 0
    } else {
      adjustVolumeIcon(currentVolume)
      audio.volume = currentVolume
      volumeControl.value = currentVolume
    }
  })

  console.log(playPauseButton)
  playPauseButton.addEventListener('click', () => {
    console.log("playPauseButton")
    if (isPlaying) {
      audio.pause()
  
      playPauseButtonIcon.classList.remove('fa-pause')
      playPauseButtonIcon.classList.add('fa-play')
  
      clearInterval(fetchInterval)
      currentlyPlaying.innerText = 'Słuchamy radia'
    } else {
      audio.play()
  
      playPauseButtonIcon.classList.remove('fa-play')
      playPauseButtonIcon.classList.add('fa-pause')
      console.log("fetchCurrentlyPlaying()")
      //fetchCurrentlyPlaying()
      //fetchInterval = setInterval(fetchCurrentlyPlaying, 3000)
    }
  
    isPlaying = !isPlaying
  })


const radio0=()=>{
  document.getElementById("stream").src="https://pl-play.adtonos.com/tok-fm";
  document.querySelector(".currently-playing-label").textContent = "TOK-FM";
 audio.pause();
}
const radio1=()=>{
  document.getElementById("stream").src="https://stream.rcs.revma.com/ypqt40u0x1zuv";
  document.querySelector(".currently-playing-label").textContent = "Radio NŚ";
 audio.play()
}
const radio2=()=>{
  document.getElementById("stream").src="https://stream.rcs.revma.com/ye5kghkgcm0uv";
  document.querySelector(".currently-playing-label").textContent = "Radio 357";
 audio.pause();
 audio.play();
 
}
