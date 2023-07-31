export class Food {
  amount;
  foods: any[];
  ctx: CanvasRenderingContext2D | undefined;
  color;

  constructor(amount: number) {
    this.amount = amount;
    this.foods = [];
    this.ctx = undefined;
    this.color = "blue";
  }
  getFood() {
    return this.foods;
  }
  placeRandom(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.foods = new Array(this.amount).fill(0);
    let counter = 0;
    for (let i = 0; i < this.amount ** 0.5; i++) {
      for (let j = 0; j < this.amount ** 0.5; j++) {
        const x =
          ctx.canvas.width / 4 +
          (i / this.amount ** 0.5) * (ctx.canvas.width / 2);
        const y =
          ctx.canvas.height / 4 +
          (j / this.amount ** 0.5) * (ctx.canvas.height / 2);
        this.foods[counter] = { x, y };
        counter++;
      }
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    for (let j = 0; j < this.amount; j++) {
      const { x, y } = this.foods[j];
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(x + 3, y + 3, 2, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  }
}
