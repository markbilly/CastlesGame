function Unit() {
    // Member variables
    this.img = new Image();
    this.startX = 20 * 3;
    this.startY = -20 * 1;
    this.x = 20 * 3;
    this.y = 20 * 1;
    this.dx = 1;
    this.dy = 0;
    this.ddx = 0;
    this.ddy = 0;
    this.maxDx = 1;
    this.maxDy = 4;
    this.width = 20;
    this.height = 20;
    this.visible = true;
    this.falling = false;
}

Unit.prototype.LoadContent = function() {
    this.img.src = "Content/man01.png";
};

Unit.prototype.Reset = function () {
    this.x = this.startX;
    this.y = this.startY;
    //this.dx = 0;
    this.dy = 0;
    this.dx = this.maxDx;
};

Unit.prototype.Update = function (gravity) {
    // Work out tile number from coords
    var x = this.x;
    var y = this.y;
    var tileX = Math.ceil(x / 20);
    var tileY = Math.ceil(y / 20);

    this.ddx = 0;
    this.ddy = gravity;

    if (this.dy > this.maxDy) {
        this.dy = this.maxDy;
    }
    else if (this.dy < -this.maxDy) {
        this.dy = -this.maxDy;
    }
    if (this.dx > this.maxDx) {
        this.dx = this.maxDx;
    }
    else if (this.dx < -this.maxDx) {
        this.dx = -this.maxDx;
    }

    this.y = Math.floor(this.y + this.dy);
    if (!this.falling) this.x = Math.floor(this.x + this.dx);
    if (!this.falling) this.dx = Math.floor(this.dx + this.ddx);
    this.dy = Math.floor(this.dy + this.ddy);
};

Unit.prototype.Draw = function (canvasContext, scale) {
    if (this.visible)
        canvasContext.drawImage(this.img, this.x * scale, this.y * scale, this.width * scale, this.height * scale);
};