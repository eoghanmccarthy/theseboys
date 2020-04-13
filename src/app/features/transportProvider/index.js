import React, { useMemo, createContext, useState, useEffect } from "react";
import Tone from "tone";

export const TransportContext = createContext();

import useEventListener from "utils/hooks/useEventListener";

const TransportProvider = ({ children }) => {
  const [transportState, setTransportState] = useState("stopped");

  useEventListener("keydown", e => {
    switch (e.code) {
      case "Space":
        setTransportState(s => {
          if (s === "paused" || s === "stopped") {
            return "playing";
          } else {
            return "paused";
          }
        });
        break;
      default:
        break;
    }
  });

  useEffect(() => {
    if (transportState === "playing") {
      Tone.Transport.start();
    } else if (transportState === "paused") {
      Tone.Transport.pause();
    } else {
      Tone.Transport.stop();
    }
  }, [transportState]);

  const values = useMemo(() => {
    return {
      value: {
        transportState
      },
      actions: {
        setTransportState
      }
    };
  }, [transportState]);

  return (
    <TransportContext.Provider value={values}>
      {children}
    </TransportContext.Provider>
  );
};

export default TransportProvider;
