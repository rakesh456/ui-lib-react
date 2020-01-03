import {isCalendarFormat,isYearFormat,isValidQQYYYYValue,isValidDDMMYYYYValue,isValidMMYYYYValue,isValidYYYYValue,isDDMMYYYYFormat,isMMDDYYYYFormat,isQQYYYYFormat,isMMYYYYFormat,isYYYFormat,getConvertedDateYYYYMMDDD,getUpperLimitFromOptions,getLowerLimitFromOptions,getSelectedMonthFromDate,DEFAULT_OPTIONS,getSelectedYearFromDate,getMonthShortNameByIndex,getMonthNameByIndex,getMonthIndex,zeroPad, getMonthDays,getPreviousMonth,getNextMonth,isDate,isSameDay,getIsoDate,checkDateInBetween, dateIsInDisabledList,isValidOutsideRangeDateQQYear,isValidOutsideRangeDateYear,isValidOutsideRangeDateMonthYear,isValidOutsideRangeDate,resetOptions,getYYYYForLowerLimit,getYYYYForUpperLimit,isEqual,valueIsInDisabledList,checkIsInValidLowerUpper,isLeft,isRight,checkFullMonthOrYearDisabled,getInvalidDateMessage,getNewUpdateDateByArrow, formatOptions} from '../src/utils/calendar';
import { getDateByFormat } from '../src/utils/utils';

//Test for isCalendarFormat
describe('Testing on function isCalendarFormat',()=>{
    let input = ["MM/DD/YYYY","DD/MM/YYYY",'YYYY/MM/DD','DD/YYYY/MM',undefined,null,""]
    let output = [true,true,false,false,false,false,false]
    let messages = ['passing the correct format of date then function return true',
                    'Passing second correct format then function returns true',
                    'Passing incorrect format then function returns false',
                    'Passing another incorrect format then function returns false',
                    'for unfdefined value function return false',
                    'for null value function return false',
                    'for empty string then also function return false']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(isCalendarFormat(input[i],))
            .toEqual(output[i])
        })
    }
})

//Test for isYearFormat
describe("Testing on function isYearFormat",()=>{
    
    let input = ["YYYY","MM/YYYY",'QQ/YYYY','DD/YYYY/MM',undefined,null,""]
    let output = [true,true,true,false,false,false,false]
    let messages = ['passing the correct format of date then function return true',
                    'Passing second correct format then function returns true',
                    'Passing third correct format then function returns false',
                    'Passing incorrect format then function returns false',
                    'for unfdefined value function return false',
                    'for null value function return false',
                    'for empty string then also function return false']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(isYearFormat(input[i],))
            .toEqual(output[i])
        })
    }
    
})

//Test for isValidQQYYYYValue
describe('Testing on function isValidQQYYYYValue',()=>{
   
    let input = ["Q2/2000","Q3/2019",'Q5/2019','Q3/899',undefined,null,""]
    let output = [true,true,false,false,false,false,false]
    let messages = ['passing the correct format of date then function return true',
                    'Passing second correct format then function returns true',
                    'Passing quarter value more then 4 then function returns false',
                    'Passing year value less then 999 then function returns false',
                    'for unfdefined value function return false',
                    'for null value function return false',
                    'for empty string then also function return false']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(isValidQQYYYYValue(input[i],))
            .toEqual(output[i])
        })
    }

})

//Test for isValidDDMMYYYYValue
describe('Testing on function isValidDDMMYYYYValue',()=>{
    let date = '24/23/2019'
    test('testing',()=>{
        expect(isValidDDMMYYYYValue(date)).toEqual(true)
    })

    let input = ["02/04/2019","123/12/2019",'2019/03/08',undefined,null,""]
    let output = [true,false,false,false,false,false]
    let messages = ['passing the correct format of date then function return true',
                    'Passing incorrect format then function returns false',
                    'Passing incorrect format then function returns false',
                    'for unfdefined value function return false',
                    'for null value function return false',
                    'for empty string then also function return false']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(isValidDDMMYYYYValue(input[i],))
            .toEqual(output[i])
        })
    }
})

//Test for isValidMMYYYYValue
describe('Testing on function isValidMMYYYYValue',()=>{

    let input = ["04/2019","23/12/2019",'2019/03/08',undefined,null,""]
    let output = [true,false,false,false,false,false]
    let messages = ['passing the correct format of date then function return true',
                    'Passing incorrect format then function returns false',
                    'Passing incorrect format then function returns false',
                    'for unfdefined value function return false',
                    'for null value function return false',
                    'for empty string then also function return false']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(isValidMMYYYYValue(input[i],))
            .toEqual(output[i])
        })
    }
    
})

//Test for isValidYYYYValue
describe('Testing on function isValidYYYYValue',()=>{

    let input = ["2019","23/12/2019",'2019/03/08',undefined,null,""]
    let output = [true,false,false,false,false,false]
    let messages = ['passing the correct format of date then function return true',
                    'Passing incorrect format then function returns false',
                    'Passing incorrect format then function returns false',
                    'for unfdefined value function return false',
                    'for null value function return false',
                    'for empty string then also function return false']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(isValidYYYYValue(input[i],))
            .toEqual(output[i])
        })
    }
    
})

