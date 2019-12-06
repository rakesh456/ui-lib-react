export const getChildren = function (year) {
  
  var quarterArray = [{
  "quarter": "Q1-" + year,
  "ShowChild": false,
  "state": 0,
  "children": [{
    "month": "Jan-"+year,
    "ShowChild": false,
    "state": 0,
    "children": []
   },
   {
    "month": "Feb-"+year,
    "ShowChild": false,
    "state": 0,
    "children": []

   },
   {
    "month": "March-"+year,
    "ShowChild": false,
    "state": 0,
    "children": []
   }
  ]
 },
 {
  "quarter": "Q2-"+year,
  "ShowChild": false,
  "state": 0,
  "children": [{
    "month": "April-"+year,
    "ShowChild": false,
    "state": 0,
    "children": []
   },
   {
    "month": "May-"+year,
    "ShowChild": false,
    "state": false,
    "children": []
   },
   {
    "month": "June-"+year,
    "ShowChild": false,
    "state": 0,
    "children": []
   }
  ]
 },
 {
  "quarter": "Q3-"+year,
  "ShowChild": false,
  "state": 0,
  "children": [{
    "month": "July-"+year,
    "ShowChild": false,
    "state": 0,
    "children": []
   },
   {
    "month": "August-"+year,
    "ShowChild": false,
    "state": 0,
    "children": []
   },
   {
    "month": "September-"+year,
    "ShowChild": false,
    "state": 0,
    "children": []
   }
  ]
 },
 {
  "quarter": "Q4-"+year,
  "ShowChild": false,
  "state": 0,
  "children": [{
    "month": "October-"+year,
    "ShowChild": false,
    "state": 0,
    "children": []
   },
   {
    "month": "November-"+year,
    "ShowChild": false,
    "state": 0,
    "children": []
   },
   {
    "month": "December-"+year,
    "ShowChild": false,
    "state": 0,
    "children": []
   }
  ]
 }
]
return quarterArray;
}
export const getListOfYears = function(lowerLimit, upperLimit) {

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
  