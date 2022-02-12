import React, { useEffect, useRef, createContext } from 'react';
import { Transport, Destination, Recorder, getTransport, getContext, start } from 'tone';

export const MasterContext = createContext();
import useEventListener from 'utils/hooks/useEventListener';

const MasterProvider = ({ children }) => {
  useEffect(() => {
    Transport.scheduleRepeat(time => {
      const beatIndex = Transport.position.indexOf(':');
      const beat = Transport.position.substring(beatIndex + 1, beatIndex + 2);
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

    if (getTransport().state === 'stopped') {
      // Start playback
      Transport.start();
      target.setAttribute('value', 'on');
      master.setAttribute('data-playback', 'started');
      console.log('transport is', getTransport().state);
      console.log(master.getAttribute('data-recorder'), recorder.current.state);
      switch (master.getAttribute('data-recorder')) {
        case 'stand-by':
          recorder.current.start().then(() => {
            master.setAttribute('data-recorder', 'on');
            console.log('recorder is', recorder.current.state);
          });
          break;
        default:
          break;
      }
    }
  };

  const handleStop = () => {
    const master = document.querySelector('#master');
    if (!master) return;

    const play = document.querySelector('#master button.play');
    if (!play) return;

    if (getTransport().state === 'started') {
      Transport.stop();
      master.setAttribute('data-playback', 'stopped');
      play.setAttribute('value', 'off');
      console.log('transport is', getTransport().state);
    } else if (getTransport().state === 'stopped') {
      switch (master.getAttribute('data-recorder')) {
        case 'stand-by':
          master.setAttribute('data-recorder', 'off');
          break;
        case 'on':
          master.setAttribute('data-recorder', 'off');
          handleStopRecorder();
          break;
        default:
          break;
      }
    }
  };

  const handleRecord = e => {
    const master = document.querySelector('#master');
    if (!master) return;

    if (getTransport().state === 'stopped') {
      switch (master.getAttribute('data-recorder')) {
        case 'off':
          master.setAttribute('data-recorder', 'stand-by');
          break;
        case 'stand-by':
          master.setAttribute('data-recorder', 'off');
          break;
        case 'on':
          master.setAttribute('data-recorder', 'off');
          handleStopRecorder();
          break;
        default:
          break;
      }
    }
  };

  const handleStopRecorder = async () => {
    const recording = await recorder.current.stop();
    console.log('recorder is', recorder.current.state);
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