//Test for isDDMMYYYYFormat
describe('Testing on function isDDMMYYYYFormat',()=>{

    let input = ["DD/MM/YYYY","MM/DD/YYYY",undefined,null,""]
    let output = [true,false,false,false,false,false]
    let messages = ['passing the correct format of date then function return true',
                    'Passing incorrect format then function returns false',
                    'for unfdefined value function return false',
                    'for null value function return false',
                    'for empty string then also function return false']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(isDDMMYYYYFormat(input[i],))
            .toEqual(output[i])
        })
    }
    
})

//Test for isMMDDYYYYFormat
describe('Testing on function isMMDDYYYYFormat',()=>{

    let input = ["MM/DD/YYYY","DD/MM/YYYY",undefined,null,""]
    let output = [true,false,false,false,false,false]
    let messages = ['passing the correct format of date then function return true',
                    'Passing incorrect format then function returns false',
                    'for unfdefined value function return false',
                    'for null value function return false',
                    'for empty string then also function return false']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(isMMDDYYYYFormat(input[i],))
            .toEqual(output[i])
        })
    }
    
})

//Test for isQQYYYYFormat
describe('Testing on function isQQYYYYFormat',()=>{

    let input = ["QQ/YYYY","MM/YYYY",undefined,null,""]
    let output = [true,false,false,false,false,false]
    let messages = ['passing the correct format of date then function return true',
                    'Passing incorrect format then function returns false',
                    'for unfdefined value function return false',
                    'for null value function return false',
                    'for empty string then also function return false']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(isQQYYYYFormat(input[i],))
            .toEqual(output[i])
        })
    }
    
})

// Test for isMMYYYYFormat
describe('Testing on function isMMYYYYFormat',()=>{

    let input = ["MM/YYYY","DD/YYYY",undefined,null,""]
    let output = [true,false,false,false,false,false]
    let messages = ['passing the correct format of date then function return true',
                    'Passing incorrect format then function returns false',
                    'for unfdefined value function return false',
                    'for null value function return false',
                    'for empty string then also function return false']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(isMMYYYYFormat(input[i],))
            .toEqual(output[i])
        })
    }
    
})

//Test for isYYYFormat
describe('Testing on function isYYYFormat',()=>{

    let input = ["YYYY","MM/YYYY",undefined,null,""]
    let output = [true,false,false,false,false,false]
    let messages = ['passing the correct format of date then function return true',
                    'Passing incorrect format then function returns false',
                    'for unfdefined value function return false',
                    'for null value function return false',
                    'for empty string then also function return false']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(isYYYFormat(input[i],))
            .toEqual(output[i])
        })
    }
    
})

//Test for getConvertedDateYYYYMMDDD
describe('Testing on function getConvertedDateYYYYMMDDD',()=>{

    let input = ["05/2019","2019/12/02"]
    let output = ['2019-05-01','12-2019-01']
    let messages = ['passing the correct format of date then function return date in valid format YYYY-MM-DD',
                    'Passing incorrect format then function returns reulst in incorrect format']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(getConvertedDateYYYYMMDDD(input[i],))
            .toEqual(output[i])
        })
    }
    
})

// Test for getUpperLimitFromOptions
describe('Testing on function getUpperLimitFromOptions',()=>{
    let options = {
        upperLimit : '01/01/2050'
    }
    let options2 = {
        lowerLimit : '01/01/1000'
    }
    let options3 = {}
    let input = [options,options2,options3]
    let output = ['01/01/2050',null,null]
    let messages = ['passing the correct format of date then function return date in valid format YYYY-MM-DD',
                    'Passing incorrect format then function returns reulst in incorrect format']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(getUpperLimitFromOptions(input[i],))
            .toEqual(output[i])
        })
    }
})

// Test for getLowerLimitFromOptions
describe('Testing on function getLowerLimitFromOptions',()=>{
    let options = {
        upperLimit : '01/01/2050'
    }
    let options2 = {
        lowerLimit : '01/01/1000'
    }
    let options3 = {}
    let input = [options,options2,options3]
    let output = [null,'01/01/1000',null]
    let messages = ['passing the correct format of date then function return date in valid format YYYY-MM-DD',
                    'Passing incorrect format then function returns reulst in incorrect format']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(getLowerLimitFromOptions(input[i],))
            .toEqual(output[i])
        })
    }
})

//Test for  getSelectedMonthFromDate
describe('Testing on function getSelectedMonthFromDate',()=>{
    let input = ['05/16/2019','2019/08/15','02/2019/04','',undefined]
    let output = [4,7,NaN,NaN,NaN]
    let messages = ['passing the correct format of date then function return month of the date ',
                    'Passing changed format then function still returns the month of the date ',
                    'Passing invalid format of the date then function retruns NaN',
                    'Passing empty string then the funtion returns NaN']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(getSelectedMonthFromDate(input[i],))
            .toEqual(output[i])
        })
    }
}) 

