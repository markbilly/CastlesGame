////////////////
//   Globals  //
////////////////
var hoverX = 0;
var hoverY = 0;
var mouseX = 0;
var mouseY = 0;
var newClick = false;
var down = false;
var touch = false;
var eventStart = "mousedown";
var eventEnd = "mouseup";

window.onload = function () {
    // Put up the loading message
    var messageDiv = document.getElementById("Message");
    //messageDiv.innerHTML = "Loading...";

    // Create an instance of the game
    var game = new Game();

    // Load content
    game.LoadContent();

    window.setTimeout(function() {
        // Remove loading message
        //messageDiv.innerHTML = "Loaded";

        // Set the size of the game
        game.SetSize();

        // World stuff
        game.InitWorld();
        RefreshLoop(game);
        DrawLoop(game);
    }, 1000);
};

////////////////
// Game loops //
////////////////
function RefreshLoop(game) {
    // Call loop function
    loop();
    
    function loop() {
        // Send new mouse click coords
        //if (newClick) game.ProcessClick();
        if (down) game.TouchStart(mouseX, mouseY);
        else game.TouchEnd();
        game.UpdateHoverPosition(hoverX, hoverY);

        // Refresh the game world
        game.RefreshWorld();

        // Reset click
        newClick = false;

        // Callback itself to loop
        requestAnimationFrame(loop);
    }
}

function DrawLoop(game) {
    // Call loop function
    loop();

    function loop() {
        // Clear canvases
        game.ClearCanvases();

        // Draw the game world
        game.DrawWorld();

        // Callback itself to loop
        requestAnimationFrame(loop);
    }
}

////////////////
//   Input    //
////////////////
if ("ontouchstart" in document) {
    eventEnd = "touchend";
    eventStart = "touchstart";
    touch = true;
}

document.addEventListener(eventStart, function (e) {
    if (touch) {
        mouseX = e.changedTouches[0].pageX;
        mouseY = e.changedTouches[0].pageY;
    }
    else {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
    down = true;
}, true);

document.addEventListener(eventEnd, function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    newClick = true;
    down = false;
}, true);

document.addEventListener("mousemove", function (e) {
    hoverX = e.clientX;
    hoverY = e.clientY;
}, true);