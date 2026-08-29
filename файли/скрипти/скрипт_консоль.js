const log = document.getElementById("consoleLog");
const input = document.getElementById("input");
const consoleItself = document.getElementById("consoleBG");

let isCeresProjectOn = false;

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter")
    {
        PlaySound("ентер.mp3");
        ProcessCommand(input.value.trim());
    }
    else
    {
        PlaySound("неентер.mp3");
    }
    });

function WriteInitText()
{
    ProcessCommand("cls");
    document.getElementById("consoleLog").value = `web-translation utility [Version 2.0.1-S]
(c) VAI Scientific Research Department. All rights reserved.

C:\> `;
}

function ProcessCommand(command)
{
    Write(command);
    command = command.toLowerCase();

    if (isGame5On)
    {
        Game5Process(command);
        return;
    }

    if (isCeresProjectOn)
    {
        CeresProjectProcess(command);
        return;
    }

    switch (command)
    {
        case "root":
            if (isGame5Done)
            {
                WriteLine("Права адміністратора вже отримані.");
            }
            else
            {
                isGame5On = true;
                WriteLine("Отримання прав адміністратора.");
                WriteLine("Введіть команду 'abort', якщо хочете перервати перевірку.");
                Game5Yield();
                return;
            }
            break;

        case "mkdir roma":
            DrawIlluminati();
            break;

        case "start":
            //open(url="запасна_авторизація.html", target="_self");
            if (!IS_USER_LOGGED_IN)
                TransitionToWebsite("PREAUTH_PAGE");
            else
                TransitionToWebsite("MAIN_PAGE");
            break;
        
        case "trans":
            skip(); // cheat code
            TransIn();
            if (IS_USER_LOGGED_IN)
                setTimeout(() => { ChangeWebsite("PREAUTH_PAGE"); }, 800);
            else
                setTimeout(() => { ChangeWebsite("MAIN_PAGE"); SwitchPages("frontPage"); }, 800);
            setTimeout(() => { TransOut() }, 900);
            break;

        case "help":
            if (!FLAG_HAS_ROOT_ACCESS)
            {    
                WriteLine("Команди (користувач):");
                WriteLine("  help   -   показати це повідомлення");
                WriteLine("  cls    -   очистити консоль");
                WriteLine("  echo   -   відобразити повідомлення");
                WriteLine("  start  -   запустити сайт");
                WriteLine("  font   -   змінити шрифт");
                WriteLine("  root   -   отримати права адміністратора");
            }
            else
            {
                WriteLine("Команди (адмін):");
                WriteLine("  help    -    показати це повідомлення");
                WriteLine("  cls     -    очистити консоль");
                WriteLine("  clear   -    очистити консоль");
                WriteLine("  echo    -    відобразити повідомлення");
                WriteLine("  start   -    запустити сайт");
                WriteLine("  font    -    змінити шрифт");
                WriteLine("  root    -    отримати права адміністратора (вже отримано)");
                WriteLine("  dir     -    переглянути файли в директорії");
                WriteLine("  open    -    відкрити файл");
                //WriteLine("  trans   -    виконати транс перехід");
            }
            break;

        case "cls":
        case "clear":
            Clear();
            input.value = "";
            return;

        case "font":
            if (consoleItself.style.fontFamily == "dos")
            {
                consoleItself.style.fontFamily = "consolas";
                consoleItself.style.fontSize = "14px";
            }
            else
            {
                consoleItself.style.fontFamily = "dos";
                consoleItself.style.fontSize = "15.5px";
            }
            // consoleItself.style.fontFamily = (consoleItself.style.fontFamily == "dos") ? "consolas" : "dos";
            break;
        
        case "open penis.txt":
            DrawRichard();
            break;

        case "open хрю.ogg":
            PlaySound("хрю.ogg");
            FoundConsolePig();
            break;

        case "echo":
            WriteLine("The syntax of the command is incorrect.");
            break;
            
        case "open":
            WriteLine("The syntax of the command is incorrect.");
            break;

        case "open anomaly_report.bak":
            OpenAnomaly();
            break;

        case "open activist_report.bak":
            OpenActivists();
            break;

        case "open intruder_report.bak":
            OpenIntruder();
            break;

        case "open ceres_project.exe":
            OpenCeresProject();
            break;

        case "dir":
            WriteLine("12.10.2001   14:33         7 137   хрю.ogg");
            WriteLine("23.12.2003   04:12     1 989 906   anomaly_report.bak");
            WriteLine("14.09.2005   13:54           768   penis.txt");
            WriteLine("09.04.2006   15:47    12 300 192   activist_report.bak");
            WriteLine("03.01.2007   23:09    15 541 768   intruder_report.bak");
            WriteLine("27.02.2007   19:28   292 138 499   CERES_PROJECT.exe");
            WriteLine("    6 File(s)    321 978 270 bytes");
            break;

        default:
            if (command.startsWith("echo "))
                WriteLine(command.substring(5))
            else if (command !== "")
                WriteLine(`'${command}' is not recognized as an internal or external command.`);
            break;
    }

    WriteLine("");
    WritePrefix();
    input.value = "";
}

