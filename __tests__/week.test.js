import week from '../src/components/Datepicker/calendar-date/week';
import DatePicker from '../src/components/Datepicker/index';
import DEFAULT_OPTIONS from '../src/utils/constants';
import {zeroPad, MONTH_NAMES} from '../src/utils/calendar';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import React from 'react';
import Days from '../src/components/Datepicker/calendar-date/days';
import { FaCaretRight } from 'react-icons/lib/fa';

test('Week component renders the week element correctly', () => {
  const options = DEFAULT_OPTIONS;
  const rendered = renderer.create(
    <week options={options} />
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});