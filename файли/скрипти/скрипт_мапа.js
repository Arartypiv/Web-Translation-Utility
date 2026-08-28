class Satellite
{
    constructor(angle, name)
    {
        this.angle = angle;
        this.name = name;
        this.signal = 25.1;
        this.quant = 4;
    }
}

const fontSize = 24;

const centerX = 800;
const centerY = 600;
const radius = 500;

const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "файли/зображення/мапа_фон.jpg";

const sat1 = new Satellite(0, "люцифер");
const sat2 = new Satellite(51, "левіафан");
const sat3 = new Satellite(103, "сатана");
const sat4 = new Satellite(154, "бельфегор");
const sat5 = new Satellite(206, "мамона");
const sat6 = new Satellite(257, "вельзевул");
const sat7 = new Satellite(309, "асмодей");

const satellites = [sat1, sat2, sat3, sat4, sat5, sat6];
satellites.push(sat7);


let updateTick = 1000;
const asteroidNames = ["Ковчег Гноя", "Крилатий Парусник", "Галілео Галілео", "Добряк-Б"];
const asteroidName = GetRandomElementOfArray(asteroidNames);
//console.log(asteroidName);
const satXXX = new Satellite(270, asteroidName);

function UpdateMap()
{
    canvas.width = img.naturalWidth;//document.getElementById("mapCanvas").getBoundingClientRect().width * 2;
    canvas.height = img.naturalHeight;//document.getElementById("mapCanvas").getBoundingClientRect().height * 2;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0);

    // regular satellites
    drawCircle(centerX, centerY, radius, "yellow");
    for (let i = 0; i < satellites.length; i++)
    {
        let coords = getCoords(centerX, centerY, radius, satellites[i].angle);
        drawTriangle(coords[0], coords[1], "red");
        
        let textX = coords[0] - 40;
        let textY = coords[1] - 40;
        
        if (coords[1] < 200)
            textY = coords[1] + 160;
        
        UpdateSatelliteInfo(satellites[i]);

        drawMultiText(textX, textY, fontSize, `сигнал: ${satellites[i].signal.toFixed(2)}%`,
                                              `квант.: ${satellites[i].quant}`,
                                              `кут нах.: ${(180 + Math.sin(satellites[i].angle / 180 * Math.PI)).toFixed(4)}`,
                                              `дов.: ${coords[1].toFixed(8)}`,
                                              `шир.: ${coords[0].toFixed(8)}`,
                                              `ім'я: ${satellites[i].name}`);
        satellites[i].angle += + 0.2;
        satellites[i].angle %= 360;
    }

    // code satellite
    let newRadius = 850;
    //drawCircle(centerX, centerY, newRadius, "red");
    let coords = getCoords(centerX, centerY, newRadius, satXXX.angle);
    drawTriangle(coords[0], coords[1], "red");
        
    let textX = coords[0] - 40;
    let textY = coords[1] - 40;
        
    UpdateSatelliteInfo(satXXX);
    drawMultiText(textX, textY, fontSize, `дов.: ${coords[1].toFixed(8)}`,
                                          `шир.: ${coords[0].toFixed(8)}`,
                                          `діам.: 233,7 км`,
                                          `ім'я: ${satXXX.name}`,
                                          `астероїд`);
    satXXX.angle += + 1;
    satXXX.angle %= 360;
}
UpdateMap();
setInterval(UpdateMap, updateTick);

function UpdateSatelliteInfo(satellite)
{
    // сила сигналу
    if (satellite.signal < 5)
    {
        satellite.signal += 0.1;
    }
    else if (satellite.signal > 75)
    {
        satellite.signal -= 0.1;
    }
    else
    {
        satellite.signal += (60 - GetRandom(120)) / 100;
    }
    // квант
    satellite.quant = GetRandom(4) + 1;
}

function AddMonster()
{
    if (satellites.length < 1000)
    {
        let monster = new Satellite(GetRandom(360), satellites.length);
        satellites.push(monster);
    }
}

function drawCircle(x, y, radius, color)
{
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);

    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function getCoords(centerX, centerY, radius, angleDeg)
{
    let x1 = centerX + radius * Math.cos(angleDeg / 180 * Math.PI);
    let y1 = centerY + radius * Math.sin(angleDeg / 180 * Math.PI);
    return [x1, y1];
}

function drawTriangle(x1, y1, color)
{
    ctx.beginPath();
    let x2 = x1-20;
    let y2 = y1-30;
    let x3 = x1+20;
    let y3 = y1-30;
    
    ctx.moveTo(x1, y1);   // first vertex
    ctx.lineTo(x2, y2);   // second vertex
    ctx.lineTo(x3, y3);   // third vertex
    ctx.closePath();      // closes back to first point

    ctx.fillStyle = color;
    ctx.fill();
}

function drawMultiText(x, y, interval)
{
    for (let i = 3; i < arguments.length; i++)
    {
        drawText(arguments[i], x, y - (i - 3) * interval);
    }
}
function drawText(text, x, y, color = "red", font = "24px Consolas")
{
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
}