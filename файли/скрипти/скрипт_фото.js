let photo_counter = 0;
const consol = document.getElementById("console");
const imag = document.getElementById("imag");
const butt = document.getElementById("getPhotoButton");
consol.scrollTop = consol.scrollHeight;

function RequestPhoto()
{
    imag.style.display = "none";
    butt.disabled = true;
    photo_counter += 1;

    if (photo_counter == 3)
    {
        Scary();
        return;
    }

    let selectedSatellite = document.getElementById("satelliteDropbox").value;
    switch (selectedSatellite)
    {
        case "Lucifer":
            Lucifer();
            break;
        case "Leviathan":
            Leviathan();
            break;
        case "Satan":
            Satan();
            break;
        case "Belphegor":
            Belphegor();
            break;
        case "Mammon":
            Mammon();
            break;
        case "Beelzebub":
            Beelzebub();
            break;
        case "Asmodeus":
            Asmodeus();
            break;
    }
}
    async function Lucifer()
    {
        PlaySound("модем1.mp3");
        consol.value = `==Ініціалізація зв'язку з "Люцифер"==`;
        SpitBullshit();
        setTimeout(() => {
            ConsoleWriteLine("Image reconstructed");
            ConsoleWriteLine("==Зображення отримано успішно==");
            imag.src = `файли/зображення/фото_супутник/фото${GetRandom(11)+1}.jpg`;
            butt.disabled = false;
            imag.style.display = "block";
        }, 22788);
        
    }
    async function Leviathan()
    {
        PlaySound("модем2.mp3");
        consol.value = `==Ініціалізація зв'язку з "Левіафан"==`;
        SpitBullshit();
        setTimeout(() => { 
            ConsoleWriteLine("Image reconstructed");
            ConsoleWriteLine("==Зображення отримано успішно==");
            imag.src = `файли/зображення/фото_супутник/фото${GetRandom(11)+1}.jpg`;
            butt.disabled = false;
            imag.style.display = "block";
        }, 25657);
    }
    async function Satan()
    {
        PlaySound("модем3.mp3");
        consol.value = `==Ініціалізація зв'язку з "Сатана"==`;
        SpitBullshit();
        setTimeout(() => { 
            ConsoleWriteLine("Image reconstructed");
            ConsoleWriteLine("==Зображення отримано успішно==");
            imag.src = `файли/зображення/фото_супутник/фото${GetRandom(11)+1}.jpg`;
            butt.disabled = false;
            imag.style.display = "block";
        }, 26330);
    }
    async function Belphegor()
    {
        PlaySound("модем4.mp3");
        consol.value = `==Ініціалізація зв'язку з "Бельфегор"==`;
        SpitBullshit();
        setTimeout(() => { 
            ConsoleWriteLine("Image reconstructed");
            ConsoleWriteLine("==Зображення отримано успішно==");
            imag.src = `файли/зображення/фото_супутник/фото${GetRandom(11)+1}.jpg`;
            butt.disabled = false;
            imag.style.display = "block";
        }, 24279);
    }
    async function Mammon()
    {
        PlaySound("модем5.mp3");
        consol.value = `==Ініціалізація зв'язку з "Мамона"==`;
        SpitBullshit();
        setTimeout(() => { 
            ConsoleWriteLine("Image reconstructed");
            ConsoleWriteLine("==Зображення отримано успішно==");
            imag.src = `файли/зображення/фото_супутник/фото${GetRandom(11)+1}.jpg`;
            butt.disabled = false;
            imag.style.display = "block";
         }, 25985);
    }
    async function Beelzebub()
    {
        PlaySound("модем6.mp3");
        consol.value = `==Ініціалізація зв'язку з "Вельзевул"==`;
        SpitBullshit();
        setTimeout(() => { 
            ConsoleWriteLine("Image reconstructed");
            ConsoleWriteLine("==Зображення отримано успішно==");
            imag.src = `файли/зображення/фото_супутник/фото${GetRandom(11)+1}.jpg`;
            butt.disabled = false;
            imag.style.display = "block";
        }, 26889);
    }
    async function Asmodeus()
    {
        PlaySound("модем7.mp3");
        consol.value = `==Ініціалізація зв'язку з "Асмодей"==`;
        SpitBullshit();
        setTimeout(() => { 
            ConsoleWriteLine("Image reconstructed");
            ConsoleWriteLine("==Зображення отримано успішно==");
            imag.src = `файли/зображення/фото_супутник/фото${GetRandom(11)+1}.jpg`;
            butt.disabled = false;
            imag.style.display = "block";
        }, 20233);
    }
    async function Scary()
    {
        PlaySound("модем7.mp3");
        consol.value = `==Ініціалізація зв'язку з "???"==`;
        SpitBullshit();
        setTimeout(() => { 
            ConsoleWriteLine("Image reconstructed");
            ConsoleWriteLine("==Зображення отримано успішно==");
            imag.src = `файли/зображення/фото_супутник/фотоСВИНЯ.jpg`;
            butt.disabled = false;
            imag.style.display = "block";
            PlaySound("хрю.ogg");
            FoundPhotoPig();
        }, 20233);
    }
    
