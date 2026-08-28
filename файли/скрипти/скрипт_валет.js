const valet_sprite = new Image();
valet_sprite.src = "файли/зображення/валет.png";

let valet = null;
let speechBubble = null;
let valetLocation = "room";

let bb_lament = new Music("bb_lament.mp3");

function valet_IsValetOn()
{
    if (valet != null)
        return true;
    else
        return false;
}

//
// VALET
//

function valet_CreateValet(parentElement=document.body)
{
    if (valet_IsValetOn())
        return;

    valet = document.createElement("div");
    
    valet.style.position = "fixed";
    valet.style.width    = valet_sprite.naturalWidth  * 100 / window.innerWidth  * 2 + "%";
    valet.style.minWidth = 130 + "px";
    valet.style.height   = valet_sprite.naturalHeight * 100 / window.innerHeight * 2 + "%";
    valet.style.left     = 10000 + "%";
    valet.style.bottom   = 10000 + "%";
    
    valet.style.imageRendering     = "pixelated";
    valet.style.backgroundPosition = "bottom right";
    valet.style.backgroundRepeat   = "no-repeat";
    valet.style.backgroundColor    = "transparent";
    valet.style.backgroundImage    = "url('" + valet_sprite.src + "')";
    valet.style.backgroundSize     = "contain";

    parentElement.append(valet);

    valet_SetDraggable(true);
}

function valet_ChangeSprite(shortPathToImage)
{
    valet.style.backgroundImage = "url('" + `файли/зображення/${shortPathToImage}` + "')";
}

function valet_DisplayValetAt(x=60, y=0)
{
    if (!valet_IsValetOn())
        valet_CreateValet();

    valet.style.left   = x + "%";
    valet.style.bottom = y + "%";
}

function valet_DeleteValet()
{
    if (valet == null)
        return;

    valet.remove();
    valet = null;
}

//
// VALET GETTERS 
//

function valet_GetX()
{
    if (!valet_IsValetOn())
        return null;
    else
        return Number(valet.style.left.substring(0, valet.style.left.length - 1));
}

function valet_GetY()
{
    if (!valet_IsValetOn())
        return null;
    else
        return Number(valet.style.bottom.substring(0, valet.style.bottom.length - 1));
}

function valet_GetWidth()
{
    if (!valet_IsValetOn())
        return null;
    else
        return Number(valet.style.width.substring(0, valet.style.width.length - 1));
}

function valet_GetHeight()
{
    if (valet == null)
        return null;
    else
        return Number(valet.style.height.substring(0, valet.style.height.length - 1));
}

function valet_GetLocation() { return valetLocation; }
function valet_SetLocation(value) { valetLocation = value; }

//
// VALET FUNCTIONS
//

function valet_FlipValet()
{ // flips the position of Valet horizontally
    
    if (valet == null)
        return;

    const rect = valet.getBoundingClientRect();
    const leftPct = rect.left / window.innerWidth * 100;
    const newLeftPct = 100 - leftPct - (rect.width / window.innerWidth * 100);

    valet.style.transform = "scale(1, 1)";

    valet_DisplayValetAt(newLeftPct, valet_GetY());
    if (speechBubble != null)
        speechBubble.style.left = valet_GetX() - 12 + "%";
}

function valet_SetClickable(bool)
{ // makes Valet trigger an event on click
    if (!valet_IsValetOn())
        return;

    if (bool)
    {
        valet.onclick = function() { SaySomething(); };
        valet.style.cursor = "pointer";
    }
    else
    {
        valet.onclick = function() { /* do nothing */ };
        valet.style.cursor = "auto";
    }
}

function valet_GetClickable()
{
    if (!valet_IsValetOn())
        return;
    
    return (valet.style.cursor == "pointer" || valet.style.cursor == "move");
}

function valet_SetMoveable(bool)
{ // makes Valet flip his position on mouse enter
    if (!valet_IsValetOn())
        return;
    
    if (bool)
        valet.onmouseenter = function() { valet_FlipValet(); };
    else
        valet.removeAttribute("onmouseenter");
}

