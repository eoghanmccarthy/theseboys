import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import cx from 'classnames';
import { Button, Dialog } from '@eoghanmccarthy/ui';

import './styles.scss';

import { TransportContext } from 'features/transportProvider';

import useDialog from 'componentLib/useDialog';
import TrackProvider from 'features/track/trackProvider';
import Track from 'features/track/track';
import TrackButton from 'features/track/trackButton';
import Channel from 'features/track/channel';
import Sample from 'features/track/sample';
import Steps from 'features/track/steps';
import Step from 'features/track/step';
import TrackDetail from 'features/trackDetail';

import { tracksInitialState, tracksReducer } from './tracksReducer';

const sequencerSteps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const StepSequencer = () => {
  const {
    value: { transportState }
  } = useContext(TransportContext);

  const [tracksState, tracksDispatch] = useImmerReducer(tracksReducer, tracksInitialState);

  const trackDialog = useDialog();
  const [selectedTrack, setSelectedTrack] = useState(0);

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
          selectedTrack={selectedTrack}
          setSelectedTrack={setSelectedTrack}
          numberOfTracks={tracksState.length}
          channel={tracksState[selectedTrack].channel}
          effects={tracksState[selectedTrack].effects}
          onUpdateEffect={(effect, param, value) => {
            tracksDispatch({
              type: 'effect',
              payload: {
                trackIndex: selectedTrack,
                effect,
                param,
                value
              }
            });
          }}
          onUpdateChannel={(param, value) => {
            tracksDispatch({
              type: 'channel',
              payload: {
                trackIndex: selectedTrack,
                param,
                value
              }
            });
          }}
        />
      </Dialog>
      <div className={'step-sequencer'}>
        <div className={'tracks'}>
          <div>
            {tracksState.map((track, index) => {
              return (
                <TrackProvider
                  key={index}
                  trackIndex={index}
                  subDivision={'8n'}
                  sequencerSteps={sequencerSteps}
                  steps={track.steps}
                  instrument={track.instrument}
                  effectsChain={null}
                  channel={track.channel}
                  reverb={track.effects.reverb}
                  autoFilter={track.effects.autoFilter}
                >
                  <Track>
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
                      <Button
                        onClick={() => {
                          trackDialog.open();
                          setSelectedTrack(index);
                        }}
                      >
                        +
                      </Button>
                    </Channel>
                  </Track>
                </TrackProvider>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default StepSequencer;
