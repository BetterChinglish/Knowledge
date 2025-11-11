class Ball {
  constructor(x, y = 0, r = 12, color = 'skyblue') {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    
    this.scaleX = 1;
    this.scaleY = 1;
  }
  
  stroke(ctx) {
    ctx.save();
    ctx.scale(this.scaleX, this.scaleY);
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 360 * Math.PI / 180, false);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
  
  fill(ctx) {
    ctx.save();
    ctx.scale(this.scaleX, this.scaleY);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 360 * Math.PI / 180, false);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

