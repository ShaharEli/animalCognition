import { Food } from "classes/Food";
import { Population } from "classes/Population";
import Canvas from "components/Canvas";
import React, { useEffect, useMemo, useState } from "react";
import { CreatureType, IData } from "types";
import { Updater } from "use-immer";

interface IProps {
  onDataMode: boolean;
  id: string;
  setData: Updater<Record<string, IData[]>>;
  generation: number;
  setGeneration: React.Dispatch<React.SetStateAction<number>>;
  rate: number;
  trackingSimulation?: boolean;
  isSimulation?: boolean;
}
const CREATURES_INITIAL_AMOUNT = 100;
const FOOD_AMOUNT = 100;

function Simulation({
  onDataMode,
  id,
  setData,
  generation,
  setGeneration,
  rate,
  trackingSimulation,
  isSimulation,
}: IProps) {
  const population = useMemo(
    () => new Population(CREATURES_INITIAL_AMOUNT, rate),
    [rate]
  );

  const food = useMemo(() => new Food(FOOD_AMOUNT), []);
  useEffect(() => {
    if (!onDataMode) return;
    setData((data) => {
      const payload = {
        id,
        generation,
        creatures_initial_amount: CREATURES_INITIAL_AMOUNT,
        aggressive_ratio: rate,
        food_amount: FOOD_AMOUNT,
        friendly_amount: population
          .getCreatures()
          .reduce(
            (acc, curr) =>
              curr.type === CreatureType.NonAggressive ? acc + 1 : acc,
            0
          ),
        aggressive_amount: population
          .getCreatures()
          .reduce(
            (acc, curr) =>
              curr.type === CreatureType.Aggressive ? acc + 1 : acc,
            0
          ),
      } as IData;
      if (data[id]) {
        data[id].push(payload);
      } else {
        data[id] = [payload];
      }
    });
  }, [generation, onDataMode, id, setData, population]);
  return (
    <div className="">
      <h2 className="mx-auto my-2 text-center">Gen: {generation}</h2>
      <div className="">
        <Canvas
          isSimulation={isSimulation}
          onDataMode={onDataMode && !isSimulation}
          population={population}
          food={food}
          setGeneration={setGeneration}
          trackingSimulation={trackingSimulation}
        />
      </div>
    </div>
  );
}

export default Simulation;
