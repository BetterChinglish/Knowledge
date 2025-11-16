class Ball {
  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r || 12;
    this.color = color || 'skyblue';
    
    this.vx = 0;
    this.vy = 0;
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

  checkPosition(x, y) {
    return (x - this.x) ** 2 + (y - this.y) ** 2 <= this.r ** 2;
  }

}

