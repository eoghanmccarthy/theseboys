import React, { useEffect } from 'react';
import { Transport, Destination, context } from 'tone';

import './styles.css';

const sequencerName = 'master';

import { Panel, Meta, PlayButton, Steps, EffectControls } from '../../ui';
import EffectControlButton from '../../ui/effectCtrlButton';

const Master = () => {
  useEffect(() => {
    Transport.scheduleRepeat((time, column) => {
      //console.log(time, column);
    }, '8n');
  }, []);

  return (
    <div className={'master'}>
      <EffectControlButton
        showPercentageValue
        controlName={`${sequencerName}__effect-ctrl--volume`}
        node={Destination}
        param={'volume'}
        step={1}
        min={-60}
        max={20}
      >
        +
      </EffectControlButton>
      <span className={`effect-value ${sequencerName}__effect-ctrl--volume`} />
      <EffectControlButton
        showPercentageValue
        controlName={`${sequencerName}__effect-ctrl--volume`}
        node={Destination}
        param={'volume'}
        dec
        step={1}
        min={-60}
        max={20}
      >
        -
      </EffectControlButton>
      <PlayButton
        onClick={() => {
          if (context.state !== 'running') {
            context.resume();
          }
          console.log('audio context is', context.state);
          Transport.state === 'stopped' && Transport.start();
          console.log('transport is', Transport.state);
        }}
      />
      <PlayButton
        onClick={() => {
          Transport.state === 'started' && Transport.stop();
          console.log('transport is', Transport.state);
        }}
      />
      <EffectControlButton
        controlName={`${sequencerName}__effect-ctrl--tempo`}
        node={Transport}
        param={'bpm'}
        step={1}
        min={60}
        max={240}
        toFixed={0}
      >
        +
      </EffectControlButton>
      <span className={`effect-value ${sequencerName}__effect-ctrl--tempo`} />
      <EffectControlButton
        controlName={`${sequencerName}__effect-ctrl--tempo`}
        node={Transport}
        param={'bpm'}
        dec
        step={1}
        min={60}
        max={240}
        toFixed={0}
      >
        -
      </EffectControlButton>
    </div>
  );
};

export default Master;
