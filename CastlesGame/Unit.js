function Unit() {
    // Member variables
    this.img = new Image();
    this.currentTile = 0;
    this.targetTile = 83;
    this.isMoving = false;
    this.x = 20 * 2;
    this.y = 20 * 5; // These x and y refer to tile 83
    this.width = 20;
    this.height = 20;
}

Unit.prototype.LoadContent = function() {
    this.img.src = "Content/man01.png";
};

Unit.prototype.Update = function () {
    // Work out tile number from coords
    var x = this.x;
    var y = this.y;
    var tileX = Math.ceil(x / 20);
    var tileY = Math.ceil(y / 20);
    if (this.targetTile > this.currentTile)
        tileX = Math.floor(x / 20);
    var newTile = (tileX + 16 * tileY) + 1;
    this.currentTile = newTile;

    // Movement
    // If we need to move
    if (this.currentTile !== this.targetTile) {
        // And if target is on same row as current
        if (Math.ceil(this.targetTile / 16) == Math.ceil(this.currentTile / 16)) {
            if (this.targetTile > this.currentTile) {
                // Move right
                this.x++;
            } else {
                // Move left
                this.x--;
            }
        }
    }
};

Unit.prototype.Draw = function (canvasContext, scale) {
    canvasContext.drawImage(this.img, this.x * scale, this.y * scale, this.width * scale, this.height * scale);
};