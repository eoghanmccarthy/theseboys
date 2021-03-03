import { useContext } from 'react';

import { MasterContext } from '../masterProvider';

const useMasterContext = component => {
  const context = useContext(MasterContext);
  if (!context) {
    throw new Error(
      `Master components must be rendered within the MasterProvider component. Error occurred in the ${component} component.`
    );
  }

  return context;
};

export default useMasterContext;
