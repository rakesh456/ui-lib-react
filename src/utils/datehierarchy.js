
export const getMonthDays = (month, year) => {
  const months30 = [4, 6, 9, 11];
  const leapYear = year % 4 === 0;

  let day =  month === 2
      ? leapYear
          ? 29
          : 28
      : (months30.indexOf(month) !== -1)
          ? 30
          : 31;
          var days = [];
          for(let i = 1 ; i <= day ; i++){
            var dayObj = {day :i,state : 0}
            days.push(dayObj);
          }
          return days;
}

export const getChildren = function (year) {
  
  var quarterArray = [{
  "quarter": "Q1-" + year,
  "ShowChild": false,
  "state": 0,
  "children": [{
    "month": "Jan-"+year,
    "ShowChild": false,
    "state": 0,
    "children": getMonthDays(1, year)
   },
   {
    "month": "Feb-"+year,
    "ShowChild": false,
    "state": 0,
    "children":getMonthDays(2, year),
    "state":0

   },
   {
    "month": "Mar-"+year,
    "ShowChild": false,
    "state": 0,
    "children": getMonthDays(3, year)
   }
  ]
 },
 {
  "quarter": "Q2-"+year,
  "ShowChild": false,
  "state": 0,
  "children": [{
    "month": "Apr-"+year,
    "ShowChild": false,
    "state": 0,
    "children":getMonthDays(4, year)
   },
   {
    "month": "May-"+year,
    "ShowChild": false,
    "state": false,
    "children":getMonthDays(5, year)
   },
   {
    "month": "Jun-"+year,
    "ShowChild": false,
    "state": 0,
    "children": getMonthDays(6, year)
   }
  ]
 },
 {
  "quarter": "Q3-"+year,
  "ShowChild": false,
  "state": 0,
  "children": [{
    "month": "Jul-"+year,
    "ShowChild": false,
    "state": 0,
    "children": getMonthDays(7, year)
   },
   {
    "month": "Aug-"+year,
    "ShowChild": false,
    "state": 0,
    "children": getMonthDays(8, year)
   },
   {
    "month": "Sep-"+year,
    "ShowChild": false,
    "state": 0,
    "children": getMonthDays(9, year)
   }
  ]
 },
 {
  "quarter": "Q4-"+year,
  "ShowChild": false,
  "state": 0,
  "children": [{
    "month": "Oct-"+year,
    "ShowChild": false,
    "state": 0,
    "children": getMonthDays(10, year)
   },
   {
    "month": "Nov-"+year,
    "ShowChild": false,
    "state": 0,
    "children": getMonthDays(11, year)
   },
   {
    "month": "Dec-"+year,
    "ShowChild": false,
    "state": 0,
    "children": getMonthDays(12, year)
   }
  ]
 }
]
return quarterArray;
}
export const getListOfYears = function(lowerLimit, upperLimit) {
if((lowerLimit % 1 !==0 || upperLimit % 1 !== 0)||(lowerLimit > upperLimit)){
  console.error("either lowerLimit or upperLimit not is in valid format");
}
  parseInt(lowerLimit);
    let years = [];
    while (lowerLimit <= upperLimit) {
     var year = {
      "year": lowerLimit,
      "ShowChild": false,
      "state": 0,
      "children": getChildren(lowerLimit)
     }
     years.push(year);
     lowerLimit++;
    }
    return years;
   }

