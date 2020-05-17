import React, { useRef, useState, useEffect } from 'react';
import { Oscillator as Osc, Distortion, Destination, Filter } from 'tone';

import interpolate from 'utils/helpers/interpolate';
import usePointer from 'utils/hooks/usePointer';

import * as styles from './styles';

import InstrumentContainer from 'features/instrumentContainer';

const Oscillator = () => {
  const padRef = useRef();

  const pointer = usePointer();

  const [values, setValues] = useState({ frequency: 0, partialCount: 0 });

  const oscillatorRef = useRef(null);
  const distortionRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    filterRef.current = new Filter({
      type: 'lowpass',
      frequency: 1100,
      rolloff: -12,
      Q: 1,
      gain: 12
    });
    distortionRef.current = new Distortion(0.8);
    oscillatorRef.current = new Osc({
      type: 'sine',
      frequency: 440,
      detune: 0,
      phase: 0,
      volume: -10
    }).chain(distortionRef.current, filterRef.current, Destination);
  }, []);

  const interpolateX = interpolate({
    inputRange: [0, 200],
    outputRange: [0, 440],
    clamp: true
  });

  const interpolateY = interpolate({ inputRange: [0, 200], outputRange: [0, 32], clamp: true });

  return (
    <InstrumentContainer>
      <div
        ref={padRef}
        css={styles.pad({ state: oscillatorRef.current?.state })}
        onPointerDown={() => oscillatorRef.current.start()}
        onPointerUp={() => oscillatorRef.current.stop()}
        onPointerEnter={() => pointer.isDown && oscillatorRef.current.start()}
        onPointerLeave={() => pointer.isDown && oscillatorRef.current.stop()}
        onPointerMove={val => {
          const x = val.clientX - padRef.current.getBoundingClientRect().x;
          const y = val.clientY - padRef.current.getBoundingClientRect().y;

          const frequency = Math.abs(Math.round(interpolateX(x)));
          const partialCount = Math.abs(Math.round(interpolateY(y)));

          oscillatorRef.current.set({
            frequency,
            partialCount
          });
          setValues({
            frequency,
            partialCount
          });
        }}
      >
        {/*<div css={styles.values}>*/}
        {/*  <span>{values.frequency ?? 0}</span>*/}
        {/*</div>*/}
      </div>
    </InstrumentContainer>
  );
};

export default Oscillator;
