import Month from '../src/components/Datepicker/calendar-date/month';
import DEFAULT_OPTIONS from '../src/utils/constants';
import {isUndefinedOrNull, isBlank,splitArray,getFormatfromOptions,getDateByFormat,isValidDate,getDateDDMMYYYYNew,getDateMMDDYYYY,getYYYYMMDD,dateToYear,dateToMMYYYY,dateToQQYYYY,getQQFromMonth} from '../src/utils/utils.js'
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import React from 'react';

test('Month component renders the month correctly', () => {
  const options = DEFAULT_OPTIONS;
  const rendered = renderer.create(
    <Month options={options} />
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});

// Test for isUndefinedOrNull 
describe('Testing on function isUndefinedOrNull',()=>{
  // test('Checking by passing defined value',()=>{
  //   let obj= 123;
  // let check= isUndefinedOrNull(obj)
  //   expect(check).toEqual(false);
  // })

  // test('undefuned or null',()=>{
  //   let obj;
  // let check= isUndefinedOrNull(obj)
  //   expect(check).toEqual(true);
  // })

  // test('Checking by passing null value',()=>{
  //   let obj = null
  //   expect(isUndefinedOrNull(obj)).toBe(true)
  // })
  let dateTestValuesInputArray = [123,undefined,null]
  let dateTestValuesOutputArray = [false,true,true]
  let messageDisplayForEachTestCase = ['If any defined variable or truthy value is passed then function will return False','If Undefined value is passed then function returns true', 'If null value is passed then function returns true']
  for (let i = 0; i < dateTestValuesInputArray.length; i++) {
    test(`${messageDisplayForEachTestCase[i]}`,()=>{
    
      expect(isUndefinedOrNull(dateTestValuesInputArray[i],)).toEqual(dateTestValuesOutputArray[i])
    })
    
  }

})
//Test for isBlank
describe('Testing on function isBlank',()=>{
  // test('Checking by passing defined value',()=>{
  //   let obj= 'JSTIGERS';
  // let check= isBlank(obj)
  //   expect(check).toEqual(false);
  // })

  // test('undefined or null',()=>{
  //   let obj;
  // let check= isBlank(obj)
  //   expect(check).toEqual(true);
  // })

  // test('Checking by passing null value',()=>{
  //   let obj = null
  //   expect(isBlank(obj)).toBe(true)
  // })

  // test('Checking by passing defined value',()=>{
  //   let obj= '';
  // let check= isBlank(obj)
  //   expect(check).toEqual(true);
  // })

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
  // test('Checking for splitArray or chunking Array',()=>{
  //   let arr = [1,2,3,4,5,6,7,8,9,10]
  //   expect(splitArray(arr,2)).toEqual([[1,2],[3,4],[5,6],[7,8],[9,10]])
  // })

  // test('Checking for splitArray or chunking Array',()=>{
  //   let arr = [1,2,3,4,5,6,7,8,9,10]
  //   expect(splitArray(arr,5)).toEqual([[1,2,3,4,5],[6,7,8,9,10]])
  // })

  // test('Checking for splitArray or chunking Array',()=>{
  //   let arr = []
  //   expect(splitArray(arr,2)).toEqual([])
  // })

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
  // test('Checking for the format of date',()=>{
  //   let date = 'YYYY/MM/DD'
  //   expect(getFormatfromOptions(date)).toEqual('MM/DD/YYYY')
  // })

  // test('Checking for the format of date',()=>{
  //   let date = 'DD/MM/YYYY'
  //   expect(getFormatfromOptions(date)).toEqual('MM/DD/YYYY')
  // })

  // test('Checking for the format of date',()=>{
  //   let date;
  //   expect(getFormatfromOptions(date)).toEqual('MM/DD/YYYY')
  // })

  // test('Checking for the format of date',()=>{
  //   let date = null
  //   expect(getFormatfromOptions(date)).toEqual('MM/DD/YYYY')
  // })

  

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
//   test('Checking for date format by passing some format',()=>{
//     let date = '12/01/2019'
//     expect(getDateByFormat(date,'DD/MM/YYYY')).toEqual('01/12/2019')
//   })

//   test('Checking for date format by passing some format',()=>{
//     let date = '12/01/2019'
//     expect(getDateByFormat(date,'MM/DD/YYYY')).toEqual('12/01/2019')
//   })
// // getDateByFormat Test undefinded
//   test('Checking for date format by passing some format',()=>{
//     let date = '12/01/2019'
//     expect(getDateByFormat(date)).toEqual('12/01/2019')
//   })

//   test('Checking for date format by passing some format',()=>{
//     let date = '12/01/2019'
//     expect(getDateByFormat(date,null)).toEqual('12/01/2019')
//   })

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
  // test('Checking date is valid or not valid',()=>{
  //   let date = '12/01/2019'
  //   expect(isValidDate(date)).toEqual(true)
  // })

  // test('Checking date is valid or not valid',()=>{
  //   let date = '18/01/2019'
  //   expect(isValidDate(date)).toEqual(false)
  // })

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