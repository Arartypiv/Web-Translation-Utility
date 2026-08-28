let FLAG_IS_PROGRAMME_ACTIVATED = false;
let FLAG_IS_HEART_INSTALLED = false;

function ProcessRocketLaunchButton()
{
    if (FLAG_IS_PROGRAMME_ACTIVATED == false)
    {
        PlaySound("механічний_рух.wav");
        document.getElementById("rocketHint").innerHTML = "Запуск неможливий. Ракета неактивована. Активуйте ракету через програму-активатор.";
    }
    else if (FLAG_IS_HEART_INSTALLED == false)
    {
        PlaySound("механічний_рух.wav");
        document.getElementById("rocketHint").innerHTML = "Запуск неможливий. У ракеті відсутній навігаційний модуль. Вставте механізований прилад пошуку цілі у відповідний слот.";
    }
    else
    {
        PlaySound("алярм.wav");
        setTimeout(() => { LaunchRocket(); }, 5000);
    }
}
let wind = new Music("цереріанський_вітер.mp3");

function LaunchRocket()
{
    document.getElementById("rocketHint").innerHTML = "";
    PlaySound("річфодескай.mp3") // річсогай
    ShowSmoke();
    ShakeDiv("rocketDiv", 8000);
    setTimeout(() =>
    {
        FadeToBlack(5000);
        let compoundDelayForBBLament = 0;
        for (let i = 1; i > 0; i -= 0.01)
        {
            setTimeout(() => { bb_lament.SetVolume(i); }, compoundDelayForBBLament);
            compoundDelayForBBLament += 50; // (1 - i) * 5000; <- not compound but complete
        }
        setTimeout(() => { window.scrollTo(0, 0); }, 5000 + 1000);
        setTimeout(() => { ChangeWebsite("CERES_PAGE"); PlayTravelVideo(); }, 5000 + 2000);
        setTimeout(() => { FadeFromBlack(); wind.Play(); }, 5000 + 2000 + 8650 + 2000);

        setTimeout(() => { bb_lament.Stop(); }, 10000); // just in case
    }, 3000);
}

function ShowSmoke()
{
    let smokeCount = 6;
    let compoundDelay = 0;
    for (let i = 0; i < smokeCount; i++)
    {
        setTimeout(() => { CreateSmokeDiv(i); }, compoundDelay);
        compoundDelay += 750;
    }
    
}

const smokeLifetime = 20000;
function CreateSmokeDiv(index)
{
    let div = document.createElement("div");

    div.style.position = "absolute";
    switch (index)
    {
        case 0:
            div.style.marginLeft = -50 + "px";
            div.style.marginTop = 3475 + "px";
            break;
            
        case 1:
            div.style.marginLeft = -250 + "px";
            div.style.marginTop = 3525 + "px";
            break;
            
        case 2:
            div.style.marginLeft = 150 + "px";
            div.style.marginTop = 3525 + "px";
            break;
            
        case 3:
            div.style.marginLeft = -450 + "px";
            div.style.marginTop = 3575 + "px";
            break;
            
        case 4:
            div.style.marginLeft = -50 + "px";
            div.style.marginTop = 3575 + "px";
            break;
            
        case 5:
            div.style.marginLeft = 350 + "px";
            div.style.marginTop = 3575 + "px";
            break;
    }

    div.style.width = "800px";
    div.style.height = "456px";

    div.style.backgroundImage = 'url("файли/зображення/дим.gif")';
    div.style.backgroundSize = "cover";
    div.style.backgroundRepeat = "no-repeat";
    div.style.pointerEvents = "none";

    document.getElementById("rocketDiv").appendChild(div);

    setTimeout(() => { div.remove(); }, smokeLifetime);
}

function FadeToBlack(duration = 5000)
{
  const overlay = document.createElement('div');
  overlay.id = 'page-overlay1';

  document.body.appendChild(overlay);

  requestAnimationFrame(() =>
  {
    overlay.style.transitionDuration = `${duration}ms`;
    overlay.classList.add('active');
  });

    setTimeout(() => { overlay.remove(); }, duration + 2000 + 8650);

}

function FadeFromBlack(duration = 5000)
{
  const overlay = document.createElement('div');
  overlay.id = 'page-overlay2';

  document.body.appendChild(overlay);

  requestAnimationFrame(() =>
  {
    overlay.style.transitionDuration = `${duration}ms`;
    overlay.classList.add('active');
  });

  setTimeout(() => { overlay.remove(); }, duration);
}


function ShakeDiv(id, duration)
{
  const div = document.getElementById(id);
  if (!div)
    return;

  div.animate(
    [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-2px)' },
      { transform: 'translateX(0)' },
      { transform: 'translateX(2px)' },
      { transform: 'translateX(0)' }
    ],
    {
      duration: 100,
      iterations: Math.round(duration / 100)
    }
  );
}

function PlayTravelVideo()
{
    const video = document.createElement("video");

    video.src = "файли/відео/роклетамік.mp4";
    video.autoplay = true;
    video.muted = true;
    video.loop = false;
    video.playsInline = true;

    Object.assign(video.style,
    {
        position: "fixed",
        inset: "0",
        width: "100vw",
        height: "100vh",
        objectFit: "cover",
        zIndex: "99999999999"
    });

    document.body.appendChild(video);
    setTimeout(() => { video.remove(); }, 8650 + 2000);

}