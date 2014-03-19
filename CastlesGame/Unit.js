function Unit() {
    this.img = new Image();
    this.currentTile = 0;
    this.targetTile = 3 * 16;
    this.isMoving = false;
    this.x = 20 * 2;
    this.y = 20 * 5;
    this.width = 20;
    this.height = 20;
}

Unit.prototype.LoadContent = function() {
    this.img.src = "Content/man01.png";
};

Unit.prototype.Update = function() {
    // Get current tile from x and y
    this.currentTile = Math.floor((this.x / 20) + (this.y / 20) * 16);
    
    // Movement
    // If we need to move
    if (this.currentTile !== this.targetTile) {
        // And if target is on same row as current
        if (Math.abs(this.targetTile - this.currentTile) <= 16) {
            if (this.targetTile > this.currentTile) {
                // Move right
                x++;
            } else {
                // Move left
                x--;
            }
        }
    }
};

Unit.prototype.Draw = function (canvasContext, scale) {
    canvasContext.drawImage(this.img, this.x * scale, this.y * scale, this.width * scale, this.height * scale);
};