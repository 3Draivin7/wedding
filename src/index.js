import "./styles/index.css";



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
//////////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {

    var element = document.querySelector(".sound_button");
    if (!element) {
      console.error("Element with class 'sound_button' not found.");
      return;
    }

    var soundSection = document.querySelector(".sound");
    if (!soundSection) {
      console.error("Element with class 'sound' not found.");
      return;
    }

    let isFixed = false; 
    const threshold = 5;

    window.addEventListener('scroll', function() {
      const rect = soundSection.getBoundingClientRect();

      if (rect.top <= threshold && !isFixed) {
        element.classList.add("fixed");
        isFixed = true;
      } else if (rect.top > threshold && isFixed) {
        element.classList.remove("fixed");
        isFixed = false;
      }

    });

  const images = document.querySelectorAll('.circle_image');
   const imageStates = {};

   images.forEach(image => {
       const id = image.dataset.imageId; // Получите атрибут data-image-id
       if (id) {
           imageStates[id] = { appeared: false };
       } else {
           console.warn("Изображение без data-image-id:", image);
       }
   });

   function checkImagePosition() {
       images.forEach(image => {
           const id = image.dataset.imageId;
           if (!id) return;

           const imageState = imageStates[id];

           if (!imageState) {
               console.warn("Не найдено состояние для изображения с data-image-id:", id);
               return;
           }

           if (imageState.appeared) {
               return;
           }

           const rect = image.getBoundingClientRect();
           const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
           const distanceToCenter = Math.abs((rect.top + rect.height / 2) - (windowHeight / 2));
           const threshold = 100;

           if (distanceToCenter < threshold) {
               image.classList.add('appearance');
               imageState.appeared = true;
           }
       });

       requestAnimationFrame(checkImagePosition);
   }

   checkImagePosition();

    const timingItems = document.querySelectorAll('.timing_block > li');

    const timingObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeIn');
                timingObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '80% 0px -20% 0px'
    });

    timingItems.forEach(item => {
        timingObserver.observe(item);
    });
});

/////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    const countdownDate = new Date('2025-09-12 12:00:00').getTime();
  
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
  
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = countdownDate - now;
  
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      daysEl.innerText = String(days).padStart(3, '0');
      hoursEl.innerText = String(hours).padStart(2, '0');
      minutesEl.innerText = String(minutes).padStart(2, '0');
      secondsEl.innerText = String(seconds).padStart(2, '0');
    }
  
    updateCountdown(); 
    const countdownInterval = setInterval(updateCountdown, 1000);
  });