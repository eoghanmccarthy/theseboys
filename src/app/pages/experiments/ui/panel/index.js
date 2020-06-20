import React from 'react';

import './styles.css';

const Panel = ({ children }) => {
  return <div className={'experiment__panel'}>{children}</div>;
};

export default Panel;
