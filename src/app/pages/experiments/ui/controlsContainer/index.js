import React, { memo } from 'react';

import './styles.css';

const ControlsContainer = memo(({ children }) => {
  return <div className={'exp step-seq__effects'}>{children}</div>;
});

export default ControlsContainer;
