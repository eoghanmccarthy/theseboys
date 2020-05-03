import React, { useRef, useState } from 'react';
import { Oscillator as Osc } from 'tone';

import useInterpolate from 'utils/hooks/useInterpolate';

import * as styles from './styles';

const Oscillator = () => {
  const padRef = useRef();

  const [values, setValues] = useState({ frequency: 0, partialCount: 0 });

  const oscillator = useRef(new Osc(440, 'sine').toDestination());

  const interpolateX = useInterpolate({
    inputRange: [0, 200],
    outputRange: [0, 440],
    clamp: false
  });
  const interpolateY = useInterpolate({ inputRange: [0, 200], outputRange: [0, 32], clamp: false });

  return (
    <div css={styles.oscillator}>
      <span>
        {values.frequency ?? 0} {values.partialCount ?? 0}
      </span>
      <div
        ref={padRef}
        css={styles.pad}
        onPointerDown={() => oscillator.current.start()}
        onPointerUp={() => oscillator.current.stop()}
        onPointerLeave={s => oscillator.current.stop()}
        onPointerMove={val => {
          const x = val.clientX - padRef.current.getBoundingClientRect().x;
          const y = val.clientY - padRef.current.getBoundingClientRect().y;

          const frequency = Math.abs(Math.round(interpolateX(x)));
          const partialCount = Math.abs(Math.round(interpolateY(y)));

          oscillator.current.set({
            frequency,
            partialCount
          });
          setValues({
            frequency,
            partialCount
          });
        }}
      />
    </div>
  );
};

export default Oscillator;
