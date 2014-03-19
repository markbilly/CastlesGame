function Game() {
    // Member variables
    this.backgroundCanvas = document.getElementById("cBackground");
    this.backgroundCanvasContext = this.backgroundCanvas.getContext("2d");
    this.foregroundCanvas = document.getElementById("cForeground");
    this.foregroundCanvasContext = this.foregroundCanvas.getContext("2d");
    this.scale = 1;
    this.world = new World();
    this.exampleUnit = new Unit();
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
    this.foregroundCanvas.width = width * this.scale;
    this.foregroundCanvas.height = height * this.scale;
};

Game.prototype.LoadContent = function () {
    // Load world content
    this.world.LoadContent();
    
    // Load unit content
    this.exampleUnit.LoadContent();
};

Game.prototype.InitWorld = function() {
    // Generate the tile map
    this.world.GenerateTileMap();
};

Game.prototype.RefreshWorld = function() {
    // Update things
    this.exampleUnit.Update();
    
    // Callback itself
    requestAnimationFrame(this.RefreshWorld);
};

Game.prototype.DrawWorld = function() {
    // Draw world onto the game's background canvas
    this.world.Draw(this.backgroundCanvasContext, this.scale);
    this.exampleUnit.Draw(this.foregroundCanvasContext, this.scale);

    // Callback itself
    requestAnimationFrame(this.RefreshWorld);
};