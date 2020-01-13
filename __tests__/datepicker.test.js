import DatePicker from '../src/components/Datepicker/index';
import Week from '../src/components/Datepicker/calendar-date/week'
import Month from '../src/components/Datepicker/calendar-date/month'
import DEFAULT_OPTIONS from '../src/utils/constants';
import React from 'react';
import { mount,shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import CalendarDate from '../src/components/Datepicker/calendar-date/index';
import desktop from 'react-icons/lib/fa/desktop';


// Datepicker renders without crashing
it('renders without crashing', () => {
  const div = document.createElement('div');
  const options = DEFAULT_OPTIONS;
  ReactDOM.render(<DatePicker options={options} />, div);
});

// Buttons rendering default options without crashing
describe('Buttons rendering default options without crashing',()=>{
  test('Button renders without crashing', () => {
  
    let options={'showButtons':true ,'selectedDate':`01/01/2019`,'datePickerOptions':true};
    const wrapper = mount(<CalendarDate options={options} shouldCalendarOpen={true}/>)
    // console.log(wrapper.find('.VS-ClearButton.VS-PullLeft.btn.btn-secondary').text())
    // const instant = wrapper.instance()
    wrapper.update()
    // console.log(wrapper.debug())
    const div = document.createElement('div');
    ReactDOM.render(<CalendarDate options={options}  shouldCalendarOpen={true}/>, div);
  });
})

// describe('Buttons rendering default options without crashing',()=>{
//   test('Button renders without crashing', () => {
//     const div = document.createElement('div');
//     const options = DEFAULT_OPTIONS;
//     ReactDOM.render(<Buttons options={options} />, div);
//   });
// })

// Week component renders the week element correctly
test('Week component renders without crashing', () => {
  const div = document.createElement('div');
  const options = DEFAULT_OPTIONS;
  ReactDOM.render(<Week options={options} />, div);
});

// Month component renders the month correctly
test('Month component renders without crashing', () => {
  const div = document.createElement('div');
  const options = DEFAULT_OPTIONS;
  ReactDOM.render(<Month options={options} />, div);
});

// check defauLt date if current date is in the limit in DD/MM/YYYY
describe('check defauLt date if current date is in the limit in DD/MM/YYYY',()=>{

  test('passing date which perivous then lower limit of ',()=>{
    
  })
})