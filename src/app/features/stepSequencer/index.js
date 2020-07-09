import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import cx from 'classnames';

//https://tone-demos.glitch.me/

import * as styles from './styles';

import { TransportContext } from 'features/transportProvider';

import useDialog from 'componentLib/useDialog';
import InstrumentContainer from 'features/instrumentContainer';
import TrackProvider from 'features/track/trackProvider';
import Track from 'features/track/track';
import TrackButton from 'features/track/trackButton';
import Sample from 'features/track/sample';
import Steps from 'features/track/steps';
import Step from 'features/track/step';
import Instrument from 'features/track/instrument';
import Effect from 'features/track/effect';

import { initialState as tracksInitialState, reducer as tracksReducer } from './tracksReducer';
import {
  initialState as instrumentsInitialState,
  reducer as instrumentsReducer
} from './instrumentsReducer';

const subDivision = '16n';

const sequencerSteps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const StepSequencer = () => {
  const {
    value: { transportState }
  } = useContext(TransportContext);

  const trackDialog = useDialog();

  const [tracksState, tracksDispatch] = useImmerReducer(tracksReducer, tracksInitialState);

  const [instrumentsState, instrumentsDispatch] = useImmerReducer(
    instrumentsReducer,
    instrumentsInitialState
  );

  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);

  useEffect(() => {
    if (transportState === 'stopped') {
      document.querySelectorAll(`.progress-indicator`).forEach(el => (el.style.left = '0%'));
    }
  }, [transportState]);

  return (
    <Fragment>
      <InstrumentContainer>
        <div css={styles.tracks}>
          <div>
            {tracksState.map((track, index) => {
              return (
                <TrackProvider
                  key={index}
                  trackIndex={index}
                  subDivision={subDivision}
                  sequencerSteps={sequencerSteps}
                  track={track}
                >
                  <Track
                    trackCount={tracksState.length}
                    selectedTrackIndex={selectedTrackIndex}
                    setSelectedTrackIndex={setSelectedTrackIndex}
                    trackState={track}
                    instrumentState={instrumentsState[track.instrument]}
                    trackDialog={trackDialog}
                    openDialog={index => {
                      setSelectedTrackIndex(index);
                      trackDialog.open();
                    }}
                  >
                    {typeof track.effects === 'object' &&
                      Object.entries(track.effects).map(([type, options], index) => {
                        return <Effect key={index} type={type} options={options} />;
                      })}
                    <Instrument instrument={instrumentsState[track.instrument]} />
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
