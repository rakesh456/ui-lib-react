
import Month from '../../src/components/Datepicker/calendar-date/month';
import DatePicker from '../../src/components/Datepicker/index';
import DEFAULT_OPTIONS from '../../src/utils/constants';
import { isUndefinedOrNull, isBlank, splitArray, getFormatfromOptions, getDateByFormat, isValidDate, getDateDDMMYYYYNew, getDateMMDDYYYY, getYYYYMMDD, dateToYear, dateToMMYYYY, dateToQQYYYY, getQQFromMonth, isObject, isStringExists, compareObjects } from '../../src/utils/utils.js';
import { zeroPad, MONTH_NAMES } from '../../src/utils/calendar';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import React from 'react';
import Days from '../../src/components/Datepicker/calendar-date/days';
import { FaCaretRight } from 'react-icons/lib/fa';


// 0. checking month component is rendering properly.
 
test('Month component renders the month correctly', () => {
  const options = DEFAULT_OPTIONS;
  const rendered = renderer.create(
    <Month options={options} />
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});


// 1. Test for isUndefinedOrNull

describe('Testing on method isUndefinedOrNull', () => {
  let dateTestValuesInputArray = [123, undefined, null]
  let dateTestValuesOutputArray = [false, true, true]
  let messageDisplayForEachTestCase = ['If any defined variable or truthy value is passed then function will return False',
    'If Undefined value is passed then function returns true',
    'If null value is passed then function returns true']
  for (let i = 0; i < dateTestValuesInputArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`, () => {

      expect(isUndefinedOrNull(dateTestValuesInputArray[i]))
        .toEqual(dateTestValuesOutputArray[i])
    })

  }

})


// 2. Test for isObject

describe('Testing on function isObject', () => {
  let obj = {}
  let obj1;
  let obj2 = null;
  let dateTestValuesInputArray = [obj, obj1, obj2]
  let dateTestValuesOutputArray = [true, false, false]
  let messageDisplayForEachTestCase = ['Passing object function returns true ', 'Passing undefined object then function returns false', 'Passing null object then function returns false']
  for (let i = 0; i < dateTestValuesInputArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`, () => {
      expect(isObject(dateTestValuesInputArray[i])).toEqual(dateTestValuesOutputArray[i])
    })
  }
})


// 3. Test for isBlank

describe('Testing on function isBlank', () => {
  let dateTestValuesInputArray = ['JSTIGERS', undefined, null, '']
  let dateTestValuesOutputArray = [false, true, true, true]
  let messageDisplayForEachTestCase = ['If any defined variable or truthy value is passed then function will return False', 'If Undefined value is passed then function returns true', 'If null value is passed then function returns true']
  for (let i = 0; i < dateTestValuesInputArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`, () => {
      expect(isBlank(dateTestValuesInputArray[i])).toEqual(dateTestValuesOutputArray[i])
    })

  }
})


// 4. Test for splitArray

describe('Testing on function splitArray', () => {
  let splitTestValuesInputArray = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], []]
  let splitTestValuesOutputArray = [[[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]], [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]], []]
  let chunkingSizeofInputArray = [2, 5, 2]
  let messageDisplayForEachTestCase = ['If any valid date is passed to the function it return true', 'If any Invalid date is passed to the function it return false']
  for (let i = 0; i < splitTestValuesInputArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`, () => {

      expect(splitArray(splitTestValuesInputArray[i], chunkingSizeofInputArray[i])).toEqual(splitTestValuesOutputArray[i])
    })

  }
})


// 5. Test for getFormatfromOptions that converts any date formate into 'MM/DD/YYYY'

describe('Testing on function getFormatfromOption', () => {
  let dateTestValuesInputArray = ['YYYY/MM/DD', 'DD/MM/YYYY', undefined, null]
  let dateTestValuesOutputArray = ['MM/DD/YYYY', 'MM/DD/YYYY', 'MM/DD/YYYY', 'MM/DD/YYYY']
  let messageDisplayForEachTestCase = ['If any format of date is passed to a function it returns in as specified in option format', 'If change the format of date is passed to a function it returns in as specified in option format', 'If Undefined value is passed then function returns in MM/DD/YYYY format ', 'If null value is passed then function returns in MM/DD/YYYY format']
  for (let i = 0; i < dateTestValuesInputArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`, () => {
      expect(getFormatfromOptions(dateTestValuesInputArray[i])).toEqual(dateTestValuesOutputArray[i])
    })
  }
})


// 6. Test for getDateByFormat

describe('Testing on function getDateByFormat ', () => {
  let dateTestValuesInputArray = ['12/01/2019', '12/01/2019', '12/01/2019', '12/01/2019']
  let dateTestValueInputFormatArray = ['DD/MM/YYYY', 'MM/DD/YYYY', undefined, null]
  let dateTestValuesOutputArray = ['01/12/2019', '12/01/2019', '12/01/2019', '12/01/2019']
  let messageDisplayForEachTestCase = ['If any date is passed in DD/MM/YYYY format to the function it returns in the format same as given', 'If any date is passed in MM/DD/YYYY format to the function it returns in the default format MM/DD/YYYY ', 'If for any date, undefined value is passed as format then function returns in default format MM/DD/YYYY', 'If for any date, null value is passed as format then function returns in default format MM/DD/YYYY']
  for (let i = 0; i < dateTestValuesInputArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`, () => {
      expect(getDateByFormat(dateTestValuesInputArray[i], dateTestValueInputFormatArray[i])).toEqual(dateTestValuesOutputArray[i])
    })
  }
})


