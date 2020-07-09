import React, { Fragment, memo } from 'react';

import './styles.css';

import { Panel, Meta, PlayButton } from '../../ui';

import useBell01 from 'features/sounds/useBell01';

const SoundAnalyser = memo(() => {
  const bell01 = useBell01();

  return (
    <Fragment>
      <Meta>
        <PlayButton onClick={() => bell01.trigger()} />
      </Meta>
      <Panel />
    </Fragment>
  );
});

export default SoundAnalyser;