async function SpitBullshit()
{
    let current_time = 0;
    current_time += 250; setTimeout(() => { ConsoleWriteLine("Received image request"); },                           current_time); // 250
    current_time += 250; setTimeout(() => { ConsoleWriteLine("Sending outbound request signal to satellite..."); },  current_time); // 500
    current_time += 750; setTimeout(() => { ConsoleWriteLine("Response signal received"); },                         current_time); // 1250
    current_time += 250; setTimeout(() => { ConsoleWriteLine("Triangulating the position of the satellite..."); },   current_time); // 1500
    current_time += 500; setTimeout(() => { ConsoleWriteLine(`Tower 1 delay: ${GetRandom(3000, 7000) / 1000}ms`); }, current_time); // 2000
    current_time += 500; setTimeout(() => { ConsoleWriteLine(`Tower 2 delay: ${GetRandom(3000, 7000) / 1000}ms`); }, current_time); // 2500
    current_time += 500; setTimeout(() => { ConsoleWriteLine(`Tower 3 delay: ${GetRandom(3000, 7000) / 1000}ms`); }, current_time); // 3000
    current_time += 250; setTimeout(() => { ConsoleWriteLine(`Calculating absolute position...`); },                 current_time); // 3250
    current_time += 250; setTimeout(() => { ConsoleWriteLine(`Satellite position established (longAbs:${(GetRandom(1000000)/10000).toFixed(4)}, latAbs:${(GetRandom(1000000)/10000).toFixed(4)})`); }, current_time); // 3500
    current_time += 250; setTimeout(() => { ConsoleWriteLine("Connecting..."); },                                                    current_time); // 3750
    current_time += 750; setTimeout(() => { ConsoleWriteLine("Connection established"); },                                           current_time); // 4500
    current_time += 250; setTimeout(() => { ConsoleWriteLine("Main.System.engage();"); },                                            current_time); // 4750
    current_time += 750; setTimeout(() => { ConsoleWriteLine("Log: \"satellite active\""); },                                        current_time); // 5500
    current_time += 250; setTimeout(() => { ConsoleWriteLine("Main.Instruments.Cameras.getByName(\"frontCam\").getCamStatus();"); }, current_time); // 5750
    current_time += 750; setTimeout(() => { ConsoleWriteLine("Log: \"CameraStatus.Active\""); },                                     current_time); // 6500
    current_time += 250; setTimeout(() => { ConsoleWriteLine("Main.Instruments.Cameras.getByName(\"frontCam\").snapshot();"); },     current_time); // 6750
    current_time += 750; setTimeout(() => { ConsoleWriteLine("Log: \"<object bitmap>\""); },                                         current_time); // 7500
    current_time += 250; setTimeout(() => { ConsoleWriteLine("Main.Toolkit.Transmission.transmitData(type=bitmap, data=Main.Toolkit.Buffer.retrieveBuffer());"); },  current_time); // 7750
    current_time += 750; setTimeout(() => { ConsoleWriteLine("Log: \"process init\""); },         current_time); // 8500
    current_time += 250; setTimeout(() => { ConsoleWriteLine("==Початок передачі=="); },          current_time); // 8750
    current_time += 750; setTimeout(() => { ConsoleWriteLine("Log: \"deploying antenna 0\""); },  current_time); // 9500
    for (let i = 0; i < 30; i++) // 0 - 29 (30)
    {
        current_time += 50; setTimeout(() => { ConsoleWriteLine(`Log: \"antenna 0 extension: ${(i * 100 / 29).toFixed(2)}%\"`); }, current_time); // fin at 11000
    }
    current_time += 250; setTimeout(() => { ConsoleWriteLine("Log: \"antenna deployed\""); },     current_time); // 11250
    current_time += 250; setTimeout(() => { ConsoleWriteLine("Log: \"transmission begin\""); },   current_time); // 11500
    current_time += 250; setTimeout(() => { ConsoleWriteLine("Downloading data..."); },           current_time); // 11750
    for (let i = 0; i < 40; i++) // 0 - 39 (40)
    {
        current_time += 100; setTimeout(() => { ConsoleWriteLine(`Progress: ${(i * 100 / 39).toFixed(2)}%\"`); }, current_time); // fin at 15750
    }
    current_time += 250; setTimeout(() => { ConsoleWriteLine("Download complete"); },             current_time); // 16000
    current_time += 250; setTimeout(() => { ConsoleWriteLine("Main.System.hibernate();"); },      current_time); // 16250
    current_time += 750; setTimeout(() => { ConsoleWriteLine("Log: \"satellite is idle\""); },    current_time); // 17000
    current_time += 250; setTimeout(() => { ConsoleWriteLine("Decoding begin..."); },             current_time); // 17250
    current_time += 1000;setTimeout(() => { ConsoleWriteLine("Decoding complete"); },             current_time); // 18250
    current_time += 250; setTimeout(() => { ConsoleWriteLine("Normalising solar levels..."); },   current_time); // 18500
    current_time += 250; setTimeout(() => { ConsoleWriteLine("Adjusting gradient descent..."); }, current_time); // 18750
    current_time += 250; setTimeout(() => { ConsoleWriteLine("Filling logits..."); },             current_time); // 19000
    current_time += 250; setTimeout(() => { ConsoleWriteLine(`Tesselation level: ${GetRandom(1, 5)}`); },             current_time); // 19250
    current_time += 250; setTimeout(() => { ConsoleWriteLine(`Eval: ${(GetRandom(9000, 9999)/10000).toFixed(4)}`); }, current_time); // 19500
    current_time += 250; setTimeout(() => { ConsoleWriteLine("Verdict: pass"); },                                     current_time); // 19750
    current_time += 250; setTimeout(() => { ConsoleWriteLine("Reconstructing the image..."); },                       current_time); // 20000
}

