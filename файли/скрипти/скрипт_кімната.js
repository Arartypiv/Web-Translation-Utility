let roomCTX;

let insideRoom = false;

let roomBG = null;
let roomHitbox = null;
let roomCover = null;

function EnterRoom()
{
    if (insideRoom)
        return;
    insideRoom = true;

    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    
    room_CreateBG();
    room_CreateHitbox();
    room_CreateCover();

    if (valet_GetLocation() == "room")
    {
        //public_MakeValetAppear("room");
        // replaced with:
        valet_CreateValet(roomCover);
        valet_DisplayValetAt();
        valet_SetLocation("room");
        
        valet_SetClickable(false);
        valet_SetMoveable(true);
    }
}

function LeaveRoom()
{
    console.log("penis");
    console.log(insideRoom);

    if (!insideRoom)
        return;
    insideRoom = false;
    document.body.style.overflow = "visible";

    roomBG.remove();
    roomBG = null;

    roomHitbox.remove();
    roomHitbox = null;

    roomCover.remove();
    roomCover = null;

    if (valet_GetLocation() == "main")
    {
        public_MakeValetAppear("main");
        valet_SetClickable(true);
        valet_SetMoveable(false);
    }
}

function room_CreateBG()
{
    roomBG = document.createElement("div");
    roomBG.style.position = "absolute";
    roomBG.style.top  = 0 + "px";
    roomBG.style.left = 0 + "px";
    roomBG.style.width  = 100 + "%";
    roomBG.style.height = 100 + "%";

    roomBG.style.display = "flex";
    roomBG.style.justifyContent = "center";
    roomBG.style.alignItems = "center";

    roomBG.style.backgroundImage = "url('файли/зображення/фон_лакшері.png')";
    roomBG.style.imageRendering = "pixelated";

/*    valet.style.backgroundPosition = "bottom right";
        valet.style.backgroundRepeat = "no-repeat";
        valet.style.backgroundColor = "transparent";
        valet.style.backgroundImage = "url('" + valet_sprite.src + "')";
        valet.style.backgroundSize = "contain";

        // valet.style.pointerEvents = "none";
        console.log(isClickable);
        if (isClickable)
            valet.onclick = function() { SaySomething(); };
*/
    document.body.append(roomBG);
}

async function room_CreateHitbox()
{
    // create object
    roomHitbox = document.createElement("canvas");
    roomHitbox.style.position = "absolute";
    roomHitbox.style.width  = 800 + "px";
    roomHitbox.style.height = 600 + "px";
    roomHitbox.style.backgroundColor = "white";
    roomHitbox.style.backgroundSize = "contain";
    roomHitbox.style.imageRendering = "crisp-edges";
    roomBG.append(roomHitbox);


    // create canvas
    // roomCTX = roomHitbox.getContext("2d");
    roomCTX = roomHitbox.getContext("2d", { colorSpace: "srgb" });
    roomCTX.imageSmoothingEnabled = false;
    roomHitbox.width = 800;
    roomHitbox.height = 600;
    
    FillHitbox(roomCTX);
}

let roomFG = "кімната";
function room_CreateCover()
{
    roomCover = document.createElement("div");
    roomCover.style.position = "absolute";
    roomCover.style.width  = 800 + "px";
    roomCover.style.height = 600 + "px";
    roomCover.style.backgroundColor = "white";
    roomCover.style.backgroundImage = `url('файли/зображення/${roomFG}.png')`;
    roomCover.style.backgroundSize = "contain";
    roomCover.style.imageRendering = "pixelated";
  //  roomCover.style.pointerEvents = "none";
    roomBG.append(roomCover);


    // add onclick event
    roomCover.addEventListener("click", async (event) =>
    { 
        const rect = roomHitbox.getBoundingClientRect();
        const scaleX = Number(roomHitbox.style.width.substring(0,  roomHitbox.style.width.length  - 2)) / rect.width;
        const scaleY = Number(roomHitbox.style.height.substring(0, roomHitbox.style.height.length - 2)) / rect.height;
        const x = Math.round((event.clientX - rect.left) * scaleX);
        const y = Math.round((event.clientY - rect.top)  * scaleY);
        console.log(`Clicked at: (${x}, ${y})`);
        room_ProcessClick(room_GetColourAt(x, y));
    });
}

