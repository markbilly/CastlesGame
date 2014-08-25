////////////////
//   Globals  //
////////////////
var hoverX = 0;
var hoverY = 0;
var mouseX = 0;
var mouseY = 0;
var newClick = false;
var down = false;
var event = "";

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
        if (newClick) game.ProcessClick();
        game.UpdateHoverPosition(hoverX, hoverY, down);

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
document.addEventListener("mousedown", function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    down = true;
}, true);

document.addEventListener("mouseup", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    newClick = true;
    down = false;
}, true);

document.addEventListener("mousemove", function (e) {
    hoverX = e.clientX;
    hoverY = e.clientY;
}, true);