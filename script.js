// Прелоадер с плавной остановкой авы
window.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const avatar = document.querySelector('.preloader-avatar');
    let angle = 0;

    function spinOnce() {
        avatar.style.transition = 'transform 1.2s linear';
        angle += 360;
        avatar.style.transform = `rotate(${angle}deg)`;
        setTimeout(() => {
            avatar.style.transition = 'transform 0.7s cubic-bezier(.4,2,.4,1)';
            avatar.style.transform = `rotate(${angle}deg)`;
            setTimeout(() => {
                spinOnce();
            }, 1000); // пауза 1 секунда
        }, 1200); // время оборота
    }

    setTimeout(spinOnce, 100);

    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 500);
    }, 1800);
});

// Просмотры (localStorage)
const viewsEl = document.getElementById('views-count');
let views = localStorage.getItem('asir-views') || 0;
views++;
localStorage.setItem('asir-views', views);
if (viewsEl) viewsEl.textContent = views;

// Discord copy
const discordBtn = document.getElementById('discord-btn');
if (discordBtn) {
    discordBtn.onclick = function() {
        navigator.clipboard.writeText('usrk.jar');
        this.innerHTML = '<span>Скопировано!</span><span class="arrow">&#8594;</span>';
        setTimeout(() => {
            this.innerHTML = '<span>Discord</span><span class="arrow">&#8594;</span>';
        }, 1200);
    };
}

// Плеер
const audio = document.getElementById('audio');
const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const seekBar = document.querySelector('.seek-bar');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

if (audio) {
    audio.addEventListener('loadedmetadata', () => {
        seekBar.max = Math.floor(audio.duration);
        durationEl.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
        seekBar.value = Math.floor(audio.currentTime);
        currentTimeEl.textContent = formatTime(audio.currentTime);
    });

    seekBar.addEventListener('input', () => {
        audio.currentTime = seekBar.value;
    });

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playBtn.innerHTML = '&#10073;&#10073;'; // пауза
        } else {
            audio.pause();
            playBtn.innerHTML = '&#9654;'; // play
        }
    });

    audio.addEventListener('ended', () => {
        playBtn.innerHTML = '&#9654;';
    });

    prevBtn.addEventListener('click', () => {
        audio.currentTime = 0;
    });

    nextBtn.addEventListener('click', () => {
        audio.currentTime = audio.duration;
    });
} 