// Test for getSelectedYearFromDate
describe('Testing on function getSelectedYearFromDate',()=>{
    let input = ['05/16/2019','2019/08/15','02/2019/04','',undefined]
    let output = [2019,2019,NaN,NaN,NaN]
    let messages = ['passing the correct format of date then function return full year of the date ',
                    'Passing changed format then function still returns the full year of the date ',
                    'Passing invalid format of the date then function retruns NaN',
                    'Passing empty string then the funtion returns NaN']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(getSelectedYearFromDate(input[i],))
            .toEqual(output[i])
        })
    }
}) 

// Test for getMonthShortNameByIndex
describe('Testing on function getMonthShortNameByIndex',()=>{
    test('Passing index no. function return short name of that months',()=>{
        expect(getMonthShortNameByIndex(11)).toEqual('DEC')
    })
    test('Passing index no. function return short name of that months',()=>{
        expect(getMonthShortNameByIndex(5)).toEqual('JUN')
    })
})

// Test for getMonthNameByIndex
describe('Testing on function getMonthShortNameByIndex',()=>{
    test('Passing index no. function return short name of that months',()=>{
        expect(getMonthNameByIndex(11)).toEqual('DECEMBER')
    })
    test('Passing index no. function return short name of that months',()=>{
        expect(getMonthNameByIndex(5)).toEqual('JUNE')
    })
})

// Test for getMonthIndex
describe('Testing on function getMonthIndex',()=>{
    let input = ['Dec','Jun','June']
    let output = ['12','06','00']
    let messages = ['Passing short name to the function return index no. of that months',
                    'Passing short name to the function return index no. of that months ',
                    "Passing invalid name to the function then function retruns '00'"]
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(getMonthIndex(input[i],))
            .toEqual(output[i])
        })
    }
})

// Test for zeroPad
describe('Testing on function zeroPad',()=>{

    test('Passing any number the function padd zero to that ',()=>{
        expect(zeroPad(10,4)).toEqual('0010')
    })
    test('Passing any number the function padd zero to that ',()=>{
        expect(zeroPad(8,5,'-')).toEqual('----8')
    })

})

//Test for  getMonthDays
describe('Testing on function  getMonthDays',()=>{
    let inputMonth = [4,2,8,undefined]
    let inputYear = [2019,2020,undefined,undefined]
    let output = [30,29,31,31]
    let messages = ['Passing valid month and year to the function it returns no. of days',
                    'Passing  2nd of month and leap year to the function return no. of days in months of feb i.e 29 ',
                    "Passing valid month and undefind year so that it will took default current year as its year to the function then function retruns no.days in month",
                    "Passing both month and year undefined so that function shows current month year days"]
    for (let i = 0; i < inputMonth.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(getMonthDays(inputMonth[i],inputYear[i]))
            .toEqual(output[i])
        })
    }

})

//Test for getPreviousMonth
describe('Testing on the function getPreviousMonth',()=>{

    test('Passing valid month and year then function normally gives object of the previuos month',()=>{
        expect(getPreviousMonth(4,2019)).toEqual({month:3,year:2019})
    })
    test('Passing both month and year undefined then function normally gives object of month 12 and year NaN',()=>{
        expect(getPreviousMonth()).toEqual({month:12,year:NaN})
    })
})

//Test for getNextMonth
describe('Testing on the function getNextMonth',()=>{
    let inputMonth = [4,12,8,undefined]
    let inputYear = [2019,2019,undefined,undefined]
    let output = [{month:5,year:2019},{month:1,year:2020},{month:9,year:undefined},{month:1,year:NaN}]
    let messages = ['Passing valid month and year to the function returns its Object for next month with year',
                    'Passing  month value 12 or greate then it then function return object of month value to 1 and next year ',
                    "Passing valid month and undefind year so that function retruns month value next to given and year will be undefined",
                    "Passing both month and year undefined so that function return object of month value 1 and year NaN"]
    for (let i = 0; i < inputMonth.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(getNextMonth(inputMonth[i],inputYear[i]))
            .toEqual(output[i])
        })
    }
})

// Test for isDate
describe('Testing on function isDate',()=>{
    let date = new Date()
    let notDate = '12/2019/02'
    let input = [date,notDate,undefined]
    let output = [true,false,false]
    let messages = ['Passing current date the function will return true',
                    'Passing invalid date then function still returns false',
                    'Passing undefined date format of the date then function retruns false']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(isDate(input[i],))
            .toEqual(output[i])
        })
    }

})

// Test for isSameDay
describe('Testing on function isSameDay',()=>{

    let date = new Date()
    let date1 = new Date('08/26/2019')
    let baseDate1 = new Date('08/26/2019')
    let input = [date,date1,undefined]
    let baseDates = [undefined,baseDate1,undefined]
    let output = [true,true,false]
    let messages = ['Passing current date and udefined then function will return true',
                    'Passing any valid  date and for basedate same date is passed then function will return true',
                    'Passing both value undefined in place of date and basedate  then function retruns false']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(isSameDay(input[i],baseDates[i]))
            .toEqual(output[i])
        })

    }                       
})