let FLAG_SKINNED = false;
function valet_SetDraggable(bool)
{ // lets user rip valet's skin off
    if (!valet_IsValetOn())
        return;

    if (FLAG_SKINNED)
        return;

    if (bool)
    {
        valet.setAttribute('draggable', true);
        valet.addEventListener("dragend", function (event)
        {
            if (!FLAG_SKINNED)
            {
                valet_FinalStretch();
                FLAG_SKINNED = true;
                valet_SetDraggable(false);

                if (finalLineCount > 5)
                    FLAG_FRESHLY_SKINNED = true;
            }
            else
            {
                valet_SetDraggable(false);
            }
        });
        valet.style.cursor = "move";
    }
    else
    {
        valet.style.cursor = valet_SetClickable(valet_GetClickable());
        valet.removeAttribute('draggable');
    }
}

function valet_FinalStretch()
{
    PlaySound("порвані_штани.mp3");
    valet_sprite.src = "файли/зображення/валет_робот.png";
    valet_ChangeSprite("валет_робот.png");
    letterSounds = ["мова/sfx-phone1.wav", "мова/sfx-phone2.wav", "мова/sfx-phone3.wav", "мова/sfx-phone4.wav", "мова/sfx-phone5.wav"];
}

//
// SPEECH BUBBLE
//

function valet_CreateAndFillSpeechBubble(text)
{
    /*  technically it's all one block, but it has to be done in this order 
            1 - stop the timer for the bubble disappearance
            2 - stop the timer for the text generation
            3 - stop the timer for button display
            4 - delete the speech bubble
            5 - ???
            6 - MIKPROFIT (create a new one)                      */

    if (hideTimer != null)
        clearTimeout(hideTimer)
    if (speechTimer != null)
        clearTimeout(speechTimer);
    if (buttonTimer != null)
        clearTimeout(speechTimer);
    if (speechBubble != null)
        valet_HideSpeechBubble();
    
    speechBubble = document.createElement("div");
    
    speechBubble.style.position = "fixed";
    speechBubble.style.bottom = valet_GetHeight() + 2 + "%";
    speechBubble.style.left   = valet_GetX() - 12 + "%";
    speechBubble.style.width  = 15 + "%";
    speechBubble.style.height = "auto";
    speechBubble.style.imageRendering = "pixelated";
    speechBubble.innerHTML = "";

    speechBubble.classList.add("wordwrap");     // responsible for word wrapping
    speechBubble.classList.add("noselect");     // no selecting text
    speechBubble.classList.add("speechBubble"); // responsible for the speech bubble shape
    
    document.body.append(speechBubble);
    _NextChar(text, 0);
}

//
// SPEECH BUBBLE DELAY GETTERS AND SETTERS
//

let speechDelay = 25;
let bubbleDisappearDelay = 3000;
let bubbleButtonsAppearDelay = 1000;

function valet_GetSpeechDelay()      { return speechDelay; }
function valet_SetSpeechDelay(value) { speechDelay = value; }

function valet_GetBubbleDisappearDelay()      { return bubbleDisappearDelay; }
function valet_SetBubbleDisappearDelay(value) { bubbleDisappearDelay = value; }

function valet_GetBubbleButtonsAppearDelay()      { return bubbleButtonsAppearDelay; }
function valet_SetBubbleButtonsAppearDelay(value) { bubbleButtonsAppearDelay = value; }

// // // // //

let speechTimer;
let hideTimer;
let buttonTimer;

let letterSounds = ["ТЕСТ.wav"];

function _NextChar(text, currentCharIndex)
{
    speechTimer = setTimeout(function()
    {
        //PlaySound("/мова/snd_tv_voice_short_" + GetRandom(1, 11) + ".wav");
        if (text.charAt(currentCharIndex) != " ")
            PlaySound(GetRandomElementOfArray(letterSounds));
        speechBubble.innerHTML += text.charAt(currentCharIndex);
        if (currentCharIndex < text.length)
            _NextChar(text, currentCharIndex + 1);
        else
            hideTimer = setTimeout(function() { valet_HideSpeechBubble(); }, valet_GetBubbleDisappearDelay());
    }, valet_GetSpeechDelay());
}

function valet_GetTimeForSpeech(text)
{ // returns the time it takes for the speech bubble to display the text and disappear
    return text.length * valet_GetSpeechDelay() + valet_GetBubbleDisappearDelay();
}

function valet_HideSpeechBubble()
{
    if (speechBubble == null)
        return;
    
    if (hideTimer != null)
        clearTimeout(hideTimer)
    if (speechTimer != null)
        clearTimeout(speechTimer);
    if (buttonTimer != null)
        clearTimeout(speechTimer);
    speechBubble.remove();
    speechBubble = null;
}





