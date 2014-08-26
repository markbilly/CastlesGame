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
    this.cursorTile = 0;
    this.isCursorVisible = true;
    this.tileMap = [144]; // 16 x 9 tiles where each tile is 20px square
    this.tileSelection = [];
    this.exampleUnit = new Unit();
    this.gravity = 10;
    this.score = 0;
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

World.prototype.TileIndexToTilePosition = function (tileIndex) {

    var tileY = Math.floor(tileIndex / this.mapWidthInTiles);
    var tileX = tileIndex - Math.ceil(tileY * this.mapWidthInTiles);

    return { x: tileX, y: tileY };
};

World.prototype.TilePositionToTileIndex = function (tileX, tileY) {

    var tile = tileX + tileY * this.mapWidthInTiles;
    return tile;
};

World.prototype.TileIndexToPixelPosition = function (tileIndex) {

    var tilePos = this.TileIndexToTilePosition(tileIndex);
    var yPos = this.tileSize * tilePos.y;
    var xPos = this.tileSize * tilePos.x;

    return { x: xPos, y: yPos };
};

World.prototype.PixelPositionToTileIndex = function (pixelX, pixelY) {
    var tileX = Math.floor(pixelX / this.tileSize);
    var tileY = Math.floor(pixelY / this.tileSize);
    var index = tileX + this.mapWidthInTiles * tileY;

    return index;
};

World.prototype.GenerateTileMap = function() {
    var mapLength = this.mapWidthInTiles * this.mapHeightInTiles;
    var rowLength = this.mapWidthInTiles;
    var tileValue = 0;

    for (var i = 0; i < mapLength; i++) {
        this.tileMap[i] = 0;
    }

    function Rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Randomise where the castle spawns
    var randX = Rand(5, 15);
    var randY = Rand(0, 7);
    this.tileMap[this.TilePositionToTileIndex(randX, randY)] = 3;
    this.tileMap[this.TilePositionToTileIndex(randX, randY + 1)] = 2;

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

World.prototype.Fail = function () {

    //this.GenerateTileMap();
    this.exampleUnit.Reset();

};

World.prototype.Success = function () {

    this.GenerateTileMap();
    this.exampleUnit.Reset();
    this.score++;

};

World.prototype.ApplyCollisions = function (unit) {

    var overlapX = unit.x % this.tileSize;
    var overlapY = unit.y % this.tileSize;
    var unitTile = this.PixelPositionToTileIndex(unit.x, unit.y);
    var tile = this.tileMap[this.PixelPositionToTileIndex(unit.x, unit.y)];
    var down = this.tileMap[this.PixelPositionToTileIndex(unit.x, unit.y + this.tileSize)];
    var right = this.tileMap[this.PixelPositionToTileIndex(unit.x + this.tileSize, unit.y)];
    var diag = this.tileMap[this.PixelPositionToTileIndex(unit.x + this.tileSize, unit.y + this.tileSize)];

    var tile = (tile && tile != 3);
    var down = (down && down != 3);
    var right = (right && right != 3);
    var diag = (diag && diag != 3);

    // Check for success
    if (this.tileMap[unitTile] == 3) {
        this.Success();
    }

    // Check for game over
    if (unit.y > this.mapHeightInTiles * this.tileSize)
        this.Fail();

    // Vertical
    if (unit.dy > 0) {
        if ((down && !tile) ||
            (diag && !right && overlapX)) {
            unit.y = this.TileIndexToPixelPosition(unitTile).y;
            unit.dy = 0;
            unit.falling = false;
            unit.jumping = false;
            overlapY = 0;
        }
    }
    else if (unit.dy < 0) {
        if ((tile && !down) ||
            (right && !diag && overlapX)) {
            unit.y = this.TileIndexToPixelPosition(unitTile).y + this.tileSize;
            unit.dy = 0;
            tile = down;
            right = diag;
            overlapY = 0;
        }
    }

    // Horizontal
    if (unit.dx > 0) {
        if ((right && !tile) ||
            (diag && !down && overlapY)) {
            unit.x = this.TileIndexToPixelPosition(unitTile).x;
            unit.dx = unit.dx * -1;
        }
    }
    else if (unit.dx < 0) {
        if ((tile && !right) ||
            (down && !diag && overlapY)) {
            unit.x = this.TileIndexToPixelPosition(unitTile).x + this.tileSize;
            unit.dx = unit.dx * -1;
        }
    }

    // Jumping and falling
    unit.falling = !(down || (overlapX && diag));
}

World.prototype.DrawCursor = function (canvasContext, scale) {
    // Draw
    var x = this.TileIndexToPixelPosition(this.cursorTile).x * scale;
    var y = this.TileIndexToPixelPosition(this.cursorTile).y * scale;

    if (this.isCursorVisible)
        canvasContext.drawImage(this.cursorImage, x, y, this.tileSize * scale, this.tileSize * scale);
};

World.prototype.DrawSelection = function (canvasContext, scale, tileType) {

    for (var i = 0; i < this.tileSelection.length; i++) {
        // Get image to draw
        var img = this.tileGround01;
        if (tileType == 2) img = this.tileGrass00;

        // Get x and y
        var x = this.TileIndexToPixelPosition(this.tileSelection[i]).x;
        var y = this.TileIndexToPixelPosition(this.tileSelection[i]).y;

        // Draw tile image
        canvasContext.globalAlpha = 0.5;
        canvasContext.drawImage(img, x * scale, y * scale, this.tileSize * scale, this.tileSize * scale);
        canvasContext.globalAlpha = 1.0;
    }

};

// Draw the world - i.e. tile map, etc
World.prototype.Draw = function (backgroundCanvasContext, foregroundCanvasContext, scale) {
    // Draw the background
    var width = this.mapWidthInTiles * this.tileSize;
    var height = this.mapHeightInTiles * this.tileSize;
    backgroundCanvasContext.drawImage(this.backgroundImage, 0, 0, width * scale, height * scale);
    
    // Draw the tiles
    var x = 0;
    var y = -this.tileSize;
    for (var i = 0; i < this.tileMap.length; i++) {
        // Increment the indexes for drawing
        x += this.tileSize;
        if (i % this.mapWidthInTiles == 0) {
            y += this.tileSize;
            // Reset x
            x = 0;
        }

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
    }
    
    // Draw units
    this.exampleUnit.Draw(foregroundCanvasContext, scale);
    
    // Draw the cursor
    this.DrawCursor(foregroundCanvasContext, scale);
}