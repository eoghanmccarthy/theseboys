import React, { useEffect, useState } from "react";
import cx from "classnames";
import Tone from "tone";

import "./styles.scss";

import { Control, ControlBlock } from "componentLib/control";
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
    Tone.Master.volume.value = volume - VOLUME_OFFSET;
  }, [volume]);

  useEffect(() => {
    Tone.Master.mute = mute;
  }, [mute]);

  return (
    <ControlBlock>
      <Control>
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
      </Control>
      <Control size={"sm"}>
        <button
          className={cx({ active: mute })}
          onClick={() => toggleMute(m => !m)}
        >
          mute
        </button>
      </Control>
    </ControlBlock>
  );
};

export default Volume;
