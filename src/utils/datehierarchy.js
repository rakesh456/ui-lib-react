
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
  "showChild": false,
  "state": 0,
  "children": [{
    "month": "Jan-"+year,
    "showChild": false,
    "state": 0,
    "children": getMonthDays(1, year)
   },
   {
    "month": "Feb-"+year,
    "showChild": false,
    "state": 0,
    "children":getMonthDays(2, year),

   },
   {
    "month": "Mar-"+year,
    "showChild": false,
    "state": 0,
    "children": getMonthDays(3, year)
   }
  ]
 },
 {
  "quarter": "Q2-"+year,
  "showChild": false,
  "state": 0,
  "children": [{
    "month": "Apr-"+year,
    "showChild": false,
    "state": 0,
    "children":getMonthDays(4, year)
   },
   {
    "month": "May-"+year,
    "showChild": false,
    "state": false,
    "children":getMonthDays(5, year)
   },
   {
    "month": "Jun-"+year,
    "showChild": false,
    "state": 0,
    "children": getMonthDays(6, year)
   }
  ]
 },
 {
  "quarter": "Q3-"+year,
  "showChild": false,
  "state": 0,
  "children": [{
    "month": "Jul-"+year,
    "showChild": false,
    "state": 0,
    "children": getMonthDays(7, year)
   },
   {
    "month": "Aug-"+year,
    "showChild": false,
    "state": 0,
    "children": getMonthDays(8, year)
   },
   {
    "month": "Sep-"+year,
    "showChild": false,
    "state": 0,
    "children": getMonthDays(9, year)
   }
  ]
 },
 {
  "quarter": "Q4-"+year,
  "showChild": false,
  "state": 0,
  "children": [{
    "month": "Oct-"+year,
    "showChild": false,
    "state": 0,
    "children": getMonthDays(10, year)
   },
   {
    "month": "Nov-"+year,
    "showChild": false,
    "state": 0,
    "children": getMonthDays(11, year)
   },
   {
    "month": "Dec-"+year,
    "showChild": false,
    "state": 0,
    "children": getMonthDays(12, year)
   }
  ]
 }
]
return quarterArray;
}
export const getListOfYears = function(lowerLimit, upperLimit) {
if(lowerLimit > 999 && upperLimit>999 && (lowerLimit <= upperLimit) && lowerLimit % 1 ==0 && upperLimit % 1 == 0)
{
  console.log("lowerLimit",lowerLimit);
    let years = [];
    while (lowerLimit <= upperLimit) {
     var year = {
      "year":parseInt(lowerLimit),
      "showChild": false,
      "state": 0,
      "children": getChildren(lowerLimit)
     }
     years.push(year);
     lowerLimit++;
    }
    return years;
   }
  
  else
  {
    lowerLimit = 2;
    upperLimit = 1;
    let years = [];
    while (lowerLimit <= upperLimit) {
     var year = {
      "year": lowerLimit,
      "showChild": false,
      "state": 0,
      "children": getChildren(lowerLimit)
     }
     years.push(year);
     lowerLimit++;
    }
    console.error("either lowerLimit or upperLimit is not in valid format");
    return years;
   
    
  }
}