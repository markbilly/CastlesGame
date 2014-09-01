function Menu() {
    // Member variables
    this.img = new Image();
    this.tileGround01 = new Image();
    this.tileGrass00 = new Image();
    this.tileGround01Selected = new Image();
    this.tileGrass00Selected = new Image();
    this.tileDestroy = new Image();
    this.tileDestroySelected = new Image();
    this.x = 0;
    this.y = 0;
    this.width = 40;
    this.height = 180;
}

Menu.prototype.LoadContent = function () {
    this.img.src = "Content/menu.png";
    this.tileGround01.src = "Content/ground01Icon.png";
    this.tileGrass00.src = "Content/grass00Icon.png";
    this.tileGrass00Selected.src = "Content/grass00Selected.png";
    this.tileGround01Selected.src = "Content/ground01Selected.png";
    this.tileDestroy.src = "Content/destroyIcon.png";
    this.tileDestroySelected.src = "Content/destroySelected.png";
};

Menu.prototype.Draw = function (canvasContext, scale, tile) {
    var grassImg = this.tileGrass00;
    if (tile == 2) grassImg = this.tileGrass00Selected;
    var groundImg = this.tileGround01;
    if (tile == 1) groundImg = this.tileGround01Selected;
    var destroyImg = this.tileDestroy;
    if (tile == 0) destroyImg = this.tileDestroySelected;

    canvasContext.drawImage(this.img, this.x * scale, this.y * scale, this.width * scale, this.height * scale);
    canvasContext.drawImage(grassImg, 10 * scale, 40 * scale, 20 * scale, 20 * scale);
    //canvasContext.drawImage(groundImg, 10 * scale, 80 * scale, 20 * scale, 20 * scale);
    canvasContext.drawImage(destroyImg, 10 * scale, 120 * scale, 20 * scale, 20 * scale);
};