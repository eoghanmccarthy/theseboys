import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
  useMemo,
  useContext
} from "react";
import cx from "classnames";
import Tone from "tone";
import { Button } from "@eoghanmccarthy/ui";

import "./styles.scss";

import { TransportContext } from "features/transportProvider";

import useDialog from "componentLib/useDialog";
import { Slider } from "componentLib/slider";
import Step from "./step";
import TrackDetail from "features/trackDetail";
import useChannel from "features/useChannel";
import useChorus from "features/useChorus";
import {
  useAudio001,
  useAudio002,
  useAudio003,
  useAudio004
} from "features/soundBank";

const STEP_COUNT = 16;

const initialStepState = {
  track01: [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
  track02: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  track03: [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1]
};

const StepSequencer = () => {
  const transportCxt = useContext(TransportContext);
  const { transportState } = transportCxt.value;

  const [stepState, setStepState] = useState(initialStepState);
  const stepsRef = useRef(stepState);
  stepsRef.current = stepState;

  const trackDialog = useDialog();
  const [selectedTrack, setSelectedTrack] = useState(0);

  const track01Chorus = useChorus(1.5, 3.5, 0.7);
  const track02Chorus = useChorus(4, 3, 6);
  const track03Chorus = useChorus(24, 9, 4);

  const chorus = useMemo(() => {
    return [track01Chorus, track02Chorus, track03Chorus];
  }, [track01Chorus, track02Chorus, track03Chorus]);

  const track01Channel = useChannel(0, 0, false);
  const track02Channel = useChannel(0, 0, false);
  const track03Channel = useChannel(0, 0, true);

  console.log(chorus);

  const channels = useMemo(() => {
    return [track01Channel, track02Channel, track03Channel];
  }, [track01Channel, track02Channel, track03Channel]);

  const track01Audio = useAudio001(
    channels[0].current.connect(chorus[0].current)
  );
  const track02Audio = useAudio003(
    channels[1].current.connect(chorus[1].current)
  );
  const track03Audio = useAudio004(
    channels[2].current.connect(chorus[2].current)
  );

  const soundBank = useMemo(() => {
    return {
      track01: track01Audio,
      track02: track02Audio,
      track03: track03Audio
    };
  }, [track01Audio, track02Audio, track03Audio]);

  useEffect(() => {
    if (transportState === "stopped") {
      document
        .querySelectorAll(`.progress-indicator`)
        .forEach(el => (el.style.left = "0%"));
    }
  }, [transportState]);

  useEffect(() => {
    new Tone.Sequence(
      (time, step) => {
        Object.keys(stepsRef.current).forEach(track => {
          let targetStep = stepsRef.current[track][step];
          if (targetStep === 1) {
            soundBank[track].play(time);
          } else if (targetStep === 2) {
            soundBank[track].play(time);
            soundBank[track].play("+64n");
          }
        });
        document
          .querySelectorAll(`.progress-indicator`)
          .forEach(
            el => (el.style.left = `${(parseInt(step) / STEP_COUNT) * 100}%`)
          );
      },
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      "8n"
    ).start(0);
  }, []);

  return (
    <Fragment>
      <TrackDetail
        isOpen={trackDialog.isOpen}
        close={trackDialog.close}
        selectedTrack={selectedTrack}
        channel={channels[selectedTrack]}
        chorus={chorus[selectedTrack]}
      />
      <div className={"module step-sequencer"}>
        <div className={"module-head"}>
          <h1>
            <em>a/ </em>step sequencer
          </h1>
        </div>
        <div className={"module-main"}>
          <div className={"tracks"}>
            {Object.entries(stepState).map(([track, steps], i) => {
              return (
                <div key={i} className={"track"}>
                  <div className={"sample"}>
                    <button onClick={() => soundBank[track].play()}>
                      <span>{i + 1}</span>
                    </button>
                  </div>
                  <div className={"steps"}>
                    <div className={"progress-indicator"} />
                    {steps.map((value, i) => {
                      return (
                        <Step
                          key={i}
                          index={i}
                          value={value}
                          stepState={stepState}
                          setStepState={setStepState}
                          track={track}
                        />
                      );
                    })}
                  </div>
                  <div className={"channel"}>
                    <button
                      className={cx({ active: channels[i].mute.value })}
                      onClick={() => channels[i].mute.set(v => !v)}
                    >
                      mute
                    </button>
                    <Button
                      onClick={() => {
                        trackDialog.open();
                        setSelectedTrack(i);
                      }}
                    >
                      +
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default StepSequencer;
