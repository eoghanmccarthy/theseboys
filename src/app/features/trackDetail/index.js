import React from "react";
import cx from "classnames";
import Tone from "tone";
import { Dialog } from "@eoghanmccarthy/ui";

import "./styles.scss";

import { Control, ControlBlock } from "componentLib/control";
import { SliderWithValues } from "componentLib/slider";

const TrackDetail = ({ isOpen, close, selectedTrack, channel, chorus }) => {
  return (
    <Dialog id={"track-detail-dialog"} isVisible={isOpen} closeDialog={close}>
      <header>
        <h2>track</h2>
      </header>
      <div className={"dialog-main"}>
        <ControlBlock>
          <Control>
            <SliderWithValues
              title={"pan"}
              min={-1}
              max={1}
              step={0.1}
              value={channel.pan.value}
              onChange={e => {
                let value = e.target.value;
                channel.pan.set(value);
              }}
            />
          </Control>
          <Control>
            <button
              className={cx({ active: channel.mute.value })}
              onClick={() => channel.mute.set(v => !v)}
            >
              mute
            </button>
          </Control>
          <Control>
            <SliderWithValues
              title={"chorus"}
              min={0}
              max={1}
              step={0.1}
              value={chorus.wet.value}
              onChange={e => {
                let value = e.target.value;
                chorus.wet.set(value);
              }}
            />
          </Control>
        </ControlBlock>
      </div>
    </Dialog>
  );
};

export default TrackDetail;

// <SliderWithValues
//     title={"dist"}
//     min={"0"}
//     max={"10"}
//     value={distState * 10}
//     onChange={e => setDistState(e.target.value / 10)}
// />
// <SliderWithValues
// title={"reverb"}
// min={"0"}
// max={"10"}
// value={JCReverb.current.roomSize.value * 10}
// onChange={e => (JCReverb.current.roomSize.value = e.target.value / 10)}
// />