function WritePrefix(prefix="\nC:\\> ")
{
    log.value += prefix;
    log.scrollTop = log.scrollHeight;
}

function Write(text, addPrefix=false)
{
    log.value += addPrefix ? `C:\\> ${text}` : `${text}`;
    log.scrollTop = log.scrollHeight;
}
function WriteLine(text, addPrefix=false)
{
    log.value += addPrefix ? `\nC:\\> ${text}` : `\n${text}`;
    log.scrollTop = log.scrollHeight;
}

function Clear()
{
    log.value = "";
    WritePrefix("C:\\> ");
}

function DrawIlluminati()
{
    WriteLine("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣶");
    WriteLine("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣧");
    WriteLine("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⠷⠛⠿⣧");
    WriteLine("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣷⠼⠶⠳⠾⣆");
    WriteLine("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣏⣤⣄⣶⡤⢤⣹⡆");
    WriteLine("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠏⠁⠉⠁⡀⠀⡈⠛⠹⣄");
    WriteLine("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡟⠓⠚⠓⠘⠋⠘⠛⠙⠓⢿⡄");
    WriteLine("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⠤⣴⢦⡦⠄⠾⠇⢸⡷⣤⣤⣿⡄");
    WriteLine("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡾⠗⠾⢋⣀⡀⠀⣤⡄⢀⣀⣀⣉⠈⢳⡀");
    WriteLine("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⡿⠗⠈⣭⣄⣀⣤⣤⣤⣄⠀⣤⣙⡛⠻⣷⡀");
    WriteLine("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣯⣧");
    WriteLine("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⡟⠛⠻⡟⠋⠉⠉⠉⢉⣽⡿⠛⠻⣿⣿⣧");
    WriteLine("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣟⠻⠷⡆⢀⣀⣀⣀⣤⣤⣾⣁⣀⣀⡴⠋⣈⣿⣆");
    WriteLine("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣟⣿⢿⣋⣻⠿⠚⠛⠉⠁⠀⠤⠀⠺⠦⠬⣽⣿⣦⣾⡋⠀⠹⣆");
    WriteLine("⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣷⡾⠋⠁⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⡀⠀⠉⢙⠻⣿⣷⣤⣿⡄");
    WriteLine("⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⠃⠀⠀⢀⣠⣤⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣝⠾⣝⠿⣿⠿⡄");
    WriteLine("⠀⠀⠀⠀⠀⠀⠀⢠⣾⡿⠀⢁⣠⣴⣿⡟⣿⣽⢻⡇⠀⢰⣿⣿⣿⣿⢸⡿⢹⢻⣿⣿⣿⡶⣾⣿⣳⡄");
    WriteLine("⠀⠀⠀⠀⠀⠀⢀⡞⠉⣣⣶⣿⣿⣯⢻⡇⢹⣷⣟⢷⣦⣬⣽⣿⣿⢏⣿⢇⡏⠘⠋⢻⣿⣿⣿⣿⠹⣿⡀");
    WriteLine("⠀⠀⠀⠀⠀⠀⣾⠛⠛⢿⣿⣿⡿⡜⡄⢻⡌⠻⣝⠃⢉⠛⠛⠋⣵⣿⣫⠟⢰⡆⢀⣾⣿⣿⣯⡿⢿⣆⢳⡀");
    WriteLine("⠀⠀⠀⠀⠀⣼⣅⠈⢻⠶⠆⠀⠉⠳⣽⠄⠙⠦⠈⠓⠾⠦⠽⠿⠷⠋⠁⠀⠏⠀⠘⢛⣿⣵⣿⠿⣶⡌⠛⢷");
    WriteLine("⠀⠀⠀⠀⣼⣥⣿⣏⡋⠀⠦⠀⣀⡀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣤⡴⣺⣿⣷⠻⠿⠆⠋⣈⣳⣬⣧");
    WriteLine("⠀⠀⠀⢰⣉⣹⣯⠉⠙⠒⢠⣀⠈⠁⠀⠀⠈⠛⠓⠒⠒⠒⠒⠛⠛⠉⠩⣥⢾⣻⣥⣬⡿⠄⠀⠒⢾⡉⢀⣉⣹⣧");
    WriteLine("⠀⠀⢰⢻⣧⣉⠉⢻⣿⠦⢤⣉⣈⠉⠛⠒⠲⠶⠶⠶⣶⠶⣶⠶⠶⠶⣾⣛⣛⣙⣽⣿⡷⠴⠶⠲⡟⠉⠻⣧⡀⠘⣇");
    WriteLine("⠀⢠⣿⡙⠛⠛⣿⣿⢦⡀⠀⣈⡉⠀⠉⢻⡟⠛⠶⠶⠟⠿⢾⡿⠚⡛⠛⢛⣋⠉⣠⣤⠀⣤⡦⠼⠿⠶⣿⡛⢿⢻⣿⣆");
    WriteLine("⠠⣿⣬⣽⣿⣴⣿⣯⣬⣤⣤⣽⣿⣦⣤⣴⣥⣤⣧⣦⣴⣴⣿⣷⣤⣯⣤⣾⣿⣦⣿⣧⣤⣥⣴⣤⣤⣤⣤⣽⣿⣿⣿⣿⡆");
}
function DrawRichard()
{
    WriteLine("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣠⣤⣤⣀⠀⠀");
    WriteLine("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀");
    WriteLine("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀");
    WriteLine("⠀⠀⠀⠀⠀⠀⠀⢀⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀");
    WriteLine("⠀⠀⠀⠀⢀⣀⢾⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⢋⣭⡍⣿⣿⣿⣿⣿⣿⠀");
    WriteLine("⠀⢀⣴⣶⣶⣝⢷⡝⢿⣿⣿⣿⠿⠛⠉⠀⠀⣰⣿⣿⢣⣿⣿⣿⣿⣿⣿⡇");
    WriteLine("⢀⣾⣿⣿⣿⣿⣧⠻⡌⠿⠋⠁⠀⠀⠀⠀⢰⣿⣿⡏⣸⣿⣿⣿⣿⣿⣿⣿");
    WriteLine("⣼⣿⣿⣿⣿⣿⣿⡇⠁⠀⠀⠀⠀⠀⠀⠀⠈⠻⢿⠇⢻⣿⣿⣿⣿⣿⣿⡟");
    WriteLine("⠙⢹⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⢿⣿⣿⡿⠟⠁");
    WriteLine("⠀⠀⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");
}

