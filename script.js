document.addEventListener('DOMContentLoaded', () => {
    const target = document.getElementById('target');
    const aimContainer = document.querySelector('.aim-container');
    const presetSelect = document.getElementById('preset');
    const timerDisplay = document.getElementById('timer');
    const popup = document.getElementById('popup');
    const popupTime = document.getElementById('popupTime');
    const closePopupButton = document.getElementById('closePopup');
    const presetSettingsDisplay = document.getElementById('presetSettings');

    let remainingTargets = 0;
    let timerInterval;
    let gameStarted = false;
    let startTime;

    const presetDurations = {
        easy: 30,
        medium: 20,
        hard: 15
    };

    function startGame() {
        gameStarted = true;
        startTime = Date.now();
        startTimer(presetDurations[presetSelect.value]);
        moveTarget();
    }

    function resetGame() {
        clearInterval(timerInterval);
        gameStarted = false;
        remainingTargets = 0;
        target.style.pointerEvents = 'auto';
        presetSettingsDisplay.style.display = 'block';
    }

    target.addEventListener('click', () => {
        if (!gameStarted) {
            startGame();
        } else if (remainingTargets > 0) {
            remainingTargets--;
            moveTarget();
            if (remainingTargets === 0) {
                showPopupWithTime();
            }
        }
    });

    closePopupButton.addEventListener('click', () => {
        popup.style.display = 'none';
        resetGame();
        location.reload(); // Reload the page
    });

    presetSelect.addEventListener('change', applyPreset);

    function updatePresetSettingsDisplay(targetSize, containerSize, numTargets, duration) {
        presetSettingsDisplay.innerHTML = `
            <p><strong>Preset Settings:</strong></p>
            <p>Target Size: ${targetSize}px</p>
            <p>Container Size: ${containerSize}px</p>
            <p>Number of Targets: ${numTargets}</p>
            <p>Duration: ${duration} seconds</p>
        `;
    }

    function applyPreset() {
        const preset = presetSelect.value;
        switch (preset) {
            case 'easy':
                applySettings(50, 400, 10, presetDurations['easy']);
                updatePresetSettingsDisplay(50, 400, 10, presetDurations['easy']);
                break;
            case 'medium':
                applySettings(40, 500, 15, presetDurations['medium']);
                updatePresetSettingsDisplay(40, 500, 15, presetDurations['medium']);
                break;
            case 'hard':
                applySettings(30, 600, 20, presetDurations['hard']);
                updatePresetSettingsDisplay(30, 600, 20, presetDurations['hard']);
                break;
            default:
                break;
        }
    }

    function applySettings(targetSize, containerSize, numTargets, duration) {
        target.style.width = `${targetSize}px`;
        target.style.height = `${targetSize}px`;
        aimContainer.style.width = `${containerSize}px`;
        aimContainer.style.height = `${containerSize}px`;
        remainingTargets = numTargets;
        timerDisplay.textContent = `Time: ${duration}s`;
    }

    applyPreset();

    function showPopupWithTime() {
        const endTime = Date.now();
        const elapsedTime = (endTime - startTime) / 1000;
        popupTime.textContent = elapsedTime.toFixed(2);
        popup.style.display = 'flex';
        target.style.pointerEvents = 'none';
        presetSettingsDisplay.style.display = 'none';
        closePopupButton.removeEventListener('click', resetGame);
        closePopupButton.addEventListener('click', () => {
            popup.style.display = 'none';
            resetGame();
        });
    }

    function startTimer(duration) {
        let timer = duration;

        timerInterval = setInterval(() => {
            timer -= 0.1; // Decrease timer by 0.1 seconds
            timerDisplay.textContent = `Time: ${timer.toFixed(1)}s`;

            if (timer <= 0 || remainingTargets <= 0) {
                clearInterval(timerInterval);
                showPopupWithTime();
            }
        }, 100);
    }

    function moveTarget() {
        const targetSize = parseInt(target.style.width);
        const containerSize = parseInt(aimContainer.style.width);

        const maxX = containerSize - targetSize;
        const maxY = containerSize - targetSize;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        target.style.left = `${randomX}px`;
        target.style.top = `${randomY}px`;
    }
});