//
// PUBLIC INTERFACE
//

function public_MakeValetAppear(location)
{ // instantly summon valet
    valet_CreateValet();
    valet_DisplayValetAt();
    valet_SetLocation(location);
    valet_SetDraggable(true);
}

function public_MakeValetDisappear(location="room")
{ // instantly remove valet
    valet_SetLocation(location);
    valet_DeleteValet();
    valet_HideSpeechBubble();
}

function public_CallValet(location)
{ // call valet
    let timeToAppear = 1000;
    PlaySound("дзвіночок.mp3");

    if (valet_GetLocation() == "rocket" || currentPage == "rocket")
    {
        valetComing = false;
        return;
    }
    valet_SetLocation(location);
    valet_CreateValet();
    setTimeout(function() { valet_DisplayValetAt(); valetComing = false; }, timeToAppear);
}

function public_FreeValet(goto="room")
{ // release valet
    /*let localDelay = 500;
    if (isRegularOccasion)
    {
        let text = "Тоді я пішов.";
        ValetSay(text);
        localDelay += GetTimeForSpeech(text);
    }*/
    //setTimeout(function() { _HideValet(); PlaySound("кроки_від.mp3"); }, localDelay);
    valet_DeleteValet();
    valet_SetLocation(goto);
    PlaySound("кроки_від.mp3");
}

function public_ValetSay(text)
{ // make valet say the input string
    valet_CreateAndFillSpeechBubble(text);
}

function public_ValetPrompt(text, buttons, func)
{ // make valet say the input string, then display buttons, then process the answer
    valet_CreateAndFillSpeechBubble(text);
    buttonTimer = setTimeout(function()
    {
        clearTimeout(hideTimer) // need to thrust this somewhere so the speech bubble doesn't disappear

        const btnCntnr = document.createElement("div");
        btnCntnr.style.display = "flex";
        btnCntnr.style.justifyContent = "center";
        btnCntnr.style.paddingTop = "10px";
        btnCntnr.style.gap = "10px";

        for (const label of buttons)
        {
            const button = document.createElement("button");
            button.textContent = label;
            button.addEventListener("click", () => { func(label);});
            btnCntnr.appendChild(button);
        }
        speechBubble.appendChild(btnCntnr);
    }, valet_GetTimeForSpeech(text) - valet_GetBubbleDisappearDelay() + valet_GetBubbleButtonsAppearDelay());
}

let roomDiscovered = false;

let valetComing = false; // or leaving
function public_ToggleValet()
{ // only to be called from main page
    if (valetComing || valet_GetLocation() == "rocket") 
        return;

    valetComing = true;

    if (valet_IsValetOn())
    {
        public_ValetSay("Ну, тоді я пішов.");
        setTimeout(function() { public_FreeValet(); valetComing = false; }, valet_GetTimeForSpeech("Ну, тоді я пішов."));
        setTimeout(function()
        {
            if (!roomDiscovered)
            {
                roomDiscovered = true;
                EnableTopButtons("tpRoom");
            }
        }, valet_GetTimeForSpeech("Ну, тоді я пішов.") + 2000);
    }
    else
    {
        public_CallValet("main");
        valet_SetClickable(true);
    }
}


let FLAG_GREETED_USER = false;
let FLAG_SEEN_GRAMOTA = false;

