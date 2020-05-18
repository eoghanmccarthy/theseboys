import React, { useContext, useEffect } from 'react';
import cx from 'classnames';
import { context } from 'tone';
import { Button } from '@eoghanmccarthy/ui';

import './styles.scss';

import { TransportContext } from 'features/transportProvider';

import { Control, ControlBlock } from 'componentLib/control';
import * as IconButtons from 'componentLib/iconButtons';
import Volume from './volume';
import Tempo from './tempo';

const Master = () => {
  const transportCxt = useContext(TransportContext);

  const { transportState } = transportCxt.value;
  const { setTransportState } = transportCxt.actions;

  return (
    <div className={'master'}>
      <Volume />
      <div className={'transport-state'}>
        <ControlBlock>
          <Control size={'sm'}>
            <button
              className={cx({ active: transportState === 'playing' })}
              onClick={() => {
                setTransportState(s => {
                  if (s === 'paused' || s === 'stopped') {
                    return 'playing';
                  } else {
                    return 'paused';
                  }
                });
              }}
            >
              {transportState === 'playing' ? 'pause' : 'play'}
            </button>
          </Control>
          <Control size={'sm'}>
            <button
              className={cx({ active: transportState === 'stopped' })}
              onClick={() => setTransportState('stopped')}
            >
              stop
            </button>
          </Control>
        </ControlBlock>
      </div>
      <Tempo />
    </div>
  );
};

export default Master;
