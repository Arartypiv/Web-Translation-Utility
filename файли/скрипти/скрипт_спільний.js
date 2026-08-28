const pageClass = "page";
const defaultPageClass1 = "aboutUs";
const defaultPageClass = "frontPage";
const transgenderChance = 20;

const BACKGROUND_COLOUR = "#85c7d7";
const BORDER_COLOUR = "#37879d";

let currentPage;

let isPageUnlocked = {
    "frontPage": true,
    "translator": false,
    "textGeneration": false,
    "photoGeneration": false,
    "radio": false,
    "aboutUs": false,
    "timeline": false,
    "gallery": false,
    "satelliteMap": false,
    "baubles": false
};

RollForLogo();
SwitchPages(defaultPageClass);

function SwitchPages(onClass)
{
    // special check 1
    if (onClass == "baublesREALNONOGRAM")
        nonogram_StartTimer();
    else
        nonogram_HaltTimer();

    // special check 2
    if (onClass == "rocket" && valet_GetLocation() == "rocket")
    {
        public_MakeValetAppear("rocket");
        valet_SetClickable(true);
    }
    else if (valet_GetLocation() == "rocket")
    {
        public_MakeValetDisappear("rocket");
    }

    
    const pages = document.getElementsByClassName(pageClass);
    for (let i = 0; i < pages.length; i++)
        pages[i].style.display = "none";

    if (isPageUnlocked[onClass] || !(onClass in isPageUnlocked))
        document.getElementsByClassName(onClass)[0].style.display = "block";
    else
        document.getElementsByClassName(onClass + "Locked")[0].style.display = "block";

    currentPage = onClass;
}

function RollForLogo()
{
    if (GetRandom(1, transgenderChance + 1) == 1)
    {
        document.getElementById("logoimg").src = "файли/зображення/логотип_ФАЛЬШ.png";
    }
}

function ToggleRadioTuning()
{
    let element = document.getElementsByClassName("radioTuning")[0];
    if (element.style.display == "none")
    {
        element.style.display = "block";
        document.getElementById("expandTuningButton").innerHTML = "Ʌ Налаштування радіо";
    }
    else
    {
        element.style.display = "none";
        document.getElementById("expandTuningButton").innerHTML = "V Налаштування радіо";
    }
}

let currentDomofonCombination = "";
let correctDomofonCombination = "07151129";

let domofonCanvas = null;
let domofonCtx = null;
const domofonBG = new Image();
domofonBG.src = "файли/зображення/домофон.png";

function ProcessDomofonButton(value)
{
    if (value == "C")
    {
        currentDomofonCombination = "";
        document.getElementById("domofonNumber").innerHTML = currentDomofonCombination;
        PlaySound("домофон_кнопка.mp3");
    }
    else if (value == "B")
    {
        if (currentDomofonCombination == correctDomofonCombination)
        {
            isPageUnlocked["translator"] = true;
            isPageUnlocked["textGeneration"] = true;
            isPageUnlocked["photoGeneration"] = true;
            isPageUnlocked["radio"] = true;

            document.getElementById("domofon").querySelectorAll("button").forEach(button => { button.disabled = true; });

            setTimeout(() => { PlaySound("домофон_виклик.mp3"); }, 0);
            setTimeout(() => { PlaySound("домофон_виклик.mp3"); }, 3500);
            setTimeout(() => { PlaySound("домофон_відкриття.mp3"); }, 5500);
            setTimeout(() => { SwitchPages(currentPage); }, 7000);
        }
        else
        {
            currentDomofonCombination = "";
            document.getElementById("domofonNumber").innerHTML = currentDomofonCombination;
            PlaySound("домофон_хиба.mp3");
        }
    }
    else
    {
        if (currentDomofonCombination.length >= correctDomofonCombination.length)
        {
            PlaySound("домофон_хиба.mp3");
        }
        else
        {
            currentDomofonCombination += value;
            document.getElementById("domofonNumber").innerHTML = currentDomofonCombination;
            PlaySound("домофон_кнопка.mp3");
        }
    }
}



//
// Замок №2 книжкова шафа
//

const bookshelf = document.getElementById("bookshelf");
const shelves = [...document.querySelectorAll("#bookshelf td")];
const bookWidth = 20;
const shelfWidth = 120;

const authors = ["Дельоз", "Шелдрейк", "Лафкадіо", "Кочерга", "Аль-Абаддон", "Режего", "Хорхе", "Соломон", "Макартур", "Небель", "Корольов", "Муньє", "Бероуз", "Геклер", "Кох", "Маузер", "Чічч", "С'Він", "Адонц", "Меясу", "Ніцше", "Ларуель", "Батай", "Накамура", "Гагарін"];
Shuffle(authors);

let favouriteBook = null;

