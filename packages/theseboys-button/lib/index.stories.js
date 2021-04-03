import React from 'react';

import Button from './theseboys-button';

export default {
  title: 'Button'
};

const Template = args => <Button {...args}>Click</Button>;

export const Alert = Template.bind({});

Alert.args = {
  className: 'alert'
};
