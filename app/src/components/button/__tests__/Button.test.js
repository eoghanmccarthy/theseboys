import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

import Button from '../index';

describe('Button component', () => {
  afterEach(cleanup);

  const MockComponent = props => <Button testId={'instance-test-id'} {...props} />;

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MockComponent>Click</MockComponent>, div);
  });

  it('renders children', () => {
    const { getByText } = render(<MockComponent>Click</MockComponent>);
    expect(getByText('Click')).toBeInTheDocument();
  });

  it('renders with correct css classes', () => {
    const { getByTestId } = render(
      <MockComponent className={'instance-class'} size={48} shape={'circle'}>
        Click
      </MockComponent>
    );
    expect(getByTestId('instance-test-id')).toHaveClass(
      'tb-button',
      'instance-class',
      'size-48',
      'circle'
    );
  });

  it('renders and onClick event is called', () => {
    const onClick = jest.fn();

    const { getByTestId } = render(
      <MockComponent className={'instance-class'} onClick={onClick}>
        Click
      </MockComponent>
    );
    userEvent.click(getByTestId('instance-test-id'));
    expect(onClick).toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    const tree = renderer
      .create(<MockComponent className={'instance-class'}>Click</MockComponent>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
