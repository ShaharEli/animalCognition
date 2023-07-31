import { CreatureType, Decision } from "types/creatures";
import { Creature } from "./Creature";
import { Food } from "./Food";

export class Population {
  creatures: Creature[];
  matches: any[];
  constructor(initialSize: number, aggregationRate: number) {
    const aggressiveAmount = initialSize * aggregationRate;
    this.matches = [];
    this.creatures = new Array(initialSize)
      .fill(0)
      .map(
        (_, i) =>
          new Creature(
            i < aggressiveAmount
              ? CreatureType.Aggressive
              : CreatureType.NonAggressive
          )
      );
  }

  getCreatures(): Creature[] {
    return this.creatures;
  }

  placeRandom(ctx: CanvasRenderingContext2D) {
    this.creatures.forEach((creature) => creature.placeRandom(ctx));
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.creatures.forEach((creature) => creature.draw(ctx));
  }
  moveToFood(food: Food) {
    const matches = this.matchToFood(food);
    const keys = Object.keys(matches);
    for (let i = 0; i < keys.length; i++) {
      matches[keys[i]].creatures.forEach((c: Creature, t: number) => {
        const coord = food.getFood()[keys[i] as any];
        c.place(coord.x + t * 3, coord.y + t * 3);
      });
    }
    this.matches = matches;
  }

  select(res: Decision, newPopulation: Creature[], creature: Creature) {
    switch (res) {
      case Decision.EatZero:
        return newPopulation;
      case Decision.EatHalf:
        return Math.random() > 0.5
          ? [...newPopulation, creature]
          : [...newPopulation];
      case Decision.EatOne:
        return [...newPopulation, creature];
      case Decision.EatOneAndAHalf:
        return Math.random() > 0.5
          ? [...newPopulation, creature, creature.makeChild()]
          : [...newPopulation, creature];
      case Decision.EatBoth:
        return [...newPopulation, creature, creature.makeChild()];
    }
  }

  decide() {
    let newPopulation = [] as Creature[];
    Object.values(this.matches).forEach((match) => {
      const { creatures, count } = match;
      if (count === 1) {
        const res = creatures[0].decide(undefined);
        newPopulation = this.select(res, newPopulation, creatures[0]);
      } else {
        const res1 = creatures[0].decide(creatures[1]);
        newPopulation = this.select(res1, newPopulation, creatures[0]);
        const res2 = creatures[1].decide(creatures[0]);
        newPopulation = this.select(res2, newPopulation, creatures[1]);
      }
    });
    this.creatures = newPopulation;
  }
  matchToFood(food: Food) {
    const foodElms = food.getFood();
    const matches = {} as any;
    this.creatures.forEach((c) => {
      while (
        Object.values(matches).reduce(
          (acc: number, curr: any) => acc + curr.count,
          0
        ) <
        food.amount * 2
      ) {
        const randomIdx = Math.floor(foodElms.length * Math.random());
        if (matches[randomIdx]) {
          if (matches[randomIdx].count !== 1) {
            continue;
          }
          matches[randomIdx].creatures.push(c);
          matches[randomIdx].count = 2;
          break;
        } else {
          matches[randomIdx] = {};
          matches[randomIdx].creatures = [c];
          matches[randomIdx].count = 1;
          break;
        }
      }
    });
    return matches;
  }
}
