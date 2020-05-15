import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import cx from 'classnames';
import { Dialog } from '@eoghanmccarthy/ui';

import * as styles from './styles';

import { TransportContext } from 'features/transportProvider';

import useDialog from 'componentLib/useDialog';
import InstrumentContainer from 'features/instrumentContainer';
import TrackProvider from 'features/track/trackProvider';
import Track from 'features/track/track';
import TrackButton from 'features/track/trackButton';
import Channel from 'features/track/channel';
import Sample from 'features/track/sample';
import Steps from 'features/track/steps';
import Step from 'features/track/step';
import Instrument from 'features/track/instrument';
import Effect from 'features/track/effect';
import TrackDetail from 'features/trackDetail';

import { initialState as tracksInitialState, reducer as tracksReducer } from './tracksReducer';
import {
  initialState as presetInstrumentsInitialState,
  reducer as presetInstrumentsReducer
} from './presetInstrumentsReducer';

const sequencerSteps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const StepSequencer = () => {
  const {
    value: { transportState }
  } = useContext(TransportContext);

  const trackDialog = useDialog();

  const [tracksState, tracksDispatch] = useImmerReducer(tracksReducer, tracksInitialState);

  const [presetInstrumentsState, presetInstrumentsDispatch] = useImmerReducer(
    presetInstrumentsReducer,
    presetInstrumentsInitialState
  );

  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);

  useEffect(() => {
    if (transportState === 'stopped') {
      document.querySelectorAll(`.progress-indicator`).forEach(el => (el.style.left = '0%'));
    }
  }, [transportState]);

  return (
    <Fragment>
      <Dialog
        id={'track-detail-dialog'}
        isVisible={trackDialog.isOpen}
        closeDialog={trackDialog.close}
      >
        <TrackDetail
          selectedTrackIndex={selectedTrackIndex}
          setSelectedTrack={setSelectedTrackIndex}
          tracksCount={tracksState.length}
          track={tracksState[selectedTrackIndex]}
          instrument={presetInstrumentsState[tracksState[selectedTrackIndex].instrument]}
          onUpdateChannel={(param, value) => {
            tracksDispatch({
              type: 'channel',
              payload: {
                trackIndex: selectedTrackIndex,
                param,
                value
              }
            });
          }}
          onUpdateInstrument={(param, value) => {
            presetInstrumentsDispatch({
              type: 'envelope',
              payload: {
                instrumentId: tracksState[selectedTrackIndex].instrument,
                param,
                value
              }
            });
          }}
          onUpdateEffect={(effect, param, value) => {
            tracksDispatch({
              type: 'effect',
              payload: {
                trackIndex: selectedTrackIndex,
                effect,
                param,
                value
              }
            });
          }}
        />
      </Dialog>
      <InstrumentContainer>
        <div css={styles.tracks}>
          <div>
            {tracksState.map((track, index) => {
              return (
                <TrackProvider
                  key={index}
                  trackIndex={index}
                  subDivision={'8n'}
                  sequencerSteps={sequencerSteps}
                  track={track}
                >
                  <Track>
                    {Object.entries(track.effects).map(([type, options], index) => {
                      return <Effect key={index} type={type} options={options} />;
                    })}
                    <Instrument instrument={presetInstrumentsState[track.instrument]} />
                    <Sample />
                    <Steps>
                      {track.steps.map((value, i) => {
                        return (
                          <Step
                            key={i}
                            value={value}
                            onClick={val => {
                              tracksDispatch({
                                type: 'step',
                                payload: {
                                  trackIndex: index,
                                  stepIndex: i,
                                  value: val
                                }
                              });
                            }}
                          />
                        );
                      })}
                    </Steps>
                    <Channel>
                      <TrackButton
                        className={cx({ active: track.channel?.mute ?? false })}
                        onClick={() => {
                          tracksDispatch({
                            type: 'mute',
                            payload: {
                              trackIndex: index
                            }
                          });
                        }}
                      >
                        mute
                      </TrackButton>
                      <TrackButton
                        shape={'circle'}
                        onClick={() => {
                          trackDialog.open();
                          setSelectedTrackIndex(index);
                        }}
                      >
                        +
                      </TrackButton>
                    </Channel>
                  </Track>
                </TrackProvider>
              );
            })}
          </div>
        </div>
      </InstrumentContainer>
    </Fragment>
  );
};

export default StepSequencer;
