import Month from '../src/components/Datepicker/calendar-date/month';
import DatePicker from '../src/components/Datepicker/index';
import DEFAULT_OPTIONS from '../src/utils/constants';
import {isUndefinedOrNull, isBlank,splitArray,getFormatfromOptions,getDateByFormat,isValidDate,getDateDDMMYYYYNew,getDateMMDDYYYY,getYYYYMMDD,dateToYear,dateToMMYYYY,dateToQQYYYY,getQQFromMonth,isObject} from '../src/utils/utils.js';
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

// Test for isUndefinedOrNull 
describe('Testing on function isUndefinedOrNull',()=>{
  
  let dateTestValuesInputArray = [123,undefined,null]
  let dateTestValuesOutputArray = [false,true,true]
  let messageDisplayForEachTestCase = ['If any defined variable or truthy value is passed then function will return False','If Undefined value is passed then function returns true', 'If null value is passed then function returns true']
  for (let i = 0; i < dateTestValuesInputArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`,()=>{
    
      expect(isUndefinedOrNull(dateTestValuesInputArray[i],)).toEqual(dateTestValuesOutputArray[i])
    })
    
  }

})


//Test for isObject
describe('Testing on function isObject',()=>{

  let obj = {}
  test('Object',()=>{
    return expect(isObject(obj)).toEqual(true)
  })

})
//Test for isBlank
describe('Testing on function isBlank',()=>{
  

  let dateTestValuesInputArray = ['JSTIGERS',undefined,null,'']
  let dateTestValuesOutputArray = [false,true,true,true]
  let messageDisplayForEachTestCase = ['If any defined variable or truthy value is passed then function will return False','If Undefined value is passed then function returns true', 'If null value is passed then function returns true']
  for (let i = 0; i < dateTestValuesInputArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`,()=>{
    
      expect(isBlank(dateTestValuesInputArray[i],)).toEqual(dateTestValuesOutputArray[i])
    })
    
  }
})


// Test for splitArray 
describe('Testing on function splitArray',()=>{
  
  let splitTestValuesInputArray = [[1,2,3,4,5,6,7,8,9,10],[1,2,3,4,5,6,7,8,9,10],[]]
  let splitTestValuesOutputArray = [[[1,2],[3,4],[5,6],[7,8],[9,10]],[[1,2,3,4,5],[6,7,8,9,10]],[]]
  let chunkingSizeofInputArray = [2,5,2]
  let messageDisplayForEachTestCase = ['If any valid date is passed to the function it return true','If any Invalid date is passed to the function it return false']
  for (let i = 0; i < splitTestValuesInputArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`,()=>{
    
      expect(splitArray(splitTestValuesInputArray[i],chunkingSizeofInputArray[i])).toEqual(splitTestValuesOutputArray[i])
    })
    
  }
})

// Test for getFormatfromOptions that converts any date formate into 'MM/DD/YYYY'
describe('Testing on function getFormatfromOption',()=>{
  

  

  let dateTestValuesInputArray = ['YYYY/MM/DD','DD/MM/YYYY',undefined,null]
  let dateTestValuesOutputArray = ['MM/DD/YYYY','MM/DD/YYYY','MM/DD/YYYY','MM/DD/YYYY']
  let messageDisplayForEachTestCase = ['If any format of date is passed to a function it returns in as specified in option format','If change the format of date is passed to a function it returns in as specified in option format','If Undefined value is passed then function returns in MM/DD/YYYY format ', 'If null value is passed then function returns in MM/DD/YYYY format']
  for (let i = 0; i < dateTestValuesInputArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`,()=>{
    
      expect(getFormatfromOptions(dateTestValuesInputArray[i],)).toEqual(dateTestValuesOutputArray[i])
    })
    
  }

})
//Test for getDateByFormat
describe('Testing on function getDateByFormat ',()=>{


  let dateTestValuesInputArray = ['12/01/2019','12/01/2019','12/01/2019','12/01/2019']
  let dateTestValueInputFormatArray = ['DD/MM/YYYY','MM/DD/YYYY',undefined,null]
  let dateTestValuesOutputArray = ['01/12/2019','12/01/2019','12/01/2019','12/01/2019']
  let messageDisplayForEachTestCase = ['If any date is passed in DD/MM/YYYY format to the function it returns in the format same as given','If any date is passed in MM/DD/YYYY format to the function it returns in the default format MM/DD/YYYY ', 'If for any date, undefined value is passed as format then function returns in default format MM/DD/YYYY','If for any date, null value is passed as format then function returns in default format MM/DD/YYYY']
  for (let i = 0; i < dateTestValuesInputArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`,()=>{
    
      expect(getDateByFormat(dateTestValuesInputArray[i],dateTestValueInputFormatArray[i])).toEqual(dateTestValuesOutputArray[i])
    })
    
  }

})

//isValid
describe('Testing on function isValid',()=>{
  

  let dateTestValuesInputArray = ['12/01/2019','18/01/2019']
  let dateTestValuesOutputArray = [true,false]
  let messageDisplayForEachTestCase = ['If any valid date is passed to the function it return true','If any Invalid date is passed to the function it return false']
  for (let i = 0; i < dateTestValuesInputArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`,()=>{
    
      expect(isValidDate(dateTestValuesInputArray[i],)).toEqual(dateTestValuesOutputArray[i])
    })
    
  }

})

