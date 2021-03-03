import React, { useEffect, useRef, createContext, useMemo } from 'react';
import { Transport, Destination, Recorder, context } from 'tone';

export const MasterContext = createContext();

import consoleLog from 'utils/errorHandlers/consoleLog';

const MasterProvider = ({ children }) => {
  const recorder = useRef(new Recorder({ mimeType: 'video/webm' }));

  useEffect(() => {
    Destination.connect(recorder.current);
  }, []);

  const handlePlay = () => {
    if (context.state !== 'running') {
      context.resume();
    }

    consoleLog('audio context is', context.state);

    const master = document.querySelector('#master');
    const playButton = document.querySelector('.playback-button.play');
    const stopButton = document.querySelector('.playback-button.stop');

    if (!master) {
      consoleLog('master container not found');
      return;
    }

    const recorderStatus = master.getAttribute('data-recorder');

    if (Transport.state === 'stopped') {
      // Start recording if recorder is on standby
      if (recorderStatus === 'stand-by' && recorder?.current?.state === 'stopped') {
        recorder.current.start();
        master.setAttribute('data-recorder', 'on');
      }

      Transport.start();
      consoleLog('transport is', Transport.state);
      master.setAttribute('data-playback', 'on');
      playButton.classList.add('disabled');
      stopButton.classList.remove('disabled');
    }
  };

  const handleStop = () => {
    if (Transport.state === 'started') {
      Transport.stop();
      consoleLog('transport is', Transport.state);
      const playButton = document.querySelector('.playback-button.play');
      const stopButton = document.querySelector('.playback-button.stop');
      playButton.classList.remove('disabled');
      stopButton.classList.add('disabled');
      // We don't stop recording here to avoid cutting off reverb etc.
      // Recording is stopped manually
    }
  };

  const handleRecord = () => {
    const master = document.querySelector('#master');
    if (!master) {
      consoleLog('master container not found');
      return;
    }

    const recorderStatus = master.getAttribute('data-recorder');

    if (recorderStatus === 'off') {
      if (Transport.state === 'stopped') {
        master.setAttribute('data-recorder', 'stand-by');
      }
    } else {
      master.setAttribute('data-recorder', 'off');
      if (recorder?.current?.state === 'started') {
        handleStopRecorder();
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
    return { play: handlePlay, stop: handleStop, record: handleRecord };
  }, []);
  return <MasterContext.Provider value={values}>{children}</MasterContext.Provider>;
};

export default MasterProvider;
