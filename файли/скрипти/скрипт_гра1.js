let music;
let trollface_clicksNeeded;
let trollface_timesClicked;

function trollface_TrollClick()
{
  PlaySound(GetRandomItem("смішок_1.wav", "смішок_2.wav"));
  let element = document.getElementById("trollfaceButton");
    element.animate(
    [
      { transform: 'translateX(0px)' },
      { transform: 'translateX(10px)' },
      { transform: 'translateX(-10px)' },
      { transform: 'translateX(0px)' }
    ],
    {
      duration: 150,
      iterations: 4,
      easing: 'linear'
    }
  );
}

function trollface_ProcessButton(colour)
{
  PlaySound("клік_троль.wav");
  if (trollface_timesClicked == trollface_clicksNeeded - 1)
  {
    if (colour == "red")
    {
      trollface_timesClicked += 1;
      trollface_UpdateLabel();
      trollface_Win();
    }
    else
    {
      trollface_Fail();
    }
  }
  else if (trollface_timesClicked < trollface_clicksNeeded)
  {
    if (colour == "green")
    {
      trollface_timesClicked += 1;
      trollface_UpdateLabel();
    }
    else
    {
      trollface_Fail();
    }
  }
}

function trollface_UpdateLabel()
{
  let colour = document.getElementById("trollButtonColourSpan");
  let counter = document.getElementById("trollButtonCounterSpan");
  
  if (trollface_timesClicked != trollface_clicksNeeded - 1 && trollface_timesClicked != trollface_clicksNeeded)
  {
    colour.style.fontWeight = "bold";
    colour.style.color = "green";
    colour.textContent = "ЗЕЛЕНУ";
  }
  else
  {
    colour.style.fontWeight = "bold";
    colour.style.color = "green"; // теж green
    colour.textContent = "ЧЕРВОНУ";
  }

  let clicksLeft = trollface_clicksNeeded - trollface_timesClicked;
  let word = "";
  if (clicksLeft % 10 == 1) { word = "раз"; }
  else if (clicksLeft % 10 == 2 || clicksLeft % 10 == 3 || clicksLeft % 10 == 4) { word = "рази"; }
  else { word = "разів"; }

  counter.textContent = `${clicksLeft} ${word}`;
}

function trollface_Reset()
{
  if (typeof music !== 'undefined')
  {
    music.Stop();
  }
  music = new Music("trollface_quest.mp3");
  music.Play();

  trollface_clicksNeeded = 10;
  trollface_timesClicked = 0;
  trollface_UpdateLabel();
}

function trollface_Fail()
{
  PlaySound("троль_поразка.wav");
  setTimeout(() => { alert("От ти розтяпа :)"); }, 150);
  setTimeout(() => { trollface_Reset(); }, 150);
}

function trollface_Win()
{
  PlaySound("троль_успіх.wav");
  setTimeout(() => { document.getElementById("minigameLinksDiv").style.display = "block"; }, 1500);
  setTimeout(() => { document.getElementById("trollfaceDiv").style.display = "none"; }, 1500);
  setTimeout(() => { music.Stop(); }, 1500);
  setTimeout(() => { FirstMinigamePassed(); }, 1500);
}

function trollface_Start()
{
  document.getElementById("minigameLinksDiv").style.display = "none";
  document.getElementById("trollfaceDiv").style.display = "block";

  trollface_Reset();
}