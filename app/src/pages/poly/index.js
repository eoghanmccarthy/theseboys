import React, { useRef, createRef } from 'react';

import './index.css';

import { TRACK_DEFAULT } from '../../utils/constants';

import { Main } from 'components/layout';
import PolyTrack from 'components/polyTrack';
import { Master } from 'components/master';
import { sounds } from '../../sounds';

const songs = {
  t001: 'poly01'
};

const Studio = () => {
  const tracks = Object.entries(songs);
  const tracksRef = useRef(tracks.map(() => createRef()));

  return (
    <Main id={'studio'} className={'beats'}>
      <Master volume={0} bpm={120} />
      {tracks.map(([trackId, soundId], i) => {
        const track = sounds[soundId];

        if (track) {
          const props = {
            key: trackId,
            ref: tracksRef.current[i],
            index: i,
            trackId,
            ...TRACK_DEFAULT,
            ...track
          };

          switch (track.type) {
            case 'poly':
              return <PolyTrack {...props} />;
            default:
              return null;
          }
        } else {
          return null;
        }
      })}
    </Main>
  );
};

export default Studio;
