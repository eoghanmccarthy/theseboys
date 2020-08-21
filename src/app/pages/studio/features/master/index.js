import React, { useEffect, useRef } from 'react';
import { Transport, Destination, Recorder, context } from 'tone';

import './styles.css';

const trackId = 'master';

import { PlaybackButton, RecordButton, ButtonControl, SliderControl, ButtonGroup } from '../../ui';

const Master = () => {
  useEffect(() => {
    Transport.scheduleRepeat(time => {
      //document.querySelector('.transport-time').setAttribute('data-time', time.toFixed(1));
    }, '8n');
  }, []);

  const recorder = useRef(new Recorder({ mimeType: 'video/webm' }));

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
      <SliderControl
        node={Destination}
        param={'volume'}
        trackId={trackId}
        effectName={'volume'}
        orientation={'horizontal'}
        label={'VOL'}
        step={1}
        max={20}
        min={-60}
        showPercentageValue
      />
      <ButtonGroup>
        <RecordButton
          onClick={() => {
            const element = document.querySelector('#record-button');

            const status = element.getAttribute('data-recorder-status');

            if (status === 'off' && Transport.state === 'stopped') {
              element.setAttribute('data-recorder-status', 'stand-by');
            }

            if (status === 'stand-by' || status === 'on') {
              element.setAttribute('data-recorder-status', 'off');

              if (recorder?.current?.state === 'started') {
                handleStopRecording();
              }
            }
          }}
        >
          record
        </RecordButton>
        <PlaybackButton
          onClick={() => {
            if (context.state !== 'running') {
              context.resume();
            }

            console.log('audio context is', context.state);

            const recorderElement = document.querySelector('#record-button');
            const recorderStatus = recorderElement.getAttribute('data-recorder-status');

            if (Transport.state === 'stopped') {
              if (recorderStatus === 'stand-by' && recorder?.current?.state === 'stopped') {
                recorder.current.start();
                recorderElement.setAttribute('data-recorder-status', 'on');
              }

              Transport.start();
              console.log('transport is', Transport.state);
              document.querySelector('.playback-button.play').classList.add('disabled');
              document.querySelector('.playback-button.stop').classList.remove('disabled');
            }
          }}
        />
        <PlaybackButton
          type={'stop'}
          onClick={() => {
            if (Transport.state === 'started') {
              Transport.stop();
              console.log('transport is', Transport.state);
              document.querySelector('.playback-button.stop').classList.add('disabled');
              document.querySelector('.playback-button.play').classList.remove('disabled');
            }
          }}
        />
      </ButtonGroup>
      <ButtonControl
        node={Transport}
        param={'bpm'}
        trackId={trackId}
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
