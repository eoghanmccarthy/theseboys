import React, { Fragment, useRef, createRef } from 'react';

import './index.css';

import { Footer, Main } from 'components/layout';
import { Master, useMasterContext } from 'components/master';
import BeatTrack from '../../components/beatTrack';

import { INSTRUMENTS } from 'src/redux/defaults';
import { TRACK_DEFAULT } from '../../utils/constants';

const SONG = {
  t001: 'i001',
  t002: 'i002',
  t003: 'i003',
  t004: 'i004',
  t005: 'i005',
  t006: 'i006'
};

const Sounds = () => {
  const { play, stop, record } = useMasterContext('<Beats>');
  const tracks = Object.entries(SONG);
  const tracksRef = useRef(tracks.map(() => createRef()));

  return (
    <Fragment>
      <Main id={'studio'} className={'beats'}>
        <Master volume={0} bpm={120} />
        <div className={'samples'}>
          {tracks.map(([trackId, instrumentId], i) => {
            const track = INSTRUMENTS[instrumentId];
            if (!track) return null;

            return (
              <BeatTrack
                key={trackId}
                ref={tracksRef.current[i]}
                trackId={trackId}
                trackIndex={i}
                {...TRACK_DEFAULT}
                {...track}
              />
            );
          })}
        </div>
      </Main>
      <Footer />
    </Fragment>
  );
};

export default Sounds;