function room_GetColourAt(x, y, context = roomCTX)
{
    //const pixel = context.getImageData(x, y, 1, 1).data;
    const pixel = context.getImageData(x, y, 1, 1, { colorSpace: "srgb" }).data;

    let [r, g, b, a] = pixel;
    r = r.toString(16).length == 1 ? "0" + r.toString(16) : r.toString(16);;
    g = g.toString(16).length == 1 ? "0" + g.toString(16) : g.toString(16);;
    b = b.toString(16).length == 1 ? "0" + b.toString(16) : b.toString(16);;
    let pixelColour =  "#" + r + g + b;
    console.log(`Colour is: ${pixelColour}`);
    return pixelColour;
}
const colour_to_object =
{ 
     "#ff0000": "exit", 
     "#ff8800": "carpet", 
     "#ffff00": "chandelier", 
     "#00ff00": "curtain", 
     "#00ffff": "wallLight", 
     "#0088ff": "painting",
     "#008888": "blackVase",
     "#0000ff": "statuette",
     "#ff88ff": "paintingInteractable",
     "#ff00ff": "greenVase",
     "#8800ff": "table",
     "#ffffff": "ceiling",
     "#888888": "chair",
     "#000000": "nothing"
};

function room_ProcessClick(colour)
{
    console.log(`It's: ${colour_to_object[colour]}`);
    if (valet_GetLocation() == "room")
        room_SwitchWithValet(colour_to_object[colour]);
    else
        room_SwitchWithoutValet(colour_to_object[colour]);
}
let paintingComments = ["Це дуже красива картина.", "Я так сумую за нею... Вона була мені за сестру.", "Цей портрет намалювали вже після її смерті.", "Я розумію, чому ви вирішили не давати їй друге життя, хоча й мали змогу, пане Артипове. Я знаю, що я - не він. Вона теж не була би собою...", "..."];
let paintCounter = 0;
function room_SwitchWithValet(whatsClicked)
{
    if (ignoreRoomObjects)
        return;

        switch (whatsClicked)
        {
            case "exit":
                public_ValetSay("Вже уходите?");
                setTimeout(() => {
                    LeaveRoom();
                    public_MakeValetDisappear();
                    valet_SetLocation("room");
                }, 1500);
                break;
            case "painting":
            case "paintingInteractable": // no longer separate
                public_ValetSay(paintingComments[0]);
                if (paintingComments.length > 1)
                {
                    paintingComments.shift();
                }
                else
                {
                    paintCounter += 1;
                    if (paintCounter == 2)
                        room_RipPainting();
                }
                break;
            case "chandelier":
                public_ValetSay("Така люстра висіла в одному з європейських палаців, де жили королі. Це репліка, звісно.");
                break; 
            case "curtain":
                public_ValetSay("Ці завіси виткані з чистого оксамиту.");
                break; 
            case "wallLight":
                public_ValetSay("Розкішні канделябри.");
                break; 
            case "carpet":
                public_ValetSay("Цей килим я віз аж із самої Персії.");
                break;
            case "blackVase":
                public_ValetSay("Ці вази зроблені з натурального каменю.");
                break;
            case "statuette":
                public_ValetSay("Це статуя мого любого друга. Ехх, давно його не згадував...");
                break;
            case "chair":
                public_ValetSay("Втомилися?");
                break;
            case "greenVase":
                public_ValetSay("Це розкішна ваза з венеціанського скла.");
                break;
            case "table":
                public_ValetSay("Хочете наллю вам чаю?");
                break;
            case "ceiling":
                public_ValetSay("Стелі тут дуже високі.");
                break;
            case "nothing":
                break;
        }
}
let ignoreRoomObjects = false;
function room_RipPainting()
{
    PlaySound("порвані_штани.mp3");
    roomFG = "кімната_порвана";
    roomCover.style.backgroundImage = `url('файли/зображення/${roomFG}.png')`;
    ignoreRoomObjects = true;
    public_ValetSay("!!!");
    setTimeout(() => { public_ValetSay("Що ви зробили!?"); }, valet_GetTimeForSpeech("!!!"));
    setTimeout(() => { public_ValetSay("В-Ви не Архітектор Артипів...!"); }, valet_GetTimeForSpeech("!!!") + valet_GetTimeForSpeech("Що ви зробили!?"));
    setTimeout(() => { public_FreeValet("rocket"); ignoreRoomObjects = false; }, valet_GetTimeForSpeech("!!!") + valet_GetTimeForSpeech("Що ви зробили!?") + valet_GetTimeForSpeech("В-Ви не Архітектор Артипів...!"));
}

function room_SwitchWithoutValet(whatsClicked)
{
        switch (whatsClicked)
        {
            case "exit":
                LeaveRoom();
                break;
            case "painting":
                break;
            case "chandelier":
                break; 
            case "curtain":
                break; 
            case "wallLight":
                break; 
            case "carpet":
                break;
            case "blackVase":
                break;
            case "statuette":
                break;
            case "chair":
                break;
            case "greenVase":
                break;
            case "table":
                break;
            case "ceiling":
                break;
            case "paintingInteractable":
                break;
            case "nothing":
                break;
        }
}