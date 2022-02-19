import React, { useRef, createRef } from 'react';

import './index.css';

import { Main } from 'components/layout';
import { Master } from 'components/master';
import BoxTrack from '../../components/boxTrack';

import { TRACK_DEFAULT } from '../../utils/constants';
import { sounds } from '../../sounds';

const song = {
  t001: 'kick01',
  t002: 'kick02',
  t003: 'snare01',
  t004: 'snare02',
  t005: 'hat01',
  t006: 'hat02'
};

const Box = () => {
  const tracks = Object.entries(song);
  const tracksRef = useRef(tracks.map(() => createRef()));

  return (
    <Main id={'studio'}>
      <Master volume={0} bpm={120} />
      <section id={'box'}>
        {tracks.map(([trackId, soundId], i) => {
          const track = sounds[soundId];

          if (track) {
            switch (track.type) {
              case 'kick':
              case 'hat':
              case 'snare':
                return (
                  <BoxTrack
                    key={trackId}
                    ref={tracksRef.current[i]}
                    index={i}
                    trackId={trackId}
                    {...TRACK_DEFAULT}
                    {...track}
                  />
                );
              default:
                break;
            }
          } else {
            return null;
          }
        })}
      </section>
    </Main>
  );
};

export default Box;
