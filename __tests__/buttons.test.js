  import DatePicker from '../src/components/Datepicker/calendar-date/buttons';
import DEFAULT_OPTIONS from '../src/utils/constants';
import React from 'react';
import { shallow } from 'enzyme';
import {zeroPad, MONTH_NAMES} from '../src/utils/calendar';
import ReactDOM from 'react-dom';
import Days from '../src/components/Datepicker/calendar-date/days';
import Buttons from '../src/components/Datepicker/calendar-date/buttons';
import Month from '../src/components/Datepicker/calendar-date/month';

test('rendering default options without crashing', () => {
  const div = document.createElement('div');
  const options = DEFAULT_OPTIONS;
  ReactDOM.render(<Buttons options={options} />, div);
});

describe('should render the buttons and their onclick event properly', () => {


  test('Checking if showButton is true and if we click OK then it should select the focused date', () => {
    let options = {"displayFormat": "DD/MM/YYYY", "iconAlignment":"left", "showErrorMessage": true, "dateStringAlignment": "left", "lowerLimit": "08/08/2015", "upperLimit": "30/09/2022", "validationMessages": [{"inValidFormat": "Invalid DOB"}, { "outsideRange": ""}] , "isDisabled": false, "showButtons": false, "dateButtonPrimary": "Ok", "showClearIcon": true, "manualEntry": true, "disabledList": ["01/12/2019", "15/10/2020", "01/11/2020", "20/11/2019"], "indicatorList": [{ "dates": ["01/10/2019","02/11/2019"], "color": "#333" }, { "dates": ["02/09/2019","01/08/2019"], "color": "#ff0000" }]};
    var month = zeroPad((new Date().getMonth()+1), 2);
    var day = zeroPad((new Date().getDate()), 2);
    var wrapper = shallow(<DatePicker options={options} />)
    wrapper.find('.VS-SelectButton').simulate('click');
    wrapper.instance().forceUpdate();
    wrapper.update();
    var html = wrapper.find('.VS-Calendar-Input').props().value
    expect(html).toEqual(day+'/'+month+'/'+new Date().getFullYear());
  })
  
  test('Checking if showbutton is true and if we click CLEAR then it should clear the input area', () =>{
    let options = {"displayFormat": "DD/MM/YYYY", "iconAlignment":"left", "showErrorMessage": true, "dateStringAlignment": "left", "lowerLimit": "08/08/2015", "upperLimit": "30/09/2022", "validationMessages": [{"inValidFormat": "Invalid DOB"}, { "outsideRange": ""}] , "isDisabled": false, "showButtons": true, "dateButtonPrimary": "Ok", "showClearIcon": false, "manualEntry": true, "disabledList": ["01/12/2019", "15/10/2020", "01/11/2020", "20/11/2019"], "indicatorList": [{ "dates": ["01/10/2019","02/11/2019"], "color": "#333" }, { "dates": ["02/09/2019","01/08/2019"], "color": "#ff0000" }]};
    var wrapper = shallow(<DatePicker options={options} />)
    wrapper.find('.VS-ClearButton').simulate('click');
    wrapper.instance().forceUpdate();
    wrapper.update();
    let html = wrapper.find('.VS-Calendar-Input').props().value
    expect(html).toEqual();
  })
  
  
})


 
