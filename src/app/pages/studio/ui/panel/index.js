import React, { memo } from 'react';

import './styles.css';

const Panel = memo(({ children }) => {
  return <div className={'experiment__panel'}>{children}</div>;
});

export default Panel;
