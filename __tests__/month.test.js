import Month from '../src/components/Datepicker/calendar-date/month';
import DatePicker from '../src/components/Datepicker/index';
import DEFAULT_OPTIONS from '../src/utils/constants';
import {zeroPad, MONTH_NAMES} from '../src/utils/calendar';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import React from 'react';
import Days from '../src/components/Datepicker/calendar-date/days';
import { FaCaretRight } from 'react-icons/lib/fa';

test('Month component renders the month correctly', () => {
  const options = DEFAULT_OPTIONS;
  const rendered = renderer.create(
    <Month options={options} />
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});

describe('Should render without crashing', () => {
   let wrapper;
   test('Check month rendering correctly', () => {
    wrapper = shallow(<Month month='12' year='2019' />);
    let html = wrapper.find('.VS-MonthName').text();
    expect(html).toEqual('DECEMBER 2019');

  })

  test('check defauLt date if current date is in the limit in DD/MM/YYYY', () => {
    let options = {"displayFormat": "DD/MM/YYYY", "iconAlignment":"left", "showErrorMessage": true, "dateStringAlignment": "left", "lowerLimit": "08/08/2015", "upperLimit": "30/09/2022", "validationMessages": [{"inValidFormat": "Invalid DOB"}, { "outsideRange": ""}] , "isDisabled": false, "showButtons": false, "dateButtonPrimary": "Ok", "showClearIcon": false, "manualEntry": true, "disabledList": ["01/12/2019", "15/10/2020", "01/11/2020", "20/11/2019"], "indicatorList": [{ "dates": ["01/10/2019","02/11/2019"], "color": "#333" }, { "dates": ["02/09/2019","01/08/2019"], "color": "#ff0000" }]};
    var month = zeroPad((new Date().getMonth()+1), 2);
    var day = zeroPad((new Date().getDate()), 2);
    var wrapper = shallow(<DatePicker options={options} />);
    let html = wrapper.find('.VS-Calendar-Input').props().value
    expect(html).toEqual(day+'/'+month+'/'+new Date().getFullYear());
  })

  test('check defaut date if current date is in the limit in MM/DD/YYYY', () => {
    let options = {"displayFormat": "MM/DD/YYYY", "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "08/08/2019", "upperLimit": "12/29/2024", "showErrorMessage": true, "validationMessages": [{"inValidFormat": "Invalid DOB"}, { "outsideRange": "Date is out of range"}] , "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["09/28/2019", "10/15/2020", "11/01/2020", "11/20/2019"], "indicatorList": [{ "dates": ["10/01/2019","11/01/2019"], "color": "#333" }, { "dates": ["09/02/2019","08/01/2019"], "color": "#ff0000" }]};
    var month = zeroPad((new Date().getMonth()+1), 2);
    var day = zeroPad((new Date().getDate()), 2);
    var wrapper = shallow(<DatePicker options={options} />);
    let html = wrapper.find('.VS-Calendar-Input').props().value;
    expect(html).toEqual(month+'/'+day+'/'+new Date().getFullYear());
  })

  // test('check default value of show buttons in MM/DD/YYYY', () =>{
  //   let options = {"displayFormat": "MM/DD/YYYY", "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "08/08/2019", "upperLimit": "12/29/2024", "showErrorMessage": true, "validationMessages": [{"inValidFormat": "Invalid DOB"}, { "outsideRange": "Date is out of range"}] , "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["09/28/2019", "10/15/2020", "11/01/2020", "11/20/2019"], "indicatorList": [{ "dates": ["10/01/2019","11/01/2019"], "color": "#333" }, { "dates": ["09/02/2019","08/01/2019"], "color": "#ff0000" }]};
  //   let wrapper = shallow(<DatePicker options={options} />);
  //   let html = wrapper.find('.')
  //   expect(html).toEqual(false);
  // })
    
  test('check the default date if current date is not in the limit in DD/MM/YYYY', () =>{
    let options = {"displayFormat": "DD/MM/YYYY", "iconAlignment":"left", "showErrorMessage": true, "dateStringAlignment": "left", "lowerLimit": "08/08/2015", "upperLimit": "30/09/2018", "validationMessages": [{"inValidFormat": "Invalid DOB"}, { "outsideRange": ""}] , "isDisabled": false, "showButtons": false, "dateButtonPrimary": "Ok", "showClearIcon": false, "manualEntry": true, "disabledList": ["01/12/2019", "15/10/2020", "01/11/2020", "20/11/2019"], "indicatorList": [{ "dates": ["01/10/2019","02/11/2019"], "color": "#333" }, { "dates": ["02/09/2019","01/08/2019"], "color": "#ff0000" }]};
    var wrapper = shallow(<DatePicker options={options} />);
    let html = wrapper.find('.VS-Calendar-Input').props().value;
    expect(html).toEqual('08/08/2015');
  })
  
   test('checking the default Year in MM/YYYY format', () =>{
     let options = {"displayFormat": "MM/YYYY", "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "08/2018", "upperLimit": "03/2025", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["09/2019", "10/2024"]};
     var wrapper = shallow(<DatePicker options={options} />);
     let html = wrapper.find('.VS-Calendar-Input').props().value;
     expect(html).toEqual(new Date().getMonth()+1+'/'+new Date().getFullYear());
  })
  
  test('checking the default Year in QQ/YYYY format', () =>{
    let options = {"displayFormat": "QQ/YYYY", "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "Q2/2018", "upperLimit": "Q3/2031", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["Q2/2020", "Q3/2025"]};
    var wrapper = shallow(<DatePicker options={options} />);
    let html = wrapper.find('.VS-Calendar-Input').props().value;
    expect(html).toEqual('Q4/2019');
  })

  test('checking the default Year in YYYY format', () =>{
    let options = {"displayFormat": "YYYY", "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "2017", "upperLimit": "2031", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["2020", "2025"]};
    var wrapper = shallow(<DatePicker options={options} />);
    let html = wrapper.find('.VS-Calendar-Input').props().value;
    expect(html).toEqual(new Date().getFullYear());
  })

  test('Change the month to the previous month when left icon is clicked on the calender', () =>{
    let wrapper = shallow(<Month month='11' year='2019'/>);
    wrapper.find('.VS-PullRight').simulate('click');
    wrapper.instance().forceUpdate();
    wrapper.update();
    let month =wrapper.find('.VS-MonthName').text();
    console.log(month,'month');
    expect(month).toEqual("DECEMBER 2019");
  })
  
  test('Change the month to the previous monthName when left icon is clicked on the calendar', () =>{
    wrapper = shallow(<Month month='11' year='2019' />);
    wrapper.find('.VS-PullLeft').simulate('click');
    wrapper.instance().forceUpdate();
    wrapper.update();
    let month = wrapper.find('.VS-MonthName').text();
    console.log(month, "month");
    expect(month).toEqual("OCTOBER 2019");
  })
  

})