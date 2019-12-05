export const getChildren = function (year) {
  
  var quarterArray = [{
  "quarter": "Q1-" + year,
  "isShowChild": false,
  "isChecked": false,
  "children": [{
    "month": "Jan",
    "isShowChild": false,
    "isChecked": false,
    "children": []
   },
   {
    "month": "Feb",
    "isShowChild": false,
    "isChecked": false,
    "children": []

   },
   {
    "month": "March",
    "isShowChild": false,
    "isChecked": false,
    "children": []
   }
  ]
 },
 {
  "quarter": "Q2",
  "isShowChild": false,
  "isChecked": false,
  "children": [{
    "month": "April",
    "isShowChild": false,
    "isChecked": false,
    "children": []
   },
   {
    "month": "May",
    "isShowChild": false,
    "isChecked": false,
    "children": []
   },
   {
    "month": "June",
    "isShowChild": false,
    "isChecked": false,
    "children": []
   }
  ]
 },
 {
  "quarter": "Q3",
  "isShowChild": false,
  "isChecked": false,
  "children": [{
    "month": "July",
    "isShowChild": false,
    "isChecked": false,
    "children": []
   },
   {
    "month": "August",
    "isShowChild": false,
    "isChecked": false,
    "children": []
   },
   {
    "month": "September",
    "isShowChild": false,
    "isChecked": false,
    "children": []
   }
  ]
 },
 {
  "quarter": "Q4",
  "isShowChild": false,
  "isChecked": false,
  "children": [{
    "month": "October",
    "isShowChild": false,
    "isChecked": false,
    "children": []
   },
   {
    "month": "November",
    "isShowChild": false,
    "isChecked": false,
    "children": []
   },
   {
    "month": "December",
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