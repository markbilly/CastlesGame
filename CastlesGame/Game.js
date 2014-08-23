function Game() {
    // Member variables
    this.backgroundCanvas = document.getElementById("cBackground");
    this.backgroundCanvasContext = this.backgroundCanvas.getContext("2d");
    this.foregroundCanvas = document.getElementById("cForeground");
    this.foregroundCanvasContext = this.foregroundCanvas.getContext("2d");
    this.scale = 1;
    this.world = new World();
    this.menu = new Menu();
    this.mouseDown = false;
}

Game.prototype.SetSize = function () {
    // Define native game dimensions
    var width = this.world.mapWidthInTiles * this.world.tileSize;
    var height = this.world.mapHeightInTiles * this.world.tileSize;

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
    this.menu.LoadContent();
};

Game.prototype.InitWorld = function() {
    // Generate the tile map
    this.world.GenerateTileMap();
};

Game.prototype.UpdateHoverPosition = function (hoverX, hoverY, down) {
    // Deal with scale
    var x = hoverX / this.scale;
    var y = hoverY / this.scale;

    // Get x, y tile locations
    this.world.cursorTileX = Math.floor(x / this.world.tileSize);
    this.world.cursorTileY = Math.floor(y / this.world.tileSize);

    this.world.isCursorVisible = true;
    if (this.world.cursorTileX < 2)
        this.world.isCursorVisible = false;
    
    // Check which cursor to use
    // Set default cursor
    this.world.cursorImage = this.world.cursorNormalImage;
    
    // Fill up the selection
    if (down) {
        var tileX = this.world.cursorTileX;
        var tileY = this.world.cursorTileY;
        var newTile = (tileX + this.world.mapWidthInTiles * (tileY - 1)) + 1;

        var existsInSelection = false;
        for (var i = 0; i < this.world.tileSelection.length; i++) {
            if (this.world.tileSelection[i] == newTile) {
                existsInSelection = true;
                break;
            }
        }
        if (!existsInSelection)
            this.world.tileSelection.push(newTile);
    }
};

Game.prototype.ProcessClick = function () {

    // Set all tiles in selection to 1
    for (var i = 0; i < this.world.tileSelection.length; i++) {
        var location = this.world.tileSelection[i];
        this.world.tileMap[location] = 1;
    }

    // Clear tile selection
    this.world.tileSelection = [];

    // Reset mouseDown
    this.mouseDown = false;
};

Game.prototype.ProcessUp = function () {
};

Game.prototype.RefreshWorld = function() {
    // Update things
    this.world.exampleUnit.Update();
};

Game.prototype.ClearCanvases = function() {
    // Clear canvases
    this.backgroundCanvasContext.clearRect(0, 0, this.backgroundCanvas.width * this.scale, this.backgroundCanvas.height * this.scale);
    this.foregroundCanvasContext.clearRect(0, 0, this.foregroundCanvas.width * this.scale, this.foregroundCanvas.height * this.scale);
};

Game.prototype.DrawWorld = function () {
    // Draw world onto the game's background canvas
    this.world.Draw(this.backgroundCanvasContext, this.foregroundCanvasContext, this.scale);
    this.menu.Draw(this.foregroundCanvasContext, this.scale);
};