// Test for getIsoDate
describe('Testing on function getIsoDate',()=>{

    let date = new Date()
    let date1 = new Date('8/26/2019')
    let d = '09/24/2019'

    let outputDate1 = dateFormat(date)

    function dateFormat( date){
        let month = '' +(1+ date.getMonth())
        if (month.length < 2) month = '0' + month;
        let day = ''+ date.getDate()
        if (day.length < 2) day = '0' + day;

        let year = ''+date.getFullYear();

        date = [year,month,day].join('-')
        return date
    }
    

    
    let input = [date,date1,undefined,null,d]
    let output = [outputDate1,'2019-08-26',outputDate1,null,null]
    let messages = ['Passing current date the function will return date n format YYYY-MM-DD',
                    'Passing any date then function still returns date in format YYYY-MM-DD',
                    'Passing undefined then function retruns current date in format YYYY-MM-DD',
                    'Passing null to function then it return null',
                    'Passing some string of then it returns null']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(getIsoDate(input[i]))
            .toEqual(output[i])
        })

    }                       
})

// Test for checkDateInBetween
describe('Testing on function checkDateInBetween',()=>{
    let date = new Date('09/12/2019')
    let from  = new Date('02/05/2019')
    let to = new Date('12/25/2019')
    let dateOutofRange = new Date('01/01/2020')
    let input = [date,undefined,date,date,date,dateOutofRange]
    let fromDates = [from,from,undefined,from,undefined,from]
    let toDates = [to,to,to,undefined,undefined,to]
    let output = [true,false,true,true,true,false]
    let messages = ['Passing Current Date, From date and To date then function will return true if date is in between from and to',
                    'Passing undefined Date, valid From date and valid To date then function will return false because of date value passed as undefined',
                    'Passing valid Date ,udefined From date and valid To date then also  function retruns True but condition is date should previous date to To date',
                    'Passing valid Date ,valid From date and Undefined To date then function retruns true but condition is date should after date to From date',
                    'Passing valid Date and both From and To dates are undefined in that condition function will return true',
                    'Passing valid Date but this is not in range of From and To dates so the function returns flase']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(checkDateInBetween(input[i],fromDates[i],toDates[i]))
            .toEqual(output[i])
        })
    }      
})

// Test for isValidOutsideRangeDateQQYear
describe('Testing on function isValidOutsideRangeDateQQYear',()=>{

    let options = {
        lowerLimit:'Q1/2000',
        upperLimit:'Q4/2015',
        displayFormat:'QQ/YYYY',
        disabledList :true
    }
    let options1 = {
        lowerLimit:undefined,
        upperLimit:'Q4/2015',
        displayFormat:'QQ/YYYY',
        disabledList :true
    }
    let options2 = {
        lowerLimit:'Q1/2000',
        upperLimit:undefined,
        displayFormat:'QQ/YYYY',
        disabledList :true
    }
    let options3 = {
        lowerLimit:undefined,
        upperLimit:undefined,
        displayFormat:'QQ/YYYY',
        disabledList :true
    }
    let date = 'Q3/2013'
    let dateOutRange = 'Q4/2017'
    let input = [date,date,date,date,dateOutRange,'','']
    let optionsArray = [options,options1,options2,options3,options,options,options3]
    let output = [true,true,true,true,false,false,true]
    let messages = ['Passing date and options the function will return true because date passed it is between lower and upper limit in qq/YYYY format',
                    'Passing date, lowerLimit is undefined and upperLimit is Valid date then function returns true ',
                    'Passing date, lowerLimit is valid date and upperLimit is undefined date then function returns true',
                    'Passing date and both lowerlimit and upperLimit are undefined then function then it return true',
                    'Passing date is out of range then function  returns false',
                    'Passing in place of date empty string and lower and upper limit is valid then it returns false',
                    'Passing in place of date empty string and lower and upper limit is also undefined then it returns true']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(isValidOutsideRangeDateQQYear(input[i],optionsArray[i]))
            .toEqual(output[i])
        })

    }    
})