function SetUpBookshelf()
{
    for (let i = 0; i < shelves.length; i++)
    {
        let seriesHeight = GetRandom(12, 18) * 5;
        
        let colValues = [GetRandom(80, 120), GetRandom(100, 150), 160];
        Shuffle(colValues);
        Shuffle(colValues);
        Shuffle(colValues);
        let seriesColour = `rgb(${colValues[0]}, ${colValues[1]}, ${colValues[2]})`;

        let fun = GetRandom(0, 100);
        if (fun < 15)
            for (let j = bookWidth; j < shelfWidth; j += bookWidth)
                AddBook(shelves[i], j, 0, 20, seriesHeight, `${authors[i]}-${j / bookWidth}`, seriesColour);
        else if (fun >= 85)
            for (let j = 0; j < shelfWidth - bookWidth; j += bookWidth)
                AddBook(shelves[i], j, 0, 20, seriesHeight, `${authors[i]}-${j / bookWidth + 1}`, seriesColour);
        else
            for (let j = 0; j < shelfWidth; j += bookWidth)
                AddBook(shelves[i], j, 0, 20, seriesHeight, `${authors[i]}-${j / bookWidth + 1}`, seriesColour);
    }

    favouriteBook = GetRandomElementOfArray(authors) + "-" + GetRandom(1, 6); // no, it's not a typo
    //console.log(favouriteBook);
    document.getElementById(favouriteBook).onclick = function () {
        document.getElementById(favouriteBook).onclick = function () { /* do nothing */ };
        isPageUnlocked["aboutUs"] = true;
        isPageUnlocked["timeline"] = true;
        isPageUnlocked["gallery"] = true;
        isPageUnlocked["satelliteMap"] = true;
        PlaySound("камінь.mp3");
        setTimeout(() => { SwitchPages(currentPage); }, 2000);
    };
}

function AddBook(parent, x, y, width, height, text, colour) {
    const div = document.createElement("div");
    Object.assign(div.style, {
        position: "absolute",
        left:   `${x + width}px`, /* cuz it's rotated and this shift */
        bottom: `${y}px`,
        width:  `${height}px`, /* it's rotated so they are swapped */
        height: `${width}px`,
        background: colour,
        boxSizing: `border-box`,
        border: "1px solid rgba(0, 0, 0, 0.5)"
    });
    div.classList.add("bookTitle");
    div.classList.add("zoomableBook");
    div.id = text;
    div.innerHTML = text;
    parent.appendChild(div);
    return div;
}

SetUpBookshelf();

//
// lock 3 asteroid
//

function CheckAsteroid()
{
    if (document.getElementById("asteroidTextbox").value.toLowerCase() == asteroidName.toLowerCase())
    {
        document.getElementById("asteroidButton").onclick = function () { /* do nothing */ };
        isPageUnlocked["baubles"] = true;
        PlaySound(`/ноти/Glockenspiel/note (7).mp3`);
        setTimeout(() => { SwitchPages(currentPage); }, 1000);
    }
    else
    {
        document.getElementById("asteroidTextbox").value = "";
        PlaySound("домофон_хиба.mp3");
    }
}

function skip()
{
    // unlock all pages
    for (let key of Object.keys(isPageUnlocked))
        isPageUnlocked[key] = true;
    // solve music puzzle
    SkipKatawaPuzzle();
    // guess
    GiveRootAccess();
    //
    EnableTopButtons("tpRocket");
}

let FLAG_FOUND_CARDS = false;

function EnableTopButtons(id)
{
    PlaySound("клу.wav");
    let button = document.getElementById(id);
    button.style.opacity = 1;
    button.style.cursor = "pointer";
    switch (id)
    {
        case "tpConsole":
            button.onclick = function () { WriteInitText(); TransitionToWebsite('CONSOLE_PAGE'); };
            break;
        case "tpRocket":
            button.onclick = function () { SwitchPages('rocket'); };
            break;
        case "tpRoom":
            button.onclick = function () { EnterRoom(); };
            break;
        case "bb4":
            document.getElementById("cardBox").style.opacity = "0";
            document.getElementById("cardBox").onclick = function () { /* nothing */ };
            document.getElementById("cardBox").style.cursor = "auto";
            FLAG_FOUND_CARDS = true;
            button.onclick = function () { DrawCards(); }
            break;
    }
}
EnableTopButtons("tpConsole");


let opacityCens1 = 0;
let opacityCens2 = 0;
let opacityCens3 = 0;
let opacityCens4 = 0;
let censSteps = 25;
function ScribbleCensorship(id)
{
    let elem = document.getElementById(id);
    switch (id)
    {
        case "censored1":
            if (opacityCens1 < censSteps)
            {
                opacityCens1 += 1;
                PlaySound("таумшурхіт.ogg");
            }
            elem.style.backgroundColor = `rgba(0, 0, 0, ${Math.sqrt(-opacityCens1 + censSteps) / Math.sqrt(censSteps)})`;
            break;
        case "censored2":
            if (opacityCens2 < censSteps)
            {
                opacityCens2 += 1;
                PlaySound("таумшурхіт.ogg");
            }
            elem.style.backgroundColor = `rgba(0, 0, 0, ${Math.sqrt(-opacityCens2 + censSteps) / Math.sqrt(censSteps)})`;
            break;
        case "censored3":
            if (opacityCens3 < censSteps)
            {
                opacityCens3 += 1;
                PlaySound("таумшурхіт.ogg");
            }
            elem.style.backgroundColor = `rgba(0, 0, 0, ${Math.sqrt(-opacityCens3 + censSteps) / Math.sqrt(censSteps)})`;
            break;
        case "censored4":
            if (opacityCens4 < censSteps)
            {
                opacityCens4 += 1;
                PlaySound("таумшурхіт.ogg");
            }
            elem.style.backgroundColor = `rgba(0, 0, 0, ${Math.sqrt(-opacityCens4 + censSteps) / Math.sqrt(censSteps)})`;
            break;
    }
}





//skip();