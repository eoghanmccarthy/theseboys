import React from 'react';
import { Button, Dialog } from '@eoghanmccarthy/ui';

import './styles.scss';
import * as styles from './styles';

import { setIndexPrev, setIndexNext } from 'utils/helpers/setSoundIndex';

const TrackDialog = ({
  children,
  isVisible,
  closeDialog,
  trackCount,
  selectedTrackIndex,
  setSelectedTrack
}) => {
  return (
    <Dialog
      id={'track-detail-dialog'}
      css={styles.dialog}
      isVisible={isVisible}
      closeDialog={closeDialog}
      immediate
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
                setSelectedTrack(i => {
                  return setIndexPrev(i, trackCount);
                });
              }}
            >
              prev
            </Button>
            <Button
              size={'sm'}
              onClick={() => {
                setSelectedTrack(i => {
                  return setIndexNext(i, trackCount);
                });
              }}
            >
              next
            </Button>
          </div>
        </header>
        <div css={styles.main}>{children}</div>
      </div>
    </Dialog>
  );
};

export default TrackDialog;
