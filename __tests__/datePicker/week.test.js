import DEFAULT_OPTIONS from '../../src/utils/constants';
import renderer from 'react-test-renderer';
import React from 'react';

test('Week component renders the week element correctly', () => {
  const options = DEFAULT_OPTIONS;
  const rendered = renderer.create(
    <week options={options} />
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});