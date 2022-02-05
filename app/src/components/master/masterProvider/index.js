import React, { useEffect, useRef, createContext, useMemo } from 'react';
import { Transport, Destination, Recorder, Clock, getTransport, getContext, start } from 'tone';

export const MasterContext = createContext();

import consoleLog from 'utils/errorHandlers/consoleLog';

const MasterProvider = ({ children }) => {
  const clock = useRef(
    new Clock(time => {
      //console.log(time)
    })
  );

  const recorder = useRef(new Recorder({ mimeType: 'video/webm' }));

  useEffect(() => {
    if (recorder.current) {
      Destination.connect(recorder.current);
    }

    return () => {
      if (clock.current) {
        clock.current.dispose();
      }

      if (recorder.current) {
        recorder.current.dispose();
      }

      if (Transport) {
        Transport.dispose();
      }

      if (Destination) {
        Destination.dispose();
      }
    };
  }, []);

  const handlePlay = async e => {
    const target = e.currentTarget;

    if (getContext().state !== 'running') {
      await start();
    }

    console.log('audio context is', getContext().state);

    const master = document.querySelector('#master');
    if (!master) return;

    if (getTransport().state === 'stopped' && master.getAttribute('data-recorder') !== 'on') {
      // Start playback
      Transport.start();
      clock.current.start();

      target.setAttribute('value', 'on');
      master.setAttribute('data-playback', 'started');

      console.log('transport is', getTransport().state);
      // Start recording if recorder status is stand-by
      if (
        master.getAttribute('data-recorder') === 'stand-by' &&
        recorder.current.state === 'stopped'
      ) {
        recorder.current.start().then(() => {
          master.setAttribute('data-recorder', 'on');
          console.log('recorder is', recorder.current.state);
        });
      }
    }
  };

  const handleStop = e => {
    const master = document.querySelector('#master');
    if (!master) return;

    const play = document.querySelector('#master button.play');
    if (!play) return;

    if (getTransport().state === 'started') {
      Transport.stop();
      master.setAttribute('data-playback', 'stopped');
      play.setAttribute('value', 'off');
      consoleLog('transport is', getTransport().state);
    }

    if (master.getAttribute('data-recorder') === 'stand-by') {
      master.setAttribute('data-recorder', 'off');
      master.querySelector('button.record')?.classList.remove('alert');
    }
  };

  const handleRecord = e => {
    const master = document.querySelector('#master');
    if (!master) return;

    if (getTransport().state === 'stopped') {
      if (master.getAttribute('data-recorder') === 'off') {
        master.setAttribute('data-recorder', 'stand-by');
      } else {
        // If recorder state is stand-by or on
        master.setAttribute('data-recorder', 'off');
        if (recorder.current.state === 'started') {
          handleStopRecorder();
        }
      }
    }
  };

  const handleStopRecorder = async () => {
    const recording = await recorder.current.stop();
    consoleLog('recorder is', recorder.current.state);
    const url = URL.createObjectURL(recording);
    const anchor = document.createElement('a');
    anchor.download = 'recording.webm';
    anchor.href = url;
    anchor.click();
  };

  const values = useMemo(() => {
    return { play: handlePlay, stop: handleStop, record: handleRecord };
  }, []);

  return <MasterContext.Provider value={values}>{children}</MasterContext.Provider>;
};

export default MasterProvider;
