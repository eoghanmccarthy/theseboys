import React from 'react';
import { Transport, Destination, context } from 'tone';

import './styles.scss';

import Tempo from './tempo';

const sequencerName = 'master';

import { Panel, Meta, PlayButton, Steps, EffectControls } from '../../ui';
import EffectControlButton from '../../ui/effectCtrlButton';

const Master = () => {
  const controlName = `${sequencerName}__effect-ctrl--volume`;

  return (
    <div className={'master'}>
      <EffectControlButton
        showPercentageValue
        controlName={controlName}
        node={Destination}
        param={'volume'}
        step={1}
        min={-60}
        max={20}
      >
        +
      </EffectControlButton>
      <span className={`effect-value ${controlName}`} />
      <EffectControlButton
        showPercentageValue
        controlName={controlName}
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
          console.log(Transport.state);
          Transport.state === 'stopped' && Transport.start();
        }}
      />
      <PlayButton
        onClick={() => {
          console.log(Transport.state);
          Transport.state === 'started' && Transport.stop();
        }}
      />
      <Tempo />
    </div>
  );
};

export default Master;