// Test for isValidOutsideRangeDateYear
describe('Testing on function isValidOutsideRangeDateYear',()=>{

    let options = {
        lowerLimit:'2000',
        upperLimit:'2015',
        displayFormat:'YYYY',
        disabledList :[]
    }
    let options1 = {
        lowerLimit:undefined,
        upperLimit:'2015',
        displayFormat:'YYYY',
        disabledList :[]
    }
    let options2 = {
        lowerLimit:'2000',
        upperLimit:undefined,
        displayFormat:'YYYY',
        disabledList :[]
    }
    let options3 = {
        lowerLimit:undefined,
        upperLimit:undefined,
        displayFormat:'YYYY',
        disabledList :[]
    }
    let year = '2014'
    let yearOutofRange = '2018'
    let input = [year,year,year,year,yearOutofRange,'','']
    let optionsArray = [options,options1,options2,options3,options,options,options3]
    let output = [true,true,true,true,false,false,true]
    let messages = ['Passing year and options the function will return true because year passed it is between lower and upper limit in YYYY format',
                    'Passing year, lowerLimit is undefined and upperLimit is Valid year then function returns true ',
                    'Passing year, lowerLimit is valid year and upperLimit is undefined date then function returns true',
                    'Passing year and both lowerlimit and upperLimit are undefined then function then it return true',
                    'Passing year is out of range then function  returns false',
                    'Passing in place of year empty string and lower and upper limit is valid then it returns false',
                    'Passing in place of year empty string and lower and upper limit is also undefined then it returns true']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(isValidOutsideRangeDateYear(input[i],optionsArray[i]))
            .toEqual(output[i])
        })

    }    
})

// Test for isValidOutsideRangeDateMonthYear
describe('Testing on function isValidOutsideRangeDateMonthYear',()=>{

    let options = {
        lowerLimit:'02/01/2000',
        upperLimit:'05/01/2015',
        displayFormat:'MM/YYYY',
        disabledList :[]
    }
    let options1 = {
        lowerLimit:undefined,
        upperLimit:'05/01/2015',
        displayFormat:'MM/YYYY',
        disabledList :[]
    }
    let options2 = {
        lowerLimit:'02/01/2000',
        upperLimit:undefined,
        displayFormat:'MM/YYYY',
        disabledList :[]
    }
    let options3 = {
        lowerLimit:undefined,
        upperLimit:undefined,
        displayFormat:'MM/YYYY',
        disabledList :[]
    }

    let date = '04/2013'
    let dateOutofRange = '09/2018'
    test('testing',()=>{
        expect(isValidOutsideRangeDateMonthYear(date,options)).toEqual(true)
    })

    let input = [date,date,date,date,dateOutofRange,'','']
    let optionsArray = [options,options1,options2,options3,options,options,options3]
    let output = [true,true,true,true,false,false,false]
    let messages = ['Passing year and options the function will return true because year passed it is between lower and upper limit in YYYY format',
                    'Passing year, lowerLimit is undefined and upperLimit is Valid year then function returns true ',
                    'Passing year, lowerLimit is valid year and upperLimit is undefined date then function returns true',
                    'Passing year and both lowerlimit and upperLimit are undefined then function then it return true',
                    'Passing year is out of range then function  returns false',
                    'Passing in place of year empty string and lower and upper limit is valid then it returns false',
                    'Passing in place of year empty string and lower and upper limit is also undefined then it returns true']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(isValidOutsideRangeDateMonthYear(input[i],optionsArray[i]))
            .toEqual(output[i])
        })

    }    
})

// Test for isValidOutsideRangeDate
describe('Testing on function isValidOutsideRangeDate',()=>{

    let options1 = {
        lowerLimit:'02/01/2000',
        upperLimit:'05/01/2018',
        displayFormat:'MM/DD/YYYY',
        disabledList :''
    }
    let options2 = {
        lowerLimit:'02/01/2000',
        upperLimit:'05/01/2019',
        displayFormat:'MM/DD/YYYY',
        disabledList :'03/06/2012'
    }
    let options3 = {
        lowerLimit:undefined,
        upperLimit:'05/01/2019',
        displayFormat:'MM/DD/YYYY',
        disabledList :''
    }
    let options4 = {
        lowerLimit:'02/01/2000',
        upperLimit:undefined,
        displayFormat:'MM/DD/YYYY',
        disabledList :''
    }
    let options5 = {
        lowerLimit:undefined,
        upperLimit:undefined,
        displayFormat:'MM/DD/YYYY',
        disabledList :''
    }
    let date1 = '04/06/2012'
    let dateOutofRange = '01/01/2020'
    let input = [date1,date1,date1,date1,dateOutofRange,date1,'','',dateOutofRange]
    let optionsArray = [options1,options2,options3,options4,options1,options5,options1,options5,options5]
    let output = [true,false,true,true,false,true,false,true,true]
    let messages = ['Passing date and options the function will return true because date passed it is between lower and upper limit',
                    'Passing date which is present in disabledLIst so function will return false because it is in disbaled list',
                    'Passing date, lowerLimit is undefined and upperLimit is Valid year then function returns true ',
                    'Passing date, lowerLimit is valid year and upperLimit is undefined date then function returns true',
                    'Passing date is out of range then function  returns false',
                    'Passing  both lowerlimit and upperLimit are undefined then function then it return true',
                    'Passing in place of date empty string and lower and upper limit is valid then it returns false',
                    'Passing in place of date empty string and lower and upper limit is also undefined then it returns true',
                    'Pasing date is out of range and lower and upper limit is also udefined then function true']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(isValidOutsideRangeDate(input[i],optionsArray[i]))
            .toEqual(output[i])
        })

    }    
})

