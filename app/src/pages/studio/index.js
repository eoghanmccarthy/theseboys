import React, { Fragment, useRef, createRef, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Transport, Destination } from 'tone';

import './index.css';

import useEventListener from 'utils/hooks/useEventListener';
import { CHANNEL, STEP_COUNT, STEPS, INSTRUMENTS } from 'src/redux/defaults';

import Main from 'global/main';
import Footer from 'global/footer';
import Track from 'features/track';
import { Master, useMasterContext } from 'features/master';

const SONGS_CONFIG = {
  s001: { t001: 'i001', t002: 'i002', t003: 'i003', t004: 'i004', t005: 'i005' },
  s002: { t001: 'i001', t002: 'i002', t003: 'i003', t004: 'i004', t005: 'i005' },
  s003: { t001: 'i001', t002: 'i002', t003: 'i003', t004: 'i004', t005: 'i005' },
  s004: { t001: 'i001', t002: 'i002', t003: 'i003', t004: 'i004', t005: 'i005' }
};

const Studio = () => {
  const { play, stop, record } = useMasterContext('<Studio>');
  const store = useSelector(state => state);
  const [songId, setSongId] = useState('s001');
  // Prevent tree from re-rendering when store updated
  const storedSong = useMemo(() => store.songs?.[songId], [songId]);
  const SONG_CONFIG = SONGS_CONFIG[songId];
  const TRACKS = Object.entries(SONG_CONFIG);
  const TRACK_IDS = TRACKS.map(([trackId]) => trackId);
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
        <Master
          songId={songId}
          volume={storedSong?.master?.volume ?? 0}
          bpm={storedSong?.master?.bpm ?? 120}
          setSongId={setSongId}
          onSave={handleSave}
        />
        {TRACKS.map(([trackId, instrumentId], i) => {
          const track = storedSong?.tracks?.[trackId];
          const instrument = INSTRUMENTS[instrumentId];
          if (!instrument) return null;

          return (
            <Track
              key={trackId}
              ref={tracksRef.current[i]}
              songId={songId}
              trackId={trackId}
              trackNumber={i + 1}
              notes={instrument.notes}
              stepCount={track?.stepCount ?? STEP_COUNT}
              steps={track?.steps ?? STEPS}
              channel={track?.channel ?? CHANNEL}
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