function SaySomething()
{
    if (valet_GetLocation() == "rocket")
    {
        SayFinalVoyage();
        return;
    }

    // now not just random lines but help
    valet_SetClickable(false);

    if (FLAG_GREETED_USER == false)
    {
        // if first time
        FLAG_GREETED_USER = true;
        let line = "Ах, ось ви й тут, пане Артипове! Почувайтеся як вдома.";
        public_ValetSay(line);
        valet_SetClickable(true);
        return;
    }

    if (blackScreen != null)
    {
        // when dark
        let line = GetRandomElementOfArray(["Ой-ой, як тут темно!", "Ввімкніть світло, будь ласка.", "Я нічого не бачу."]);
        public_ValetSay(line);
        valet_SetClickable(true); // one line so no delay
        return;
    }

    if (currentPage == "frontPage")
    {
        // if on home page
        let line = GetRandomElementOfArray(["Це наша головна сторінка.", "Насправді нагород у нас набагато більше.", "Задній фон прогнозу погоди залежить від пори року."]);
        public_ValetSay(line);
        valet_SetClickable(true); // one line so no delay
        return;
    }
    if ((currentPage == "translator" || currentPage == "textGeneration" || currentPage == "photoGeneration" || currentPage == "radio") && isPageUnlocked["translator"] == false) // just one locked page is enough
    {
        // if on 1 lock
        if (!FLAG_SEEN_GRAMOTA)
        {
            // before seeing the riddle
            let line = GetRandomElementOfArray(["Гмм, домофон цифрал...", "Я вже й сам комбінацію підзабув.", "Коли я жив у багатоквартирному будинку, то у нас такий самий стояв."]);
            public_ValetSay(line);
            valet_SetClickable(true); // one line so no delay
        }        
        else
        {
            // after
            let line = GetRandomElementOfArray(["«В Землі + або в Сонця · »... Що може планета мати спільного із зіркою?", 
                                                "Орбітальну швидкість Церери точно мали додати на сайт. Пам'ятаю, ви особисто доручили це своїм абітурієнтам.",
                                                "Ну, міста в яких ви мешкали вам знати краще. Хоча, навіть якщо ви й забули, то вони точно десь мають бути записані.",
                                                "«Віднімання»... За визначенням це зменшуване-від'ємник...",
                                                "«Найрідкіснішого дня», га? Спочатку я думав про свята, але скоріше за все тут про сам календарний рік."]);
            public_ValetSay(line);
            valet_SetClickable(true); // one line so no delay
        }
        return;
    }
    if ((currentPage == "aboutUs" || currentPage == "timeline" || currentPage == "gallery" || currentPage == "satelliteMap") && isPageUnlocked["aboutUs"] == false) // just one locked page is enough
    {
        // if on 2 lock
        let line1 = "Улюблена книга? Тільки не кажіть, що ви і її забули.";
        let line2 = "А ви все в своєму репертуарі... Даруйте, але тут я вам допомогти не можу.";
        let line3 = "Може, спитати в когось іншого?";
        let line4 = "Ось прямо так підійти та спитати: «Нагадайте, будь ласка, яка в Архітектора Артипова улюблена книга?»";

        public_ValetSay(line1);
        setTimeout(function() { public_ValetSay(line2); }, valet_GetTimeForSpeech(line1));
        setTimeout(function() { public_ValetSay(line3); }, valet_GetTimeForSpeech(line1) + valet_GetTimeForSpeech(line2));
        setTimeout(function() { public_ValetSay(line4); valet_SetClickable(true); }, valet_GetTimeForSpeech(line1) + valet_GetTimeForSpeech(line2) + valet_GetTimeForSpeech(line3));
        return;
    }
    if (currentPage == "baubles" && isPageUnlocked["baubles"] == false)
    {
        // if on 3 lock
        let line1 = "Ехх, пам'ятаю цей пуск так, ніби він був вчора...";
        let line2 = "Пуск пам'ятаю, а назву - ні.";
        let line3 = "Проте впевнений, що цей астероїд має десь відстежуватися.";
        let line4 = "Якщо не помиляюся, то орбіта у нього була доволі висока.";

        public_ValetSay(line1);
        setTimeout(function() { public_ValetSay(line2); }, valet_GetTimeForSpeech(line1));
        setTimeout(function() { public_ValetSay(line3); }, valet_GetTimeForSpeech(line1) + valet_GetTimeForSpeech(line2));
        setTimeout(function() { public_ValetSay(line4); valet_SetClickable(true); }, valet_GetTimeForSpeech(line1) + valet_GetTimeForSpeech(line2) + valet_GetTimeForSpeech(line3));
        return;
    }
    if (currentPage == "baubles" && isPageUnlocked["baubles"] == true)
    {
        // if on baubles
        let line = GetRandomElementOfArray(["Вміст цих сторінок робили наші абітурієнти.",
                                            "TELL_JOKE",
                                            "Не хочу хвастатися, але в тесті на любовника мені сказали, що я - «Кавалер»!",
                                            "Якось я спорбував приготувати страву за рецептом дня... Вийшло, м'яко кажучи, не дуже...",
                                            "Найбільше мені подобаються шпалери з Мустангом.",
                                            "Я і не знав, що у нас так багато заводів з переробки цукрового буряка в цукор.",
                                            "«Член монреальського клубу курців люльок»? Я би теж хотів стати його членом...",
                                            "На жаль нам довелося вилучити програму для злама казино Забава через позов від правовласників."]);
        if (line == "TELL_JOKE")
        {
            public_ValetPrompt("Хочете розкажу анекдот про полову тряпку?", ["Так", "Ні"], RugJoke, 30);
            return;
        }
        else
        {
            public_ValetSay(line);
            valet_SetClickable(true); // one line so no delay
            return;
        }
    }
    if (currentPage == "translator" && isPageUnlocked["translator"] == true)
    {
        // if on translator
        let line1 = "Раніше тут знаходився наш інноваційний перекладач, доки ви не наказали закрити його на допрацювання.";
        let line2 = "А шкода - дуже зручний застосунок був.";

        public_ValetSay(line1);
        setTimeout(function() { public_ValetSay(line2); valet_SetClickable(true); }, valet_GetTimeForSpeech(line1));
        return;
    }
    if (currentPage == "textGeneration" && isPageUnlocked["textGeneration"] == true)
    {
        // if on співрозмовник
        switch (GetRandom(0, 3))
        {
            case 0:
                let line1 = "Цей співрозмовник - прямо-таки диво техніки!";
                let line2 = "Але я старий вже - на нових технологіях не розбираюся, тому принцип його роботи не розкажу.";
                public_ValetSay(line1);
                setTimeout(function() { public_ValetSay(line2); valet_SetClickable(true); }, valet_GetTimeForSpeech(line1));
                break;
            case 1:
                public_ValetSay("Дуже важливо дотримуватися правил спілкування з супутниками.");
                valet_SetClickable(true);
                break;
            case 2:
                public_ValetSay("«Бубка газу»? Що це таке?");
                valet_SetClickable(true);
                break;
            case 3:
                public_ValetSay("Хто не знає, де знаходиться Єгипет?");
                valet_SetClickable(true);
                break;
            case 4:
                public_ValetSay("Супутникам потрібен час, аби згенерувати відповідь та передати її назад.");
                valet_SetClickable(true);
                break;
        }
        return;
    }
    if (currentPage == "photoGeneration" && isPageUnlocked["photoGeneration"] == true)
    {
        // if on photogen
        let line = GetRandomElementOfArray(["Ніколи не думав, що доживу до часу, коли людство зможе отримувати фотографії за десятки мільйонів кілометрів від нас...", "Авжеж супутникам потрібен час, аби передати зображення.", "За замовчуванням оптичний модуль супутників вимкнений, тому його спочатку необхідно увімкнути."]);
        public_ValetSay(line);
        valet_SetClickable(true); // one line so no delay
        return;
    }
    if (currentPage == "radio" && isPageUnlocked["radio"] == true)
    {
        // if on radio
        if (isTuned == false && isOn == true)
        {
            let line = "Ай, вимкніть!";
            public_ValetSay(line);
            valet_SetClickable(true); // one line so no delay
            return;
        }
        if (isTuned == false && isOn == false)
        {
            let line = "Мені здається спочатку це радіо потрібно налаштувати.";
            public_ValetSay(line);
            valet_SetClickable(true); // one line so no delay
            return;
        }
        if (isTuned == true && isOn == true)
        {
            let line = "♪ М-м-м-м ♪";
            public_ValetSay(line);
            valet_SetClickable(true); // one line so no delay
            return;
        }
        
        let line = GetRandomElementOfArray(["Це не просте радіо - першочерговими антенами служать наші супутники, що подорожують сонячною системою!", "Саме радіо нам дісталося від одного з наших студентів - але впевнений, ви й самі це пам'ятаєте."]);
        public_ValetSay(line);
        valet_SetClickable(true); // one line so no delay
        return;
    }
    if (currentPage == "gallery" && isPageUnlocked["gallery"] == true)
    {
        let line = GetRandomElementOfArray(["Гмм...? Чому на фото ви- Забудьте.",
                                            "Пам'ятаю Льоню. Ми не були друзями, але не раз пересікалися в одному з вишів.",
                                            "Гм? Ні, авжеж це не справжнє фото супутника. Це лише авторське бачення одного з наших студентів.",
                                            "Я чув що раніше вежа була на два поверхи нижча. Так-так, в оригінальному плані споруди вашої паяльної майстерні не було.",
                                            "Риби у шумерів були ледве не священими тваринами.", 
                                            "Насправді шумери були набагато розвинутішими, ніж зараз заведено вважати.", 
                                            "Ир Другий був суворим, але справедливим імператором Шумерії.", 
                                            "«Трахулядна матриця» звучить смішно через «трах» у її назві, але це запозичене слово з однієї зі східних мов.", 
                                            "Сучасне обладнання не здатне помітити шумерські супутники, бо вони вже давно прибули до місця свого призначення.", 
                                            "Шумерський люд поділявся на 8 прошарків, але ви і так це знаєте.", 
                                            "Шумери отримали багато знань від своїх супутників, але це також принесло їм великі страждання...", 
                                            "Ир Другий був тираном, який цінував знання."]);
        public_ValetSay(line);
        valet_SetClickable(true); // one line so no delay
        return;
    }
    if (currentPage == "aboutUs" && isPageUnlocked["aboutUs"] == true)
    {
        let arr = ["Видно, що автор цієї колонки трохи прикрасив дійсність. Точніша інформація наведена в Хронології.",
                                                "Так, початок дев'яностих був дуже скрутним для нас...",
                                                "Якби не та доленосна знахідка Сані Штангенцируля, то ВАІ б вже зачинився... Пробачте мою фамільярність, я мав на увазі Олександра Бетмарчука.",
                                                "Про Сигизмунда Подолька мені сказати нічого - він був пересічною людиною. Втім, мої співчуття родичам загиблого."];
        if (!FLAG_FOUND_CARDS)
            arr.push("Гмм? Що це внизу лежить?");

        public_ValetSay(GetRandomElementOfArray(arr));
        valet_SetClickable(true); // one line so no delay
        return;
    }
    if (currentPage == "timeline" && isPageUnlocked["timeline"] == true)
    {
        let arr = ["Який жартівник писав останній розділ? «Архітектор Артипів зник»? Ви же прямо переді мною!",
                                            "Якщо не брати до уваги останній розділ, то інформація тут правдива.",
                                            "Я розумію, чому ви вирішили не розповідати їм про наслідки трагедії.",
                                            "Попри велику ціну яку вам довелося заплатити, ви правильно зробили, що прикончили те вусате чмо.",
                                            "Якими ж гадюками були наші конкуренти... Я навіть колегами їх назвати не можу.",
                                            "Я досі пам'ятаю той день, коли ми втрь- Кхм.",
                                            "Нам дуже пощастило з тією бомбою.",
                                            "А про решту супутників Єрмоленко так і не написав. Ехх, ледар.",
                                            "Як нам пощастило, що колишній музей колекціонував саме шумерські рукописи."];
                                            
        if (opacityCens1 < censSteps / 2 || opacityCens2 < censSteps / 2 || opacityCens3 < censSteps / 2 || opacityCens4 < censSteps / 2)
        {
            arr.push("Стривайте, чому наші імена- Кхм, забудьте.");
            arr.push("Чому вони зафарбували наші- Кхм-кхм.");
        }

        public_ValetSay(GetRandomElementOfArray(arr));
        valet_SetClickable(true); // one line so no delay
        return;
    }
    if (currentPage == "satelliteMap" && isPageUnlocked["satelliteMap"] == true)
    {
        let line1 = "Ах, «Потойбічна сімка»... Наша найнадійніша мережа супутників.";
        let line2 = "Це єдина серія супутників, які ми розробили та виготовили в кооперації з нашими іноземними партнерами з NASA і т.д.";
        public_ValetSay(line1);
        setTimeout(function() { public_ValetSay(line2); valet_SetClickable(true); }, valet_GetTimeForSpeech(line1));
        return;
    }
    if (currentPage == "baublesLOVER")
    {
        let line = GetRandomElementOfArray(["Не хочу хвастатися, але в тесті на любовника мені сказали, що я - «Кавалер»!", "Прикласти палець треба до квадратного датчика посередині мікросхеми.", "Сподіваюся він не скаже вам, що ви Волоцюга або Лошок..."]);
        public_ValetSay(line);
        valet_SetClickable(true); // one line so no delay
        return;
    }
    if (currentPage == "baublesRECIPE")
    {
        let line = GetRandomElementOfArray(["Якось я спорбував приготувати страву за рецептом дня... Вийшло, м'яко кажучи, не дуже...", "Декілька місяців тому рецепт сказав, що я маю змішати білизну́ та оцет...", "Моя улюблена страва - ригато з куркою та грибами."]);
        public_ValetSay(line);
        valet_SetClickable(true); // one line so no delay
        return;
    }
    if (currentPage == "baublesWALLPAPER")
    {
        let line = GetRandomElementOfArray(["Найбільше мені подобаються шпалери з Мустангом.", "Ви не повірите, але шпалери з клавіатурами та мишею зробив саме я.", "Мені подобаються шпалери, на яких видно космос."]);
        public_ValetSay(line);
        valet_SetClickable(true); // one line so no delay
        return;
    }
    if (currentPage == "baublesBEET")
    {
        let line = GetRandomElementOfArray(["Я і не знав, що у нас так багато заводів з переробки цукрового буряка в цукор.", "Чесно кажучи, цукор мені не дуже подобається. Я більше полюбляю сіль.", "Це дуже добре, бо заводи дають роботу людям."]);
        public_ValetSay(line);
        valet_SetClickable(true); // one line so no delay
        return;
    }
    if (currentPage == "baublesEINSTEIN")
    {
        let line = GetRandomElementOfArray(["«Член монреальського клубу курців люльок»? Я би теж хотів стати його членом...", "Лише 4? Бути не може!", "Це правда, я пам'ятаю як колись читав у газеті про його колаборацію з Ніколою Теслою.", "Поки вся інформація у цій колонці правдива, її презентація є м'яко кажучи сумнівною..."]);
        public_ValetSay(line);
        valet_SetClickable(true); // one line so no delay
        return;
    }
    if (currentPage == "baublesERROR")
    {
        let line = "На жаль нам довелося вилучити програму для злама казино Забава через позов від правовласників.";
        public_ValetSay(line);
        valet_SetClickable(true); // one line so no delay
        return;
    }

    let line = GetRandomElementOfArray(["Хе-хе.", "На жаль, мені нічого сказати.", "Тут і сказати нічого.", "Я не вигадав, що тут сказати."]);
    public_ValetSay(line);
    valet_SetClickable(true); // one line so no delay
    return;
}

