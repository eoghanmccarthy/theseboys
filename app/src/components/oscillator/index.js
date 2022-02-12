import React, { useRef } from 'react';
import { Oscillator as Osc, Distortion, Destination, Filter, Tremolo } from 'tone';

import './index.css';

import { interpolate } from 'utils/studioHelpers';
import { usePointer } from '../../utils/hooks';
import useEventListener from '../../utils/hooks/useEventListener';

const Oscillator = () => {
  const pointer = usePointer();

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

  const tremoloRef = useRef(new Tremolo(9, 1));

  const oscillatorRef = useRef(
    new Osc({
      type: 'sine',
      frequency: 440,
      detune: 0,
      phase: 0,
      volume: 0
    }).chain(distortionRef.current, tremoloRef.current, filterRef.current, Destination)
  );

  const interpolateX = interpolate({ to: [0, 440], clamp: true });

  const interpolateY = interpolate({ to: [0, 32], clamp: true });

  useEventListener(e => {
    switch (e.key) {
      case 'Shift':
        filterRef.current.set({ type: 'highpass' });
        break;
      case 'Alt':
        tremoloRef.current.start();
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
        case 'Alt':
          tremoloRef.current.stop();
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
      id={'oscillator'}
      onPointerDown={() => oscillatorRef.current.start()}
      onPointerUp={() => oscillatorRef.current.stop()}
      onPointerEnter={() => {
        if (pointer.isDown) {
          oscillatorRef.current.start();
        }
      }}
      onPointerLeave={() => {
        if (oscillatorRef.current.state === 'stated') {
          oscillatorRef.current.stop();
        }
      }}
      onPointerMove={e => {
        const { x, y, width, height } = e.target.getBoundingClientRect();

        const frequency = Math.abs(Math.round(interpolateX(e.clientX - x, { from: [0, width] })));

        const partialCount = Math.abs(
          Math.round(interpolateY(e.clientY - y, { from: [0, height] }))
        );

        oscillatorRef.current.set({ frequency, partialCount });
      }}
    >
      <div className={'values'} />
    </div>
  );
};

export default Oscillator;
