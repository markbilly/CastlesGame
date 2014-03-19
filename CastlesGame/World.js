function World(backgroundCanvasContext, foregroundCanvasContext) {
    // Member variables
    this.backgroundCanvasContext = backgroundCanvasContext;
    this.foregroundCanvasContext = foregroundCanvasContext;
    this.backgroundImage = new Image();
    this.tileGround01 = new Image();
    this.tileGrass00 = new Image();
    this.tileSize = 20;
    this.mapWidthInTiles = 16;
    this.mapHeightInTiles = 9;
    this.tileMap = [144]; // 16 x 9 tiles where each tile is 20px square
}

World.prototype.LoadContent = function() {
    // Load background image
    this.backgroundImage.src = "Content/blueSkyBackground.png";
    this.tileGround01.src = "Content/ground01.png";
    this.tileGrass00.src = "Content/grass00.png";
};

World.prototype.GenerateTileMap = function() {
    var mapLength = this.mapWidthInTiles * this.mapHeightInTiles;
    var rowLength = this.mapWidthInTiles;
    var tileValue = 0;

    // First five rows are sky i.e. 0
    for (var i = 0; i < mapLength; i++) {
        this.tileMap[i] = tileValue;

        // Sixth row is grass i.e. 2
        if (i == rowLength * 5) {
            tileValue = 2;
        }

        // Last three rows are ground i.e. 1
        if (i == rowLength * 6) {
            tileValue = 1;
        }
    }
};

// Draw the world - i.e. tile map, etc
World.prototype.Draw = function (scale) {
    // Draw the background
    var width = this.mapWidthInTiles * this.tileSize;
    var height = this.mapHeightInTiles * this.tileSize;
    this.backgroundCanvasContext.drawImage(this.backgroundImage, 0, 0, width * scale, height * scale);
    
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
                default:
            }
            // Draw tile image
            this.backgroundCanvasContext.drawImage(tile, x * scale, y * scale, this.tileSize * scale, this.tileSize * scale);
        }
        
        // Increment the indexes for drawing
        x += this.tileSize;
        if (i % this.mapWidthInTiles == 0) {
            y += this.tileSize;
            // Reset x
            x = 0;
        }
    }
}