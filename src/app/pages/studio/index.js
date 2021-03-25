import React, { Fragment, useRef, createRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Transport, Destination } from 'tone';

import './index.css';

import useEventListener from 'utils/hooks/useEventListener';

import Main from 'global/main';
import Footer from 'global/footer';
import Track from 'features/track';
import { Master, useMasterContext } from 'features/master';

const TRACKS = ['t001', 't002', 't003', 't004', 't005'];

const Studio = () => {
  const { play, stop, record } = useMasterContext('<Studio>');
  const store = useSelector(state => state);
  // Prevent tree from re-rendering when store updated
  const [initialValue] = useState(store);
  const tracksRef = useRef(TRACKS.map(() => createRef()));

  useEventListener(e => {
    const code = e.code;
    switch (code) {
      case 'Space':
        e.preventDefault();
        Transport.state === 'started' ? stop() : play();
        break;
      case 'KeyR':
        record();
        break;
      case 'KeyM':
        Destination.set({ mute: !Destination.mute });
        break;
      case 'Digit1':
      case 'Digit2':
      case 'Digit3':
      case 'Digit4':
      case 'Digit5':
      case 'Digit6':
      case 'Digit7':
      case 'Digit8':
        const num = parseInt(code.charAt(code.length - 1));
        if (num <= TRACKS.length) {
          const id = TRACKS[num - 1];
          document.querySelector(`#${id}`)?.scrollIntoView();
          document.querySelector(`#${id}-sample`)?.focus();
        }
        break;
      default:
        break;
    }
  });

  const handleSave = () => {
    tracksRef.current.forEach(track => {
      track.current.save();
    });
  };

  return (
    <Fragment>
      <Main id={'studio'}>
        <Master initialValue={initialValue.master} onSave={handleSave} />
        {TRACKS.map((id, i) => {
          const track = initialValue.tracks[id];
          if (!track) return null;
          return (
            <Track
              key={id}
              ref={tracksRef.current[i]}
              index={i}
              trackId={track.id}
              initialValue={track}
            />
          );
        })}
      </Main>
      <Footer />
    </Fragment>
  );
};

export default Studio;
