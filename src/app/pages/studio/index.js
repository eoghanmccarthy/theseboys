import React, { Fragment, useRef, createRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Transport, Destination } from 'tone';

import './index.css';

import useEventListener from 'utils/hooks/useEventListener';
import { CHANNEL, STEP_COUNT, STEPS, INSTRUMENTS } from 'app/redux/defaults';

import Main from 'global/main';
import Footer from 'global/footer';
import Track from 'features/track';
import { Master, useMasterContext } from 'features/master';

const SONGS = {
  A: { t001: 'i001', t002: 'i002', t003: 'i003', t004: 'i004', t005: 'i005' },
  B: { t001: 'i001', t002: 'i002', t003: 'i003', t004: 'i004', t005: 'i005' },
  C: { t001: 'i001', t002: 'i002', t003: 'i003', t004: 'i004', t005: 'i005' },
  D: { t001: 'i001', t002: 'i002', t003: 'i003', t004: 'i004', t005: 'i005' }
};

const Studio = () => {
  const { play, stop, record } = useMasterContext('<Studio>');
  const store = useSelector(state => state);
  // Prevent tree from re-rendering when store updated
  const [storedData] = useState(store);
  const SONG = SONGS['A'];
  const TRACKS = Object.entries(SONG);
  const TRACK_IDS = TRACKS.map(([k]) => k);
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
          const id = TRACK_IDS[num - 1];
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
        <Master initialValue={storedData.master} onSave={handleSave} />
        {TRACKS.map(([trackId, instrumentId], i) => {
          const track = storedData.tracks[trackId];
          const instrument = INSTRUMENTS[instrumentId];
          if (!instrument) return null;

          return (
            <Track
              key={trackId}
              ref={tracksRef.current[i]}
              index={i}
              trackId={trackId}
              channel={track?.channel ?? CHANNEL}
              notes={instrument.notes}
              stepCount={track?.stepCount ?? STEP_COUNT}
              steps={track?.steps ?? STEPS}
              instrument={instrument.instrument ?? 'MembraneSynth'}
              synth={track?.synth ?? instrument.synth}
              effects={track?.effects ?? instrument.effects}
              controls={instrument.controls}
            />
          );
        })}
      </Main>
      <Footer />
    </Fragment>
  );
};

export default Studio;
