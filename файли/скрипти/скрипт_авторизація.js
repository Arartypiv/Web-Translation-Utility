let IS_USER_LOGGED_IN = false;

function Login()
{
    const login = document.getElementById("loginInput").value;
    const password = document.getElementById("passwordInput").value;

    if (login.length < 6 || password.length < 8)
    {
        alert("Введіть дійсний логін / пароль.");
    }
    else
    {
        document.getElementsByTagName("button")[0].style.cursor = "wait";
        setTimeout(function()
        {
            document.getElementsByTagName("body")[0].style.cursor = "default";
            alert("503 SERVICE UNAVAILABLE AT vai_authorization_ukrnet");
        }, 1000);
    }
}

const emailList = ["arartypiv@ukr.net", "shvydkyi_ravlyk79@ukr.net", "betmarchuk.sasha@ukr.net", "notkefir@ukr.net", "cosmoman@mail.ru", "suleiman999@ukr.net", "shtangenzirkul@ukr.net"];
let valetPromptCounter = 0;
let hasValetPrompted = false;
const valetPromptAfter = 2;

function CheckEmail()
{
    let email = document.getElementById("emailInput").value;

    document.getElementsByTagName("body")[0].style.cursor = "wait";
    document.getElementsByTagName("button")[0].style.cursor = "wait";
    if (emailList.includes(email))
    {
        setTimeout(() => {
            EnableMinigames();
            document.getElementsByTagName("body")[0].style.cursor = "default";
            document.getElementsByTagName("button")[0].style.cursor = "default";
        }, 1000);
    }
    else
    {
        setTimeout(() => {
            alert("Вказана адреса не належить жодному акаунту.");
            document.getElementsByTagName("body")[0].style.cursor = "default";
            document.getElementsByTagName("button")[0].style.cursor = "default";
            ValetPromptCheck();
        }, 1000);
    }
}

let popupDelay = 1000;
let loginPrompt1 = "Схоже, у вас виникли труднощі з авторизацією.";
let loginPrompt2 = "Я можу допомогти вам увійти, але спершу вам необхідно пройти перевірку особистості.";
let loginPrompt3 = "Ви - Архітектор Артипів?";
let loginPrompt4a = "Вибачте, тоді не заважатиму.";
let loginPrompt4b = "Ах, Архітекторе! Радий вас бачити."
let loginPrompt4b1 = "Ваша пошта - arartypiv@ukr.net. Постарайтеся її більше не забувати.";
let loginPrompt4b2 = "На жаль вам все одно доведеться пройти додаткову перевірку - так вже влаштований сайт.";
let loginPrompt4b3 = "Побачимося на повній версії сайту.";

function ValetPromptCheck()
{
    valetPromptCounter += 1;
    if (valetPromptCounter >= valetPromptAfter && hasValetPrompted == false)
    {
        hasValetPrompted = true;

        let delay1 = 1000;
        let delay2 = delay1 + popupDelay;
        let delay3 = delay2 + valet_GetTimeForSpeech(loginPrompt1);
        let delay4 = delay3 + valet_GetTimeForSpeech(loginPrompt2);

        setTimeout(() => { public_MakeValetAppear("login"); }, delay1);
        setTimeout(() => { public_ValetSay(loginPrompt1); }, delay2);
        setTimeout(() => { public_ValetSay(loginPrompt2); }, delay3);
        setTimeout(() => { public_ValetPrompt(loginPrompt3, ["Так", "Ні"], ArtypivInitCheck, 30); }, delay4);
    }
}

function ArtypivInitCheck(value)
{
    // let chardelay = 75;
    switch (value)
    {
        case "Ні":
            setTimeout(() => { public_ValetSay(loginPrompt4a); }, 0);
            setTimeout(() => { public_FreeValet();             }, valet_GetTimeForSpeech(loginPrompt4a) + popupDelay);
            break;
    
        case "Так":
            let delay1 = 0;
            let delay2 = delay1 + valet_GetTimeForSpeech(loginPrompt4b);
            let delay3 = delay2 + valet_GetTimeForSpeech(loginPrompt4b1);
            let delay4 = delay3 + valet_GetTimeForSpeech(loginPrompt4b2);
            let delay5 = delay4 + valet_GetTimeForSpeech(loginPrompt4b3);

            setTimeout(() => { public_ValetSay(loginPrompt4b);  }, delay1);
            setTimeout(() => { public_ValetSay(loginPrompt4b1); document.getElementById("emailInput").value = "arartypiv@ukr.net";}, delay2);
            setTimeout(() => { public_ValetSay(loginPrompt4b2); }, delay3);
            setTimeout(() => { public_ValetSay(loginPrompt4b3); }, delay4);
            setTimeout(() => { public_FreeValet();              }, delay5);
            break;

        default:
            alert("ерор");
            window.location.reload();
            break;
    }
}

function EnableMinigames()
{    
    document.getElementById("minigameInfoDiv").style.display = "none";
    document.getElementById("minigameLinksDiv").style.display = "block";
    document.getElementById("minigameLink1").style.display = "table-cell";
    document.getElementById("minigameLink2").style.display = "none";
    document.getElementById("minigameLink3").style.display = "none";
}

function FirstMinigamePassed()
{
    document.getElementById("minigameLink2").style.display = "table-cell";
    document.getElementById("progressBar").value = Math.max(document.getElementById("progressBar").value, 100);
    document.getElementById("counter").innerText = Math.max(parseInt(document.getElementById("counter").innerText), 1);
}

function SecondMinigamePassed()
{
    document.getElementById("minigameLink3").style.display = "table-cell";
    document.getElementById("progressBar").value = Math.max(document.getElementById("progressBar").value, 200);
    document.getElementById("counter").innerText = Math.max(parseInt(document.getElementById("counter").innerText), 2);
}

function ThirdMinigamePassed()
{
    let val = document.getElementById("progressBar").value;
    document.getElementById("progressBar").value = Math.max(document.getElementById("progressBar").value, 300);
    document.getElementById("counter").innerText = Math.max(parseInt(document.getElementById("counter").innerText), 3);

    setTimeout(() => { alert("Перевірку пройдено."); }, 0);
    IS_USER_LOGGED_IN = true;
    setTimeout(() => { /*window.location.href = "головна_сторінка.html";*/ChangeWebsite("MAIN_PAGE"); }, 1000);
}

document.getElementById("owDiv").style.display = "none";