//Tast for getDateDDMMYYYYNew
describe('Testing on function getDateDDMMYYYYNew',()=>{
  let dateTestValuesInputArray = ['3/4/2019','2019/03/05',undefined,'',null]
  let dateTestValuesOutputArray = ['03/04/2019','03/05/2019','NaN/NaN/NaN','NaN/NaN/NaN','NaN/NaN/NaN']
  let messageDisplayForEachTestCase = ['function getDateDDMMYYYYNew give format in DD/MM/YYYY','']
  for (let i = 0; i < dateTestValuesInputArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`,()=>{
    
      expect(getDateDDMMYYYYNew(dateTestValuesInputArray[i],)).toEqual(dateTestValuesOutputArray[i])
    })
    
  }
  
})

//Test for getDateMMDDYYYY
describe('Testing on function getDateMMDDYYYY',()=>{

  let dateTestValuesInputArray = ['3/4/2019','18/01/2019','2019/02/03','02/2019/03',]
  let dateTestValuesOutputArray = ['03/04/2019','NaN/NaN/NaN','02/03/2019','NaN/NaN/NaN']
  let messageDisplayForEachTestCase = ['If we pass date the function return in MM/DD/YYYY format','If we pass invalid date returns Not a Number','If we pass date in different format YYYY/MM/DD it converts to MM/DD/YYYY','If we pass date DD/YYYY/MM it returns Not a number']
  for (let i = 0; i < dateTestValuesInputArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`,()=>{
    
      expect(getDateMMDDYYYY(dateTestValuesInputArray[i],)).toEqual(dateTestValuesOutputArray[i])
    })
    
  }
  
})

//Test for getYYYYMMDD\
describe('Testing on funtion getYYYYMMDD',()=>{
  test('If we pass date then the function getYYYYMMDD return date in YYYYMMDD format',()=>{
    let date = '02/05/2019'
    expect(getYYYYMMDD(date)).toEqual('2019-02-05')
  })

})

// Test for dateToYear
describe('Testing on function dateToYear',()=>{
  let d = new Date()
  let dateTestValuesInputArray = ['3/4/1987','18/01/2019','2015/02/03',null,undefined]
  let dateTestValuesOutputArray = [1987,d.getFullYear(),2015,d.getFullYear(),d.getFullYear()]
  let messageDisplayForEachTestCase = ["If we pass date to function it return it's full year",'If we pass invalid date function returns current date full year ',"If we pass date in different format then also it gives it's full year","For null value function will return current date fully year","For udefined value function will return current date fully year"]
  for (let i = 0; i < dateTestValuesInputArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`,()=>{
    
      expect(dateToYear(dateTestValuesInputArray[i],)).toEqual(dateTestValuesOutputArray[i])
    })
    
  }
})

// Test of function dateToMMYYYY
describe('Testing on function dateToMMYYYY',()=>{
  let d = new Date()
  let dateTestValuesInputArray = ['3/4/1987','18/01/2019','2015/02/03',null,undefined]
  let dateTestValuesOutputArray = ['03/1987',d.getMonth()+1+'/'+d.getFullYear(),'02/2015',d.getMonth()+1+'/'+d.getFullYear(),d.getMonth()+1+'/'+d.getFullYear()]
  let messageDisplayForEachTestCase = ["If we pass date to function it return it's months and full year of the date in MM/YYYY format",'If we pass invalid date function returns current date month and full year in MM/YYYY format',"If we pass date in different format then also it gives it's month and full year date in MM/YYYY format","For null value function will return current date month and fully year in MM/YYYY format","For udefined value function will return current date month and fully year in MM/YYYY format"]
  for (let i = 0; i < dateTestValuesInputArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`,()=>{
    
      expect(dateToMMYYYY(dateTestValuesInputArray[i],)).toEqual(dateTestValuesOutputArray[i])
    })
    
  }
  
})

//Test of function dateToQQYYYY
describe('Testing on function dateToQQYYYY',()=>{
  let d = new Date()
  let currentMonth = d.getMonth() + 1
  let _val = (currentMonth <= 12 && currentMonth >= 10)? 4 : (currentMonth <= 9 && currentMonth >= 7)? 3 : (currentMonth <= 6 && currentMonth >= 4)? 2 : 1;
  let quater = 'Q' + _val;
  let dateTestValuesInputArray = ['3/4/1987','18/01/2019','2015/02/03',null,undefined]
  let dateTestValuesOutputArray = ['Q1/1987',quater+'/'+d.getFullYear(),'Q1/2015',quater+'/'+d.getFullYear(),quater+'/'+d.getFullYear()]
  let messageDisplayForEachTestCase = ["If we pass date to function it return Quater with its full year",'If we pass invalid date function returns current month Quater and its full year ',"If we pass date in different format then also it gives it's current quater and full year","For null value function will return current month quater and fully year","For udefined value function will return current month quater and  fully year"]
  for (let i = 0; i < dateTestValuesInputArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`,()=>{
    
      expect(dateToQQYYYY(dateTestValuesInputArray[i],)).toEqual(dateTestValuesOutputArray[i])
    })
    
  }
  
})

//Test of function getQQFromMonth
describe('Testing of function getQQFromMonth',()=>{
    let d = 5
    test('Testing a function that it return the quater of the date ',()=>{
      expect(getQQFromMonth(d)).toEqual('Q2')
    })
    let month = 15
    test('Testing a function that it return the quater of the date ',()=>{
      expect(getQQFromMonth(month)).toEqual('Q1')
    })
})

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
    let html = parseInt(wrapper.find('.VS-Calendar-Input').props().value);
    expect(html).toEqual(new Date().getFullYear());
  })
  

})