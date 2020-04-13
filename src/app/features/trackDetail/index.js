import React, { Fragment } from "react";
import cx from "classnames";

import "./styles.scss";

import { setIndexPrev, setIndexNext } from "utils/helpers/setSoundIndex";

import { Control, ControlBlock } from "componentLib/control";
import { SliderWithValues } from "componentLib/slider";

const VOLUME_MAX = 72;

const TrackDetail = ({
  selectedTrack,
  setSelectedTrack,
  numberOfTracks,
  channel,
  setChannel,
  reverb,
  setReverb,
  autoFilter,
  setAutoFilter
}) => {
  return (
    <Fragment>
      <header>
        <h2>
          track <em>{selectedTrack}</em>
        </h2>
      </header>
      <div className={"detail-main"}>
        <button
          onClick={() => {
            setSelectedTrack(i => {
              return setIndexPrev(i, numberOfTracks);
            });
          }}
        >
          prev
        </button>
        <button
          onClick={() => {
            setSelectedTrack(i => {
              return setIndexNext(i, numberOfTracks);
            });
          }}
        >
          next
        </button>
        <ControlBlock>
          <Control>
            <SliderWithValues
              title={"pan"}
              min={-1}
              max={1}
              step={0.1}
              value={channel.pan}
              onChange={e => {
                let val = e.target.value;
                setChannel({ ...channel, pan: val });
              }}
            />
          </Control>
          <Control>
            <SliderWithValues
              title={"volume"}
              min={0}
              max={100}
              value={Math.round((channel.volume / VOLUME_MAX) * 100)}
              onChange={e => {
                let v = e.target.value;
                setChannel({
                  ...channel,
                  volume: Math.round((VOLUME_MAX / 100) * v)
                });
              }}
            />
          </Control>
          <Control>
            <button
              className={cx({ active: channel.mute })}
              onClick={() =>
                setChannel({
                  ...channel,
                  mute: !channel.mute
                })
              }
            >
              mute
            </button>
          </Control>
          <Control>
            <SliderWithValues
              title={"reverb"}
              min={0}
              max={1}
              step={0.1}
              value={reverb.wet}
              onChange={e => {
                let value = e.target.value;
                setReverb({
                  ...reverb,
                  wet: value
                });
              }}
            />
          </Control>
          <Control>
            <SliderWithValues
              title={"auto filter"}
              min={0}
              max={4000}
              step={200}
              value={autoFilter.baseFrequency}
              onChange={e => {
                let value = e.target.value;
                setAutoFilter({
                  ...autoFilter,
                  baseFrequency: value
                });
              }}
            />
          </Control>
        </ControlBlock>
      </div>
    </Fragment>
  );
};

export default TrackDetail;
