let pigDict = {
     "card": false, 
     "photo": false, 
     "chat": false,
     "mask": false,
     "console": false
};

function GetFoundPigs()
{
    return Object.values(pigDict).filter(value => value == true).length;
}

function GetTotalPigs()
{
    return Object.keys(pigDict).length;
}

function FindAllPigs()
{
    FoundCardPig();
    FoundPhotoPig();
    FoundChatPig();
    FoundMaskPig();
    FoundConsolePig();
}

function FoundCardPig()
{
    if (!pigDict["card"])
        pigDict["card"] = true;
}
function FoundPhotoPig()
{
    if (!pigDict["photo"])
        pigDict["photo"] = true;
}
function FoundChatPig()
{
    if (!pigDict["chat"])
        pigDict["chat"] = true;
}
function FoundMaskPig()
{
    if (!pigDict["mask"])
        pigDict["mask"] = true;
}
function FoundConsolePig()
{
    if (!pigDict["console"])
        pigDict["console"] = true;
}