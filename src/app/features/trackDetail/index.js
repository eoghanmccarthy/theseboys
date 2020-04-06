import React from "react";
import cx from "classnames";
import { Dialog } from "@eoghanmccarthy/ui";

import "./styles.scss";

import { Control, ControlBlock } from "componentLib/control";
import { SliderWithValues } from "componentLib/slider";

const TrackDetail = ({
  isOpen,
  close,
  setSelectedTrack,
  selectedTrack,
  channel,
  chorus
}) => {
  return (
    <Dialog id={"track-detail-dialog"} isVisible={isOpen} closeDialog={close}>
      <header>
        <h2>track</h2>
      </header>
      <div className={"dialog-main"}>
        <button onClick={() => setSelectedTrack(v => v + 1)}>mmmm</button>
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
              min={2}
              max={20}
              step={1}
              value={chorus.meta.delayTime}
              onChange={e => {
                let value = e.target.value;
                chorus.set("delayTime", value);
              }}
            />
          </Control>
        </ControlBlock>
      </div>
    </Dialog>
  );
};

export default TrackDetail;
