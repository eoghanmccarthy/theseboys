import React from 'react';
import { string } from 'prop-types';

const baseProps = Component => {
  const BaseComponent = props => {
    const { testId, id, className, ...rest } = props;

    return <Component data-testid={testId} id={id} className={className} {...rest} />;
  };

  BaseComponent.propTypes = {
    testId: string,
    id: string,
    className: string
  };

  return BaseComponent;
};

export default baseProps;
