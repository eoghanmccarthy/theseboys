import React, { Fragment, useContext, useState } from 'react';
import { Button } from '@eoghanmccarthy/ui';
import { css } from '@emotion/core';
import cx from 'classnames';

import './styles.scss';
import * as styles from './styles';

import { TrackContext } from '../track/trackProvider';

import interpolate from 'utils/helpers/interpolate';
import { setIndexPrev, setIndexNext } from 'utils/helpers/setSoundIndex';

import { Control, ControlBlock } from 'componentLib/control';
import { SliderWithValues } from 'componentLib/slider';
import { Destination } from 'tone';

const TrackDetail = ({
  channelState,
  selectedTrackIndex,
  setSelectedTrack,
  tracksCount,
  track,
  instrument,
  onUpdateChannel,
  onUpdateInstrument,
  onUpdateEffect
}) => {
  const { trackIndex, channelRef } = useContext(TrackContext);

  const { effects } = track;

  const { options: instrumentOptions } = instrument;

  const interpVol = interpolate({
    inputRange: [0, 100],
    outputRange: [-20, 24],
    clamp: true
  });

  const [channel, setChannel] = useState(channelState);

  return (
    <div className={'track-detail'}>
      <header css={styles.header}>
        <h2>
          track <em>{selectedTrackIndex + 1}</em>
        </h2>
        <div css={styles.trackNav}>
          <Button
            size={'sm'}
            onClick={() => {
              setSelectedTrack(i => {
                return setIndexPrev(i, tracksCount);
              });
            }}
          >
            prev
          </Button>
          <Button
            size={'sm'}
            onClick={() => {
              setSelectedTrack(i => {
                return setIndexNext(i, tracksCount);
              });
            }}
          >
            next
          </Button>
        </div>
      </header>
      <div css={styles.main}>
        <div css={styles.controlGrid}>
          <Control>
            <SliderWithValues
              title={'pan'}
              min={-1}
              max={1}
              step={0.1}
              value={channel.pan ?? 0}
              onChange={e => {
                let value = e.target.value;
                channelRef.current.set({ pan: value });
                setChannel(prv => ({ ...prv, pan: value }));
              }}
            />
          </Control>
          <Control>
            <SliderWithValues
              title={'volume'}
              min={0}
              max={100}
              value={channel.volume ?? 80}
              onChange={e => {
                let value = Math.round(e.target.value);
                channelRef.current.set({ volume: interpVol(value) });
                setChannel(prv => ({ ...prv, volume: value }));
              }}
            />
          </Control>
          <Control
            css={css`
              grid-column: 4;
            `}
          >
            <button
              className={cx({ active: channel.mute })}
              onClick={() => {
                onUpdateChannel('mute', !channel.mute);
              }}
            >
              mute
            </button>
          </Control>
        </div>
        {/*<div css={styles.controlGrid}>*/}
        {/*  {effects?.reverb ? (*/}
        {/*    <Control>*/}
        {/*      <SliderWithValues*/}
        {/*        title={'reverb'}*/}
        {/*        min={0}*/}
        {/*        max={1}*/}
        {/*        step={0.1}*/}
        {/*        value={effects.reverb.wet}*/}
        {/*        onChange={e => {*/}
        {/*          let value = e.target.value;*/}
        {/*          onUpdateEffect('reverb', 'wet', value);*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    </Control>*/}
        {/*  ) : null}*/}
        {/*  {effects?.feedbackDelay ? (*/}
        {/*    <Control>*/}
        {/*      <SliderWithValues*/}
        {/*        title={'delay'}*/}
        {/*        min={0}*/}
        {/*        max={1}*/}
        {/*        step={0.1}*/}
        {/*        value={effects.feedbackDelay.wet}*/}
        {/*        onChange={e => {*/}
        {/*          let value = e.target.value;*/}
        {/*          onUpdateEffect('feedbackDelay', 'wet', value);*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    </Control>*/}
        {/*  ) : null}*/}
        {/*  {effects?.distortion ? (*/}
        {/*    <Control>*/}
        {/*      <SliderWithValues*/}
        {/*        title={'distort'}*/}
        {/*        min={0}*/}
        {/*        max={1}*/}
        {/*        step={0.1}*/}
        {/*        value={effects.distortion.wet}*/}
        {/*        onChange={e => {*/}
        {/*          let value = e.target.value;*/}
        {/*          onUpdateEffect('distortion', 'wet', value);*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    </Control>*/}
        {/*  ) : null}*/}
        {/*  {effects?.eq3 ? (*/}
        {/*    <Fragment>*/}
        {/*      <Control>*/}
        {/*        <SliderWithValues*/}
        {/*          title={'low'}*/}
        {/*          min={0}*/}
        {/*          max={100}*/}
        {/*          step={1}*/}
        {/*          value={effects.eq3.low}*/}
        {/*          onChange={e => {*/}
        {/*            let value = e.target.value;*/}
        {/*            onUpdateEffect('eq3', 'low', Math.round(value));*/}
        {/*          }}*/}
        {/*        />*/}
        {/*      </Control>*/}
        {/*      <Control>*/}
        {/*        <SliderWithValues*/}
        {/*          title={'med'}*/}
        {/*          min={0}*/}
        {/*          max={100}*/}
        {/*          step={1}*/}
        {/*          value={effects.eq3.mid}*/}
        {/*          onChange={e => {*/}
        {/*            let value = e.target.value;*/}
        {/*            onUpdateEffect('eq3', 'mid', Math.round(value));*/}
        {/*          }}*/}
        {/*        />*/}
        {/*      </Control>*/}
        {/*      <Control>*/}
        {/*        <SliderWithValues*/}
        {/*          title={'high'}*/}
        {/*          min={0}*/}
        {/*          max={100}*/}
        {/*          step={1}*/}
        {/*          value={effects.eq3.high}*/}
        {/*          onChange={e => {*/}
        {/*            let value = e.target.value;*/}
        {/*            onUpdateEffect('eq3', 'high', Math.round(value));*/}
        {/*          }}*/}
        {/*        />*/}
        {/*      </Control>*/}
        {/*    </Fragment>*/}
        {/*  ) : null}*/}
        {/*</div>*/}
        {/*<div css={styles.controlGrid}>*/}
        {/*  {typeof instrumentOptions?.envelope?.attack !== 'undefined' ? (*/}
        {/*    <Control>*/}
        {/*      <SliderWithValues*/}
        {/*        title={'attack'}*/}
        {/*        min={0}*/}
        {/*        max={1}*/}
        {/*        step={0.01}*/}
        {/*        value={instrumentOptions.envelope.attack}*/}
        {/*        onChange={e => {*/}
        {/*          let value = e.target.value;*/}
        {/*          onUpdateInstrument('attack', value);*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    </Control>*/}
        {/*  ) : null}*/}
        {/*  {typeof instrumentOptions?.envelope?.decay !== 'undefined' ? (*/}
        {/*    <Control>*/}
        {/*      <SliderWithValues*/}
        {/*        title={'decay'}*/}
        {/*        min={0}*/}
        {/*        max={1}*/}
        {/*        step={0.01}*/}
        {/*        value={instrumentOptions.envelope.decay}*/}
        {/*        onChange={e => {*/}
        {/*          let value = e.target.value;*/}
        {/*          onUpdateInstrument('decay', value);*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    </Control>*/}
        {/*  ) : null}*/}
        {/*  {typeof instrumentOptions?.envelope?.sustain !== 'undefined' ? (*/}
        {/*    <Control>*/}
        {/*      <SliderWithValues*/}
        {/*        title={'sustain'}*/}
        {/*        min={0}*/}
        {/*        max={1}*/}
        {/*        step={0.01}*/}
        {/*        value={instrumentOptions.envelope.sustain}*/}
        {/*        onChange={e => {*/}
        {/*          let value = e.target.value;*/}
        {/*          onUpdateInstrument('sustain', value);*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    </Control>*/}
        {/*  ) : null}*/}
        {/*  {typeof instrumentOptions?.envelope?.release !== 'undefined' ? (*/}
        {/*    <Control>*/}
        {/*      <SliderWithValues*/}
        {/*        title={'release'}*/}
        {/*        min={0}*/}
        {/*        max={1}*/}
        {/*        step={0.01}*/}
        {/*        value={instrumentOptions.envelope.release}*/}
        {/*        onChange={e => {*/}
        {/*          let value = e.target.value;*/}
        {/*          onUpdateInstrument('release', value);*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    </Control>*/}
        {/*  ) : null}*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default TrackDetail;
