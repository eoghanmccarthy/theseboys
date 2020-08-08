import React, { useEffect, useRef } from 'react';
import { Transport, Destination, Recorder, context, Synth } from 'tone';

import './styles.css';

const sequencerName = 'master';

import { Panel, Meta, PlaybackButton, Steps, EffectControl } from '../../ui';
import EffectControlButton from '../../ui/effectControlButton';

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
      {/*<button*/}
      {/*  onClick={() => {*/}
      {/*    synth.current.triggerAttackRelease('C3', 0.5);*/}
      {/*  }}*/}
      {/*>*/}
      {/*  pppp*/}
      {/*</button>*/}
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
        onClick={() => {
          if (recorder?.current?.state === 'stopped') {
            recorder.current.start();
          } else {
            handleStopRecording();
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
            Transport.state === 'stopped' && Transport.start();
            console.log('transport is', Transport.state);
            document.querySelector('.playback-button.play').classList.add('disabled');
            document.querySelector('.playback-button.stop').classList.remove('disabled');
          }}
        />
        <PlaybackButton
          type={'stop'}
          onClick={() => {
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
