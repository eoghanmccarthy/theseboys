import React, { memo } from 'react';

import './styles.css';

const Meta = memo(({ children }) => {
  return <div className={'experiment__meta'}>{children}</div>;
});

export default Meta;
