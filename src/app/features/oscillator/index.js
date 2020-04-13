import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Gain,
  Destination,
  MembraneSynth,
  MetalSynth,
  Oscillator,
  Panner,
  Sequence,
  Synth,
  Transport,
  Volume
} from "tone";

import useEventListener from "utils/hooks/useEventListener";

const initialStepState = {
  kick: [0, 0, 0, 0, 0, 0, 0, 0],
  snare: [0, 0, 0, 0, 0, 0, 0, 0],
  clap: [0, 0, 0, 0, 0, 0, 0, 0]
};

const Home = () => {
  const gain = useRef(null);
  const synths = useRef(null);
  const panner = useRef(null);
  const sequence = useRef(null);

  const oscillator = useRef(null);

  const [pos, setPos] = useState({ x: 1, y: 1 });

  const [bpm, setBpm] = useState(120);
  const [start, setStart] = useState(false);

  const [stepState, setStepState] = useState(initialStepState);
  const stepsRef = useRef(stepState);
  stepsRef.current = stepState;

  const [currentStep, setCurrentStep] = useState(0);
  const currentStepRef = useRef(currentStep);
  currentStepRef.current = currentStep;

  useEventListener("keydown", e => {
    switch (e.code) {
      case "Space":
        setStart(s => !s);
        break;
      default:
        break;
    }
  });

  useEffect(() => {
    if (start) {
      Transport.start();
    } else {
      Transport.stop();
      setCurrentStep(0);
    }
  }, [start]);

  useEffect(() => {
    Transport.bpm.value = bpm;
  }, [bpm]);

  useEffect(() => {
    gain.current = new Gain(0.6).toDestination();
  }, []);

  useEffect(() => {
    panner.current = {
      kick: new Panner(1),
      snare: new Panner(1),
      clap: new Panner(-0.8)
    };
  }, []);

  useEffect(() => {
    synths.current = {
      kick: new MembraneSynth()
        .connect(gain)
        .chain(panner.current["kick"], Destination),
      snare: new Synth({
        oscillator: { type: "sine" },
        envelope: {
          attack: 0.005,
          decay: 0.1,
          sustain: 0.3,
          release: 1
        }
      }).chain(panner.current["snare"], Destination),
      clap: new MetalSynth({
        frequency: 200,
        envelope: {
          attack: 0.08,
          decay: 0.25,
          release: 0.49
        },
        harmonicity: 1,
        modulationIndex: 2,
        resonance: 1277,
        octaves: 1.2
      }).chain(panner.current["clap"], Destination)
    };
  }, []);

  useEffect(() => {
    oscillator.current = new Oscillator(440, "triangle5").toDestination();
  }, []);

  useEffect(() => {
    Transport.scheduleRepeat(time => {
      Object.keys(stepsRef.current).forEach(name => {
        let s = synths.current;
        if (stepsRef.current[name][currentStepRef.current] === 1) {
          name === "kick" && s[name].triggerAttackRelease("c2", "8n", time);
          name === "snare" && s[name].triggerAttackRelease("a3", "8n", time);
          name === "clap" && s[name].triggerAttackRelease("8n", time);
        }
      });
      setCurrentStep(step => {
        return step > 6 ? 0 : step + 1;
      });
    }, "8n");
  }, []);

  const notes = ["C3", "Eb3", "G3", "Bb3"];

  useEffect(() => {
    sequence.current = new Sequence(
      function(time, note) {
        synths.current[1].triggerAttackRelease(note, "10hz", time);
      },
      notes,
      "4n"
    );
  }, []);

  return (
    <Fragment>
      <div>
        {Object.entries(stepState).map(([name, steps], i) => (
          <div key={i} style={{ display: "flex" }}>
            {steps.map((s, i) => (
              <button
                key={i}
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: `${s !== 0 ? "red" : "grey"}`
                }}
                onClick={e => {
                  e.preventDefault();
                  let steps = [...stepState[name]];
                  steps[i] = steps[i] === 0 ? 1 : 0;
                  setStepState({
                    ...stepState,
                    [name]: steps
                  });
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <span>
        {pos.x * 2} {pos.y}
      </span>
      <span>tempo {bpm}</span>
      <span>{start ? "playing" : "stopped"}</span>
      <div
        onPointerEnter={() => oscillator.current.start()}
        onPointerLeave={() => oscillator.current.stop()}
        onPointerMove={val => {
          oscillator.current.frequency.value = val.clientX * 2;
          setPos({ x: val.clientX, y: val.clientY });
        }}
        style={{ width: "200px", height: "200px", backgroundColor: "blue" }}
      >
        osc
      </div>
      <button onClick={() => sequence.current.start()}>noise</button>
    </Fragment>
  );
};

export default Home;
