import React, { Fragment } from 'react';
import { Button } from '@eoghanmccarthy/ui';
import { css } from '@emotion/core';
import cx from 'classnames';

import './styles.scss';
import * as styles from './styles';

import { setIndexPrev, setIndexNext } from 'utils/helpers/setSoundIndex';

import { Control, ControlBlock } from 'componentLib/control';
import { SliderWithValues } from 'componentLib/slider';

const TrackDetail = ({
  selectedTrack,
  setSelectedTrack,
  numberOfTracks,
  channel,
  effects,
  onUpdateChannel,
  onUpdateEffect
}) => {
  const { reverb, autoFilter, distortion, feedbackDelay } = effects;

  return (
    <div className={'track-detail'}>
      <header css={styles.header}>
        <h2>
          track <em>{selectedTrack + 1}</em>
        </h2>
        <div css={styles.trackNav}>
          <Button
            size={'sm'}
            onClick={() => {
              setSelectedTrack(i => {
                return setIndexPrev(i, numberOfTracks);
              });
            }}
          >
            prev
          </Button>
          <Button
            size={'sm'}
            onClick={() => {
              setSelectedTrack(i => {
                return setIndexNext(i, numberOfTracks);
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
              value={channel.pan}
              onChange={e => {
                let val = e.target.value;
                onUpdateChannel('pan', val);
              }}
            />
          </Control>
          <Control>
            <SliderWithValues
              title={'volume'}
              min={0}
              max={100}
              value={channel.volume}
              onChange={e => {
                let value = e.target.value;
                onUpdateChannel('volume', Math.round(value));
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
        <div css={styles.controlGrid}>
          {reverb ? (
            <Control>
              <SliderWithValues
                title={'reverb'}
                min={0}
                max={1}
                step={0.1}
                value={reverb.wet}
                onChange={e => {
                  let value = e.target.value;
                  onUpdateEffect('reverb', 'wet', value);
                }}
              />
            </Control>
          ) : null}
          {feedbackDelay ? (
            <Control>
              <SliderWithValues
                title={'delay'}
                min={0}
                max={1}
                step={0.1}
                value={feedbackDelay.wet}
                onChange={e => {
                  let value = e.target.value;
                  onUpdateEffect('feedbackDelay', 'wet', value);
                }}
              />
            </Control>
          ) : null}
          {distortion ? (
            <Control>
              <SliderWithValues
                title={'distort'}
                min={0}
                max={1}
                step={0.1}
                value={distortion.wet}
                onChange={e => {
                  let value = e.target.value;
                  onUpdateEffect('distortion', 'wet', value);
                }}
              />
            </Control>
          ) : null}
          {autoFilter ? (
            <Control>
              <SliderWithValues
                title={'filter'}
                min={0}
                max={1}
                step={0.1}
                value={autoFilter.wet}
                onChange={e => {
                  let value = e.target.value;
                  onUpdateEffect('autoFilter', 'wet', value);
                }}
              />
            </Control>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TrackDetail;
