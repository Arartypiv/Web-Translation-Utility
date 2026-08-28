function sleep(ms)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

// РАНДОМ
function GetRandom(...args)
{
    if (args.length == 1)
        return Math.floor(Math.random() * args[0]);
    else if (args.length == 2)
        return Math.floor(Math.random() * (args[1] - args[0]) + args[0]);
}

function GetRandomItem(...args)
{
    let arr = args.toString().split(",");
    return arr[Math.floor(Math.random() * arr.length)];
}

function GetRandomElementOfArray(array)
{
    return array[Math.floor(Math.random() * array.length)];
}

// ЗВУКИ ТА МУЗИКА
function PlaySound(fileName)
{
    let audio = new Audio("файли/звуки/" + fileName);
    audio.play();
}

function Shuffle(array)
{
    let currentIndex = array.length;
    while (currentIndex != 0)
    {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

class Music
{
    constructor(fileName)
    {
        this.audio = new Audio("файли/звуки/" + fileName);
    }

    SetMusic(fileName)
    {
        this.audio = new Audio("файли/звуки/" + fileName);
    }

    Play()
    {
        if (!this.audio)
            return;
        this.audio.loop = true;
        this.audio.play();
    }

    Stop()
    {
        if (!this.audio)
            return;
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    SetVolume(vol)
    {
        if (!this.audio)
            return;
        
        if (vol < 0)
        {
            this.audio.volume = 0;
        }
        else if (vol > 1)
        {
            this.audio.volume = 1;
        }
        else
        {
            this.audio.volume = vol;
        }
    }
    GetVolume()
    {
        return this.audio.volume;
    }
}