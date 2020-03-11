import DatePicker from '../../src/components/Datepicker/calendar-date/buttons';
import DEFAULT_OPTIONS from '../../src/utils/constants';
import React from 'react';
import { shallow } from 'enzyme';
import {zeroPad, MONTH_NAMES} from '../../src/utils/calendar';
import ReactDOM from 'react-dom';
import Days from '../../src/components/Datepicker/calendar-date/days';
import Buttons from '../../src/components/Datepicker/calendar-date/buttons';
import Month from '../../src/components/Datepicker/calendar-date/month';

test('rendering default options without crashing', () => {
  const div = document.createElement('div');
  const options = DEFAULT_OPTIONS;
  ReactDOM.render(<Buttons options={options} />, div);
});



 
