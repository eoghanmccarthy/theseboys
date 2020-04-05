import React, { useEffect, useState } from "react";
import Tone from "tone";

import { Control, ControlBlock } from "componentLib/control";
import { SliderWithValues } from "componentLib/slider";
import useKeyDownEvent from "componentLib/useKeyDownEvent";

const TEMPO_MIN = 30;
const TEMPO_MAX = 240;

const Tempo = () => {
  const [bpm, setBpm] = useState(120);

  useKeyDownEvent(e => {
    switch (e.code) {
      case "ArrowRight":
        if (e.shiftKey) {
          setBpm(b => {
            if (b + 1 <= TEMPO_MAX) {
              return b + 1;
            }
            return b;
          });
        }
        break;
      case "ArrowLeft":
        if (e.shiftKey) {
          setBpm(b => {
            if (b - 1 >= TEMPO_MIN) {
              return b - 1;
            }
            return b;
          });
        }
        break;
      default:
        break;
    }
  });

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  return (
    <ControlBlock>
      <Control>
        <SliderWithValues
          title={"bpm"}
          min={TEMPO_MIN}
          max={TEMPO_MAX}
          value={bpm}
          onChange={e => setBpm(e.target.value)}
        />
      </Control>
    </ControlBlock>
  );
};

export default Tempo;
