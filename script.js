const target = document.getElementById('target');
const aimContainer = document.querySelector('.aim-container');
const targetSizeInput = document.getElementById('targetSize');
const containerSizeInput = document.getElementById('containerSize');
const startButton = document.getElementById('startButton');

target.addEventListener('click', () => {
    moveTarget();
});

containerSizeInput.addEventListener('input', () => {
    adjustContainerSize();
});

startButton.addEventListener('click', () => {
    startButton.disabled = true;
    moveTarget();
});

function moveTarget() {
    const targetSize = parseInt(targetSizeInput.value);
    const containerSize = parseInt(containerSizeInput.value);

    const maxX = containerSize - targetSize;
    const maxY = containerSize - targetSize;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    target.style.width = `${targetSize}px`;
    target.style.height = `${targetSize}px`;

    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
    startButton.disabled = false;
}

function adjustContainerSize() {
    const newContainerSize = parseInt(containerSizeInput.value);
    aimContainer.style.width = `${newContainerSize}px`;
    aimContainer.style.height = `${newContainerSize}px`;
}
