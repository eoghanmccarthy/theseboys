import React, { useRef } from 'react';
import { Oscillator as Osc, Distortion, Destination, Filter } from 'tone';

import './index.css';

import { interpolate } from 'utils/studioHelpers';
import useEventListener from '../../utils/hooks/useEventListener';

const Oscillator = () => {
  const distortionRef = useRef(new Distortion(0.8));

  const filterRef = useRef(
    new Filter({
      type: 'lowpass',
      frequency: 1100,
      rolloff: -12,
      Q: 1,
      gain: 12
    })
  );

  const oscillatorRef = useRef(
    new Osc({
      type: 'sine',
      frequency: 440,
      detune: 0,
      phase: 0,
      volume: 0
    }).chain(distortionRef.current, filterRef.current, Destination)
  );

  const interpolateX = interpolate({
    from: [0, 420],
    to: [0, 440],
    clamp: true
  });

  const interpolateY = interpolate({ from: [0, 280], to: [0, 32], clamp: true });

  useEventListener(e => {
    switch (e.key) {
      case 'Shift':
        filterRef.current.set({ type: 'highpass' });
        break;
      default:
        break;
    }
  });

  useEventListener(
    e => {
      switch (e.key) {
        case 'Shift':
          filterRef.current.set({ type: 'lowpass' });
          break;
        default:
          break;
      }
    },
    document.body,
    'keyup'
  );

  return (
    <div
      className={'oscillator'}
      onPointerDown={() => oscillatorRef.current.start()}
      onPointerUp={() => oscillatorRef.current.stop()}
      onPointerEnter={e => e.pressure > 0 && oscillatorRef.current.start()}
      onPointerLeave={e => e.pressure > 0 && oscillatorRef.current.stop()}
      onPointerMove={e => {
        const { x, y, width, height } = e.target.getBoundingClientRect();

        oscillatorRef.current.set({
          frequency: Math.abs(Math.round(interpolateX(e.clientX - x, { from: [0, width] }))),
          partialCount: Math.abs(Math.round(interpolateY(e.clientY - y, { from: [0, height] })))
        });
      }}
    />
  );
};

export default Oscillator;