// Test for resetOptions
describe('Testing on function resetOptions',()=>{
    let options ={myproperty:'five'}
    DEFAULT_OPTIONS['myproperty'] = 'five';
    test('Adding a new property to DEFAULT_OPTIONS and then checking property got merged or not',()=>{
        expect(resetOptions(options)).toEqual(DEFAULT_OPTIONS)
    })
    let options1 = {
        "iconAlignment":"right"
    }
    DEFAULT_OPTIONS['iconAlignment'] = 'right'
    test('Changing the existing value and then same changes happen in DEFAULT_OPTIONS',()=>{
        expect(resetOptions(options1)).toEqual(DEFAULT_OPTIONS)
    })

})

// Test for getYYYYForLowerLimit
describe('Testing on function getYYYYForLowerLimit',()=>{

    let options = {
        lowerLimit : 'Q2/1990',
        displayFormat :'QQ/YYYY'
    }
    let options1 = {
        displayFormat:'MM/YYYY'
    }
    let options2 = {  
        lowerLimit:'07/02/1992',
        displayFormat:'MM/YYYY'
    }
    let options3 = {  
        displayFormat:'YYYY'
    }
    let options4 = {
        lowerLimit:'07/02/1992',
        displayFormat:'YYYY'
    }
    let options5 = {  
        displayFormat:'MM/DD/YYYY'
    }
    let options6 = {  
        lowerLimit:'07/02/1992',
        displayFormat:'MM/DD/YYYY'
    }
    let options7 = {  
        lowerLimit:'07/02/1992',
        displayFormat:'DD/MM/YYYY'
    }
    let options8 = {}
    let input = [options,options1,options2,options3,options4,options5,options6,options6,options7.options8]
    let output = [{lowerMonthLimit: 'Q2', lowerYearLimit: 1990},{},{lowerMonthLimit: '07', lowerYearLimit: 1992},{},{lowerYearLimit:1992},{},{lowerMonthLimit: 7, lowerYearLimit:1992},{lowerMonthLimit: 7, lowerYearLimit:1992},{}]
    let messages = ['Passing options object to the function will return object specifying its lower quarter month limit and its lower year limit',
                    'Passing options1 object without giving its property lowerLimit then functon will return empty object',
                    'Passing options2 object with MM/YYYY format then function will return object specifying its lower month limit and its lower year limit.',
                    'Passing options3 object with YYYY format without giving its property lowerLimit then functon will return empty object ',
                    'Passing options4 object with YYYY format then function will return object specifying its lower year limit.',
                    'Passing options5 object with MM/DD/YYYY format without giving its property lowerLimit then functon will return empty object',
                    'Passing options6 object with MM/DD/YYYY format then function will return lower month limit and lower year limit',
                    'Passing options7 object with DD/MM/YYYY format then function will return lower month limit and lower year limit',
                    'Passing empty onbject options8 then the function is also return empty object']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(getYYYYForLowerLimit(input[i]))
            .toEqual(output[i])
        })

    }    

})

// Test for getYYYYForUpperLimit
describe('Testing on function getYYYYForUpperLimit',()=>{

    let options = {
        upperLimit : 'Q2/2020',
        displayFormat :'QQ/YYYY'
    }
    let options1 = {
        displayFormat:'MM/YYYY'
    }
    let options2 = {  
        upperLimit:'07/02/2020',
        displayFormat:'MM/YYYY'
    }
    let options3 = {  
        displayFormat:'YYYY'
    }
    let options4 = {
        upperLimit:'07/02/2020',
        displayFormat:'YYYY'
    }
    let options5 = {  
        displayFormat:'MM/DD/YYYY'
    }
    let options6 = {  
        upperLimit:'07/02/2020',
        displayFormat:'MM/DD/YYYY'
    }
    let options7 = {  
        upperLimit:'07/02/2020',
        displayFormat:'DD/MM/YYYY'
    }
    let options8 = {}
    let input = [options,options1,options2,options3,options4,options5,options6,options7,options8]
    let output = [{upperMonthLimit: 'Q2', upperYearLimit: 2020},{},{upperMonthLimit: '07', upperYearLimit: 2020},{},{upperYearLimit:2020},{},{upperMonthLimit: 7, upperYearLimit:2020},{upperMonthLimit: 7, upperYearLimit:2020},{}]
    let messages = ['Passing options object to the function will return object specifying its upper quarter month limit and its upper year limit',
                    'Passing options1 object without giving its property upperLimit then functon will return empty object',
                    'Passing options2 object with MM/YYYY format then function will return object specifying its upper month limit and its upper year limit.',
                    'Passing options3 object with YYYY format without giving its property upperLimit then functon will return empty object ',
                    'Passing options4 object with YYYY format then function will return object specifying its upper year limit.',
                    'Passing options5 object with MM/DD/YYYY format without giving its property upperLimit then functon will return empty object',
                    'Passing options6 object with MM/DD/YYYY format then function will return upper month limit and upper year limit',
                    'Passing options7 object with DD/MM/YYYY format then function will return upper month limit and upper year limit',
                    'Passing empty object options8 then the function is also return empty object']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(getYYYYForUpperLimit(input[i]))
            .toEqual(output[i])
        })

    }    

})

