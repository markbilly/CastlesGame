function World() {
    // Member variables
    this.backgroundImage = new Image();
    this.cursorFocusedImage = new Image();
    this.cursorNormalImage = new Image();
    this.cursorImage = this.cursorNormalImage;
    this.tileGround01 = new Image();
    this.tileGrass00 = new Image();
    this.tileCastleBlue = new Image();
    this.tileCastleOrange = new Image();
    this.tileSize = 20;
    this.mapWidthInTiles = 16;
    this.mapHeightInTiles = 9;
    this.cursorTileX = 0;
    this.cursorTileY = 0;
    this.isCursorVisible = true;
    this.tileMap = [144]; // 16 x 9 tiles where each tile is 20px square
    this.tileSelection = [];
    this.exampleUnit = new Unit();
}

World.prototype.LoadContent = function() {
    // Load background image
    this.backgroundImage.src = "Content/blueSkyBackground.png";
    this.cursorNormalImage.src = "Content/cursor.png";
    this.cursorFocusedImage.src = "Content/cursorFocused.png";
    this.tileGround01.src = "Content/ground01.png";
    this.tileGrass00.src = "Content/grass00.png";
    this.tileCastleBlue.src = "Content/castleBlue.png";
    this.tileCastleOrange.src = "Content/castleOrange.png";

    // Load unit content
    this.exampleUnit.LoadContent();
};

World.prototype.GenerateTileMap = function() {
    var mapLength = this.mapWidthInTiles * this.mapHeightInTiles;
    var rowLength = this.mapWidthInTiles;
    var tileValue = 0;

    return;

    // First five rows are sky i.e. 0
    for (var i = 0; i < mapLength; i++) {
        this.tileMap[i] = tileValue;

        // Reset to default tile i.e. 0
        tileValue = 0;

        // Fifth row has castles on
        if (i == rowLength * 4) tileValue = 3; // Blue castle
        if (i == rowLength * 5 - 1) tileValue = 4; //Orange castle

        // Sixth row is grass i.e. 2
        if (i >= rowLength * 5) {
            tileValue = 2;
        }

        // Last three rows are ground i.e. 1
        if (i >= rowLength * 6) {
            tileValue = 1;
        }
    }
};

World.prototype.DrawCursor = function (canvasContext, scale) {
    // Draw
    var x = this.cursorTileX * this.tileSize * scale;
    var y = this.cursorTileY * this.tileSize * scale;

    if (this.isCursorVisible)
        canvasContext.drawImage(this.cursorImage, x, y, this.tileSize * scale, this.tileSize * scale);
};

// Draw the world - i.e. tile map, etc
World.prototype.Draw = function (backgroundCanvasContext, foregroundCanvasContext, scale) {
    // Draw the background
    var width = this.mapWidthInTiles * this.tileSize;
    var height = this.mapHeightInTiles * this.tileSize;
    backgroundCanvasContext.drawImage(this.backgroundImage, 0, 0, width * scale, height * scale);
    
    // Draw the tiles
    var x = 0;
    var y = 0;
    for (var i = 0; i < this.tileMap.length; i++) {
        // Don't draw anything for 0 tiles
        if (this.tileMap[i] != 0) {
            // Check what type of tile and set image
            var tile = new Image();
            switch (this.tileMap[i]) {
                case 1:
                    // ground01 tile
                    tile = this.tileGround01;
                    break;
                case 2:
                    // grass00 tile
                    tile = this.tileGrass00;
                    break;
                case 3:
                    // grass00 tile
                    tile = this.tileCastleBlue;
                    break;
                case 4:
                    // grass00 tile
                    tile = this.tileCastleOrange;
                    break;
                default:
            }
            // Draw tile image
            backgroundCanvasContext.drawImage(tile, x * scale, y * scale, this.tileSize * scale, this.tileSize * scale);
        }
        
        // Increment the indexes for drawing
        x += this.tileSize;
        if (i % this.mapWidthInTiles == 0) {
            y += this.tileSize;
            // Reset x
            x = 0;
        }
    }
    
    // Draw units
    this.exampleUnit.Draw(foregroundCanvasContext, scale);
    
    // Draw the cursor
    this.DrawCursor(foregroundCanvasContext, scale);
}