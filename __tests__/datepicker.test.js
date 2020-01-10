import DatePicker from '../src/components/Datepicker/index';
import DEFAULT_OPTIONS from '../src/utils/constants';
import React from 'react';
import { mount,shallow } from 'enzyme';
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
  test('Button renders without crashing', () => {
    const options = DEFAULT_OPTIONS;
  
    // options.shouldCalendarOpen = true;
    // options.isDisabled = false;
    // options.showMonthSelection = false;
    // options.showYearSelection = false;
    const wrapper = mount(<DatePicker options={options}/>)
    wrapper.setState({
      shouldCalendarOpen:true,
      isDisabled :false,
      showMonthSelection :false,
      showYearSelection :false,
      isCalendar:true

    })

    console.log(wrapper.debug())
    const div = document.createElement('div');
    ReactDOM.render(<Buttons options={options} />, div);
  });
})

// describe('Buttons rendering default options without crashing',()=>{
//   test('Button renders without crashing', () => {
//     const div = document.createElement('div');
//     const options = DEFAULT_OPTIONS;
//     ReactDOM.render(<Buttons options={options} />, div);
//   });
// })