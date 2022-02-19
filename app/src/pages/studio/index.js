import React, { Fragment, useRef, createRef, useState, useMemo, useEffect } from 'react';
import { Transport, Destination, Meter, UserMedia } from 'tone';

import './index.css';

import { TRACK_DEFAULT } from '../../utils/constants';

import { Footer, Main } from 'components/layout';
import StudioTrack from 'components/studioTrack';
import { Master } from 'components/master';
import { sounds } from '../../sounds';
import ShortcutsLegend from 'components/ShortcutsLegend';

const songs = {
  s001: {
    t001: 'kick01',
    t002: 'kick02',
    t003: 'snare01',
    t004: 'snare02',
    t005: 'hat01',
    t006: 'hat02',
    t007: 'poly01'
  }
};

const Studio = () => {
  const tracks = Object.entries(songs['s001']);
  const tracksRef = useRef(tracks.map(() => createRef()));

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
        <section id={'tracks'}>
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
                case 'kick':
                case 'hat':
                case 'poly':
                case 'snare':
                  return <StudioTrack {...props} />;
                default:
                  return null;
              }
            } else {
              return null;
            }
          })}
        </section>
      </Main>
      <Footer />
    </Fragment>
  );
};

export default Studio;
