function Game() {
    // Member variables
    this.backgroundCanvas = document.getElementById("cBackground");
    this.backgroundCanvasContext = this.backgroundCanvas.getContext("2d");
    this.foregroundCanvas = document.getElementById("cForeground");
    this.foregroundCanvasContext = this.foregroundCanvas.getContext("2d");
    this.scale = 1;
    this.world = new World();
    this.unitMenu = new UnitMenu();
    this.isMenu = false;
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
    
    // Load menu content
    this.unitMenu.LoadContent();
};

Game.prototype.InitWorld = function() {
    // Generate the tile map
    this.world.GenerateTileMap();
};

Game.prototype.UpdateHoverPosition = function (hoverX, hoverY) {
    // Deal with scale
    var x = hoverX / this.scale;
    var y = hoverY / this.scale;

    // Get x, y tile locations
    this.world.cursorTileX = Math.floor(x / this.world.tileSize);
    this.world.cursorTileY = Math.floor(y / this.world.tileSize);
    
    // Check which cursor to use
    // Set default cursor
    this.world.cursorImage = this.world.cursorNormalImage;
    var cursorTile = (this.world.cursorTileX + this.world.mapWidthInTiles * this.world.cursorTileY) + 1;
    if (cursorTile == this.world.exampleUnit.currentTile) {
        // Use focused cursor
        this.world.cursorImage = this.world.cursorFocusedImage;
    }
};

Game.prototype.UpdateUnitTargets = function (clickX, clickY) {
    // Work out tile number from coords
    var x = clickX / this.scale;
    var y = clickY / this.scale;
    var tileX = Math.floor(x / this.world.tileSize);
    var tileY = Math.floor(y / this.world.tileSize);
    var newTile = (tileX + this.world.mapWidthInTiles * tileY) + 1;
    
    // Update units
    this.world.exampleUnit.targetTile = newTile;
};

Game.prototype.ProcessClick = function (clickX, clickY) {
    // Deal with scale
    var x = clickX / this.scale;
    var y = clickY / this.scale;
    
    // If out of bounds then return
    var width = this.world.mapWidthInTiles * this.world.tileSize;
    var height = this.world.mapHeightInTiles * this.world.tileSize;
    if (x > width || y > height) return;

    // Work out tile number from coords
    var tileX = Math.floor(x / this.world.tileSize);
    var tileY = Math.floor(y / this.world.tileSize);
    var newTile = (tileX + this.world.mapWidthInTiles * tileY) + 1;
    
    // Check whether click is on a unit
    if (newTile == this.world.exampleUnit.currentTile) {
        // Open unit menu
        this.unitMenu.Init(this.world.exampleUnit);
        this.isMenu = true;
    } else {
        // If we click anywhere other than on a unit
        // Change unit target tile accordingly
        this.UpdateUnitTargets(clickX, clickY);
        this.isMenu = false;
    }
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
};

Game.prototype.DrawMenu = function () {
    // Draw
    this.unitMenu.Draw(this.foregroundCanvasContext, this.scale);
};