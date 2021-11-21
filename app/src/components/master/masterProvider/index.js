import React, { useEffect, useRef, createContext, useMemo } from 'react';
import { Transport, Destination, Recorder, getTransport, getContext, start } from 'tone';

export const MasterContext = createContext();

import consoleLog from 'utils/errorHandlers/consoleLog';

const MasterProvider = ({ children }) => {
  const recorder = useRef(new Recorder({ mimeType: 'video/webm' }));

  useEffect(() => {
    Destination.connect(recorder.current);
  }, []);

  useEffect(() => {
    return () => {
      handleStop();

      // if (recorder.current) {
      //   recorder.current.dispose();
      // }
      //
      // if (Transport) {
      //   Transport.dispose();
      // }
      //
      // if (Destination) {
      //   Destination.dispose();
      // }
    };
  }, []);

  const getContextState = () => getContext().state;

  const getTransportState = () => getTransport().state;

  const getRecorderState = () => recorder.current.state;

  const handlePlay = async e => {
    const target = e.currentTarget;

    if (getContextState() !== 'running') {
      await start();
    }

    consoleLog('audio context is', getContextState());

    const master = document.querySelector('#master');
    if (!master) return;

    if (getTransportState() === 'stopped' && master.getAttribute('data-recorder') !== 'on') {
      // Start playback
      Transport.start();
      target.setAttribute('value', 'on');
      master.setAttribute('data-playback', 'started');
      consoleLog('transport is', getTransportState());

      // Start recording if status is standby
      if (master.getAttribute('data-recorder') === 'stand-by' && getRecorderState() === 'stopped') {
        recorder.current.start();
        master.setAttribute('data-recorder', 'on');
      }
    }
  };

  const handleStop = e => {
    const master = document.querySelector('#master');
    if (!master) return;

    const play = document.querySelector('#master button.play');
    if (!play) return;

    if (getTransportState() === 'started') {
      // Stop playback
      Transport.stop();
      master.setAttribute('data-playback', 'stopped');
      play.setAttribute('value', 'off');
      consoleLog('transport is', getTransportState());
    }

    if (master.getAttribute('data-recorder') === 'stand-by') {
      master.setAttribute('data-recorder', 'off');
      master.querySelector('button.record')?.classList.remove('alert');
    }
  };

  const handleRecord = e => {
    const target = e.currentTarget;

    const master = document.querySelector('#master');
    if (!master) return;

    if (getTransportState() === 'stopped') {
      if (master.getAttribute('data-recorder') === 'off') {
        master.setAttribute('data-recorder', 'stand-by');
        //target.classList.add('alert');
      } else {
        master.setAttribute('data-recorder', 'off');
        //target.classList.remove('alert');

        if (getRecorderState() === 'started') {
          handleStopRecorder();
        }
      }
    }
  };

  const handleStopRecorder = async () => {
    const recording = await recorder.current.stop();
    const url = URL.createObjectURL(recording);
    const anchor = document.createElement('a');
    anchor.download = 'recording.webm';
    anchor.href = url;
    anchor.click();
  };

  const values = useMemo(() => {
    return { getTransportState, play: handlePlay, stop: handleStop, record: handleRecord };
  }, []);

  return <MasterContext.Provider value={values}>{children}</MasterContext.Provider>;
};

export default MasterProvider;
