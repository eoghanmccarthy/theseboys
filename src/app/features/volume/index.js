import React, { useEffect, useState } from "react";
import Tone from "tone";

import Slider from "componentLib/slider";
import useKeyDownEvent from "componentLib/useKeyDownEvent";

const VOLUME_MIN = -60;
const VOLUME_MAX = 12;

const Volume = () => {
  const [volume, setVolume] = useState(0);
  const [mute, toggleMute] = useState(false);

  useKeyDownEvent(e => {
    switch (e.code) {
      case "ArrowUp":
        if (e.shiftKey) {
          setVolume(v => {
            if (v + 1 <= VOLUME_MAX) {
              return v + 1;
            }
            return v;
          });
        }
        break;
      case "ArrowDown":
        if (e.shiftKey) {
          setVolume(v => {
            if (v - 1 >= VOLUME_MIN) {
              return v - 1;
            }
            return v;
          });
        }
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
    Tone.Master.volume.value = volume;
  }, [volume]);

  useEffect(() => {
    Tone.Master.mute = mute;
  }, [mute]);

  return (
    <div className={"volume"}>
      <div>
        <Slider
          min={VOLUME_MIN}
          max={VOLUME_MAX}
          value={volume}
          onChange={e => setVolume(e.target.value)}
        />
      </div>
      <span>volume: {volume}</span>
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
