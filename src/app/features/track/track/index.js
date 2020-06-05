import React, { useContext, useState, useEffect } from 'react';
import { css } from '@emotion/core';
import { Button, Dialog } from '@eoghanmccarthy/ui';
import cx from 'classnames';

import * as styles from './styles';

import { TrackContext } from '../trackProvider';

import interpolate from 'utils/helpers/interpolate';

import TrackButton from 'features/track/trackButton';
import { Control, ControlBlock } from 'componentLib/control';
import { SliderWithValues } from 'componentLib/slider';

const Track = ({
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

  const [channel, setChannel] = useState(trackState?.channel ?? {});
  const [eq3, setEq3] = useState(trackState?.effects?.eq3 ?? {});
  const [reverb, setReverb] = useState(trackState?.effects?.reverb ?? {});
  const [feedbackDelay, setFeedbackDelay] = useState(trackState?.effects?.feedbackDelay ?? {});
  const [distortion, setDistortion] = useState(trackState?.effects?.distortion ?? {});
  const [envelope, setEnvelope] = useState(instrumentState?.options?.envelope ?? {});

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
          className={cx({ active: channel.mute ?? false })}
          onClick={() => {
            channelRef.current.set({ mute: !channel.mute });
            setChannel(prv => ({ ...prv, mute: !channel.mute }));
          }}
        >
          mute
        </TrackButton>
        <TrackButton shape={'circle'} onClick={() => openDialog(trackIndex)}>
          +
        </TrackButton>
      </div>
      <Dialog
        id={'track-detail-dialog'}
        css={styles.trackDetailDialog}
        isVisible={trackDialog.isOpen && selectedTrackIndex === trackIndex}
        closeDialog={trackDialog.close}
      >
        <div className={'track-detail'}>
          <header css={styles.header}>
            <h2>
              track <em>{selectedTrackIndex + 1}</em>
            </h2>
            <div css={styles.trackNav}>
              <Button
                size={'sm'}
                onClick={() => {
                  setSelectedTrackIndex(i => {
                    return setIndexPrev(i, tracksCount);
                  });
                }}
              >
                prev
              </Button>
              <Button
                size={'sm'}
                onClick={() => {
                  setSelectedTrackIndex(i => {
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
                  value={channel?.pan ?? 0}
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
                  value={channel?.volume ?? 80}
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
                  className={cx({ active: channel?.mute ?? false })}
                  onClick={() => {
                    channelRef.current.set({ mute: !channel.mute });
                    setChannel(prv => ({ ...prv, mute: !channel.mute }));
                  }}
                >
                  mute
                </button>
              </Control>
            </div>
            <div css={styles.controlGrid}>
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
                    setReverb(prv => ({ ...prv, wet: value }));
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
                    setFeedbackDelay(prv => ({ ...prv, wet: value }));
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
                    setDistortion(prv => ({ ...prv, wet: value }));
                  }}
                />
              </Control>
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
                    setEq3(prv => ({ ...prv, low: value }));
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
                    setEq3(prv => ({ ...prv, mid: value }));
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
                    setEq3(prv => ({ ...prv, high: value }));
                  }}
                />
              </Control>
            </div>
            <div css={styles.controlGrid}>
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
                      setEnvelope(prv => ({ ...prv, attack: value }));
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
                      setEnvelope(prv => ({ ...prv, decay: value }));
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
                      setEnvelope(prv => ({ ...prv, sustain: value }));
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
                      setEnvelope(prv => ({ ...prv, release: value }));
                    }}
                  />
                </Control>
              ) : null}
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Track;
