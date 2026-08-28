let blackScreen = null;

let isSvinMaskOn = false;
function ToggleLights()
{
    // якщо темно
    if (blackScreen != null)
    {   
        if (isSvinMaskOn)
        {
            PlaySound("хрю.ogg");
            setTimeout(() =>
            {
                valet_ChangeSprite("валет.png");
                FoundMaskPig();
            }, 1000);
        }
        let mtrcnvs = document.getElementById("mtrcnvs");
        if (mtrcnvs != null)
        {
            mtrcnvs.style.backgroundColor = BACKGROUND_COLOUR;
            mtrcnvs.style.borderColor = BORDER_COLOUR;
        }
        blackScreen.remove();
        startTimer();
        blackScreen = null;
        return;
    }

    // світло горить

    blackScreen = document.createElement("div");
    blackScreen.style.position = "fixed";
    blackScreen.style.top = -100 + "px";
    blackScreen.style.left = -100 + "px";
    blackScreen.style.width = "200%";
    blackScreen.style.height = "200%";
    blackScreen.style.backgroundColor = "black";
    blackScreen.style.pointerEvents = "none";
    blackScreen.style.zIndex = 8000;
    document.body.append(blackScreen);

    // set svin mask
    if (GetRandom(0, 20) == 0 && valet_IsValetOn()) // 1 in 20
    {
        valet_ChangeSprite("валет_свиня.png");
        isSvinMaskOn = true;
    }

    pauseTimer();
}


/* ЛІЧИЛЬНИК */

window.onload = function () { startTimer(); };

let tenthsOfsecond = 0;
let timer = null;
let areLightsOn = false;
let isMeterOn = false;
let meterCanvas = null;
let meterCtx = null;
const counterBG = new Image();
counterBG.src = "файли/зображення/лічильник.png";

function startTimer()
{
    if (!areLightsOn)
    {
        areLightsOn = true;
        timer = setInterval(() =>
        {
            tenthsOfsecond++;
            if (isMeterOn)
                DrawMeter();
        }, 100);
    }
}

function pauseTimer()
{
    clearInterval(timer);
    areLightsOn = false;
}

function ToggleMeter()
{
    if (isMeterOn)
    {
        meterCanvas.remove();
        meterCanvas = null;
        meterCtx = null;
        isMeterOn = false;
        return;
    }

        isMeterOn = true;

    meterCanvas = document.createElement("canvas");

    meterCanvas.style.position = "fixed";
    meterCanvas.style.top = "49.7%";
    meterCanvas.style.left = "50%";
    meterCanvas.style.transform = "translate(-50%, -50%)";
    meterCanvas.style.width = "400px";
    meterCanvas.style.height = "500px";
    meterCanvas.style.pointerEvents = "none";
    meterCanvas.classList.add("defaultDiv");
    meterCanvas.classList.add("mainShadow");
    meterCanvas.id = "mtrcnvs";

    if (!areLightsOn)
    {
        meterCanvas.style.backgroundColor = "black";
        meterCanvas.style.borderColor = "black";
    }

    document.body.append(meterCanvas);
    meterCtx = document.getElementById("mtrcnvs").getContext("2d");
    DrawMeter();
}

function DrawMeter()
{
    meterCanvas.width = counterBG.naturalWidth;//document.getElementById("mapCanvas").getBoundingClientRect().width * 2;
    meterCanvas.height = counterBG.naturalHeight + 20;//document.getElementById("mapCanvas").getBoundingClientRect().height * 2;

    meterCtx.imageSmoothingEnabled = false;

    meterCtx.drawImage(counterBG, 0, 20);
    
    meterCtx.fillStyle = "#e5e5e5";
    meterCtx.font = "26px consolas";
    
    
    let value = String(tenthsOfsecond).padStart(7, '0');
    let interval = 24;
    meterCtx.fillText(value.charAt(0), 80 + 0 * interval, 132);
    meterCtx.fillText(value.charAt(1), 80 + 1 * interval, 132);
    meterCtx.fillText(value.charAt(2), 80 + 2 * interval, 132);
    meterCtx.fillText(value.charAt(3), 80 + 3 * interval, 132);
    meterCtx.fillText(value.charAt(4), 80 + 4 * interval, 132);
    meterCtx.fillText(value.charAt(5), 80 + 5 * interval, 132);
    meterCtx.fillText(value.charAt(6), 224, 132);
}

const suits = ["spades", "clubs", "hearts", "diamonds"];
const values = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
let cardPermutations = [];
let shuffledTimes = 0;

function GetNewDeck()
{
    for (const suit of suits)
        for (const value of values)
            cardPermutations.push(`${value}_of_${suit}.png`);
    ShuffleDeck();
}

function ShuffleDeck()
{
    shuffledTimes += 1;

    PlaySound("тасування.mp3");
    Shuffle(cardPermutations);
    Shuffle(cardPermutations);
    Shuffle(cardPermutations);

    if (shuffledTimes == 2)
    {
        cardPermutations.push("back_of_pig.png");
        cardPermutations.push("front_of_pig.png");
        setTimeout(() =>
        {
            PlaySound("хрю.ogg");
            FoundCardPig();
        }, 1100);
    }
}

let isDrawingCards = false;
let isFirstTimeDrawingCards = true;
let valetCardCounter = 0;

function DrawCards()
{
    let delay = 0;

    if (isDrawingCards)
        return;

    if (cardPermutations.length == 0)
    {
        delay = 1000;
        GetNewDeck();
    }

    setTimeout(() =>
    {
        isDrawingCards = true;

        let button = document.getElementById("bb4");

        let card1 = document.getElementById("cardFace1");
        let card2 = document.getElementById("cardFace2");

        if (isFirstTimeDrawingCards)
            card1.parentNode.style.visibility = "visible";

        card1.style.backgroundImage = `url('файли/зображення/карти/${cardPermutations.pop()}')`;
        PlaySound("карта2.mp3");

        setTimeout(() =>
        {
            if (isFirstTimeDrawingCards)
            {
                card2.parentNode.style.visibility = "visible";
                isFirstTimeDrawingCards = false;
            }
            card2.style.backgroundImage = `url('файли/зображення/карти/${cardPermutations.pop()}')`;
            PlaySound("карта1.mp3");
            isDrawingCards = false;

            if (valet_IsValetOn())
                CheckForValets();
        }, 200);
    }, delay);
}

let chnce = 1; // 1 in ?
function CheckForValets()
{
    let card1 = document.getElementById("cardFace1").style.backgroundImage.toString();
    let card2 = document.getElementById("cardFace2").style.backgroundImage.toString();

    if (card1.includes("jack") && card2.includes("jack"))
        public_ValetSay(GetRandomElementOfArray(["Хе-хе, два валети.", "Ого, два валети.", "Нічого собі, два валети."]));
    else if (card1.includes("jack") || card2.includes("jack"))
        if (GetRandom(0, chnce) == 0)
            public_ValetSay(GetRandomElementOfArray(["Хе-хе, валет.", "О, валет.", "Хе-хе, мій тезка.", "Валетик."]));
}