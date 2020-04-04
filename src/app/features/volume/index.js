import React, { useEffect, useState } from "react";
import Tone from "tone";

import "./styles.scss";

import { SliderWithValues } from "componentLib/slider";
import useKeyDownEvent from "componentLib/useKeyDownEvent";

const VOLUME_MIN = 0;
const VOLUME_MAX = 72;
const VOLUME_OFFSET = 60;

const Volume = () => {
  const [volume, setVolume] = useState(60);
  const [mute, toggleMute] = useState(false);

  useKeyDownEvent(e => {
    switch (e.code) {
      case "ArrowUp":
        setVolume(v => {
          if (v + 1 <= VOLUME_MAX) {
            return v + 1;
          }
          return v;
        });
        break;
      case "ArrowDown":
        setVolume(v => {
          if (v - 1 >= VOLUME_MIN) {
            return v - 1;
          }
          return v;
        });
        break;
      case "KeyM":
        if (e.shiftKey) {
          toggleMute(m => !m);
        }
        break;
      default:
        break;
    }
  });

  useEffect(() => {
    Tone.Master.volume.value = volume - VOLUME_OFFSET;
  }, [volume]);

  useEffect(() => {
    Tone.Master.mute = mute;
  }, [mute]);

  return (
    <div className={"volume"}>
      <div>
        <SliderWithValues
          title={"volume"}
          min={0}
          max={100}
          value={Math.round((volume / VOLUME_MAX) * 100)}
          onChange={e => {
            let v = e.target.value;
            setVolume(() => {
              return Math.round((VOLUME_MAX / 100) * v);
            });
          }}
        />
      </div>
      <button
        style={{ backgroundColor: mute && "red" }}
        onClick={() => toggleMute(m => !m)}
      >
        mute
      </button>
    </div>
  );
};

export default Volume;
