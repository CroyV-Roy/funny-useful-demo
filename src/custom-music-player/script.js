/* eslint-disable default-case */
/* eslint-disable prettier/prettier */
const wrapper = document.querySelector('.wrapper');

const musicImg = wrapper.querySelector('.img-area img');
const musicName = wrapper.querySelector('.song-details .name');
const musicArtist = wrapper.querySelector('.song-details .artist');

const repeatBtn = wrapper.querySelector("#repeat-plist");
const playPauseBtn = wrapper.querySelector('.play-pause');
const prevBtn = wrapper.querySelector('#prev');
const nextBtn = wrapper.querySelector('#next');

const mainAudio = wrapper.querySelector('#main-audio');
const progressArea = wrapper.querySelector('.progress-area');
const progressBar = progressArea.querySelector('.progress-bar');

const musicList = wrapper.querySelector('.music-list');
const moreMusic = wrapper.querySelector('#more-music');
const closeMusicBtn = musicList.querySelector('#close');

const ulTag = wrapper.querySelector("ul");

let musicIndex = Math.floor(Math.random() * allMusic.length + 1);
let isMusicPaused = true;

window.addEventListener('load', () => {
  initMusicList();
  loadMusic(musicIndex);
  playMusic();
})

function loadMusic(index) {
  musicName.textContent = allMusic[index - 1].name;
  musicArtist.textContent = allMusic[index - 1].artist;
  musicImg.src = `images/${allMusic[index - 1].src}.jpg`;
  mainAudio.src = `songs/${allMusic[index - 1].src}.mp3`;
}

function playMusic() {
  wrapper.classList.add('paused');
  playPauseBtn.querySelector('i').textContent = 'pause';
  mainAudio.play();
}

function pauseMusic() {
  wrapper.classList.remove('paused');
  playPauseBtn.querySelector('i').textContent = 'play_arrow';
  mainAudio.pause();
}

function prevMusic() {
  musicIndex--;
  musicIndex = musicIndex < 1 ? allMusic.length : musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong(); 
}

function nextMusic() {
  musicIndex++;
  musicIndex = musicIndex > allMusic.length ? 1 : musicIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong(); 
}

playPauseBtn.addEventListener('click', () => {
  const isMusicPlay = wrapper.classList.contains('paused');
  isMusicPlay ? pauseMusic() : playMusic();
  playingSong();
});

prevBtn.addEventListener('click', () => prevMusic());
nextBtn.addEventListener('click', () => nextMusic());

function initMusicList() {
  const ulTag = wrapper.querySelector("ul");
  for (let i = 0; i < allMusic.length; i++) {
    let liTag = `
      <li data-index="${i + 1}">
        <div class="row">
          <span>${allMusic[i].name}</span>
          <p>${allMusic[i].artist}</p>
        </div>
        <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
        <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
      </li>`;
    ulTag.insertAdjacentHTML('beforeend', liTag);

    let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
    liAudioTag.addEventListener("loadeddata", () => {
      let duration = liAudioTag.duration;
      let totalMin = Math.floor(duration / 60);
      let totalSec = Math.floor(duration % 60);
      if (totalSec < 10) {
        totalSec  = `0${totalSec}`;
      }
      liAudioDuartionTag.textContent = `${totalMin}:${totalSec}`;
      liAudioDuartionTag.setAttribute('t-duration', `${totalMin}:${totalSec}`)
    });
  }
}

mainAudio.addEventListener('timeupdate', (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector('.current-time');
  let musicDuration = wrapper.querySelector('.max-duration');

  mainAudio.addEventListener('loadeddata', () => {
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);

    if(totalSec < 10) { //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    musicDuration.textContent = `${totalMin}:${totalSec}`;
  });

  // update playing song current time
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) { //if sec is less than 10 then add 0 before it
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.textContent = `${currentMin}:${currentSec}`;
})

progressArea.addEventListener("click", (e) => {
  let progressWidth = progressArea.clientWidth; //getting width of progress bar
  let clickedOffsetX = e.offsetX; //getting offset x value
  let songDuration = mainAudio.duration; //getting song total duration
  
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic(); //calling playMusic function
  playingSong();
});

repeatBtn.addEventListener('click', () => {
  let getText = repeatBtn.textContent;
  switch (getText){
    case "repeat":
      repeatBtn.textContent = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeatBtn.textContent = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffled");
      break;
    case "shuffle":
      repeatBtn.textContent = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
})

mainAudio.addEventListener('ended', () => {
  let getText = repeatBtn.textContent;
  switch(getText) {
    case "repeat":
      nextMusic(); //calling nextMusic function
      break;
    case "repeat_one":
      mainAudio.currentTime = 0; //setting audio current time to 0
      loadMusic(musicIndex); //calling loadMusic function with argument, in the argument there is a index of current song
      playMusic(); //calling playMusic function
      break;
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusic.length) + 1); //genereting random index/numb with max range of array length
      do{
        randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      }while(musicIndex == randIndex); //this loop run until the next random number won't be the same of current musicIndex
      musicIndex = randIndex; //passing randomIndex to musicIndex
      loadMusic(musicIndex);
      playMusic();
      playingSong();
      break;
  }
});

function playingSong() {
  const allLiTag = ulTag.querySelectorAll('li');

  for (let i = 0; i < allLiTag.length; i++) {
    let audioTag = allLiTag[i].querySelector('.audio-duration');

    if (allLiTag[i].classList.contains('playing')) {
      allLiTag[i].classList.remove('playing');
      let adDuration = audioTag.getAttribute('t-duration');
      audioTag.textContent = adDuration;
    }

    if (allLiTag[i].dataset.index == musicIndex) {
      allLiTag[i].classList.add('playing');
      audioTag.textContent = 'Playing'
    }

    allLiTag[i].setAttribute('onclick', 'clicked(this)');
  }
}

function clicked(element) {
  let getLiIndex = element.dataset.index;
  musicIndex = getLiIndex;
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}

moreMusic.addEventListener('click', () => musicList.classList.toggle('show'))
closeMusicBtn.addEventListener('click', () => moreMusic.click())
