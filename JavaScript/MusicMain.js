const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    volumeBtn = document.getElementById('volume'),
    volume = document.getElementById('volume-adjust'),
    playerVolume = document.getElementById('volume-background');

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
        path: '../Assets/Musics/FKJ/Ylang-Ylang.mp3',
        displayName: 'Ylang Ylang',
        cover: '../Assets/Thumbs/FKJ/ylang-ylang.png',
        artist: 'FKJ'
    },
    {
        path: '../Assets/Musics/seu-jorge/mina-do-condomínio.mp3',
        displayName: 'Mina do Condomínio',
        cover: '../Assets/Thumbs/seu-jorge/mina-do-condomínio.png',
        artist: 'Seu Jorge'
    },
    {
        path: '../Assets/Musics/FKJ/Tadow.mp3',
        displayName: 'Tadow',
        cover: '../Assets/Thumbs/FKJ/Tadow.png',
        artist: 'FKJ'
    }
];
let musicIndex = 1;
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
    playBtn.classList.replace('bi-play-fill', 'bi-pause-fill');
    playBtn.setAttribute('title', 'Pause');
    music.play().catch(err => console.error('Error playing music:', err));
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('bi-pause-fill', 'bi-play-fill');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    music.load();
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };
    durationEl.textContent = formatTime(duration || 0);
    currentTimeEl.textContent = formatTime(currentTime);
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

function setVolume(e) {
    const width = playerVolume.clientWidth;
    const clickX = e.offsetX;
    const percent = (clickX / width) * 100;
    volume.style.width = `${percent}%`;

    MusicVolume = percent / 100

    if (MusicVolume > 0.5) {
        volumeBtn.classList.remove('bi-volume-down-fill', 'bi-volume-mute-fill');
        volumeBtn.classList.add('bi-volume-up-fill');
    } else if (MusicVolume > 0) {
        volumeBtn.classList.remove('bi-volume-up-fill', 'bi-volume-mute-fill');
        volumeBtn.classList.add('bi-volume-down-fill');
        console.log('0.5')
    } else {
        volumeBtn.classList.remove('bi-volume-up-fill', 'bi-volume-down-fill');
        volumeBtn.classList.add('bi-volume-mute-fill');
        console.log('0')
    }

    music.volume = percent / 100;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
artist.addEventListener("click", function Artist() {
    let author = (songs[musicIndex].artist);
    window.location.href = '../HTML/artist-Page.html?artist=' + author;
});
playerProgress.addEventListener('click', setProgressBar);
playerVolume.addEventListener('click', setVolume);

volumeBtn.addEventListener('click', function Mute() {
    if (music.volume !== 0) {
        MusicVolume = music.volume;
        music.volume = 0;
        volume.style.width = `${0}%`;
        volumeBtn.classList.replace('bi-volume-up-fill', 'bi-volume-mute-fill');
        volumeBtn.setAttribute('title', 'Unmute');
    } else {
        music.volume = MusicVolume;
        volume.style.width = `${MusicVolume * 100}%`;
        volumeBtn.classList.replace('bi-volume-mute-fill', 'bi-volume-up-fill');
        volumeBtn.setAttribute('title', 'Mute');
    }
});

volumeBtn.addEventListener('mouseenter', function open() {
    playerVolume.style.width = `${1 * 100}px`
})

document.getElementById('volume-control').addEventListener('mouseleave', function close() {
    playerVolume.style.width = 0
})

loadMusic(songs[musicIndex]);