function TransitionToWebsite(nextPage)
{
    const video = document.createElement("video");

    if (nextPage == "PREAUTH_PAGE" || nextPage == "AUTH_PAGE")
        video.src = "файли/відео/пряморуч_1.mp4";
    else if (nextPage == "MAIN_PAGE")
        video.src = "файли/відео/пряморуч_2.mp4";
    else if (nextPage == "CONSOLE_PAGE")
        video.src = "файли/відео/назадруч.mp4";

    video.autoplay = false;
    video.muted = false;
    video.loop = false;
    video.playsInline = true;
    video.controls = false;

    Object.assign(video.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        objectFit: "contain",
        zIndex: "9999",
        backgroundColor: "black",
        opacity: "0"
    });

    document.body.appendChild(video);

    setTimeout(() => { fadeInEffect(video); video.play(); PlaySound("перехід.mp3"); }, 0); // nothing
    setTimeout(() => { ChangeWebsite(nextPage); fadeOutEffect(video);  }, 1000 + 3000); // fade in + video
    setTimeout(() => { video.remove(); }, 1000 + 3000 + 1000); // fade in + video + fade out
}

function fadeOutEffect(element)
{
    let fadeTarget = element;
    let opacity = 1;
    let fadeEffect = setInterval(function ()
    {
        if (!element.style.opacity)
        {
            element.style.opacity = opacity;
        }

        if (element.style.opacity > 0)
        {
            opacity -= 0.01;
            element.style.opacity = opacity;
        }
        else
        {
            clearInterval(fadeEffect);
        }
    }, 10);
}
function fadeInEffect(element)
{
    let fadeTarget = element;
    let opacity = 0;
    let fadeEffect = setInterval(function ()
    {
        if (!element.style.opacity)
        {
            element.style.opacity = opacity;
        }

        if (element.style.opacity < 1)
        {
            opacity += 0.01;
            element.style.opacity = opacity;
        }
        else
        {
            clearInterval(fadeEffect);
        }
    }, 10);
}