// 7. isValid

describe('Testing on function isValid', () => {
  let dateTestValuesInputArray = ['12/01/2019', '18/01/2019']
  let dateTestValuesOutputArray = [true, false]
  let messageDisplayForEachTestCase = ['If any valid date is passed to the function it return true', 'If any Invalid date is passed to the function it return false']
  for (let i = 0; i < dateTestValuesInputArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`, () => {
      expect(isValidDate(dateTestValuesInputArray[i])).toEqual(dateTestValuesOutputArray[i])
    })
  }
})


// 8. Tast for getDateDDMMYYYYNew

describe('Testing on function getDateDDMMYYYYNew', () => {
  let dateTestValuesInputArray = ['3/4/2019', '2019/03/05', undefined, '', null]
  let dateTestValuesOutputArray = ['03/04/2019', '03/05/2019', 'NaN/NaN/NaN', 'NaN/NaN/NaN', 'NaN/NaN/NaN']
  let messageDisplayForEachTestCase = ['function getDateDDMMYYYYNew give format in DD/MM/YYYY', '']
  for (let i = 0; i < dateTestValuesInputArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`, () => {

      expect(getDateDDMMYYYYNew(dateTestValuesInputArray[i])).toEqual(dateTestValuesOutputArray[i])
    })

  }

})


// 9. Test for getDateMMDDYYYY

describe('Testing on function getDateMMDDYYYY', () => {
  let dateTestValuesInputArray = ['3/4/2019', '18/01/2019', '2019/02/03', '02/2019/03',]
  let dateTestValuesOutputArray = ['03/04/2019', 'NaN/NaN/NaN', '02/03/2019', 'NaN/NaN/NaN']
  let messageDisplayForEachTestCase = ['If we pass date the function return in MM/DD/YYYY format', 'If we pass invalid date returns Not a Number', 'If we pass date in different format YYYY/MM/DD it converts to MM/DD/YYYY', 'If we pass date DD/YYYY/MM it returns Not a number']
  for (let i = 0; i < dateTestValuesInputArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`, () => {
      expect(getDateMMDDYYYY(dateTestValuesInputArray[i])).toEqual(dateTestValuesOutputArray[i])
    })
  }
})


// 10. Test for getYYYYMMDD

describe('Testing on funtion getYYYYMMDD', () => {
  test('If we pass date then the function getYYYYMMDD return date in YYYYMMDD format', () => {
    let date = '02/05/2019'
    expect(getYYYYMMDD(date)).toEqual('2019-02-05')
  })
})


// 11. Test for dateToYear

describe('Testing on function dateToYear', () => {
  let d = new Date()
  let dateTestValuesInputArray = ['3/4/1987', '18/01/2019', '2015/02/03', null, undefined]
  let dateTestValuesOutputArray = [1987, d.getFullYear(), 2015, d.getFullYear(), d.getFullYear()]
  let messageDisplayForEachTestCase = ["If we pass date to function it return it's full year", 'If we pass invalid date function returns current date full year ', "If we pass date in different format then also it gives it's full year", "For null value function will return current date fully year", "For udefined value function will return current date fully year"]
  for (let i = 0; i < dateTestValuesInputArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`, () => {
      expect(dateToYear(dateTestValuesInputArray[i])).toEqual(dateTestValuesOutputArray[i])
    })
  }
})


// 12. Test of function dateToMMYYYY

