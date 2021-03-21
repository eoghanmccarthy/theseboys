import React, { Fragment, useRef, createRef, useState } from 'react';
import { useSelector } from 'react-redux';

import './index.css';

import useEventListener from 'utils/hooks/useEventListener';

import Main from 'global/main';
import Footer from 'global/footer';
import Track from 'features/track';
import { Master } from 'features/master';

const TRACKS = ['t001', 't002', 't003', 't004', 't005'];

const Studio = () => {
  const store = useSelector(state => state?.app);
  const [initialValue] = useState(store);
  const tracksRef = useRef(TRACKS.map(() => createRef()));

  useEventListener(e => {
    const num = parseInt(e.key);
    if (!num) return;
    if (typeof num === 'number' && num < 10 && num <= TRACKS.length) {
      const id = TRACKS[num - 1];
      document.querySelector(`#${id}`).scrollIntoView();
      document.querySelector(`#${id}-sample`).focus();
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
