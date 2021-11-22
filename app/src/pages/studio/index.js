import React, { Fragment, useRef, createRef, useState, useMemo, useEffect } from 'react';
import { Transport, Destination, Meter, UserMedia } from 'tone';

import './index.css';

import useEventListener from 'utils/hooks/useEventListener';
import { INSTRUMENTS } from 'src/redux/defaults';
import { TRACK_DEFAULT } from '../../utils/constants';

import { Footer, Main } from 'components/layout';
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
  const TRACK_IDS = TRACKS.map(([trackId]) => trackId);
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
        //TODO: find better way to get number
        const num = parseInt(code.charAt(code.length - 1));
        if (e.shiftKey) {
          const steps = document.querySelectorAll(`.t00${num}-step`);
          if (!e.altKey) {
            steps.forEach(step => step.setAttribute('value', 'on'));
          } else {
            steps.forEach(step => step.setAttribute('value', 'off'));
          }
        } else {
          if (num <= TRACKS.length) {
            const id = TRACK_IDS[num - 1];
            document.querySelector(`#${id}`)?.scrollIntoView();
            document.querySelector(`#${id}-sample`)?.focus();
          }
        }
        break;
      default:
        break;
    }
  });

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
