import DatePicker from '../src/components/Datepicker/calendar-date/buttons';
import DEFAULT_OPTIONS from '../src/utils/constants';
import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import Days from '../src/components/Datepicker/calendar-date/days';
import Buttons from '../src/components/Datepicker/calendar-date/buttons';
import Month from '../src/components/Datepicker/calendar-date/month';

test('rendering default options without crashing', () => {
  const div = document.createElement('div');
  const options = DEFAULT_OPTIONS;
  ReactDOM.render(<Buttons options={options} />, div);
});
 

  
  // test('should render the indicated date with a coloured dot', () => {
  //   let options = {"displayFormat": "DD/MM/YYYY", "iconAlignment":"left", "showErrorMessage": true, "dateStringAlignment": "left", "lowerLimit": "08/08/2015", "upperLimit": "30/09/2022", "validationMessages": [{"inValidFormat": "Invalid DOB"}, { "outsideRange": ""}] , "isDisabled": false, "showButtons": false, "dateButtonPrimary": "Ok", "showClearIcon": false, "manualEntry": true, "disabledList": ["01/12/2019", "15/10/2020", "01/11/2020", "20/11/2019"], "indicatorList": [{ "dates": ["01/10/2019","02/11/2019"], "color": "#333" }, { "dates": ["02/09/2019","01/08/2019"], "color": "#ff0000" }]}
  //   wrapper = shallow(<DatePicker options={options}/>);
  //   let errorMessage = wrapper.find('VS-Invalid-Input').text();
  //   expect(errorMesssage).toEqual('DECEMBER 2019');

//     test('should set the date which is on clicking button', () =>{
//       wrapper = shallow(<Month/>);
//       let 
//     })

//     test('should give a message /Invalid DOB/ if user enters a invalid format input', () => {


//     })

//     test('should give a message /out of range/ if user enters a date which is in right format but out of range', () =>{

//     })

//     test('should go to the next month with shift and right arrow', () => {
//     })

//     test('should go to next year with control and right arrow' , () =>{

//     })

//     test('should not be able to select the disabled date from the calender', () => {

//     })

//   })
// const accounts = {};
// const wrapper = shallow(<MyComponent accounts={accounts} filterHeader="" onTotalsFilter={handleOnTotalsFilter} />);

// const button = wrapper.find('#archived-button');
// button.simulate('click');
// expect(passedFilterType).toBe(TotalsFilterTypes.archived);
//1.should render the selected date with coloured dot.
//2.should set the date which is on the button when clicked the button
//3.should show invalid options on doing invalid entry from the keyboard
//4.should show 'out of range message' when out of range date is entered.
//5.should not go to the next month on clicking the icon on calendar if that month is not in the range.
//6.should not go to the previous month on clickng the icon on calendar if that month is not in the range.
//7.should shift next month with shift and right arrow key and previous with left arrow key.
//8.should shift next year with control and right arrow key and previous with left arrow key.
//9.should shift to the next date if some date is disabled with right arrow key pressed.
//10.should shift to the previous date if some date is disabled with left arrow key pressed.

// describe('Should render without crashing', () => {
  
//   test('Check month rendering correctly', () => {
//      let wrapper = shallow(<Month month='12' year='2019' />);
//     let options ={onclick="displayValue('datepicker1', 'display1')"}
//     const wrapper = shallow(<DatePicker options={options} />)
//       let incrementbtn = wrapper.find('button');
//       incrementbtn.simulate('click')
//     expect(incrementbtn).toBe('DECEMBER 2019');
//   })

// describe('should render the date and index', () => {
//     it('Should render without errors', () => {
//      const wrapper = shallow(<Buttons />)
//      const incrementbtn = wrapper.find('button').first();
//      incrementbtn.simulate('click')
//      const text = wrapper.find('p').text()
//      expect(text).toEqual('Counter -  1')
//     })
//   });