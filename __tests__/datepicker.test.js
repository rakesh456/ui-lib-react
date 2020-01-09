import DatePicker from '../src/components/Datepicker/index';
import DEFAULT_OPTIONS from '../src/utils/constants';
import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import CalendarDate from '../src/components/Datepicker/calendar-date';
import desktop from 'react-icons/lib/fa/desktop';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const options = DEFAULT_OPTIONS;
  ReactDOM.render(<DatePicker options={options} />, div);
});

// Buttons rendering default options without crashing
describe('Buttons rendering default options without crashing',()=>{
  test('renders without crashing', () => {
    const div = document.createElement('div');
    const options = DEFAULT_OPTIONS;
    ReactDOM.render(<DatePicker options={options} />, div);
  });
})