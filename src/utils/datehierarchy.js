
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
export const getChildren = function (year, showWeeks) {
  if(showWeeks === false){
  
  var quarterArray = [{
  "quarter": "Q1-" + year,
  "showChild": false,
  "state": 0,
  "children": [{
    "month": "Jan-"+year,
    "showChild": false,
    "state": 0,
    "children": getMonthDays(1, year),
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
}
else{
   quarterArray = [{
    "quarter": "Q1",
    "showChild": false,
    "state": 0,
    "children": [{
      "month": "Jan",
      "showChild": false,
      "state": 0,
      "children": getMonthWeeks(1, year)
     },
     {
      "month": "Feb",
      "showChild": false,
      "state": 0,
      "children":getMonthWeeks(2, year),
  
     },
     {
      "month": "Mar",
      "showChild": false,
      "state": 0,
      "children": getMonthWeeks(3, year)
     }
    ]
   },
   {
    "quarter": "Q2",
    "showChild": false,
    "state": 0,
    "children": [{
      "month": "Apr",
      "showChild": false,
      "state": 0,
      "children":getMonthWeeks(4, year)
     },
     {
      "month": "May",
      "showChild": false,
      "state": false,
      "children":getMonthWeeks(5, year)
     },
     {
      "month": "Jun",
      "showChild": false,
      "state": 0,
      "children": getMonthWeeks(6, year)
     }
    ]
   },
   {
    "quarter": "Q3",
    "showChild": false,
    "state": 0,
    "children": [{
      "month": "Jul",
      "showChild": false,
      "state": 0,
      "children": getMonthWeeks(7, year)
     },
     {
      "month": "Aug",
      "showChild": false,
      "state": 0,
      "children": getMonthWeeks(8, year)
     },
     {
      "month": "Sep",
      "showChild": false,
      "state": 0,
      "children": getMonthWeeks(9, year)
     }
    ]
   },
   {
    "quarter": "Q4",
    "showChild": false,
    "state": 0,
    "children": [{
      "month": "Oct",
      "showChild": false,
      "state": 0,
      "children": getMonthWeeks(10, year)
     },
     {
      "month": "Nov",
      "showChild": false,
      "state": 0,
      "children": getMonthWeeks(11, year)
     },
     {
      "month": "Dec",
      "showChild": false,
      "state": 0,
      "children": getMonthWeeks(12, year)
     }
    ]
   }
  ]
}
return quarterArray;
}
export const getListOfYears = function(lowerLimit, upperLimit, showWeeks) {
if(lowerLimit > 999 && upperLimit>999 && (lowerLimit <= upperLimit) && lowerLimit % 1 ===0 && upperLimit % 1 === 0)
{
    let years = [];
    while (lowerLimit <= upperLimit) {
     var year = {
      "year":parseInt(lowerLimit),
      "showChild": false,
      "state": 0,
      "children": getChildren(lowerLimit, showWeeks)
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
      year = {
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



  export const getMonthWeeks = function (month_number,year ) {

    var firstOfMonth = new Date(year, month_number-1, 1);
    var lastOfMonth = new Date(year, month_number, 0);
    var used = firstOfMonth.getDay() + lastOfMonth.getDate();
    var weeks = [];
    var start = 1;
    var weekdays = new Array(7);
    weekdays[0] = "Sun";
    weekdays[1] = "Mon";
    weekdays[2] = "Tue";
    weekdays[3] = "Wed";
    weekdays[4] = "Thu";
    weekdays[5] = "Fri";
    weekdays[6] = "Sat";
    for(let weekNo = 1; weekNo <=  Math.ceil(used/7); weekNo++){
      var weekobj = { week : "Week "+ weekNo, state: 0, showChild: false, children:[]}
      for(var i = start; i < (lastOfMonth).getDate()+1;i++ ){
          var monthDate = new Date(year, month_number-1, i);
          var dayObj = {date: i, day: weekdays[monthDate.getDay()], state: 0}; 
          weekobj.children.push(dayObj);
          if(monthDate.getDay()===6){
              start = i + 1;
              break;
          }
      }
      weeks.push(weekobj);
    }
    return weeks;
}