function OpenAnomaly()
{
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = "60%";
    div.style.top = "20%";
    div.style.backgroundColor = "#0c0c0c";
    div.style.color = "#ccc";
    div.style.border = "1px solid #444";
    div.style.padding = "15px";
    div.innerHTML = `<div style="width:100%;text-align:center;font-family:consolas;font-size:14px; margin: -5px 0px -10px 0px">звіт_аномалія_супутників.mp4</div><br>`;

    
    // Create video
    const video = document.createElement("video");
    video.src = "файли/відео/звіт_атракторна_аномалія.mp4";
    video.width = 320;
    video.height = 240;
    video.autoplay = true;
    video.muted = false;
    video.loop = false;
    video.playsInline = true;

    div.appendChild(video);
    document.body.appendChild(div);

    setTimeout(() => { video.remove(); div.remove(); }, 22210 + 1500);
    
    WriteLine("");
    WriteLine("================ ЗВІТ:  АТРАКТОРНА АНОМАЛІЯ СУПУТНИКА ================");
    WriteLine("Супутник  «Мефістофель»  мав вийти на полярну орбіту Землі та увійти в");
    WriteLine("гібернацію.  Натомість  супутник нібито свідомо залучив свій  (єдиний)");
    WriteLine("іонний двигун,  вийшов  на  екваторіальну орбіту  та  через деякий час");
    WriteLine("залишив гравітаційне поле Землі. Куди він рухається наразі залишається");
    WriteLine("невідомо.");
    WriteLine("");
    WriteLine("Додаток №1:");
    WriteLine("Супутник  увійшов  до  гравітаційного поля карликової планети  Церери.");
    WriteLine("Спочатку це було прийнято  за  малоймовірний збіг,  але потім супутник");
    WriteLine("почав прикладати  тягу у зворотному напрямку,  вийшов на сталу орбіту,");
    WriteLine("продовжив гальмувати, і зрештою впав на Цереру.");
    WriteLine("");
    WriteLine("Додаток №2:");
    WriteLine("За останні  2 місяці дедалі більше супутників почали проявляти подібну");
    WriteLine("поведінку. Схема з разу в раз залишається сталою:  супутник  «виходить");
    WriteLine("з ладу», летить на Цереру,  після  чого  з  ним  втрачається  зв'язок.");
    WriteLine("======================================================================");
}
function OpenActivists()
{
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = "60%";
    div.style.top = "32%";
    div.style.backgroundColor = "#0c0c0c";
    div.style.color = "#ccc";
    div.style.border = "1px solid #444";
    div.style.padding = "15px";
    div.innerHTML = `<div style="width:100%;text-align:center;font-family:consolas;font-size:14px; margin: -5px 0px -10px 0px">звіт_екоактивісти.mp4</div><br>`;

    
    // Create video
    const video = document.createElement("video");
    video.src = "файли/відео/екоактивісти_стеження.mp4";
    video.width = 320;
    video.height = 240;
    video.autoplay = true;
    video.muted = false;
    video.loop = false;
    video.playsInline = true;

    div.appendChild(video);
    document.body.appendChild(div);

    setTimeout(() => { video.remove(); div.remove(); }, 10420 + 1500);

    WriteLine("");
    WriteLine("============== ЗВІТ:  ПІДРИВНА ДІЯЛЬНІСТЬ ЕКОАКТИВІСТІВ ==============");
    WriteLine("Агенти нашої контррозвідки виявили угрупування екоактивістів під ім'ям");
    WriteLine("«Корнюшон», члени якої виступають за закриття наукового корпусу ВАІ за");
    WriteLine("(нібито)  «засмічення  космічного простору  навколо Землі супутниковим");
    WriteLine("устаткуванням».  Попри абсурдність їхніх  заяв,  учасники  цієї  шайки");
    WriteLine("готують план дій з протидії проти наших дій.  Вкладений  відеоролик  є");
    WriteLine("записом однієї з презентацій,  яку  учасники «Корнюшона» показували на");
    WriteLine("своєму передостанньому з'їзді.  Агент,  що  записав  це  відео,  зумів");
    WriteLine("повернутися живим та передати нам цей відеозапис.");
    WriteLine("======================================================================");
}
function OpenIntruder()
{
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = "60%";
    div.style.top = "44%";
    div.style.backgroundColor = "#0c0c0c";
    div.style.color = "#ccc";
    div.style.border = "1px solid #444";
    div.style.padding = "15px";
    div.innerHTML = `<div style="width:100%;text-align:center;font-family:consolas;font-size:14px; margin: -5px 0px -10px 0px">звіт_непроханий_гість.mp4</div><br>`;

    
    // Create video
    const video = document.createElement("video");
    video.src = "файли/відео/тоні_трупер_стеження.mp4";
    video.width = 320;
    video.height = 240;
    video.autoplay = true;
    video.muted = false;
    video.loop = false;
    video.playsInline = true;

    div.appendChild(video);
    document.body.appendChild(div);

    setTimeout(() => { video.remove(); div.remove(); }, 22160 + 1500);

    WriteLine("");
    WriteLine("======================= ЗВІТ: НЕПРОХАНИЙ ГІСТЬ =======================");
    WriteLine("Агенти нашої контррозвідки виявили  несанкціоновану  спробу  входу  до");
    WriteLine("нашої  системи.  Після нетривалого розслідування нами було встановлено");
    WriteLine("особу, відповідальну за поршуення.  Нею  виявився  колишній  приватний");
    WriteLine("детектив під псевдонімом Тоні Трупер  (справжнє ім'я Тоніслав Трупер).");
    WriteLine("Наразі він знаходиться  у  закинутій  радіолокаційній  вежі,  яку  ВАІ");
    WriteLine("використовував у радянські часи,  але  яку  відтоді  було  виведено  з");
    WriteLine("ужитку. За об'єктом ведеться цілдобове стеження.");
    WriteLine("");
    WriteLine("Додаток №1:");
    WriteLine("Дійсно,  свого часу  Тоні був грізним детективом,  від  соколиного ока");
    WriteLine("якого  не услизав  жоден  злочинець,  однак після сенсаційного провалу");
    WriteLine("«Діла про Марганецького маніяка», Тоні Трупер швидко втратив хватку та");
    WriteLine("став жалюгідним посміховиськом.  В своєму поточному стані  він не несе");
    WriteLine("нам загрози.");
    WriteLine("======================================================================");
}

