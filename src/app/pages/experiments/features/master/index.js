import React, { useEffect } from 'react';
import { Transport, Destination, context } from 'tone';

import './styles.css';

const sequencerName = 'master';

import { Panel, Meta, PlaybackButton, Steps, EffectControl } from '../../ui';
import EffectControlButton from '../../ui/effectControlButton';

const Master = () => {
  useEffect(() => {
    Transport.scheduleRepeat((time, column) => {
      //console.log(time, column);
    }, '8n');
  }, []);

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
