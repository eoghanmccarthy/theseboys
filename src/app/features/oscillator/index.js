import React, { useRef, useState, useEffect } from 'react';
import { Oscillator as Osc } from 'tone';

import interpolate from 'utils/helpers/interpolate';
import usePointer from 'utils/hooks/usePointer';

import * as styles from './styles';

const Oscillator = () => {
  const padRef = useRef();

  const pointer = usePointer();

  const [values, setValues] = useState({ frequency: 0, partialCount: 0 });

  const oscillator = useRef(new Osc(440, 'sine').toDestination());

  useEffect(() => {
    oscillator.current.set({
      detune: 0,
      phase: 0
    });
  }, []);

  const interpolateX = interpolate({
    inputRange: [0, 200],
    outputRange: [0, 440],
    clamp: true
  });

  const interpolateY = interpolate({ inputRange: [0, 200], outputRange: [0, 32], clamp: false });

  return (
    <div css={styles.oscillator}>
      <div
        ref={padRef}
        css={styles.pad}
        onPointerDown={() => oscillator.current.start()}
        onPointerUp={() => oscillator.current.stop()}
        onPointerEnter={() => pointer.isDown && oscillator.current.start()}
        onPointerLeave={() => pointer.isDown && oscillator.current.stop()}
        onPointerMove={val => {
          const x = val.clientX - padRef.current.getBoundingClientRect().x;
          const y = val.clientY - padRef.current.getBoundingClientRect().y;

          const frequency = Math.abs(Math.round(interpolateX(x)));
          const partialCount = Math.abs(Math.round(interpolateY(y)));

          console.log(frequency, partialCount);

          oscillator.current.set({
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
    </div>
  );
};

export default Oscillator;
