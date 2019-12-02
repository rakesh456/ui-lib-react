export const CHILDREN = [{
  "quarter": "Q1",
  "isShowChild": false,
  "children": [{
    "month": "Jan",
    "isShowChild": false,
    "children": []
   },
   {
    "month": "Feb",
    "isShowChild": false,
    "children": []

   },
   {
    "month": "March",
    "isShowChild": false,
    "children": []
   }
  ]
 },
 {
  "quarter": "Q2",
  "isShowChild": false,
  "children": [{
    "month": "April",
    "isShowChild": false,
    "children": []
   },
   {
    "month": "May",
    "isShowChild": false,
    "children": []
   },
   {
    "month": "June",
    "isShowChild": false,
    "children": []
   }
  ]
 },
 {
  "quarter": "Q3",
  "isShowChild": false,
  "children": [{
    "month": "July",
    "isShowChild": false,
    "children": []
   },
   {
    "month": "August",
    "isShowChild": false,
    "children": []
   },
   {
    "month": "September",
    "isShowChild": false,
    "children": []
   }
  ]
 },
 {
  "quarter": "Q4",
  "isShowChild": false,
  "children": [{
    "month": "October",
    "isShowChild": false,
    "children": []
   },
   {
    "month": "November",
    "isShowChild": false,
    "children": []
   },
   {
    "month": "December",
    "isShowChild": false,
    "children": []
   }
  ]
 }
]
export const getListOfYears = function(lowerLimit, upperLimit) {

    let years = [];
    while (lowerLimit <= upperLimit) {
     var year = {
      "year": lowerLimit,
      "isShowChild": false,
      "children": CHILDREN
     }
     years.push(year);
     lowerLimit++;
    }
    return years;
   }