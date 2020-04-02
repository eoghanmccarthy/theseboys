import React, { useContext, useEffect } from "react";
import Tone from "tone";

import "./styles.scss";

import { TransportContext } from "features/transportProvider";

import Volume from "../volume";
import Tempo from "../tempo";

const Master = () => {
  const transportCxt = useContext(TransportContext);
  const { transportState } = transportCxt.value;
  const { setTransportState } = transportCxt.actions;

  useEffect(() => {
    if (Tone.context.state !== "running") {
      Tone.context.resume();
    }
  }, [Tone.context]);

  return (
    <div className={"master"}>
      <div>
        <Volume />
        <Tempo />
      </div>
      <div>
        <span>{transportState}</span>
        <button
          onClick={() =>
            setTransportState(s => {
              if (s === "paused" || s === "stopped") {
                return "playing";
              } else {
                return "paused";
              }
            })
          }
        >
          {transportState === "playing" ? "pause" : "play"}
        </button>
        <button onClick={() => setTransportState("stopped")}>stop</button>
      </div>
    </div>
  );
};

export default Master;
