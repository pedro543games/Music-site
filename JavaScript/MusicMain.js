const imageEls = document.querySelectorAll('#cover'),
    titleEls = document.querySelectorAll('#music-title'),
    artistEls = document.querySelectorAll('#music-artist'),
    currentTimeEls = document.querySelectorAll('#current-time'),
    durationEls = document.querySelectorAll('#duration'),
    progressEls = document.querySelectorAll('#progress'),
    playerProgressEls = document.querySelectorAll('#player-progress'),
    prevBtnEls = document.querySelectorAll('#prev'),
    nextBtnEls = document.querySelectorAll('#next'),
    playBtnEls = document.querySelectorAll('#play'),
    volumeBtnEls = document.querySelectorAll('#volume'),
    volumeEls = document.querySelectorAll('#volume-adjust'),
    playerVolumeEls = document.querySelectorAll('#volume-background')


const music = new Audio();
let MusicVolume = 1;
const songs = [
    {
        path: './Assets/Musics/7-minutoz/JUDAS.mp3',
        displayName: 'Judas',
        cover: './Assets/Thumbs/7-minutoz/judas.png',
        artist: '7 Minutoz'
    },
    {
        path: './Assets/Musics/seu-jorge/amiga-da-minha-mulher.mp3',
        displayName: 'Amiga da minha mulher',
        cover: './Assets/Thumbs/seu-jorge/amiga-da-minha-mulher.png',
        artist: 'Seu Jorge'
    },
    {
        path: './Assets/Musics/FKJ/Ylang-Ylang.mp3',
        displayName: 'Ylang Ylang',
        cover: './Assets/Thumbs/FKJ/ylang-ylang.png',
        artist: 'FKJ'
    },
    {
        path: './Assets/Musics/seu-jorge/mina-do-condomínio.mp3',
        displayName: 'Mina do Condomínio',
        cover: './Assets/Thumbs/seu-jorge/mina-do-condomínio.png',
        artist: 'Seu Jorge'
    },
    {
        path: './Assets/Musics/FKJ/Tadow.mp3',
        displayName: 'Tadow',
        cover: './Assets/Thumbs/FKJ/Tadow.png',
        artist: 'FKJ'
    }
];
let musicIndex = (localStorage.getItem('musicIndex') || 1);
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playBtnEls.forEach(playBtn => playBtn.classList.replace('bi-play-fill', 'bi-pause-fill'));
    playBtnEls.forEach(playBtn => playBtn.setAttribute('title', 'Pause'));
    sessionStorage.setItem('isPlaying', 'true');
    music.play().catch(err => console.error('Error playing music:', err));
}

function pauseMusic() {
    isPlaying = false;
    playBtnEls.forEach(playBtn => playBtn.classList.replace('bi-pause-fill', 'bi-play-fill'));
    playBtnEls.forEach(playBtn => playBtn.setAttribute('title', 'Play'));
    sessionStorage.setItem('isPlaying', 'false');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    titleEls.forEach(titleEl => titleEl.textContent = song.displayName);
    artistEls.forEach(artistEl => artistEl.textContent = song.artist);
    imageEls.forEach(imageEl => imageEl.src = song.cover);
    music.load();
}

function changeMusic(direction) {
    if (direction === -1 && music.currentTime > 4) {
        music.currentTime = 0;
    } else {
        musicIndex = (musicIndex + direction + songs.length) % songs.length;
        loadMusic(songs[musicIndex]);
        playMusic();
    }

    localStorage.setItem('musicIndex', musicIndex);
}

function updateProgressBar() {
    localStorage.setItem('musicTime', music.currentTime);
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progressEls.forEach(progressEl => progressEl.style.width = `${progressPercent}%`);
    
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };
    durationEls.forEach(durationEl => durationEl.textContent = formatTime(duration || 0));
    currentTimeEls.forEach(currentTimeEl => currentTimeEl.textContent = formatTime(currentTime));
}

function setVolume(e) {
    const width = playerVolumeEls[0].clientWidth;
    const clickX = e.offsetX;
    const percent = (clickX / width) * 100;
    volumeEls.forEach(volumeEl => volumeEl.style.width = `${percent}%`);
    
    MusicVolume = percent / 100;
    if (MusicVolume > 0.5) {
        volumeBtnEls.forEach(volumeBtn => volumeBtn.classList.remove('bi-volume-down-fill', 'bi-volume-mute-fill'));
        volumeBtnEls.forEach(volumeBtn => volumeBtn.classList.add('bi-volume-up-fill'));
    } else if (MusicVolume > 0) {
        volumeBtnEls.forEach(volumeBtn => volumeBtn.classList.remove('bi-volume-up-fill', 'bi-volume-mute-fill'));
        volumeBtnEls.forEach(volumeBtn => volumeBtn.classList.add('bi-volume-down-fill'));
    } else {
        volumeBtnEls.forEach(volumeBtn => volumeBtn.classList.remove('bi-volume-up-fill', 'bi-volume-down-fill'));
        volumeBtnEls.forEach(volumeBtn => volumeBtn.classList.add('bi-volume-mute-fill'));
    }

    music.volume = MusicVolume;
}

playBtnEls.forEach(playBtn => playBtn.addEventListener('click', togglePlay));
prevBtnEls.forEach(prevBtn => prevBtn.addEventListener('click', () => changeMusic(-1)));
nextBtnEls.forEach(nextBtn => nextBtn.addEventListener('click', () => changeMusic(1)));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
artistEls.forEach(artist => artist.addEventListener("click", function() {
    let author = (songs[musicIndex].artist);
    window.location.href = './HTML/artist-Page.html?artist=' + author;
}));
playerProgressEls.forEach(progressEl => {
    progressEl.addEventListener('click', function(e) {
        const width = progressEl.clientWidth;
        const clickX = e.offsetX;
        music.currentTime = (clickX / width) * music.duration;
    });
});
playerVolumeEls.forEach(playerVolume => playerVolume.addEventListener('click', setVolume));

volumeBtnEls.forEach(volumeBtn => volumeBtn.addEventListener('click', function() {
    if (music.volume !== 0) {
        MusicVolume = music.volume;
        music.volume = 0;
        volumeEls.forEach(volumeEl => volumeEl.style.width = '0%');
        volumeBtnEls.forEach(volumeBtn => volumeBtn.classList.replace('bi-volume-up-fill', 'bi-volume-mute-fill'));
        volumeBtnEls.forEach(volumeBtn => volumeBtn.setAttribute('title', 'Unmute'));
    } else {
        music.volume = MusicVolume;
        volumeEls.forEach(volumeEl => volumeEl.style.width = `${MusicVolume * 100}%`);
        volumeBtnEls.forEach(volumeBtn => volumeBtn.classList.replace('bi-volume-mute-fill', 'bi-volume-up-fill'));
        volumeBtnEls.forEach(volumeBtn => volumeBtn.setAttribute('title', 'Mute'));
    }
}));

volumeBtnEls.forEach(volumeBtn => volumeBtn.addEventListener('mouseenter', function() {
    playerVolumeEls.forEach(playerVolume => playerVolume.style.width = '100px');
}));

document.getElementById('volume-control').addEventListener('mouseleave', function() {
    playerVolumeEls.forEach(playerVolume => playerVolume.style.width = '0');
});

music.currentTime = localStorage.getItem('musicTime') || 0;
if (sessionStorage.getItem('isPlaying') === 'true') {
    isPlaying = true;
    loadMusic(songs[musicIndex]);
    playMusic();
} else {
    loadMusic(songs[musicIndex]);
}
