import React, { useContext, useEffect, useState } from 'react';
import cx from 'classnames';
import { Transport, Destination } from 'tone';

import './styles.scss';

import Volume from './volume';
import Tempo from './tempo';

const sequencerName = 'master';

import { Panel, Meta, PlayButton, Steps, EffectControls } from '../../ui';
import EffectControlButton from '../../ui/effectCtrlButton';

const Master = () => {
  const controlName = `${sequencerName}__effect-ctrl--volume`;

  return (
    <div className={'master'}>
      <Volume />
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
      <PlayButton onClick={() => Transport.start()} />
      <PlayButton onClick={() => Transport.stop()} />
      <Tempo />
    </div>
  );
};

export default Master;
