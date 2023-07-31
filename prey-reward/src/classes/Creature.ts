import { CreatureType, Decision } from "types/creatures";

export class Creature {
  x;
  y;
  size;
  color;
  type;
  ctx: CanvasRenderingContext2D | null;
  constructor(type: CreatureType, size?: number) {
    this.size = size || 5;
    this.type = type;
    this.color = this.type === CreatureType.Aggressive ? "red" : "green";
    this.ctx = null;
    this.x = this.y = 0;
  }

  place(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.onChange();
  }

  // placeRandom(ctx: CanvasRenderingContext2D) {
  //   this.ctx = ctx;
  //   const isTop = !!(Math.random() > 0.5);
  //   const isLeft = !!(Math.random() > 0.5);
  //   const isOnXAxis = !!(Math.random() > 0.5);
  //   this.place(
  //     isOnXAxis
  //       ? Math.random() * ctx.canvas.width
  //       : isLeft
  //       ? 0
  //       : ctx.canvas.width,
  //     !isOnXAxis
  //       ? Math.random() * ctx.canvas.height
  //       : isTop
  //       ? 0
  //       : ctx.canvas.height
  //   );
  //   this.reposition(ctx);
  //   this.onChange();
  // }

  placeRandom(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    const isTop = false;
    const isLeft = this.type === CreatureType.Aggressive;
    const isOnXAxis = false;
    this.place(
      isOnXAxis
        ? Math.random() * ctx.canvas.width
        : isLeft
        ? 0
        : ctx.canvas.width,
      !isOnXAxis
        ? Math.random() * ctx.canvas.height
        : isTop
        ? 0
        : ctx.canvas.height
    );
    this.reposition(ctx);
    this.onChange();
  }
  onChange() {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  reposition(ctx: CanvasRenderingContext2D) {
    if (this.x - this.size < 0) {
      this.x = this.size;
    }
    if (this.x + -this.size > ctx.canvas.width) {
      this.x = ctx.canvas.width - this.size;
    }
    if (this.y - this.size < 0) {
      this.y = this.size;
    }
    if (this.y + -this.size > ctx.canvas.height) {
      this.y = ctx.canvas.height - this.size;
    }
  }

  decide(opponent: Creature | undefined) {
    if (!opponent) {
      return Decision.EatBoth;
    }
    if (this.type === CreatureType.Aggressive) {
      if (opponent.getType() === CreatureType.Aggressive) {
        return Decision.EatZero;
      } else {
        return Decision.EatOneAndAHalf;
      }
    } else {
      if (opponent.getType() === CreatureType.Aggressive) {
        return Decision.EatHalf;
      } else {
        return Decision.EatOne;
      }
    }
  }

  setColor(color: string) {
    this.color = color;
  }
  makeChild() {
    return new Creature(this.type, this.size);
  }

  getPosition() {
    return [this.x, this.y];
  }
  getType() {
    return this.type;
  }
}
