const WEBSITE_WIDTH = "1200px";
function ChangeWebsite(pageName)
{
    document.body.style.backgroundImage = 'url(файли/зображення/фон.png)';
    document.body.style.backgroundColor = '#99bac2';

    valet_DeleteValet();
    if (valet_GetLocation() == "rocket")
        valet_SetLocation("rocket");
    else
        valet_SetLocation("room");
    
    document.getElementById("MAIN_PAGE").style.display = "none";
    document.getElementById("PREAUTH_PAGE").style.display = "none";
    document.getElementById("AUTH_PAGE").style.display = "none";
    document.getElementById("CONSOLE_PAGE").style.display = "none";
    document.getElementById("CERES_PAGE").style.display = "none";

    switch (pageName)
    {
        case "MAIN_PAGE":
            document.getElementById("MAIN_PAGE").style.display = "contents";
            document.body.style.maxWidth = WEBSITE_WIDTH;
            document.body.style.width = WEBSITE_WIDTH;
            break;
    
        case "PREAUTH_PAGE":
            document.getElementById("PREAUTH_PAGE").style.display = "contents";
            document.body.style.maxWidth = WEBSITE_WIDTH;
            document.body.style.width = WEBSITE_WIDTH;
            break;

        case "AUTH_PAGE":
            document.getElementById("AUTH_PAGE").style.display = "contents";
            document.body.style.maxWidth = WEBSITE_WIDTH;
            document.body.style.width = WEBSITE_WIDTH;
            break;
        
        case "CONSOLE_PAGE":
            document.getElementById("CONSOLE_PAGE").style.display = "contents";
            document.body.style.maxWidth = "100%";
            document.body.style.width = "100%";

            document.getElementById("input").focus();
            document.getElementById("input").value = '';
            break;

        case "CERES_PAGE":
            document.getElementById("CERES_PAGE").style.display = "block";
            // dgaf bout reverting this back cuz its endgame
            document.body.style.backgroundImage = 'url(файли/зображення/фон_церера.jpg)';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundSize = '100% 100%';
            document.body.style.backgroundPosition = 'bottom left';
            document.body.style.overflow = 'hidden';
            
            document.body.style.maxWidth = WEBSITE_WIDTH;
            document.body.style.width = WEBSITE_WIDTH;
            document.body.style.height = WEBSITE_WIDTH;
            break;
        }
}

//skip();
ChangeWebsite("CONSOLE_PAGE");
//ChangeWebsite("CERES_PAGE");
//ChangeWebsite("MAIN_PAGE");
//SwitchPages("baublesREALNONOGRAM");