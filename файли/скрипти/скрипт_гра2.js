let gridShown = true;
let spotHighlighted = false;

let x = 4;
let y = 2;

let targetX = 1;
let targetY = 0;

let DEPONIA_canvas = document.getElementById("deponiaCanvas");
let DEPONIA_ctx = DEPONIA_canvas.getContext("2d");

let bg_broken = new Image();
bg_broken.src = "файли/зображення/барофлюгель_зламаний.jpg";

let bg_hint = new Image();
bg_hint.src = "файли/зображення/барофлюгель_підказка.jpg";

let bg_fixed = new Image();
bg_fixed.src = "файли/зображення/барофлюгель_полагоджений.jpg";

let pointer = new Image();
pointer.src = "файли/зображення/механічна_рука.png";

let grid = new Image();
grid.src = "файли/зображення/ґрати.png";

function deponia_ProcessButton(direction)
{
  switch (direction)
  {
    case "UpRight":
      deponia_AttemptMoving(dX=1, dY=-2);
      break;
    case "RightUp":
      deponia_AttemptMoving(dX=2, dY=-1);
      break;
    case "RightDown":
      deponia_AttemptMoving(dX=2, dY=1);
      break;
    case "DownRight":
      deponia_AttemptMoving(dX=1, dY=2);
      break;
    case "DownLeft":
      deponia_AttemptMoving(dX=-1, dY=2);
      break;
    case "LeftDown":
      deponia_AttemptMoving(dX=-2, dY=1);
      break;
    case "LeftUp":
      PlaySound("розряд.wav");
      break;
    case "UpLeft":
      PlaySound("розряд.wav");
      break;
  }
}

const gridSizeX = 5;
const gridSizeY = 3;
function deponia_AttemptMoving(dX, dY, toPlaySound = true)
{
  if (x + dX < 0 || x + dX > gridSizeX ||
      y + dY < 0 || y + dY > gridSizeY)
  {
    PlaySound("заїло.wav");
    return;
  }
  
  if (Math.abs(dX) > Math.abs(dY))
  {
    setTimeout(() => { PlaySound("механічний_рух.wav"); }, 0);
    setTimeout(() => { deponia_Move(dX, 0); }, 100);
    setTimeout(() => { PlaySound("механічний_рух.wav"); }, 300);
    setTimeout(() => { deponia_Move(0, dY); }, 400);
  }
  else
  {
    setTimeout(() => { PlaySound("механічний_рух.wav"); }, 0);
    setTimeout(() => { deponia_Move(0, dY); }, 100);
    setTimeout(() => { PlaySound("механічний_рух.wav"); }, 300);
    setTimeout(() => { deponia_Move(dX, 0); }, 400);
  }
  setTimeout(() =>
  { 
    console.log(x, y);
    if (x == targetX && y == targetY) { deponia_Win(); }
  }, 410);
}

function deponia_Move(dX, dY)
{
  x += dX;
  y += dY;
  deponia_UpdateCanvas();
}

function deponia_UpdateCanvas(haveWon = false)
{
  if (haveWon)
  {
    // DEPONIA_canvas.width = 600;
    // DEPONIA_canvas.height = 400;

    DEPONIA_canvas.width = grid.naturalWidth;
    DEPONIA_canvas.height = grid.naturalHeight;
    DEPONIA_ctx.imageSmoothingEnabled = true;
    
    DEPONIA_ctx.drawImage(bg_fixed, 0, 0);
  }
  else
  {
    // DEPONIA_canvas prep
    // DEPONIA_canvas.width = 600;
    // DEPONIA_canvas.height = 400;

    DEPONIA_canvas.width = grid.naturalWidth;
    DEPONIA_canvas.height = grid.naturalHeight;
    DEPONIA_ctx.imageSmoothingEnabled = true;

    // draw bg
    if (!spotHighlighted) { DEPONIA_ctx.drawImage(bg_broken, 0, 0); }
    else { DEPONIA_ctx.drawImage(bg_hint, 0, 0); }

    // draw pointer (middle ground)
    DEPONIA_ctx.drawImage(pointer, x * 98 + 20, y * 98 + 30);

    // draw grid (foreground)
    if (gridShown) { DEPONIA_ctx.drawImage(grid, 0, 0); }
  }
}

function deponia_Reset()
{
  if (typeof music !== 'undefined')
    music.Stop();
  music = new Music("hmp_irongate.mp3");
  music.Play();
  
  var buttons = document.getElementsByClassName("deponiaButton");
  for (var butt of buttons)
    butt.disabled = false;

  x = 4;
  y = 2;
  deponia_UpdateCanvas();
}

function deponia_Win()
{
  var buttons = document.getElementsByClassName("deponiaButton");
  for (var butt of buttons)
  {
    butt.disabled = true;
  }
  
  setTimeout(() => { deponia_UpdateCanvas(true);}, 600);
  music.Stop();
  PlaySound("ізострічка.wav");
  setTimeout(() => { document.getElementById("minigameLinksDiv").style.display = "block"; }, 2000);
  setTimeout(() => { document.getElementById("deponiaDiv").style.display = "none"; }, 2000);
  setTimeout(() => { SecondMinigamePassed(); }, 2000);
}

function deponia_Start()
{
  document.getElementById("minigameLinksDiv").style.display = "none";
  document.getElementById("deponiaDiv").style.display = "block";

  gridShown = true;
  spotHighlighted = false;

  deponia_Reset();
  setTimeout(() => { deponia_Move(0, 0); }, 1);
}

function deponia_ToggleGrid(checkbox)
{
  if(checkbox.checked == true)
  {
      gridShown = true;
  }
  else
  {
    gridShown = false;
  }
  deponia_UpdateCanvas();
}

function deponia_ToggleHint(checkbox)
{
  if(checkbox.checked == true)
  {
      spotHighlighted = true;
  }
  else
  {
    spotHighlighted = false;
  }
  deponia_UpdateCanvas();
}