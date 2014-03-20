function UnitMenu() {
    this.isOpen = false;
    this.queueChangeState = false;
    this.digDownImage = new Image();
    this.digAcrossImage = new Image();
    this.warriorImage = new Image();
    this.defenderImage = new Image();
    this.width = 20;
    this.height = 20;
    this.digDownX = 0;
    this.digDownY = 0;
    this.digAcrossX = 0;
    this.digAcrossY = 0;
    this.warriorX = 0;
    this.warriorY = 0;
    this.defenderX = 0;
    this.defenderY = 0;
    this.digDownTargetY = 0;
    this.digAcrossTargetX = 0;
    this.warriorTargetX = 0;
    this.defenderTargetY = 0;
}

UnitMenu.prototype.LoadContent = function () {
    // Load icon images
    this.digDownImage.src = "Content/iconDigDown.png";
    this.digAcrossImage.src = "Content/iconDigAcross.png";
    this.warriorImage.src = "Content/iconWarrior.png";
    this.defenderImage.src = "Content/iconBuild.png";
};

UnitMenu.prototype.Init = function (unit) {
    // Set starting coords for each icon
    var startTileY = Math.floor(unit.currentTile / 16);
    var startTileX = unit.currentTile - startTileY * 16 - 1;
    this.digDownX = startTileX * 20;
    this.digDownY = startTileY * 20;
    this.digAcrossX = startTileX * 20;
    this.digAcrossY = startTileY * 20;
    this.warriorX = startTileX * 20;
    this.warriorY = startTileY * 20;
    this.defenderX = startTileX * 20;
    this.defenderY = startTileY * 20;
    
    // Set target coords for each icon
    this.digDownTargetY = this.digDownY + 20;
    this.digAcrossTargetX = this.digAcrossX + 20;
    this.warriorTargetX = this.warriorX - 20;
    this.defenderTargetY = this.defenderY - 20;
};

UnitMenu.prototype.Update = function () {
    // Update dig down tile
    if (this.digDownY !== this.digDownTargetY)
        // Increment y
        this.digDownY += 2;
    
    // Update dig across tile
    if (this.digAcrossX !== this.digAcrossTargetX)
        // Increment x
        this.digAcrossX += 2;
    
    // Update warrior tile
    if (this.warriorX !== this.warriorTargetX)
        // Decrement x
        this.warriorX -= 2;
    
    // Update defender tile
    if (this.defenderY !== this.defenderTargetY)
        // Decrement y
        this.defenderY -= 2;
};

UnitMenu.prototype.Draw = function(canvasContext, scale) {
    // Draw
    canvasContext.drawImage(this.digDownImage, this.digDownX * scale, this.digDownY * scale, this.width * scale, this.height * scale);
    canvasContext.drawImage(this.digAcrossImage, this.digAcrossX * scale, this.digAcrossY * scale, this.width * scale, this.height * scale);
    canvasContext.drawImage(this.warriorImage, this.warriorX * scale, this.warriorY * scale, this.width * scale, this.height * scale);
    canvasContext.drawImage(this.defenderImage, this.defenderX * scale, this.defenderY * scale, this.width * scale, this.height * scale);
}