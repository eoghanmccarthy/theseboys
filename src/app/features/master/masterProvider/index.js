import React, { useEffect, useRef, createContext, useMemo } from 'react';
import { Transport, Destination, Recorder, context } from 'tone';

export const MasterContext = createContext();

import consoleLog from 'utils/errorHandlers/consoleLog';

const MasterProvider = ({ children }) => {
  const recorder = useRef(new Recorder({ mimeType: 'video/webm' }));

  useEffect(() => {
    Destination.connect(recorder.current);
    return () => {
      Destination.dispose();
    };
  }, []);

  const handlePlay = () => {
    if (context.state !== 'running') {
      context.resume();
    }

    consoleLog('audio context is', context.state);
    if (Transport.state === 'started') {
      return;
    }

    const master = document.querySelector('#master');

    if (!master) {
      consoleLog('master container not found');
      return;
    }

    if (Transport.state === 'stopped') {
      // Start recording if recorder is on standby
      const recorderStatus = master.getAttribute('data-recorder');

      if (recorderStatus === 'stand-by' && recorder?.current?.state === 'stopped') {
        recorder.current.start();
        master.setAttribute('data-recorder', 'on');
      }

      Transport.start();
      master.setAttribute('data-playback', 'started');
      document.querySelector('#master button.play')?.classList.add('active');
      consoleLog('transport is', Transport.state);
    }
  };

  const handleStop = () => {
    if (Transport.state === 'stopped') {
      return;
    }

    const master = document.querySelector('#master');

    if (!master) {
      consoleLog('master container not found');
      return;
    }

    if (Transport.state === 'started') {
      Transport.stop();
      master.setAttribute('data-playback', 'stopped');
      document.querySelector('#master button.play')?.classList.remove('active');
      consoleLog('transport is', Transport.state);
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
        document.querySelector('#master button.record')?.classList.add('alert');
      }
    } else {
      master.setAttribute('data-recorder', 'off');
      document.querySelector('#master button.record')?.classList.remove('alert');
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
