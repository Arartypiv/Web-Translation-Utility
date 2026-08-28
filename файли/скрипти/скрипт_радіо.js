class RadioSong {
    constructor(fileName, volume, desiredFrequency, totalRange, message) {
        this.fileName = fileName;
        this.volume = volume;
        this.desiredFrequency = desiredFrequency;
        this.totalRange = totalRange;
        this.message = message;

        this.song = new Music(fileName);
        this.listenedFor = 0;
    }
    
    listen()
    {
        if (this.listenedFor < 60000)
            this.listenedFor += 1;
    }
}

let noise = new RadioSong("шум.mp3", 1, -1000, 9000000, "");
let skryabin = new RadioSong("скрябін-то_моє_море.mp3", 0, 200, 50, "скрябін");
let oe = new RadioSong("океан_ельзи-без_бою.mp3", 0, 450, 50, "океан ельзи");
let tnmk = new RadioSong("тнмк-вода.mp3", 0, 600, 50, "тнмк");

let tt = new RadioSong("тт_початок.mp3", 0, 50, 20, "???");

const songs = [tnmk, oe, skryabin];
songs.push(noise);
songs.push(tt);

let toggleButton = document.getElementById("radioButton");

let isFirstTime = true;
let isOn = false;
let isTuned = false;
let noiseBoost = 0.15;
let currentFrequency = 0;
const badNoise = new Music("шум_поганий.mp3");

function RadioOn()
{
    if (isFirstTime)
    {
        noise.song.Play();
        tnmk.song.Play();
        oe.song.Play();
        skryabin.song.Play();
        // tony trooper doesn't start yet
        ChangeFrequency(currentFrequency);

        isFirstTime = false;
    }
    else
    {
        ChangeFrequency(currentFrequency);
    }
}
function RadioOff()
{
    noise.song.SetVolume(0);
    tnmk.song.SetVolume(0);
    oe.song.SetVolume(0);
    skryabin.song.SetVolume(0);
    tt.song.SetVolume(0);
}

function ChangeFrequency(newFrequency)
{
    if (!isOn)
    { return; }
    // console.log(newFrequency);
    currentFrequency = newFrequency;
    let tempTotalVol = 0;
    for (let i = 0; i < songs.length; i++)
    {
        let tempVol = GetVolume(currentFrequency, songs[i].desiredFrequency, songs[i].totalRange);
        tempTotalVol += tempVol;
        songs[i].volume = tempVol;
        songs[i].song.SetVolume(songs[i].volume);
    }
    noise.song.SetVolume(Math.max(0, 1 - tempTotalVol + noise.volume + noiseBoost));
    document.getElementById("frequencyDisplay").innerHTML = `${(newFrequency / 23 + 81.3).toFixed(1)} FM`;
}

function ToggleRadio() {
    radioButton.disabled = true;
    PlaySound("клік.mp3");
    currentFrequency = document.getElementById("frequencySlider").value;

    if (!isTuned)
    {
        isOn = !isOn;
        if (isOn)
        {
            radioButton.style.backgroundImage = "url('файли/зображення/ввімк.png')";
            badNoise.Play();
        }
        else
        {
            radioButton.style.backgroundImage = "url('файли/зображення/вимк.png')";
            badNoise.Stop();
        }
        radioButton.disabled = false;
        return;
    }

    if (isOn) {
        isOn = !isOn;
        radioButton.style.backgroundImage = "url('файли/зображення/вимк.png')"
        RadioOff();
        radioButton.disabled = false;
    }
    else {
        radioButton.style.backgroundImage = "url('файли/зображення/ввімк.png')"
        setTimeout(() => {
            isOn = !isOn;
            RadioOn();
            radioButton.disabled = false;
        }, 1000);
    }

}

function GetVolume(currentFrequency, desiredFrequency, totalRange) {
    let vol = (100.0 - Math.abs(currentFrequency - desiredFrequency) * 100.0 / (totalRange / 2.0)) / 100.0;
    if (vol > 1) {
        return 1;
    }
    else if (vol < 0) {
        return 0;
    }
    else {
        return parseFloat(vol.toFixed(4));
    }
}


const radioCanvas = document.getElementById("radioCanvas");
const radioCTX = radioCanvas.getContext("2d");

const radioBG = new Image();
radioBG.src = "файли/зображення/тюнер.jpg";

let listenedToTTIntro = false;

function UpdateRadio()
{

    radioCanvas.width = radioBG.naturalWidth;//document.getElementById("mapCanvas").getBoundingClientRect().width * 2;
    radioCanvas.height = radioBG.naturalHeight;//document.getElementById("mapCanvas").getBoundingClientRect().height * 2;

    radioCTX.imageSmoothingEnabled = false;
    radioCTX.font = "15px segoe";
    radioCTX.fillStyle = "white";

    // background
    radioCTX.drawImage(radioBG, 0, 0);

    // middle shit
    if (isTuned)
    {
        for (let i = 0; i < songs.length; i++)
        {
            if (songs[i].volume > 0.6)
                songs[i].listen();
        
            if (songs[i].listenedFor > 150)
            {
                if (!listenedToTTIntro && songs[i] == tt)
                {
                    listenedToTTIntro = true;
                    tt.song.Play();
                    setTimeout(() =>
                    {
                        tt.fileName = "тт_луп.mp3";
                        tt.song.Stop();
                        tt.song = new Music(tt.fileName);
                        tt.song.Play();
                        console.log("is on? = " + isOn);
                        if (!isOn)
                        {
                            tt.song.SetVolume(0);
                            console.log("volume = " + tt.song.GetVolume());
                        }
                    }, 32500);
                }

                drawRectangle(radioCTX, songs[i].desiredFrequency - 1, 110, 2, 30, "white");
                radioCTX.fillText(songs[i].message, songs[i].desiredFrequency - 20, 155);
            }
        }
    }
    // foreground
    if (isOn) {
        drawRectangle(radioCTX, currentFrequency - 1, 100, 2, 50, "red");
    }
}

UpdateRadio();
setInterval(UpdateRadio, 10);


function drawRectangle(context, x1, y1, x2, y2, color) {
    context.beginPath();
    context.rect(x1, y1, x2, y2);

    context.lineWidth = 2;
    context.strokeStyle = color;
    context.stroke();
}

function FixRadio()
{
    isTuned = true;
    isOn = false;

    for (let i = 0; i < songs.length; i++)
        songs[i].listenedFor = 0;

    radioButton.style.backgroundImage = "url('файли/зображення/вимк.png')";
    badNoise.Stop();
}