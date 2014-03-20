﻿////////////////
//   Globals  //
////////////////
var hoverX = 0;
var hoverY = 0;
var mouseX = 0;
var mouseY = 0;
var newClick = false;

window.onload = function () {
    // Put up the loading message
    var messageDiv = document.getElementById("Message");
    messageDiv.innerHTML = "Loading...";

    // Create an instance of the game
    var game = new Game();

    // Load content
    game.LoadContent();

    window.setTimeout(function() {
        // Remove loading message
        messageDiv.innerHTML = "Loaded";

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
        if (newClick) game.ProcessClick(mouseX, mouseY);
        game.UpdateHoverPosition(hoverX, hoverY);

        // Refresh unit context menu
        if (game.isMenu) game.unitMenu.Update();

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

        // Draw unit context menu
        if (game.isMenu) game.DrawMenu();

        // Callback itself to loop
        requestAnimationFrame(loop);
    }
}

////////////////
//   Input    //
////////////////
document.addEventListener("click", function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    newClick = true;
}, true);

document.addEventListener("mousemove", function (e) {
    hoverX = e.clientX;
    hoverY = e.clientY;
}, true);