import React, { memo } from 'react';

import './styles.css';

import Button from 'componentLib/Button';

const RecordButton = memo(({ onClick }) => {
  return <Button className={'record-button'} data-recorder-status={'off'} onClick={onClick} />;
});

export default RecordButton;