// Test for isEqual
describe('Testing for function isEqual',()=>{

    let inputStr1 = ['jstigers','india',1234,'',undefined]
    let inputStr2 = ['jstigers','pakistan',1234,'',undefined]
    let output = [true,false,true,'', undefined ]
    let messages = ['Passing to same string then fucntion will return true',
                    'Passing to different string then the function will return true',
                    ''] 
    for (let i = 0; i < inputStr1.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(isEqual(inputStr1[i],inputStr2[i]))
            .toEqual(output[i])
        })

    }    
})

// Test for getInvalidDateMessage
describe('Testing on function getInvalidDateMessage',()=>{

    test('If is date is invalid then then function shows msg "Invalid Date"',()=>{
        expect(getInvalidDateMessage('',true,false)).toEqual('Invalid Date')
    })
    test('If date is not valid then the function shows msg "Invalid Date"',()=>{
        expect(getInvalidDateMessage('',true,true)).toEqual('Invalid Date')
    })
    test('If the date is valid but not in range the function return msg "Outside allowed range"',()=>{
        expect(getInvalidDateMessage('',false,true)).toEqual('Outside allowed range')
    })
    test('If the format of date is not valid then function give the msg "Not in valid format" ',()=>{
        expect(getInvalidDateMessage([{inValidFormat:'Not in valid format'},{inValidFormat:'Not in valid format'}],true,false)).toEqual('Not in valid format')
    })
    test('If date is valid and is invalid range then the function return "Outside allowed range"',()=>{
        expect(getInvalidDateMessage([{outsideRange:'Outside Range value'}],false,true)).toEqual('Outside allowed range')
    })
    test('If both date and its range is valid',()=>{
        expect(getInvalidDateMessage([{outsideRange:'Outside Range value'}],false,false)).toEqual('')
    })
    test('If both date and range si invalid',()=>{
        expect(getInvalidDateMessage([{inValidFormat:'Not in valid format'}],true,true)).toEqual('Not in valid format')
    })

})

// Test for getNewUpdateDateByArrow
describe('Testing on function getNewUpdateDateByArrow',()=>{

    let options = {

        disabledList:['02/03/2019']
    }
    test('testing',()=>{
        expect(getNewUpdateDateByArrow('02/03/2019',true,options,'MM/DD/YYYY','02/01/2000','01/01/2020',39,true,true)).toEqual()
    })
})


// Test for dateIsInDisabledList
describe('Testing on the function dateIsInDisabledList',()=>{

    let value1 = new Date('05/07/2020')
    let options1 = {
        disabledList:'05/07/2020'
    }
    let newDate2 = new Date('03/04/2019')
    let options2 = {
        disabledList:'04/05/2019'
    }
    let newDate3 = new Date('07/21/2019')
    let options3 = {
        disabledList:['02/19/2018','11/21/2008','10/23/2015']

    }
    let newDate4 = new Date('1/26/1993')
    let options4 = {
        disabledList:['09/25/2023','01/26/1993','12/20/2020']
    }
    let newDate5 = '11/02/2020'
    let options5 = {
        disabledList : '11/07/2020'
    }

    let input = [value1,newDate2,newDate3,newDate4,newDate5]
    let optionsArray = [options1,options2,options3,options4,options5]
    let output = [true,true,false,true,true]
    let messages = ['Passing date to the function and the same date is present in disabled list then function will return true that date is present in the list',
                    'Passing date which is not present in disabledLIst but year is same so function will return true because of same year',
                    'Passing date which is not present in the disabledList Array so function will return false.',
                    'Passing date which is present in disabledList Array then function will return true',
                    'Passing date which is not present in the disabledList but date month and year are same so the function will return true']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(dateIsInDisabledList(input[i],optionsArray[i]))
            .toEqual(output[i])
        })
    }    
})

// Test for valueIsInDisabledList
describe('Testing on function valueIsInDisabledList',()=>{

    let value1 = '09/08/2018'
    let options1 = {
        disabledList:'09/08/2018'
    }
    let value2 = '2014'
    let options2 = {
        disabledList:'03/04/2014'
    }
    let value3 = '06/08/2013'
    let options3 = {
        disabledList: '07/22/1996'
    }
    let value4 = '04/03/2020'
    let options4 = {
        disabledList: ['02/24/2010','04/03/2020','09/04/2017']
    }
    let value5 = '06/08/2013'
    let options5 = {
        disabledList: ['02/24/2010','04/03/2020','09/04/2017']
    }
    let value6 = '2019'
    let options6 = {
        disabledList:'12/14/2014'
    }
    let input = [value1,value2,value3,value4,value5,value6]
    let optionsArray = [options1,options2,options3,options4,options5,options6]
    let output = [true,true,false,true,false,false]
    let messages = ['Passing date to the function and the same date is present in disabled list then function wil return true that date is present in the list',
                    'Passing date which is not present in disabledLIst but year is same so function will return true because of same year',
                    'Passing date which is not present in the disabledList Array so function will return false.',
                    'Passing date which is present in disabledList Array then function will return true',
                    'Passing date which is not present in the disabledList but date month and year are same so the function will return true']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(valueIsInDisabledList(input[i],optionsArray[i]))
            .toEqual(output[i])
        })
    }    

})

