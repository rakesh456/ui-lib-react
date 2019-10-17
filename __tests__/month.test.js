import Month from '../src/components/Datepicker/calendar-date/month';
import DEFAULT_OPTIONS from '../src/utils/constants';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import React from 'react';

test('Todo component renders the todo correctly', () => {
  const options = DEFAULT_OPTIONS;
  const rendered = renderer.create(
    <Month options={options} />
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});
