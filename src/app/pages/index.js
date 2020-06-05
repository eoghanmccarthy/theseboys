import React, { Fragment } from 'react';
import { useSpring, animated } from 'react-spring';
import { Button } from '@eoghanmccarthy/ui';
import { css } from '@emotion/core';

import * as styles from './styles';

import TransportProvider from 'features/transportProvider';
import Master from 'features/master';
import Module from 'features/module';
import StepSequencer from 'features/stepSequencer';
import Oscillator from 'features/oscillator';

const modules = [
  { id: 'seq', name: 'step sequencer' },
  { id: 'osc', name: 'oscillator' }
];

const Home = () => {
  const [{ selectedIndex }, set] = useSpring(() => ({ selectedIndex: 0 }));

  return (
    <TransportProvider>
      <main className={'me__content'}>
        <div css={styles.console}>
          <Master />
          <div css={styles.modules}>
            <animated.div
              style={{
                flex: 1,
                position: 'relative',
                transform: selectedIndex.interpolate(index => `translateX(${index * -1 * 100}%)`)
              }}
            >
              <Module index={0} data={modules[0]}>
                <StepSequencer />
              </Module>
              {/*<Module index={1} data={modules[1]}>*/}
              {/*  <Oscillator />*/}
              {/*</Module>*/}
            </animated.div>
          </div>
        </div>
      </main>
    </TransportProvider>
  );
};

export default Home;
