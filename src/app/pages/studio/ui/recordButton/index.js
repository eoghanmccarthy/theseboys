import React, { memo } from 'react';

import './styles.css';

const RecordButton = memo(({ onClick }) => {
  return <button id={'record-button'} data-recorder-status={'off'} onClick={onClick} />;
});

export default RecordButton;
