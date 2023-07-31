import Simulation from "Simulation";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import { IData } from "types";
import { useImmer } from "use-immer";

const IS_ON_DATA_MODE = true;
const SIMULATIONS_AMOUNT = 12;

const ids = new Array(SIMULATIONS_AMOUNT).fill(0).map(uuid);
const DATA_SIZE = 400;
const RATE_INCREMENT = 0.05;

const App = () => {
  const [data, setData] = useImmer({} as Record<string, IData[]>);
  const [generation, setGeneration] = useState(1);
  const [rate, setRate] = useState(0);

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `data-rate-${rate}.json`;
    link.click();
  };

  useEffect(() => {
    if (generation === DATA_SIZE) {
      exportData();
      if (rate === 1) {
        alert("simulation ended");
        return;
      }
      setRate((r) => r + RATE_INCREMENT);
      setGeneration(1);
      setData({});
    }
  }, [generation]);

  return (
    <div>
      <div
        className="cursor-pointer mx-auto p-4 mt-4 flex justify-center items-center bg-gray-600 w-fit h-fit text-white"
        onClick={exportData}
      >
        Download
      </div>
      <div>rate: {rate}</div>
      <div className="flex flex-wrap justify-center items-center gap-10 ">
        {new Array(SIMULATIONS_AMOUNT).fill(0).map((_, i) => (
          <Simulation
            key={i}
            id={ids[i]}
            setData={setData}
            onDataMode={IS_ON_DATA_MODE}
            generation={generation}
            setGeneration={setGeneration}
            rate={rate}
            trackingSimulation={i === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
