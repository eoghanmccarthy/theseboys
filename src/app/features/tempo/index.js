import React, { useEffect, useState } from "react";
import Tone from "tone";

import "./styles.scss";

import Slider from "componentLib/slider";
import useKeyDownEvent from "componentLib/useKeyDownEvent";

const TEMPO_MIN = 60;
const TEMPO_MAX = 180;

const Tempo = () => {
  const [bpm, setBpm] = useState(120);

  useKeyDownEvent(e => {
    switch (e.code) {
      case "ArrowUp":
        if (!e.shiftKey) {
          setBpm(b => {
            if (b + 1 <= TEMPO_MAX) {
              return b + 1;
            }
            return b;
          });
        }
        break;
      case "ArrowDown":
        if (!e.shiftKey) {
          setBpm(b => {
            if (b - 1 <= TEMPO_MIN) {
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
    <div>
      <span>
        <em>bpm: </em>
        {bpm}
      </span>
      <Slider
        min={TEMPO_MIN}
        max={TEMPO_MAX}
        value={bpm}
        onChange={e => setBpm(e.target.value)}
      />
    </div>
  );
};

export default Tempo;
