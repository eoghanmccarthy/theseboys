import React, { Fragment, useRef, createRef, useState } from 'react';
import { useSelector } from 'react-redux';

import './index.css';

import Main from 'global/main';
import Footer from 'global/footer';

import Track from 'features/track';
import { Master } from 'features/master';

const TRACKS = [
  { id: 'track-a', config: { notes: ['C1'], numSteps: 16, synth: 'MembraneSynth' } },
  { id: 'track-b', config: { notes: ['C1'], numSteps: 16, synth: 'MetalSynth' } },
  { id: 'track-c', config: { numSteps: 16, synth: 'NoiseSynth' } },
  { id: 'track-d', config: { numSteps: 16, synth: 'NoiseSynth' } }
];

const Studio = () => {
  const tracksRef = useRef(TRACKS.map(() => createRef()));
  const store = useSelector(state => state?.app);
  const [initialValue] = useState(store);

  const handleSave = () => {
    tracksRef.current.forEach(track => {
      track.current.save();
    });
  };

  return (
    <Fragment>
      <Main className={'studio'}>
        <Master onSave={handleSave} />
        {TRACKS.map((track, i) => {
          const { id, config } = track;
          return (
            <Track
              key={id}
              ref={tracksRef.current[i]}
              index={i}
              trackId={id}
              config={config}
              initialValue={initialValue?.tracks?.[id]}
            />
          );
        })}
      </Main>
      <Footer />
    </Fragment>
  );
};

export default Studio;
