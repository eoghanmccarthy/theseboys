import React, { useContext, useEffect } from "react";
import Tone from "tone";
import { Button } from "@eoghanmccarthy/ui";

import "./styles.scss";

import { TransportContext } from "features/transportProvider";

import * as IconButtons from "componentLib/iconButtons";
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
      </div>
      <div className={"transport-state"}>
        <div>
          <Button
            size={"xl"}
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
            play
          </Button>
          <Button size={"xl"} onClick={() => setTransportState("stopped")}>
            stop
          </Button>
        </div>
        <div>
          <span>{transportState}</span>
        </div>
      </div>
      <div>
        <Tempo />
      </div>
    </div>
  );
};

export default Master;
