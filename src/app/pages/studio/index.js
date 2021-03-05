import React, { Fragment } from 'react';
import cx from 'classnames';

import './index.css';

import Main from 'global/main';
import Footer from 'global/footer';

import Track from 'features/track';
import { Master } from 'features/master';
import RandomSequencer from './features/randomSequencer';
import MembraneSynth01 from './features/membraneSynth01';
import MetalSynth01 from './features/metalSynth01';
import NoiseSynth01 from './features/noiseSequencer01';
import NoiseSynth02 from './features/noiseSequencer02';

const Studio = () => {
  return (
    <Fragment>
      <Main className={'studio'}>
        <Master />
        <Track>
          <MembraneSynth01
            trackId={'track-A'}
            trackConfig={{ notes: ['C1'], numSteps: 16 }}
            channelDefaults={{
              pan: 0,
              volume: 12,
              mute: false,
              solo: false
            }}
          />
        </Track>
        <Track>
          <MetalSynth01
            trackId={`track-B`}
            trackConfig={{ notes: ['C1'], numSteps: 16 }}
            channelDefaults={{
              pan: 0.7,
              volume: 12,
              mute: false,
              solo: false
            }}
          />
        </Track>
        <Track>
          <NoiseSynth01
            trackId={`track-C`}
            trackConfig={{ numSteps: 16 }}
            channelDefaults={{
              pan: -0.5,
              volume: -4,
              mute: false,
              solo: false
            }}
          />
        </Track>
        <Track>
          <NoiseSynth02
            trackId={`track-D`}
            trackConfig={{ numSteps: 16 }}
            channelDefaults={{
              pan: 0.8,
              volume: -8,
              mute: false,
              solo: false
            }}
          />
        </Track>
      </Main>
      <Footer />
    </Fragment>
  );
};

export default Studio;
