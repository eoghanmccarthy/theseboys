import React, { Fragment, useContext, useEffect } from 'react';
import { css } from '@emotion/core';
import { useImmer } from 'use-immer';
import cx from 'classnames';

import * as styles from './styles';

import { TrackContext } from '../trackProvider';

import interpolate from 'utils/helpers/interpolate';

import TrackButton from 'features/track/trackButton';
import TrackDialog from 'features/track/trackDialog';
import { Control, ControlBlock } from 'componentLib/control';
import { SliderWithValues } from 'componentLib/slider';

const Track = ({
  trackCount,
  selectedTrackIndex,
  setSelectedTrackIndex,
  children,
  trackState,
  instrumentState,
  trackDialog,
  openDialog
}) => {
  const {
    channelRef,
    eq3Ref,
    reverbRef,
    feedbackDelayRef,
    distortionRef,
    instrumentRef,
    trackIndex
  } = useContext(TrackContext);

  const [channel, setChannel] = useImmer(trackState?.channel ?? {});
  const [eq3, setEq3] = useImmer(trackState?.effects?.eq3 ?? {});
  const [reverb, setReverb] = useImmer(trackState?.effects?.reverb ?? {});
  const [feedbackDelay, setFeedbackDelay] = useImmer(trackState?.effects?.feedbackDelay ?? {});
  const [distortion, setDistortion] = useImmer(trackState?.effects?.distortion ?? {});
  const [envelope, setEnvelope] = useImmer(instrumentState?.options?.envelope ?? {});

  useEffect(() => {
    //On cleanup store state in reducer
  }, []);

  const interpVol = interpolate({
    inputRange: [0, 100],
    outputRange: [-20, 24],
    clamp: true
  });

  return (
    <div css={styles.track}>
      {children}
      <div css={styles.channel}>
        <TrackButton
          className={cx({ active: channel.mute })}
          onClick={() => {
            channelRef.current.set({ mute: !channel.mute });
            setChannel(draft => {
              draft.mute = !channel.mute;
            });
          }}
        >
          mute
        </TrackButton>
        <TrackButton shape={'circle'} onClick={() => openDialog(trackIndex)}>
          +
        </TrackButton>
      </div>
      <TrackDialog
        isVisible={trackDialog.isOpen && selectedTrackIndex === trackIndex}
        closeDialog={trackDialog.close}
        selectedTrackIndex={selectedTrackIndex}
        setSelectedTrack={setSelectedTrackIndex}
        trackCount={trackCount}
      >
        <div>
          <div css={styles.controlGrid}>
            <Control>
              <SliderWithValues
                title={'pan'}
                min={-1}
                max={1}
                step={0.1}
                value={channel?.pan ?? 0}
                onChange={e => {
                  let value = e.target.value;
                  channelRef.current.set({ pan: value });
                  setChannel(draft => {
                    draft.pan = value;
                  });
                }}
              />
            </Control>
            <Control>
              <SliderWithValues
                title={'volume'}
                min={0}
                max={100}
                value={channel?.volume ?? 80}
                onChange={e => {
                  let value = Math.round(e.target.value);
                  channelRef.current.set({ volume: interpVol(value) });
                  setChannel(draft => {
                    draft.volume = value;
                  });
                }}
              />
            </Control>
            <Control
              css={css`
                grid-column: 4;
              `}
            >
              <button
                className={cx({ active: channel?.mute })}
                onClick={() => {
                  channelRef.current.set({ mute: !channel.mute });
                  setChannel(draft => {
                    draft.mute = !channel.mute;
                  });
                }}
              >
                mute
              </button>
            </Control>
          </div>
          <div css={styles.controlGrid}>
            <div className={'control-group-title'}>
              <span>effects</span>
            </div>
            <Control>
              <SliderWithValues
                title={'reverb'}
                min={0}
                max={1}
                step={0.1}
                value={reverb?.wet ?? 0.5}
                onChange={e => {
                  let value = e.target.value;
                  reverbRef.current.set({ wet: value });
                  setReverb(draft => {
                    draft.wet = value;
                  });
                }}
              />
            </Control>
            <Control>
              <SliderWithValues
                title={'delay'}
                min={0}
                max={1}
                step={0.1}
                value={feedbackDelay?.wet ?? 0.5}
                onChange={e => {
                  let value = e.target.value;
                  feedbackDelayRef.current.set({ wet: value });
                  setFeedbackDelay(draft => {
                    draft.wet = value;
                  });
                }}
              />
            </Control>
            <Control>
              <SliderWithValues
                title={'distort'}
                min={0}
                max={1}
                step={0.1}
                value={distortion?.wet ?? 0.5}
                onChange={e => {
                  let value = e.target.value;
                  distortionRef.current.set({ wet: value });
                  setDistortion(draft => {
                    draft.wet = value;
                  });
                }}
              />
            </Control>
          </div>
          <div css={styles.controlGrid}>
            <div className={'control-group-title'}>
              <span>equalize</span>
            </div>
            <Control>
              <SliderWithValues
                title={'low'}
                min={0}
                max={100}
                step={1}
                value={eq3?.low ?? 50}
                onChange={e => {
                  let value = e.target.value;
                  eq3Ref.current.set({ low: value });
                  setEq3(draft => {
                    draft.low = value;
                  });
                }}
              />
            </Control>
            <Control>
              <SliderWithValues
                title={'med'}
                min={0}
                max={100}
                step={1}
                value={eq3?.mid ?? 50}
                onChange={e => {
                  let value = e.target.value;
                  eq3Ref.current.set({ mid: value });
                  setEq3(draft => {
                    draft.mid = value;
                  });
                }}
              />
            </Control>
            <Control>
              <SliderWithValues
                title={'high'}
                min={0}
                max={100}
                step={1}
                value={eq3?.high ?? 50}
                onChange={e => {
                  let value = e.target.value;
                  eq3Ref.current.set({ high: value });
                  setEq3(draft => {
                    draft.high = value;
                  });
                }}
              />
            </Control>
          </div>
          <div css={styles.controlGrid}>
            <div className={'control-group-title'}>
              <span>envelope</span>
            </div>
            {typeof envelope?.attack !== 'undefined' ? (
              <Control>
                <SliderWithValues
                  title={'attack'}
                  min={0}
                  max={1}
                  step={0.01}
                  value={envelope.attack}
                  onChange={e => {
                    let value = e.target.value;
                    instrumentRef.current.envelope.set({ attack: value });
                    setEnvelope(draft => {
                      draft.attack = value;
                    });
                  }}
                />
              </Control>
            ) : null}
            {typeof envelope?.decay !== 'undefined' ? (
              <Control>
                <SliderWithValues
                  title={'decay'}
                  min={0}
                  max={1}
                  step={0.01}
                  value={envelope.decay}
                  onChange={e => {
                    let value = e.target.value;
                    instrumentRef.current.envelope.set({ decay: value });
                    setEnvelope(draft => {
                      draft.decay = value;
                    });
                  }}
                />
              </Control>
            ) : null}
            {typeof envelope?.sustain !== 'undefined' ? (
              <Control>
                <SliderWithValues
                  title={'sustain'}
                  min={0}
                  max={1}
                  step={0.01}
                  value={envelope.sustain}
                  onChange={e => {
                    let value = e.target.value;
                    instrumentRef.current.envelope.set({ sustain: value });
                    setEnvelope(draft => {
                      draft.sustain = value;
                    });
                  }}
                />
              </Control>
            ) : null}
            {typeof envelope?.release !== 'undefined' ? (
              <Control>
                <SliderWithValues
                  title={'release'}
                  min={0}
                  max={1}
                  step={0.01}
                  value={envelope.release}
                  onChange={e => {
                    let value = e.target.value;
                    instrumentRef.current.envelope.set({ release: value });
                    setEnvelope(draft => {
                      draft.release = value;
                    });
                  }}
                />
              </Control>
            ) : null}
          </div>
        </div>
      </TrackDialog>
    </div>
  );
};

export default Track;
