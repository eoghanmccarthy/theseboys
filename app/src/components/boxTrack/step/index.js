import React, { memo, useRef } from 'react';

import { useEventListener } from 'hooks';

const Step = memo(({ id, onClick }) => {
  const ref = useRef();

  useEventListener(
    e => {
      e.target.classList.add('hit');
    },
    ref.current,
    'pointerdown'
  );

  useEventListener(
    e => {
      e.target.classList.remove('hit');
    },
    ref.current,
    'pointerup'
  );

  return (
    <button ref={ref} id={id} className={`step`} onClick={onClick}>
      {/*<svg*/}
      {/*  className={'step-icon'}*/}
      {/*  xmlns={'http://www.w3.org/2000/svg'}*/}
      {/*  viewBox={'0 0 30 30'}*/}
      {/*  width={'100%'}*/}
      {/*  height={'100%'}*/}
      {/*>*/}
      {/*  <circle cx={'15'} cy={'15'} r={'0.5'} fill={'white'} />*/}
      {/*</svg>*/}
    </button>
  );
});

export default Step;