function RugJoke(value)
{
    switch (value)
    {
        case "Ні":
            public_ValetSay("Вибачте...");
            valet_SetClickable(true); // one line so no delay
            break;
    
        case "Так":
            
            let line1 = "Гаразд, ну ем...";
            let line2 = "Ну є коротше полова тряпка, да? Гмм, ну а англійською вона була б сексуальна тряпка...";
            let line3 = "...";
            let line4 = "Ну бо половий це статевий в сенсі sexual...";
            let line5 = "...";

            let delay1 = 0;
            let delay2 = delay1 + valet_GetTimeForSpeech(line1);
            let delay3 = delay2 + valet_GetTimeForSpeech(line2);
            let delay4 = delay3 + valet_GetTimeForSpeech(line3);
            let delay5 = delay4 + valet_GetTimeForSpeech(line4);
            let delay6 = delay5 + valet_GetTimeForSpeech(line5);
            
            setTimeout(() => { public_ValetSay(line1); }, delay1);
            setTimeout(() => { public_ValetSay(line2); }, delay2);
            setTimeout(() => { public_ValetSay(line3); }, delay3);
            setTimeout(() => { public_ValetSay(line4); }, delay4);
            setTimeout(() => { public_ValetSay(line5); }, delay5);
            setTimeout(() => { public_FreeValet(); },     delay6);
            break;

        default:
            alert("ерор");
            window.location.reload();
            break;
    }
}






