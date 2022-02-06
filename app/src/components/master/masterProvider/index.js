import React, { useEffect, useRef, createContext } from 'react';
import { Transport, Destination, Recorder, getTransport, getContext, start } from 'tone';

export const MasterContext = createContext();
import useEventListener from 'utils/hooks/useEventListener';

import consoleLog from 'utils/errorHandlers/consoleLog';

const MasterProvider = ({ children }) => {
  useEffect(() => {
    Transport.scheduleRepeat(time => {
      const beat = Transport.position.substring(
        Transport.position.indexOf(':') + 1,
        Transport.position.indexOf(':') + 2
      );
      document.getElementById('beat').style.width = 100 / Transport.timeSignature + '%';
      document.getElementById('beat').style.left = 25 * beat + '%';
    }, Transport.timeSignature + 'n');
  }, []);

  const recorder = useRef(new Recorder({ mimeType: 'video/webm' }));

  useEffect(() => {
    if (recorder.current) {
      Destination.connect(recorder.current);
    }

    return () => {
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

  useEventListener(e => {
    const code = e.code;
    switch (code) {
      case 'Space':
        e.preventDefault();
        Transport.state === 'started' ? stop() : handlePlay();
        break;
      case 'KeyR':
        handleRecord();
        break;
      case 'KeyM':
        Destination.set({ mute: !Destination.mute });
        break;
      default:
        break;
    }
  });

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

  return (
    <MasterContext.Provider value={{ play: handlePlay, stop: handleStop, record: handleRecord }}>
      {children}
    </MasterContext.Provider>
  );
};

export default MasterProvider;