describe('Testing on function dateToMMYYYY', () => {
  let d = new Date()
  let outputDate = dateFormat(d)
  function dateFormat(date) {
    let month = '' + (1 + date.getMonth())
    if (month.length < 2) month = '0' + month;
    let year = '' + date.getFullYear();
    date = [month, year].join('/')
    return date
  }
  let dateTestValuesInputArray = ['3/4/1987', '18/01/2019', '2015/02/03', null, undefined]
  let dateTestValuesOutputArray = ['03/1987', outputDate, '02/2015', outputDate, outputDate]
  let messageDisplayForEachTestCase = ["If we pass date to function it return it's months and full year of the date in MM/YYYY format", 'If we pass invalid date function returns current date month and full year in MM/YYYY format', "If we pass date in different format then also it gives it's month and full year date in MM/YYYY format", "For null value function will return current date month and fully year in MM/YYYY format", "For udefined value function will return current date month and fully year in MM/YYYY format"]
  for (let i = 0; i < dateTestValuesInputArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`, () => {
      expect(dateToMMYYYY(dateTestValuesInputArray[i])).toEqual(dateTestValuesOutputArray[i])
    })
  }
})


// 13. Test of function dateTo QQYYYY

describe('Testing on function dateToQQYYYY', () => {
  let d = new Date()
  let currentMonth = d.getMonth() + 1
  let _val = (currentMonth <= 12 && currentMonth >= 10) ? 4 : (currentMonth <= 9 && currentMonth >= 7) ? 3 : (currentMonth <= 6 && currentMonth >= 4) ? 2 : 1;
  let quarter = 'Q' + _val;
  let dateTestValuesInputArray = ['3/4/1987', '18/01/2019', '2015/02/03', null, undefined]
  let dateTestValuesOutputArray = ['Q1/1987', quarter + '/' + d.getFullYear(), 'Q1/2015', quarter + '/' + d.getFullYear(), quarter + '/' + d.getFullYear()]
  let messageDisplayForEachTestCase = ["If we pass date to function it return Quarter with its full year", 'If we pass invalid date function returns current month Quarter and its full year ', "If we pass date in different format then also it gives it's current quarter and full year", "For null value function will return current month quarter and fully year", "For udefined value function will return current month quarter and  fully year"]
  for (let i = 0; i < dateTestValuesInputArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`, () => {
      expect(dateToQQYYYY(dateTestValuesInputArray[i])).toEqual(dateTestValuesOutputArray[i])
    })
  }
})


// 14. Test of function getQQFromMonth

describe('Testing of function getQQFromMonth', () => {
  let d = 5
  test('Testing a function that it return the quarter of the date ', () => {
    expect(getQQFromMonth(d)).toEqual('Q2')
  })
  let month = 15
  test('Testing a function that it return the quarter of the date ', () => {
    expect(getQQFromMonth(month)).toEqual('Q1')
  })
})


// 16. Test of isStringExist

describe('Testing on function isStringExists', () => {
  let TestValuesInputStringArray = ['amanverma', 'thisisbengaluru']
  let TestValuesInputSubStringArray = ['aman', 'balloon']
  let TestValuesOutputArray = [true, false]
  let messageDisplayForEachTestCase = ['Passing string and substring if substring present then function return true', 'Passing string and substring if substring not present then function return false', 'If null value is passed then function returns true']
  for (let i = 0; i < TestValuesInputStringArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`, () => {
      expect(isStringExists(TestValuesInputStringArray[i], TestValuesInputSubStringArray[i])).toEqual(TestValuesOutputArray[i])
    })
  }
})


// 17. Test for compareObjects

describe('Testing on function compareObjects', () => {
  let person = { firstName: "John", lastName: "Doe", age: 50, eyeColor: "blue" };
  let otherPerson = { firstName: "John", lastName: "Doe", age: 50, eyeColor: "blue" };
  let differentValuePerson = { firstName: "suraj", lastName: "verma", age: 30, eyeColor: "brown" };
  let differentPropertyPerson = { hairColor: 'brown', tall: '6.0ft' }
  let emptyObject = {}
  let emptyObject2 = {}
  let TestValuesInputObjectArray = [person, person, person, emptyObject, person]
  let TestValuesInputOtherObjectArray = [otherPerson, differentValuePerson, emptyObject, emptyObject2, differentPropertyPerson]
  let TestValuesOutputArray = [true, false, false, true, false]
  let messageDisplayForEachTestCase = ['Passing two objects having same property and values then the function return true', 'Passing two different  objects having same property and different values then the function return flase', 'Comparing Object to an empty object then the function returns false', "Compare two empty objects then the funtions returns true", "Compare two objects having different property then the function return false"]
  for (let i = 0; i < TestValuesInputObjectArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`, () => {
      expect(compareObjects(TestValuesInputObjectArray[i], TestValuesInputOtherObjectArray[i])).toEqual(TestValuesOutputArray[i])
    })
  }

})


describe('Should render without crashing', () => {
  let wrapper;
  test('Check month rendering correctly', () => {
    wrapper = shallow(<Month month='12' year='2019' />);
    let html = wrapper.find('.VS-MonthName').text();
    expect(html).toEqual('DECEMBER 2019');
  })
})