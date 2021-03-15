import React, { Fragment, useRef, createRef, useState } from 'react';
import { useSelector } from 'react-redux';

import './index.css';

import Main from 'global/main';
import Footer from 'global/footer';

import Track from 'features/track';
import { Master } from 'features/master';

const Studio = () => {
  const store = useSelector(state => state?.app);
  const [initialValue] = useState(store);
  const tracksRef = useRef(Object.entries(initialValue?.tracks ?? {}).map(() => createRef()));

  const handleSave = () => {
    tracksRef.current.forEach(track => {
      track.current.save();
    });
  };

  return (
    <Fragment>
      <Main className={'studio'}>
        <Master onSave={handleSave} />
        {Object.entries(initialValue?.tracks ?? {}).map(([k, v], i) => {
          return (
            <Track key={k} ref={tracksRef.current[i]} index={i} trackId={k} initialValue={v} />
          );
        })}
      </Main>
      <Footer />
    </Fragment>
  );
};

export default Studio;
