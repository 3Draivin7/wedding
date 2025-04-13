document.addEventListener('DOMContentLoaded', () => {
    const splashContent = document.querySelector('.splash_content');
    const content = document.querySelector('.content');
    const openInviteButton = document.querySelector('.open_invate');
    const closeIcon = document.querySelector('.close_icon');
    const audio = document.getElementById("SplashAudio");
    const playPauseButton = document.getElementById("playPauseButton");
    const songIcon = document.querySelector(".song_icon");
    const muteIcon = document.querySelector(".mute_icon");

    let isPlaying = false;
    const fadeDuration = 0.5; 

    function fadeOut(audioElement, duration) {
        const initialVolume = audioElement.volume;
        const fadeInterval = 50; // Интервал обновления громкости (в миллисекундах)
        const fadeSteps = duration * 1000 / fadeInterval;
        let currentStep = 0;

        const fadeOutInterval = setInterval(() => {
            const newVolume = initialVolume * (1 - currentStep / fadeSteps);
            audioElement.volume = Math.max(newVolume, 0);
            currentStep++;

            if (currentStep > fadeSteps) {
                clearInterval(fadeOutInterval);
                audioElement.pause();
                audioElement.volume = initialVolume; 
            }
        }, fadeInterval);
    }

    function fadeIn(audioElement, duration) {
        audioElement.volume = 0; 
        audioElement.play();
        const maxVolume = 1; 
        const fadeInterval = 50; 
        const fadeSteps = duration * 1000 / fadeInterval;
        let currentStep = 0;

        const fadeInInterval = setInterval(() => {
            const newVolume = maxVolume * (currentStep / fadeSteps);
            audioElement.volume = Math.min(newVolume, maxVolume); 
            currentStep++;

            if (currentStep > fadeSteps) {
                clearInterval(fadeInInterval);
                audioElement.volume = maxVolume; 
            }
        }, fadeInterval);
    }



    openInviteButton.addEventListener('click', () => {
        setTimeout(() => { // Небольшая задержка
            closeIcon.style.opacity = 0;

            if (audio) {
                fadeIn(audio, fadeDuration);
                isPlaying = true;
                songIcon.style.display = 'block';
                muteIcon.style.display = 'none';
            } else {
                console.error("Не удалось найти элемент audio!");
            }

            splashContent.classList.add('hidden');

            setTimeout(() => {
                splashContent.style.display = 'none';
                content.style.display = 'block';
            }, 1000);
        }, 50); // 50ms задержка
    });


    if (playPauseButton && audio && songIcon && muteIcon) {
        playPauseButton.addEventListener('click', () => {
            if (isPlaying) {
                fadeOut(audio, fadeDuration);
                songIcon.style.display = 'none';
                muteIcon.style.display = 'block';
            } else {
                fadeIn(audio, fadeDuration);
                songIcon.style.display = 'block';
                muteIcon.style.display = 'none';
            }
            isPlaying = !isPlaying;
        });
    } else {
        console.error("Не удалось найти кнопку Play/Pause, элемент audio или иконки!");
    }
});
