let isEgypt = false;
let egyptMusic;

let counter = 0;
let insanityCounter = 0;
let insanityWords = ["бубк", "газ", "церер", "супутник"];
let englishWords = ["is", "are", "the", "a"];
let hackerWords = ["mkdir", "ping", "ipconfig", "dir", "cd", "rd", "console"];

async function GenerateOutput()
{
    let inputText = document.getElementById("inputTextbox").value;
    inputText = inputText.toLowerCase();
    inputText = inputText.replace("?", " ");
    inputText = inputText.replace("!", " ");
    inputText = inputText.replace(",", " ");
    inputText = inputText.replace(".", " ");
    inputText = inputText.replace(";", " ");
    inputText = inputText.replace("/", " ");
    let inputWords = inputText.split(" ");

    PlaySound("клік.mp3");
    UpdateCounter();

    document.getElementById("outputTextbox").value = "";

    // check insane
    for (const word of insanityWords)
    {
        if (inputText.includes(word))
        {
            await SetImage("навіж1.jpg", "навіж2.jpg");
            await SetText("");
            NextMindFuck();
            return;
        }
    }

    // check english
    for (const word of englishWords)
    {
        if (inputText.includes(word))
        {
            await SetImage("не_можна.jpg");
            await SetText("я не знаю англійської", "я не знаю цієї мови", "що це таке", "я не розумію");
            return;
        }
    }

    // check hacker
    for (const word of hackerWords)
    {
        if (inputText.includes(word))
        {
            await SetImage("хак1.jpg", "хак2.jpg", "анонімус.gif");
            await SetText("ACCESS DENIED", "ВІДМОВЛЕНО", "ДОСТУП ВІДМОВЛЕНО", "КІБЕРЗАХИСТ АКТИВОВАНО");
            PlaySound("алярм.wav");
            PlaySound("інтрудер.wav");

            return;
        }
    }

    // check pig
    if (inputText.includes("хрю") || inputText.includes("свин"))
    {
        await SetImage("свинтус1.jpg", "свинтус2.jpg", "свинтус3.jpg");
        await SetText("хрю");
        PlaySound("хрю.ogg");
        FoundChatPig();
        return;
    }

    // check favourite book
    if (inputText.includes("люб") && inputText.includes("кни") && inputText.includes("артип"))
    {
        await SetImage("книга.jpg");
        await SetText(favouriteBook);
        return;
    }

    // check the rest
    if (inputWords.includes("барофлюгель"))
    {
        await SetImage("барофлюгель.jpg");
        await SetText("");
        return;
    }
    if (inputWords.includes("переклад") || inputWords.includes("перекладач"))
    {
        await SetImage("ні_перекладачу.jpg");
        await SetText("Перекладач зараз недоступний");
        prank_Attention();
        return;
    }
    if (inputWords.includes("єгипет"))
    {
        await SetImage("єгипет.jpg");
        await SetText("(надішли ще раз)");
        setTimeout(() => { prank_Egypt(); }, 750);
        return;
    }
    if (inputWords.includes("привіт"))
    {
        await SetImage("");
        await SetText("і тобі привіт", "салют", "Вітаю", "добрий День");
        return;
    }
    if (inputWords.includes("де"))
    {
        await SetImage("уранус.jpg", "глюони.jpg");
        await SetText("отут", "десь тут", "тут", "приблизно тут");
        return;
    }
    if (inputWords.includes("коли"))
    {
        await SetImage("година.jpg", "гондинник.jpg");
        await SetText("колись", "скоро", "нескоро", "колись, бо час.. швидкоплинний...",
                      "після дощика в четвер", "у майбутньому", "у минулому", "вже",
                      "у 1998 році", "п'ятого травня", "шостого лютого", "33 травня",
                      "17 листопада 1996 року", "декілька століть а може й тисячоліть тому");
        return;
    }
    if (inputWords.includes("що"))
    {
        await SetImage("квазітахіонна_портаматерія.gif");
        await SetText("Ось що.");
        return;
    }
    else
    {
        await SetImage("");
        await SetText("я не знаю", "я не можу відповісти на це", "я не хочу відповідати", "засекречено",
                      "ти це і так знаєш", "Я не можу відповісти на це.", "спитай в друзів та дружини",
                      "напиши Артипову на arartypiv@ukr.net");
        return;
    }
}

async function SetImage(...imagesNames)
{
    return new Promise((resolve) =>
    {

    var button = document.getElementById("sendButton");
    button.disabled = true;

    var imgbox = document.getElementById("outputImage");
    SetRealImageOn();
    imgbox.src = "файли/зображення/вантаж.gif";
    PlaySound("вантаж.mp3");
    setTimeout(() => {
        imgbox.src = "файли/зображення/" + GetRandomItem(imagesNames);
        resolve("resolved");
    }, GetRandom(3300, 4200));

    });

}
function SetText(...strings)
{
    var txtbox = document.getElementById("outputTextbox");
    txtbox.value = GetRandomItem(strings);
    var button = document.getElementById("sendButton");
    button.disabled = false;
}

