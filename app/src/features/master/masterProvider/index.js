import React, { useEffect, useRef, createContext, useMemo } from 'react';
import { Transport, Destination, Recorder, getTransport, getContext, start } from 'tone';

export const MasterContext = createContext();

import consoleLog from 'utils/errorHandlers/consoleLog';

const MasterProvider = ({ children }) => {
  const recorder = useRef(new Recorder({ mimeType: 'video/webm' }));

  useEffect(() => {
    Destination.connect(recorder.current);
  }, []);

  const getContextState = () => getContext().state;

  const getTransportState = () => getTransport().state;

  const getRecorderState = () => recorder.current.state;

  const handlePlay = async () => {
    if (getContextState() !== 'running') {
      await start();
    }

    consoleLog('audio context is', getContextState());

    const master = document.querySelector('#master');

    if (getTransportState() === 'stopped' && master.getAttribute('data-recorder') !== 'on') {
      // Start playback
      Transport.start();
      master.querySelector('button.play')?.classList.add('active');
      master.setAttribute('data-playback', 'started');
      consoleLog('transport is', getTransportState());

      // Start recording if status is standby
      if (master.getAttribute('data-recorder') === 'stand-by' && getRecorderState() === 'stopped') {
        recorder.current.start();
        master.setAttribute('data-recorder', 'on');
      }
    }
  };

  const handleStop = () => {
    const master = document.querySelector('#master');

    if (getTransportState() === 'started') {
      // Stop playback
      Transport.stop();
      master.setAttribute('data-playback', 'stopped');
      master.querySelector('button.play')?.classList.remove('active');
      consoleLog('transport is', getTransportState());
    }

    if (master.getAttribute('data-recorder') === 'stand-by') {
      master.setAttribute('data-recorder', 'off');
      master.querySelector('button.record')?.classList.remove('alert');
    }
  };

  const handleRecord = () => {
    const master = document.querySelector('#master');

    if (getTransportState() === 'stopped') {
      if (master.getAttribute('data-recorder') === 'off') {
        master.setAttribute('data-recorder', 'stand-by');
        master.querySelector('button.record')?.classList.add('alert');
      } else {
        master.setAttribute('data-recorder', 'off');
        master.querySelector('button.record')?.classList.remove('alert');
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