// Test for checkIsInValidLowerUpper
describe('Testing on the function checkIsInValidLowerUpper',()=>{

    let options1={
        lowerLimit:new Date('01/01/1990'),
        upperLimit:new Date('12/31/2030')
    }
    let options2 = {
        lowerLimit:undefined,
        upperLimit:new Date('12/31/2030')
    } 
    let options3 = {
        lowerLimit:new Date('01/01/1990'),
        upperLimit:undefined
    } 
    let options4 = {
        lowerLimit:undefined,
        upperLimit:undefined
    } 
    let options5 = {
        lowerLimit:new Date('01/1990'),
        upperLimit:new Date('31/2030')
    }
    let options6 = {
        lowerLimit:new Date('01/1990'),
        upperLimit:new Date('01/31/2030')
    }
    let options7 = {
        lowerLimit:new Date('01/23/1990'),
        upperLimit:new Date('31/2030')
    }

    test('testing',()=>{
        expect(checkIsInValidLowerUpper(options5)).toEqual(true)
    })

    let input = [options1,options2,options3,options4,options5,options6,options7]
    let output = [false,false,false,true,true,false,false]
    let messages = ['Passing options object having vaid lower and upper limit then the function in isInvalidLowerUpper return false because they are vaild dates',
                    'Passing options object having undefined lower limit and valid upper limit then the function in isInvalidLowerUpper return false because upper limit is vaild dates',
                    'Passing options object having valid lower limit and undefined upper limit then the function in isInvalidLowerUpper return false because lower limit is vaild dates',
                    'Passing options object having both lower limit and  upper limit are undefined then the function in isInvalidLowerUpper return true because they are Invaild dates',
                    'Passing options object having both lower limit and  upper limit are inValid dates then the function in isInvalidLowerUpper return true because they are Invaild dates',
                    'Passing options object having Invaid lower and valid upper limit then the function in isInvalidLowerUpper return false because upper limit is vaild dates',
                    'Passing options object having vaid lower and Invalid upper limit then the function in isInvalidLowerUpper return false because lower limit is vaild dates']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(checkIsInValidLowerUpper(input[i]))
            .toEqual(output[i])
        })
    }    

})

// Test for isLeft
describe('Testing on function isLeft',()=>{

    let value1 = "Left"
    let value2 = 'notLeft'
    test('Passing value whose value is "left" which is equals to the "Left" so the function returns true',()=>{
        expect(isLeft(value1)).toEqual(true)
    })
    test('Passing value whose value is "notLeft" which is not equal to "left" so function return false',()=>{
        expect(isLeft(value2)).toEqual(false)
    })
})

// Test for isRight
describe('Testing on function isRight',()=>{

    let value1 = "Right"
    let value2 = 'notRight'
    test('Passing value whose value is "Right" which is equals to the "right" so the function returns true',()=>{
        expect(isRight(value1)).toEqual(true)
    })
    test('Passing value whose value is "notRightt" which is not equal to "right" so function return false',()=>{
        expect(isRight(value2)).toEqual(false)
    })
})

// Test for checkFullMonthOrYearDisabled
describe('Testing on function checkFullMonthOrYearDisabled',()=>{

    let date1 = '01/02/2020'
    let disabledList1 = '01/02/2020'

    let date2 = '04/25/2018'
    let disabledList2 = '02/21/2017'

    let date3 = '2019'
    let disabledList3 = '03/09/2019'
    
    let date4 = '4/09/2018'
    let disabledList4 = '04/02/2018'

    

    test('testing',()=>{
        expect(checkFullMonthOrYearDisabled(date4,disabledList4)).toEqual(false)
    })

    let input = [date1,date2,date3,date4,undefined,undefined]
    let disabledListArray = [disabledList1,disabledList2,disabledList3,disabledList4,disabledList1,undefined]
    let output = [false,true,false,false,true,true]
    let messages = ['Passing date and disabledList if date is present in disabledList then function will return false',
                    'Passing date and disabledList, here date is not present in disabledList then function will return true',
                    'here in place of full date date I passed only year then this year is present in disabledList then the function return false',
                    'Passing date and disabledList but in date value month and year is present in disabledList then function will return false',
                    'Passing date which is undefined to the function then it will return true',
                    'passing both value undefined then function will return true.']
    for (let i = 0; i < input.length; i++) {
        test(`${messages[i]}`,()=>{
            expect(checkFullMonthOrYearDisabled(input[i],disabledListArray[i]))
            .toEqual(output[i])
        })
    }    
})

