class ow_Button
{
  constructor(id, left, top)
  {
    this.id = id;
    this.element = document.getElementById(this.id);
    this.hex = id[1];
    this.num = id[2];
    this.left = left;
    this.top = top;
    this.isOn = false;
  }

  SetOn()
  {
    this.isOn = true;
    this.element.style.backgroundColor = "#BFBAF3";
    this.element.style.border = "3px solid #A19DCC";
  }

  SetOff()
  {
    this.isOn = false;   
    this.element.style.backgroundColor = "#403C71";
    this.element.style.border = "3px solid #2A274A";
  }

  SetLastOn()
  {
    this.isOn = true;  
    this.element.style.backgroundColor = "#E1E1E1";
    this.element.style.border = "3px solid #BABABA";
  }

}

let buttons;
let stacks;

const hexCount = 3;
const buttonsPerHex = 6;
const buttonWidth = 30;

const owCanvas = document.getElementById("owCanvas");
const owCtx = owCanvas.getContext("2d");

const bg = new Image();
bg.src = "файли/зображення/квантовий_фон.jpg";

function ow_ProcessButton(code)
{
  PlaySound("клік_троль.wav");
  let hex = code[1] - 1;
  let num = code[2] - 0;
  let buttonIndex = (hex * buttonsPerHex) + num - 1;
  let button = buttons[buttonIndex];
  
  if (button.isOn)
  {
    // turn off if last on
    if (stacks[hex].at(-1) == button)
    {

      button.SetOff();
      stacks[hex].pop();
      stacks[hex].at(-1).SetLastOn();
    }
    // do nothing if on but not last
  }
  else
  {
    // turn on if not in stack
    if (stacks[hex].length != 0)
    {
      // switch the last on in stack from LastOn to just On (if exists)
      stacks[hex].at(-1).SetOn();
    }
    stacks[hex].push(button);
    button.SetLastOn();
  }

  ow_UpdateCanvas();
  ow_CheckForWin();
}

function ow_UpdateCanvas()
{
  // owCanvas.width = 900;
  // owCanvas.height = 375;

  owCanvas.width = bg.naturalWidth;
  owCanvas.height = bg.naturalHeight;

  owCtx.imageSmoothingEnabled = false;
  
  owCtx.drawImage(bg, 0, 0);

  for (let stackIndex = 0; stackIndex < stacks.length; stackIndex++) 
  {
    if (stacks[stackIndex].length == 0)
      continue;

    owCtx.beginPath();
    owCtx.lineWidth = 5;
    owCtx.strokeStyle = "#A19DCC";

    owCtx.moveTo(stacks[stackIndex][0].left + buttonWidth / 2, stacks[stackIndex][0].top + buttonWidth / 2);
    for (let buttonIndex = 1; buttonIndex < stacks[stackIndex].length; buttonIndex++)
    {
      owCtx.lineTo(stacks[stackIndex][buttonIndex].left + buttonWidth / 2, stacks[stackIndex][buttonIndex].top + buttonWidth / 2);
    }
    owCtx.stroke();
  }
}


  const win11 = "b11b12b14";
  const win12 = "b14b12b11";
  const win21 = "b21b24b23b26";
  const win22 = "b26b23b24b21";
  const win31 = "b31b32b33b36b35b34";
  const win32 = "b34b35b36b33b32b31";

function ow_CheckForWin()
{
  let str1 = ow_ConcatStack(stacks[0]);
  let str2 = ow_ConcatStack(stacks[1]);
  let str3 = ow_ConcatStack(stacks[2]);

  if (str1 == win11 || str1 == win12)
  {
    if (str2 == win21 || str2 == win22)
    {
      if (str3 == win31 || str3 == win32)
      {
        ow_Win();
      }
    }
  }
}

function ow_ConcatStack(stack)
{
  let str = "";
  for (let i = 0; i < stack.length; i++) 
  {
    str+=stack[i].id;
  }
  return str;
}

function ow_Win()
{
  PlaySound("вимк.wav");
  setTimeout(() => { music.Stop(); }, 800);
  setTimeout(() => { document.getElementById("minigameLinksDiv").style.display = "block"; }, 2000);
  setTimeout(() => { document.getElementById("owDiv").style.display = "none"; }, 2000);
  setTimeout(() => { ThirdMinigamePassed(); }, 2000);
}

function ow_Start()
{
  document.getElementById("minigameLinksDiv").style.display = "none";
  document.getElementById("owDiv").style.display = "block";

  music = new Music("ash_twin.mp3");
  music.Play();

  buttons = [new ow_Button("b11", 75, 240), new ow_Button("b12", 30, 135), new ow_Button("b13", 75, 30), 
             new ow_Button("b14", 195, 30), new ow_Button("b15", 240, 135), new ow_Button("b16", 195, 240), 

             new ow_Button("b21", 375, 240), new ow_Button("b22", 330, 135), new ow_Button("b23", 375, 30), 
             new ow_Button("b24", 495, 30), new ow_Button("b25", 540, 135), new ow_Button("b26", 495, 240), 

             new ow_Button("b31", 675, 240), new ow_Button("b32", 630, 135), new ow_Button("b33", 675, 30), 
             new ow_Button("b34", 795, 30), new ow_Button("b35", 840, 135), new ow_Button("b36", 795, 240)];
  for (var butt of buttons) { butt.SetOff(); }

  stacks = new Array(hexCount);
  for (var k = 0; k < hexCount; k++) { stacks[k] = new Array(); }
  ow_UpdateCanvas();
}