import React, { Fragment, useRef, createRef, useState, useMemo, useEffect } from 'react';
import { Transport, Destination, Meter, UserMedia } from 'tone';

import './index.css';

import { INSTRUMENTS } from 'src/redux/defaults';
import { TRACK_DEFAULT } from '../../utils/constants';

import { Footer, Main } from 'components/layout';
import SnareTrack from '../../components/SnareTrack';
import SynthTrack from 'components/SynthTrack';
import PolySynthTrack from 'components/PolySynthTrack';
import { Master, useMasterContext } from 'components/master';
import { polySynthSamples } from '../../data';
import ShortcutsLegend from 'components/ShortcutsLegend';

const SONGS_CONFIG = {
  s001: { t001: 'i001', t002: 'i002', t003: 'i003', t004: 'i004', t005: 'i005', t006: 'i006' }
};

const Studio = () => {
  const { play, stop, record } = useMasterContext('<Studio>');
  const TRACKS = Object.entries(SONGS_CONFIG['s001']);
  const tracksRef = useRef(TRACKS.map(() => createRef()));
  const micRef = useRef(new UserMedia({ volume: 0 }));
  const selectedDevice = useRef();

  // useEffect(() => {
  //   const meter = new Meter();
  //   micRef.current.connect(meter).chain(Destination);
  //   console.log(micRef.current.get());
  //   console.log(micRef.current.state);
  //   //console.log(micRef.current.enumerateDevices());
  //   navigator.mediaDevices.enumerateDevices().then(devices => {
  //     // print the device labels
  //     console.log(devices.map(device => device));
  //     selectedDevice.current = devices[1].deviceId;
  //   });
  //
  //   console.log(selectedDevice.current);
  //
  //   micRef.current
  //     .open()
  //     .then(() => {
  //       // promise resolves when input is available
  //       console.log('mic open');
  //       // print the incoming mic levels in decibels
  //       setInterval(() => console.log(meter.getValue()), 100);
  //     })
  //     .catch(e => {
  //       // promise is rejected when the user doesn't have or allow mic access
  //       console.log('mic not open');
  //     });
  //   return () => micRef.current.close();
  // }, []);

  return (
    <Fragment>
      <Main id={'studio'}>
        <Master volume={0} bpm={120} />
        {TRACKS.map(([trackId, instrumentId], i) => {
          const track = INSTRUMENTS[instrumentId];

          if (!track) {
            return null;
          }

          return (
            <SynthTrack
              key={trackId}
              ref={tracksRef.current[i]}
              trackId={trackId}
              trackNumber={i + 1}
              {...TRACK_DEFAULT}
              {...track}
            />
          );
        })}
        <PolySynthTrack
          trackId={'PolySynth'}
          trackNumber={7}
          {...TRACK_DEFAULT}
          {...polySynthSamples[[0]]}
        />
        {/*<ShortcutsLegend />*/}
      </Main>
      <Footer />
    </Fragment>
  );
};

export default Studio;
