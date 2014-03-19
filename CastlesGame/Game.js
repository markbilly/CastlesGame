function Game() {
    // Member variables
    this.backgroundCanvas = document.getElementById("cBackground");
    this.backgroundCanvasContext = this.backgroundCanvas.getContext("2d");
    this.scale = 1;
    this.world = new World(this.backgroundCanvasContext, null);
}

Game.prototype.SetSize = function () {
    // Define native game dimensions
    var width = 320;
    var height = 180;

    // Find scale factor based on window dimensions
    var windowWidth = window.innerWidth;
    var scaleFactor = windowWidth / width;
    
    // Limit to nearest integer
    scaleFactor = Math.floor(scaleFactor);
    
    // Limit to a maximum of 3x and min of 1x
    if (scaleFactor < 1) scaleFactor = 1;
    if (scaleFactor > 3) scaleFactor = 3;
    
    // Set scale factor as game property
    this.scale = scaleFactor;

    // Set width and height of canvases
    this.backgroundCanvas.width = width * this.scale;
    this.backgroundCanvas.height = height * this.scale;
};

Game.prototype.LoadContent = function () {
    // Load world content
    this.world.LoadContent();
};

Game.prototype.InitWorld = function() {
    // Generate the tile map
    this.world.GenerateTileMap();
};

Game.prototype.DrawWorld = function() {
    // Draw world onto the game's background canvas
    this.world.Draw(this.scale);
}