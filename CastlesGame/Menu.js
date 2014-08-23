function Menu() {
    // Member variables
    this.img = new Image();
    this.x = 0;
    this.y = 0;
    this.width = 40;
    this.height = 180;
}

Menu.prototype.LoadContent = function () {
    this.img.src = "Content/menu.png";
};

Menu.prototype.Draw = function (canvasContext, scale) {
    canvasContext.drawImage(this.img, this.x * scale, this.y * scale, this.width * scale, this.height * scale);
};