function OpenCeresProject()
{
    WriteLine("   ____                   ____            _           _                  ");
    WriteLine("  / ___|___ _ __ ___  ___|  _ \\ _ __ ___ (_) ___  ___| |_   _____  _____ ");
    WriteLine(" | |   / _ \\ '__/ _ \\/ __| |_) | '__/ _ \\| |/ _ \\/ __| __| / _ \\ \\/ / _ \\");
    WriteLine(" | |__|  __/ | |  __/\\__ \\  __/| | | (_) | |  __/ (__| |_ |  __/>  <  __/");
    WriteLine("  \\____\\___|_|  \\___||___/_|   |_|  \\___// |\\___|\\___|\\__(_)___/_/\\_\\___|");
    WriteLine("                                       |__/                              ");
    if (FLAG_IS_PROGRAMME_ACTIVATED)
    {
        WriteLine("ПОМИЛКА: Ракету вже активовано.");
        return;
    }
    isCeresProjectOn = true;
    WriteLine("Вітаємо у програмі-активаторі останньої ракети-носія в цереріанський вояж-кампанії.");
    WriteLine("Введіть пароль або команду 'abort', якщо хочете вийти з програми.");
}
const pasvord = "bai2003"
function CeresProjectProcess(command)
{
    if (command == "abort")
    {
        isCeresProjectOn = false;
        WriteLine("");
        WritePrefix();
        input.value = "";
        return;
    }

    if (command.length < 6)
    {
        WriteLine("Пароль повинен містити щонайменше 6 символів.");
    }
    else if (/^[A-Za-z0-9]+$/.test(command) == false)
    {
        WriteLine("Пароль повинен містити лише латинські літери та цифри.");
    }
    else if (command == pasvord)
    {    
        ActivateRocket();
        input.value = "";
        return;
    }
    else
    {
        WriteLine("Неправильний пароль.");
    }
    WriteLine("");
    WritePrefix();
    input.value = "";
}

function ActivateRocket()
{
    FLAG_IS_PROGRAMME_ACTIVATED = true;
    isCeresProjectOn = false;
    PlaySound("пасворд.wav");
    setTimeout(() => { WriteLine("Ракету активовано."); WriteLine(""); WritePrefix(); }, 2000);
    //setTimeout(() => { PlaySound("клу.wav"); }, 3000);
}