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
    this.currentTileType = 2;
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
    this.world.cursorTile = this.world.PixelPositionToTileIndex(x, y);
    var cursorTileX = this.world.TileIndexToTilePosition(this.world.cursorTile).x;
    var unitTile = this.world.PixelPositionToTileIndex(this.world.exampleUnit.x, this.world.exampleUnit.y);
    
    // Check which cursor to use
    // Set default cursor
    this.world.cursorImage = this.world.cursorNormalImage;
    this.world.isCursorVisible = true;
    if (cursorTileX < 2) this.world.isCursorVisible = false;

    // Fill up the selection
    if (down) {
        var existsInSelection = false;
        for (var i = 0; i < this.world.tileSelection.length; i++) {
            if (this.world.tileSelection[i] == this.world.cursorTile) {
                existsInSelection = true;
                break;
            }
        }
        if (!existsInSelection &&
            this.world.cursorTile != unitTile &&
            this.world.tileMap[this.world.cursorTile] != 3 &&
            this.world.isCursorVisible) {
            this.world.tileSelection.push(this.world.cursorTile);
        }

        // If we are over the menu then change tile type
        if (x > 9 && x < 31) {
            // Option 1
            if (y > 39 && y < 61) this.currentTileType = 2;
            // Option 2
            if (y > 79 && y < 101) this.currentTileType = 1;
            // Option 3
            if (y > 119 && y < 141) this.currentTileType = 0;
        }
    }
};

Game.prototype.ProcessClick = function () {

    // Set all tiles in selection to 1
    for (var i = 0; i < this.world.tileSelection.length; i++) {
        var location = this.world.tileSelection[i];
        this.world.tileMap[location] = this.currentTileType;
    }

    // Clear tile selection
    this.world.tileSelection = [];

    // Reset mouseDown
    this.mouseDown = false;
};

Game.prototype.RefreshWorld = function() {
    // Update things
    this.world.exampleUnit.Update(this.world.gravity);
    this.world.ApplyCollisions(this.world.exampleUnit);
};

Game.prototype.ClearCanvases = function() {
    // Clear canvases
    this.backgroundCanvasContext.clearRect(0, 0, this.backgroundCanvas.width * this.scale, this.backgroundCanvas.height * this.scale);
    this.foregroundCanvasContext.clearRect(0, 0, this.foregroundCanvas.width * this.scale, this.foregroundCanvas.height * this.scale);
};

Game.prototype.DrawWorld = function () {
    // Draw world onto the game's background canvas
    this.world.Draw(this.backgroundCanvasContext, this.foregroundCanvasContext, this.scale);
    this.menu.Draw(this.foregroundCanvasContext, this.scale, this.currentTileType);

    // Draw score
    this.foregroundCanvasContext.font = 8 * this.scale + "px pixel";
    this.foregroundCanvasContext.fillStyle = "#FFF";
    this.foregroundCanvasContext.fillText(this.world.score, this.world.tileSize * 0.75 * this.scale, this.world.tileSize * this.scale);
};