let finalLineCount = 0;
let FLAG_FRESHLY_SKINNED = false;

function SayFinalVoyage()
{
    // now not just random lines but help
    valet_SetClickable(false);

    switch (finalLineCount)
    {
        case 0:
            public_ValetSay("Ви знайшли мене.");
            finalLineCount += 1;
            valet_SetClickable(true);
            break;

        case 1:
            public_ValetSay("Я знав, що ви не Архітектор Артипів щойно ви зайшли на цей сайт.");
            setTimeout(() => { public_ValetSay("Але я не міг подивитися правді в очі. Я переконав себе, що ви - мій старий майстер."); valet_SetClickable(true); }, valet_GetTimeForSpeech("Я знав, що ви не Архітектор Артипів щойно ви зайшли на цей сайт."));
            finalLineCount += 1;
            break;

        case 2:
            public_ValetSay("А ви ж навіть не схожі на нього...");
            setTimeout(() => { public_ValetSay("Напевно...?"); }, 1000 + valet_GetTimeForSpeech("А ви ж навіть не схожі на нього..."));
            setTimeout(() => { public_ValetSay("Я вже почав забувати обличчя мого старого друга та людини, яка дала мені друге життя."); valet_SetClickable(true); }, 1000 + valet_GetTimeForSpeech("А ви ж навіть не схожі на нього...") + valet_GetTimeForSpeech("Напевно...?"));
            finalLineCount += 1;
            break;

        case 3:
            public_ValetSay("...");
            setTimeout(() => { public_ValetSay("У мене є до вас прохання."); }, valet_GetTimeForSpeech("..."));
            setTimeout(() => { public_ValetSay("Підійміться на борт цієї ракети, запустіть її та зустріньтеся з Артиповим."); }, valet_GetTimeForSpeech("У мене є до вас прохання.") + valet_GetTimeForSpeech("..."));
            setTimeout(() => { public_ValetSay("Якщо він досі у нашому світі - передайте йому привіт від старого Валета Валерія."); valet_SetClickable(true); }, valet_GetTimeForSpeech("Підійміться на борт цієї ракети та зустріньтеся з Артиповим.") + valet_GetTimeForSpeech("У мене є до вас прохання.") + valet_GetTimeForSpeech("..."));
            finalLineCount += 1;
            break;

        case 4:
            if (!FLAG_IS_PROGRAMME_ACTIVATED)
            {
                public_ValetSay("Системи ракети необхідно активувати за допомогою програми. На жаль, пароля до неї я не знаю.");
                valet_SetClickable(true);
            }
            else
            {
                public_ValetSay("В ракеті є струм. Я так розумію, це ваших рук справа.");
                finalLineCount += 1;
                valet_SetClickable(true);
            }
            break;

        case 5:
            public_ValetSay("Ракеті бракує навігаційного модуля: механізму, який би направив її до потрібної цілі.");
            setTimeout(() => {
                public_ValetSay("Вам потрібен прилад, що прагне зустрітися з Артиповим.");
                valet_SetClickable(true);
            }, valet_GetTimeForSpeech("Ракеті бракує навігаційного модуля: механізму, який би направив її до потрібної цілі."));
            finalLineCount += 1;
            break;

        case 6:
            if (FLAG_SKINNED == true)
            {
                if (FLAG_FRESHLY_SKINNED)
                {
                    finalLineCount += 1;
                    public_ValetSay("Так. Насправді я робот. Моє людське тіло загинуло десятки років тому.");
                    setTimeout(() => {
                        bb_lament.Play();
                        valet_sprite.src = "файли/зображення/валет_серце.png";
                        valet_ChangeSprite("валет_серце.png");

                        public_ValetSay("Моє серце билося заради Артипова та його дружини, тому воно має підійти. Візьміть його.");
                        valet_SetClickable(true);
                    }, valet_GetTimeForSpeech("Так. Насправді я робот. Моє людське тіло загинуло десятки років тому."));
                    
                }
                else
                {
                    bb_lament.Play();
                    public_ValetSay("Ви вже знаєте, що я - робот. Візьміть моє серце.");
                    valet_sprite.src = "файли/зображення/валет_серце.png";
                    valet_ChangeSprite("валет_серце.png");
                    finalLineCount += 1;
                    valet_SetClickable(true);
                }
            }
            else
            {
                public_ValetSay("Механізм сам повинен хотіти зустрітися з Артиповим.");
                valet_SetClickable(true);
            }
            break;

        case 7:
            valet_sprite.src = "файли/зображення/валет_мертвий.png";
            valet_ChangeSprite("валет_мертвий.png");
            public_ValetSay("Хай вам щастить. Прощавайте.");
            
            setTimeout(() => { 
                PlaySound("встав_серце.wav");
                FLAG_IS_HEART_INSTALLED = true;
            }, valet_GetTimeForSpeech("Хай вам щастить. Прощавайте."));
            
            finalLineCount += 1;
            break;

        default:
            break;
    }
}