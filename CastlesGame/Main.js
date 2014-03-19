window.onload = function() {
    // Put up the loading message
    var messageDiv = document.getElementById("Message");
    messageDiv.innerHTML = "Loading...";

    // Create an instance of the game
    var game = new Game();

    // Load content
    game.LoadContent();

    window.setTimeout(function() {
        // Remove loading message
        messageDiv.innerHTML = "";

        // Set the size of the game
        game.SetSize();

        // World stuff
        game.InitWorld();
        game.DrawWorld();
    }, 1000);
};