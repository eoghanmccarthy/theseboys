import React, { memo } from 'react';

import './styles.css';

const Step = memo(({ children, style = {}, onClick }) => {
  return (
    <button style={{ ...style }} className={`step`} onClick={onClick}>
      {children}
    </button>
  );
});

export default Step;
