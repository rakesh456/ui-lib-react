export const getChildren = function (year) {
  
  var quarterArray = [{
  "quarter": "Q1-" + year,
  "isShowChild": false,
  "isChecked": false,
  "children": [{
    "month": "Jan-"+year,
    "isShowChild": false,
    "isChecked": false,
    "children": []
   },
   {
    "month": "Feb-"+year,
    "isShowChild": false,
    "isChecked": false,
    "children": []

   },
   {
    "month": "March-"+year,
    "isShowChild": false,
    "isChecked": false,
    "children": []
   }
  ]
 },
 {
  "quarter": "Q2-"+year,
  "isShowChild": false,
  "isChecked": false,
  "children": [{
    "month": "April-"+year,
    "isShowChild": false,
    "isChecked": false,
    "children": []
   },
   {
    "month": "May-"+year,
    "isShowChild": false,
    "isChecked": false,
    "children": []
   },
   {
    "month": "June-"+year,
    "isShowChild": false,
    "isChecked": false,
    "children": []
   }
  ]
 },
 {
  "quarter": "Q3-"+year,
  "isShowChild": false,
  "isChecked": false,
  "children": [{
    "month": "July-"+year,
    "isShowChild": false,
    "isChecked": false,
    "children": []
   },
   {
    "month": "August-"+year,
    "isShowChild": false,
    "isChecked": false,
    "children": []
   },
   {
    "month": "September-"+year,
    "isShowChild": false,
    "isChecked": false,
    "children": []
   }
  ]
 },
 {
  "quarter": "Q4-"+year,
  "isShowChild": false,
  "isChecked": false,
  "children": [{
    "month": "October-"+year,
    "isShowChild": false,
    "isChecked": false,
    "children": []
   },
   {
    "month": "November-"+year,
    "isShowChild": false,
    "isChecked": false,
    "children": []
   },
   {
    "month": "December-"+year,
    "isShowChild": false,
    "isChecked": false,
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
      "isShowChild": false,
      "isChecked": false,
      "children": getChildren(lowerLimit)
     }
     years.push(year);
     lowerLimit++;
    }
    return years;
   }