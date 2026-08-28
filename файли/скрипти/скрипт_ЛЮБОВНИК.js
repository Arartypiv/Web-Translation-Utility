const loverFirstDiv = document.getElementById("loverFirstDiv");
const loverLastDiv  = document.getElementById("loverLastDiv");

const loverTimer    = document.getElementById("loverTimer")
const loverButton   = document.getElementById("loverButton");
const loverBG       = document.getElementById("loverBG");

const loverPhoto        = document.getElementById("loverPhoto")
const loverTitle        = document.getElementById("loverTitle");
const loverDescription  = document.getElementById("loverDescription");

const timeRequired = 5400;
const defaultMessage = "-.-";//"НАВЕДИ КУРСОР НА ДАТЧИК, ПРИКЛАДИ ВКАЗІВНИЙ ПАЛЕЦЬ ДО ПРАВОЇ КНОПКИ МИШІ І УТРИМУЙ 10 СЕК";
let pressTimer;
let startTime;
let countdownInterval;

let isButtonDown = false;

let lover_sound = new Music("ловелас_процес.wav");

function ResetLoverTest()
{
    loverFirstDiv.style.display = "block";
    loverLastDiv.style.display = "none";
}    

function startPress()
{
    if (isButtonDown == true)
        return;

    isButtonDown = true;

    console.log("startPress()");

    lover_sound.Play();

    startTime = Date.now();
    pressTimer = setTimeout(() => {
        const heldFor = ((Date.now() - startTime) / 1000).toFixed(1);
        ProduceLoverResults();
    }, timeRequired);

    countdownInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        loverTimer.innerHTML = Math.max(0, (timeRequired - elapsed) / 1000).toFixed(1);
    }, 100);

    loverBG.style.backgroundImage = "url('файли/зображення/ловелас_гіф.gif')";
}

function cancelPress()
{
    console.log("cancelPress()");
    isButtonDown = false;
    lover_sound.Stop();
    clearTimeout(pressTimer);
    clearInterval(countdownInterval);
    loverTimer.innerHTML = defaultMessage;
    
    loverBG.style.backgroundImage = "url('файли/зображення/ловелас_фон.jpg')";
}

loverButton.addEventListener("mousedown", startPress);
loverButton.addEventListener("mouseup", cancelPress);
loverButton.addEventListener("mouseleave", cancelPress);

loverButton.addEventListener("touchstart", startPress);
loverButton.addEventListener("touchend", cancelPress);

function ProduceLoverResults()
{
    cancelPress();

    loverFirstDiv.style.display = "none";
    loverLastDiv.style.display = "block";

    let score = GetRandom(1, 11);
    
    loverPhoto.src = `файли/зображення/тест_на_любовника/ловелас_${score}.jpg`;
    
    switch (score)
    {
        case 1:
            PlaySound("ловелас_погано.mp3");
            loverTitle.innerHTML       = "Ти - УРОД!";
            loverDescription.innerHTML = "Невпевнене, некомунікабельне, асоціальне, смердюче ЧМО. Навіщо ти взагалі народився?";
            break;
        case 2:
            PlaySound("ловелас_погано.mp3");
            loverTitle.innerHTML       = "Ти - ВОЛОЦЮГА!";
            loverDescription.innerHTML = "Тебе не кохають - тебе терплять. Романтика для тебе починається і закінчується словами «фу, подивіться на цього лузера». Шуруй з цього сайту, бо тобою аж крізь монітор смердить.";
            break;
        case 3:
            PlaySound("ловелас_таксобі.mp3");
            loverTitle.innerHTML       = "Ти - ЛОШОК!";
            loverDescription.innerHTML = "Мда, про таких як ти кажуть «мама не хотіла, тато не старався». Попри свою ущербність, зрідка тобі таки вдається закадрити якусь шаболду. Але навіть вона після побачення перевіряє, чи не вкрав ти у неї мобільник.";
            break;
        case 4:
            PlaySound("ловелас_таксобі.mp3");
            loverTitle.innerHTML       = "Ти - ТАКИЙ СОБІ!";
            loverDescription.innerHTML = "Ну ти наче й не страшний, але жінки розмовляють з тобою лише для того, щоби стрясти з тебе грошей. Зустрічатися з тобою - все одно що чай без цукру пити.";
            break;
        case 5:
            PlaySound("ловелас_таксобі.mp3");
            loverTitle.innerHTML       = "Ти - СЕРЕДНЯЧОК!";
            loverDescription.innerHTML = "Ти нічого такий хлоп. На цьому рівні жінки вже готові будувати з тобою стосунки, але особливою популярністю в чікуль ти не користуєшся.";
            break;
        case 6:
            PlaySound("ловелас_непогано.mp3");
            loverTitle.innerHTML       = "Ти - СИМПАТЯГА!";
            loverDescription.innerHTML = "Красивий та доволі впевнений хлопчик. Ти вже почав розуміти жіночу сутність та майстерно цим користуватися, але до підкорення Олімпу сексу тобі ще далеко.";
            break;
        case 7:
            PlaySound("ловелас_непогано.mp3");
            loverTitle.innerHTML       = "Ти - КАВАЛЕР!";
            loverDescription.innerHTML = "Ти дуже привабливий та харизматичний. Може, ти й не бог кохання, але ноги в жінок розсуваються від одного твого погляду.";
            break;
        case 8:
            PlaySound("ловелас_непогано.mp3");
            loverTitle.innerHTML       = "Ти - СЕРЦЕЇД!";
            loverDescription.innerHTML = "Ти справжній майстер у стосунках! Краль так і тягне до тебе немов магніт.";
            break;
        case 9:
            PlaySound("ловелас_добре.wav");
            loverTitle.innerHTML       = "Ти - ГУРУ КОХАННЯ!";
            loverDescription.innerHTML = "Легендарний досвід, неймовірна харизма, а в ліжку тобі нема рівних. Чоловіки заздрять, а жінки мріють бути з тобою.";
            break;
        case 10:
            PlaySound("ловелас_добре.wav");
            loverTitle.innerHTML       = "Ти - ЛОВЕЛАС!";
            loverDescription.innerHTML = "Еталон чоловіка. Статок, шарм, лібідо - ти досконалий в усьому. Жінки шикуються біля РАГСу аби послати своїх горе-чоловічків куди подалі. Неперевершений.";
            break;
    }
    
    console.log(score);
}

  loverButton.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  // Prevent RMB mouseup/down behavior
  loverButton.addEventListener("mousedown", (event) => {
    if (event.button === 2) {
      event.preventDefault();
    }
  });

  loverButton.addEventListener("mouseup", (event) => {
    if (event.button === 2) {
      event.preventDefault();
    }
  });