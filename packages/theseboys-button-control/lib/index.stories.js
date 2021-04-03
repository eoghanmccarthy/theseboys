import React from 'react';

import Button from './theseboys-button-control';

export default {
  title: 'Button Control'
};

const Template = args => <Button {...args}>Click</Button>;

export const Alert = Template.bind({});

Alert.args = {
  className: 'alert'
};
