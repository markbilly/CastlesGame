function Unit() {
    // Member variables
    this.img = new Image();
    this.x = 20 * 2;
    this.y = 20 * 5; // These x and y refer to tile 83
    this.width = 20;
    this.height = 20;
    this.visible = false;
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

};

Unit.prototype.Draw = function (canvasContext, scale) {
    if (this.visible)
        canvasContext.drawImage(this.img, this.x * scale, this.y * scale, this.width * scale, this.height * scale);
};