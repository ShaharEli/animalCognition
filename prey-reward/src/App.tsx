import Simulation from "Simulation";
import { useDebounce } from "hooks/useDebounce";
import { useEffect, useRef, useState } from "react";
import uuid from "react-uuid";
import { IData } from "types";
import { useImmer } from "use-immer";

const IS_ON_DATA_MODE = true;
const AUTO_DOWNLOAD = false;
const SIMULATIONS_AMOUNT = 12;

const ids = new Array(SIMULATIONS_AMOUNT).fill(0).map(uuid);
const DATA_SIZE = 400;
const RATE_INCREMENT = 0.05;
type Mode = "data" | "simulation";
const App = () => {
  const [data, setData] = useImmer({} as Record<string, IData[]>);
  const [generation, setGeneration] = useState(1);
  const [rate, setRate] = useState(0);
  const [mode, setMode] = useState<Mode>("simulation");
  const debouncedData = useDebounce(data, 500);
  const rateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    rateRef?.current?.focus();
  }, []);

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
      if (AUTO_DOWNLOAD) {
        exportData();
      }

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
    <div className="text-xl font-heebo">
      <div className="flex gap-3 mb-4 items-center justify-center">
        {mode === "data" && (
          <div
            className={`cursor-pointer p-4 mt-4 flex justify-center
        mx-2
        items-center bg-gray-600 w-fit h-fit text-white`}
            onClick={exportData}
          >
            Download
          </div>
        )}
        <div
          className={`cursor-pointer p-4 $ mt-4 flex justify-center items-center bg-gray-600 w-fit h-fit text-white`}
          onClick={async () => {
            setData({});
            setGeneration(1);
            setRate(0);
            if (mode === "data") {
              window.location.reload();
            }
            setMode((p) => (p === "data" ? "simulation" : "data"));
          }}
        >
          Switch to {mode === "simulation" ? "data" : "simulation"} mode
        </div>
      </div>
      <div>
        <label className="mx-2">percent of aggressive</label>
        <input
          placeholder={`${rate * 100}%`}
          className="p-1 w-12"
          type="number"
          ref={rateRef}
          onChange={(e) => {
            setGeneration(1);
            setData({});
            setRate(Number(e.target.value) / 100);
          }}
        />
      </div>
      <div className="mx-2">rate: {rate}</div>
      {mode === "simulation" && debouncedData[1] && debouncedData[1].length && (
        <div className="mx-2">
          previous aggressive count:{" "}
          {debouncedData[1]![debouncedData[1].length - 1].aggressive_amount},
          previous friendly count:{" "}
          {debouncedData[1]![debouncedData[1].length - 1].friendly_amount}
        </div>
      )}
      <div className="flex flex-wrap justify-center items-center gap-10 ">
        {mode === "simulation" && (
          <Simulation
            id="1"
            setData={setData}
            onDataMode={false}
            generation={generation}
            setGeneration={setGeneration}
            rate={rate}
            isSimulation
            trackingSimulation={true}
          />
        )}
        {mode === "data" &&
          new Array(SIMULATIONS_AMOUNT)
            .fill(0)
            .map((_, i) => (
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