async function ConsoleWriteLine(text)
{
    const lines = consol.value.split("\n");
    if (lines.length >= consol.rows)
    {
        lines.shift();
        consol.value = lines.join("\n");    
    }
    consol.value += `\n${text}`;
}

function ProgressPhoto(value)
{
    switch (value)
    {
        case "0":
            document.getElementById("fakePhoto").setAttribute('src', 'файли/зображення/тест_фото1.jpg');
            document.getElementById("photoDescription").innerHTML = "Земля та її супутник Місяць очима супутника ВАІ.";
            document.getElementById("photoDescription2").innerHTML = "Необроблена, «сира» фотографія. Це дійсність.";
            break;
        case "1":
            document.getElementById("fakePhoto").setAttribute('src', 'файли/зображення/тест_фото2.jpg');
            document.getElementById("photoDescription").innerHTML = "Нормалізація соляризаційних рівнів суттєво зменшила однойменний радіоактивний шум.";
            document.getElementById("photoDescription2").innerHTML = "На цьому етапі фотографія набирає кольорового забарвлення. Це правда.";
            break;
        case "2":
            document.getElementById("fakePhoto").setAttribute('src', 'файли/зображення/тест_фото3.jpg');
            document.getElementById("photoDescription").innerHTML = "Налаштований методом Коржикова градієнтний спуск нівелює вплив радіоізотопних квантів.";
            document.getElementById("photoDescription2").innerHTML = "Саме такі фото використовують науковці ВАІ для здійснення дослідів та спостережень. Це теж правда.";
            break;
        case "3":
            document.getElementById("fakePhoto").setAttribute('src', 'файли/зображення/тест_фото4.jpg');
            document.getElementById("photoDescription").innerHTML = "Очищена від небажаних елементів фотографія.";
            document.getElementById("photoDescription2").innerHTML = "В такому вигляді фотографію можна показувати широкій публіці. Це «правда».";
            break;
    }
}