import { Food } from "classes/Food";
import { Population } from "classes/Population";
import React, { useCallback, useEffect, useRef } from "react";
import { CreatureType } from "types";

interface IProps {
  population: Population;
  food: Food;
  setGeneration: React.Dispatch<React.SetStateAction<number>>;
  onDataMode: boolean;
  trackingSimulation?: boolean;
  isSimulation?: boolean;
  setData: any;
}
const Canvas = ({
  population,
  food,
  setGeneration,
  onDataMode,
  trackingSimulation,
  isSimulation,
  setData,
}: IProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const draw = useCallback(
    async (ctx: CanvasRenderingContext2D, frameCount: number) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      population.draw(ctx);
      food.draw(ctx);
      if (frameCount % (onDataMode ? 2 : 100) === 0) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        food.draw(ctx);
        population.moveToFood(food);
        population.draw(ctx);
        population.placeRandom(ctx);
        population.decide();

        await new Promise((resolve) => {
          if (trackingSimulation) {
            setGeneration((p: number) => p + 1);
            if (isSimulation) {
              setData({
                "1": [
                  {
                    aggressive_amount: population.creatures.filter(
                      (c) => c.getType() === CreatureType.Aggressive
                    ).length,
                    friendly_amount: population.creatures.filter(
                      (c) => c.getType() === CreatureType.NonAggressive
                    ).length,
                  },
                ],
              });
            }
          }
          setTimeout(resolve, onDataMode ? 2 : 2000);
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      food,
      isSimulation,
      onDataMode,
      population,
      setGeneration,
      trackingSimulation,
    ]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    let frameCount = 0;
    let animationFrameId: number;
    population.placeRandom(context as CanvasRenderingContext2D);
    food.placeRandom(context as CanvasRenderingContext2D);

    food.draw(context as CanvasRenderingContext2D);
    population.draw(context as CanvasRenderingContext2D);

    const render = async () => {
      frameCount++;
      await draw(context as CanvasRenderingContext2D, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [population, food, draw]);

  return (
    <canvas
      width={isSimulation ? 650 : 500}
      height={isSimulation ? 650 : 500}
      ref={canvasRef}
      className=" border-black border-2 mx-auto"
    />
  );
};

export default Canvas;
