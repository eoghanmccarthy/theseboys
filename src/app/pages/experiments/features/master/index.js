import React, { useEffect, useRef } from 'react';
import { Transport, Destination, Recorder, context } from 'tone';

import './styles.css';

const sequencerName = 'master';

import { PlaybackButton, EffectControl } from '../../ui';

const Master = () => {
  useEffect(() => {
    Transport.scheduleRepeat(time => {
      //document.querySelector('.transport-time').setAttribute('data-time', time.toFixed(1));
    }, '8n');
  }, []);

  const recorder = useRef(new Recorder());

  useEffect(() => {
    Destination.connect(recorder.current);
  }, []);

  const handleStopRecording = async () => {
    const recording = await recorder.current.stop();
    console.log(recording);
    const url = URL.createObjectURL(recording);

    const anchor = document.createElement('a');
    anchor.download = 'recording.webm';
    anchor.href = url;
    anchor.click();
  };

  return (
    <div className={'master'}>
      <EffectControl
        node={Destination}
        param={'volume'}
        sequencerName={sequencerName}
        effectName={'volume'}
        orientation={'horizontal'}
        label={'VOL'}
        step={1}
        min={-60}
        max={20}
        showPercentageValue
      />
      <button
        id={'record-button'}
        data-recorder-status={'off'}
        onClick={() => {
          const element = document.querySelector('#record-button');

          const status = element.getAttribute('data-recorder-status');

          if (status === 'off') {
            element.setAttribute('data-recorder-status', 'stand-by');
          }

          if (status === 'stand-by') {
            element.setAttribute('data-recorder-status', 'off');
          }
        }}
      >
        record
      </button>
      <div className={'playback-controls'}>
        <PlaybackButton
          onClick={() => {
            if (context.state !== 'running') {
              context.resume();
            }

            console.log('audio context is', context.state);

            const recorderElement = document.querySelector('#record-button');
            const recorderStatus = recorderElement.getAttribute('data-recorder-status');

            if (recorderStatus === 'stand-by' && recorder?.current?.state === 'stopped') {
              recorder.current.start();
              recorderElement.setAttribute('data-recorder-status', 'on');
            }

            Transport.state === 'stopped' && Transport.start();
            console.log('transport is', Transport.state);

            document.querySelector('.playback-button.play').classList.add('disabled');
            document.querySelector('.playback-button.stop').classList.remove('disabled');
          }}
        />
        <PlaybackButton
          type={'stop'}
          onClick={() => {
            const recorderElement = document.querySelector('#record-button');

            const recorderStatus = recorderElement.getAttribute('data-recorder-status');

            if (recorderStatus === 'on' || recorderStatus === 'stand-by') {
              recorderElement.setAttribute('data-recorder-status', 'off');

              if (recorder?.current?.state === 'started') {
                handleStopRecording();
              }
            }

            Transport.state === 'started' && Transport.stop();
            console.log('transport is', Transport.state);
            document.querySelector('.playback-button.stop').classList.add('disabled');
            document.querySelector('.playback-button.play').classList.remove('disabled');
          }}
        />
      </div>
      <EffectControl
        node={Transport}
        param={'bpm'}
        sequencerName={sequencerName}
        effectName={'bpm'}
        orientation={'horizontal'}
        label={'BPM'}
        step={1}
        min={60}
        max={240}
        toFixed={0}
      />
    </div>
  );
};

export default Master;
