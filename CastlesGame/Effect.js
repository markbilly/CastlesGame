function Effect(x, y, width, height, frames, src) {
    this.image = new Image();
    this.image.src = src;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.frames = frames;
    this.currentFrame = 0;
    this.clip = [0, 0, this.width, this.height];
    this.active = true;
    this.assetScale = 3;
    this.looping = false;
    this.count = 0;
}

Effect.prototype.NextFrame = function () {
    if (!this.active) return;

    this.count++;
    if (this.count > 100) this.count = 0;

    if (this.count % 2 != 0) return;

    if (this.currentFrame == this.frames - 1)
        if (this.looping) this.currentFrame = 0;
        else this.active = false;
    else
        this.currentFrame++;
};

Effect.prototype.Draw = function (ctx, scale) {
    // Don't draw if not active
    if (!this.active)
        return;

    // Take frame into account
    var offsetX = this.currentFrame * this.width;

    // Draw sprite at current coords
    ctx.drawImage(
        this.image,
        (this.clip[0] + offsetX) * this.assetScale,
        this.clip[1] * this.assetScale,
        this.clip[2] * this.assetScale,
        this.clip[3] * this.assetScale,
        this.x * scale,
        this.y * scale,
        this.width * scale,
        this.height * scale
    );
};