const weatherDiv  = document.getElementById("weatherDiv");
const cityTextbox = document.getElementById("weatherCity");
const tempTextbox = document.getElementById("weatherTemperature");

let city = "Вінниця";

function DisplayWeather()
{
    const currentDate = new Date();
    cityTextbox.innerHTML = city;
    tempTextbox.innerHTML = GetTemperature(currentDate) + "°";

    let month = currentDate.getMonth();
    switch (month)
    {
        case 0:
        case 1:
        case 11:
            weatherDiv.style.backgroundImage = 'url(файли/зображення/погода_зима.png)';
            weatherDiv.style.color = "#fff";
            break;
        
        case 2:
        case 3:
        case 4:
            weatherDiv.style.backgroundImage = 'url(файли/зображення/погода_весна.png)';
            break;
        
        case 5:
        case 6:
        case 7:
            weatherDiv.style.backgroundImage = 'url(файли/зображення/погода_літо.png)';
            break;
        
        case 8:
        case 9:
        case 10:
            weatherDiv.style.backgroundImage = 'url(файли/зображення/погода_осінь.png)';
            break;
    }
}

const dayTemps = [-3, -5, 6, 14, 25, 31, 36, 33, 24, 13, 6, 0]

function GetTemperature(currentDate)
{
    let baseTemp = dayTemps[currentDate.getMonth()];
    let isNighttime = (currentDate.getHours() < 6 || currentDate.getHours() > 21);

    if (isNighttime)
        baseTemp -= GetRandom(3, 7);

    baseTemp += GetRandom(-3, 4);

    return baseTemp;
}

DisplayWeather();