function SetRealImageOn()
{
    document.getElementById("outputImage").style.display = "block";
    document.getElementById("tempImage").style.display = "none";
}

function SetRealImageOff()
{
    document.getElementById("outputImage").style.display = "none";
}

function UpdateCounter()
{
    counter++;
    try
    {
    document.getElementById("counterSpan").textContent = "Клікнуто разів: " + counter;
    //document.getElementById("counterSpan").style.display = "block";
    }
    catch (error)
    {
        // poh
    }
    CheckCounterEvents();
}

function CheckCounterEvents()
{
    switch (counter)
    {
        case 10:
            alert("а ти допитливий");
            break;
    }
}

function NextMindFuck()
{
    console.log(insanityCounter);
    insanityCounter++;
    switch (insanityCounter)
    {
        case 1:
            prank_PhoneRing();
            break;

        case 2:
            prank_ExplodedEarth();
            break;

        case 3:
            prank_TurkishTea();
            break;

        default:
            prank_NoseyMan();
            break;
    }
}

function prank_Egypt()
{
    if (!isEgypt)
    {
        document.body.style.backgroundImage = "url(файли/зображення/папірус.jpg)";
        document.body.style.backgroundSize = "100% 100%";
        document.body.style.backgroundAttachment = "fixed";
        egyptMusic = new Music("єгипет.mp3");
        egyptMusic.Play();
    }
    else
    {
        document.body.style.backgroundImage = "url(файли/зображення/фон.jpg)";
        document.body.style.backgroundSize = "54px 54px";
        document.body.style.backgroundAttachment = "scroll";
        egyptMusic.Stop();
    }
    PlaySound("папірус.ogg");
    isEgypt = !isEgypt;
}

function prank_ExplodedEarth()
{
    /*
    var imgs = document.getElementsByClassName("trickExplosionImg");
    for (var img of imgs) { img.src = "файли/зображення/вибухла_земля.gif"; }      
    */
    document.getElementById("photoMercury").setAttribute('src', 'файли/зображення/небесні_тіла/меркурій_2.png');
    document.getElementById("descMercury").innerHTML = "ніхто за ним<br>не сумуватиме"
    PlaySound("бабаз.mp3");    
    return;
}

function prank_Attention()
{
    let div1 = document.createElement("uwaga1");
    let div2 = document.createElement("uwaga2");

    div1.style.position = "fixed";
    div1.style.right = 100 + "px";
    div1.style.bottom = 400 + "px";
    div1.style.width = "200px";
    div1.style.height = "200px";
    div1.style.backgroundImage = 'url("файли/зображення/увага.jpg")';
    div1.style.backgroundSize = "cover";
    div1.style.backgroundRepeat = "no-repeat";
    div1.style.pointerEvents = "none";
    document.body.appendChild(div1);
    setTimeout(() => { div1.remove(); }, 10000);

    div2.style.position = "fixed";
    div2.style.left = 100 + "px";
    div2.style.bottom = 400 + "px";
    div2.style.width = "200px";
    div2.style.height = "200px";
    div2.style.backgroundImage = 'url("файли/зображення/увага.jpg")';
    div2.style.backgroundSize = "cover";
    div2.style.backgroundRepeat = "no-repeat";
    div2.style.pointerEvents = "none";
    document.body.appendChild(div2);
    setTimeout(() => { div2.remove(); }, 10000);
}

function prank_PhoneRing()
{
    let div = document.createElement("mf1");

    div.style.position = "fixed";
    div.style.right = 100 + "px";
    div.style.bottom = 100 + "px";

    div.style.width = "200px";
    div.style.height = "200px";

    div.style.backgroundImage = 'url("файли/зображення/телефон.gif")';
    div.style.backgroundSize = "cover";
    div.style.backgroundRepeat = "no-repeat";
    div.style.pointerEvents = "none";

    document.body.appendChild(div);

    PlaySound("телефон.mp3");

    setTimeout(() => { div.remove(); }, 19000);
}

function prank_NoseyMan()
{
    let div = document.createElement("mf2");

        div.style.position = "absolute";
        div.style.left = "50%";

        div.style.width = "382px";
        div.style.height = "173px";

        div.style.marginLeft = "-181px";
        div.style.marginTop = "-404px";

        div.style.backgroundImage = 'url("файли/зображення/мужик.gif")';
        div.style.backgroundSize = "cover";
        div.style.backgroundRepeat = "no-repeat";
        div.style.pointerEvents = "none";


        document.getElementsByClassName("magicBallDiv")[0].parentNode.insertBefore(div, document.getElementsByClassName("magicBallDiv")[0].nextSibling)
}

function prank_TurkishTea()
{
    let div = document.createElement("mf3");

    div.style.position = "fixed";
    div.style.left = 50 + "px";
    div.style.bottom = 100 + "px";

    div.style.width = "300px";
    div.style.height = "200px";

    div.style.backgroundImage = 'url("файли/зображення/турецький_чай.gif")';
    div.style.backgroundSize = "cover";
    div.style.backgroundRepeat = "no-repeat";
    div.style.cursor = "pointer";
    div.addEventListener('click', () => { div.remove(); });

    document.body.appendChild(div);

}