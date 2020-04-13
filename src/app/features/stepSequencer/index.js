import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
  useMemo,
  useContext,
  useReducer
} from "react";
import cx from "classnames";
import { Button, Dialog } from "@eoghanmccarthy/ui";

import "./styles.scss";

import { TransportContext } from "features/transportProvider";

import useDialog from "componentLib/useDialog";
import Track from "features/track";
import TrackDetail from "features/trackDetail";

import {
  useAudio001,
  useAudio002,
  useAudio003,
  useAudio004,
  useAudio005
} from "features/soundBank";

const sequencerSteps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const initialStepState = [
  [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const StepSequencer = () => {
  const transportCxt = useContext(TransportContext);
  const { transportState } = transportCxt.value;

  const [channelOpts, setChannelOpts] = useState(
    initialStepState.map(() => ({
      volume: 60,
      pan: 0,
      mute: false,
      solo: false
    }))
  );

  const [channelAutoFilter, setChannelAutoFilter] = useState(
    initialStepState.map(() => ({
      frequency: 1,
      type: "sine",
      depth: 1,
      baseFrequency: 200,
      octaves: 2.6,
      filter: {
        type: "lowpass",
        rolloff: -12,
        Q: 1
      }
    }))
  );

  const [channelReverb, setChannelReverb] = useState(
    initialStepState.map(() => ({
      preDelay: 0.01,
      decay: 1.5,
      wet: 0.0
    }))
  );

  const [stepState, setStepState] = useState(initialStepState);

  const trackDialog = useDialog();
  const [selectedTrack, setSelectedTrack] = useState(0);

  useEffect(() => {
    if (transportState === "stopped") {
      document
        .querySelectorAll(`.progress-indicator`)
        .forEach(el => (el.style.left = "0%"));
    }
  }, [transportState]);

  return (
    <Fragment>
      <div className={"module step-sequencer"}>
        <div className={"module-head"}>
          <h1>
            <em>a/ </em>step sequencer
          </h1>
        </div>
        <div className={"module-main"}>
          <div className={"tracks"}>
            {stepState.map((steps, index) => {
              return (
                <Track
                  key={index}
                  index={index}
                  subDivision={"8n"}
                  sequencerSteps={sequencerSteps}
                  stepState={stepState[index]}
                  setStepState={updated => {
                    setStepState(
                      stepState.map((s, i) => {
                        if (index === i) return updated;
                        return s;
                      })
                    );
                  }}
                  effectsChain={null}
                  channel={channelOpts[index]}
                  reverb={channelReverb[index]}
                  autoFilter={channelAutoFilter[index]}
                >
                  <div className={"channel"}>
                    <button
                      className={cx({ active: channelOpts[index].mute })}
                      onClick={() => {
                        setChannelOpts(
                          channelOpts.map((c, i) => {
                            if (index === i) return { ...c, mute: !c.mute };
                            return c;
                          })
                        );
                      }}
                    >
                      mute
                    </button>
                    <Button
                      onClick={() => {
                        trackDialog.open();
                        setSelectedTrack(index);
                      }}
                    >
                      +
                    </Button>
                  </div>
                </Track>
              );
            })}
          </div>
          <div id={"track-detail"}>
            <TrackDetail
              selectedTrack={selectedTrack}
              setSelectedTrack={setSelectedTrack}
              numberOfTracks={channelOpts.length}
              channel={channelOpts[selectedTrack]}
              setChannel={update => {
                setChannelOpts(
                  channelOpts.map((c, i) => {
                    if (selectedTrack === i) return update;
                    return c;
                  })
                );
              }}
              reverb={channelReverb[selectedTrack]}
              setReverb={update => {
                setChannelReverb(
                  channelReverb.map((r, i) => {
                    if (selectedTrack === i) return update;
                    return r;
                  })
                );
              }}
              autoFilter={channelAutoFilter[selectedTrack]}
              setAutoFilter={update => {
                setChannelAutoFilter(
                  channelAutoFilter.map((a, i) => {
                    if (selectedTrack === i) return update;
                    return a;
                  })
                );
              }}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default StepSequencer;
