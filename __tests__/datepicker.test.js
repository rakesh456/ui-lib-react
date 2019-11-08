import DatePicker from '../src/components/Datepicker/index';
import DEFAULT_OPTIONS from '../src/utils/constants';
import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import CalendarDate from '../src/components/Datepicker/calendar-date';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const options = DEFAULT_OPTIONS;
  ReactDOM.render(<DatePicker options={options} />, div);
});


