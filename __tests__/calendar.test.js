import {isCalendarFormat,isYearFormat,isValidQQYYYYValue,isValidDDMMYYYYValue,isValidMMYYYYValue,isValidYYYYValue,isDDMMYYYYFormat,isMMDDYYYYFormat,isQQYYYYFormat,isMMYYYYFormat,isYYYFormat,getConvertedDateYYYYMMDDD,getUpperLimitFromOptions,getLowerLimitFromOptions,getSelectedMonthFromDate,DEFAULT_OPTIONS,getSelectedYearFromDate,getMonthShortNameByIndex,getMonthNameByIndex,getMonthIndex,zeroPad, getMonthDays,getPreviousMonth,getNextMonth,isDate} from '../src/utils/calendar';

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
                    'Passing quater value more then 4 then function returns false',
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