const track = document.getElementById("carouselTrack");
const items = document.querySelectorAll(".infoboxBG");
const pause = document.getElementById("infoboxPause");
const indicatorsContainer = document.getElementById("infoboxIndicators");
const totalItems = items.length;
let index = 0;
let isMoving = true;
let intervalID;

let timeInterval = 5000;



function update() {
    if (isMoving) { moveToNextSlide(); }
}
function moveToNextSlide() {
    index++;
    if (index >= totalItems) { index = 0; }
    track.style.transform = `translateX(-${index * 100}%)`;

    indicators.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}
function stopCarousel() {
    isMoving = false;
    clearInterval(intervalID)
    intervalID = null;

    pause.style.display = "block";
}
function resumeCarousel() {
    isMoving = true;
    intervalID ??= setInterval(update, timeInterval);

    pause.style.display = "none";
}

/* Створюємо індикатори*/
const indicators = [];
for (let i = 0; i < totalItems; i++) {
    const dot = document.createElement("div");
    dot.classList.add("indicator");
    dot.addEventListener("click", () => {
        index = i - 1;
        moveToNextSlide();
    });
    indicatorsContainer.appendChild(dot);
    indicators.push(dot);
}
index = -1;
update();
intervalID ??= setInterval(update, timeInterval);