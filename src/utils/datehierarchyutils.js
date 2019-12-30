export const DEFAULT_OPTIONS = { 'lowerLimit': new Date().getFullYear(), 'upperLimit': new Date().getFullYear() + 1, "showQuarters": true, 'showWeeks': false };

export const MONTH_NAMES = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

export const MONTH_SHORT_NAMES = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

export const MONTH_SHORT_NAMES_TITLE_CASE = ["Jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

export const WEEK_NAMES = ["week 1", "week 2", "week 3", "week 4", "week 5"];

// Function to reset options with default options
export const resetDateHierarchyOptions = (options) => {
	return { ...DEFAULT_OPTIONS, ...options };
}

export const getMonthDays = (month, year) => {
	const months30 = [4, 6, 9, 11];
	const leapYear = year % 4 === 0;
	let day = month === 2
		? leapYear
			? 29
			: 28
		: (months30.indexOf(month) !== -1)
			? 30
			: 31;
	var days = [];
	for (let i = 1; i <= day; i++) {
		var dayObj = { day: i, state: 0 }
		days.push(dayObj);
	}
	return days;
}

export const getChildren = function (year, showWeeks) {
	let quarterArray = [];
	for (let i=0; i<4; i++) {
		let quarter = { "quarter": "Q" + (i+1),
						"searchString": "q"+ (i+1),
						"showChild": false,
						"state": 0,
						"months": []
						};
		for (let j=0; j<3; j++) {
			var month = {
						"month": MONTH_SHORT_NAMES_TITLE_CASE[3*i + j],
						"searchString": MONTH_NAMES[3*i + j],
						"showChild": false,
						"state": 0			
						};
			quarter["months"].push(month);
		}		
		quarterArray.push(quarter);
	}
	console.log(quarterArray);

	if (showWeeks === false) {
		quarterArray.forEach((quarter, qIndex) => {
			quarter.months.forEach((month, mIndex) => {
				month["days"] = getMonthDays(3*qIndex+mIndex+1, year);
			})
		})		
	} else {
		quarterArray.forEach((quarter, qIndex) => {
			quarter.months.forEach((month, mIndex) => {
				month["weeks"] = getMonthWeeks(3*qIndex+mIndex+1, year);
			})
		})
	}
	console.log(quarterArray);
	return quarterArray;
}
export const getMonths = function (year, showWeeks, disabledList) {
	let months = [];
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	if (showWeeks === false) {
		for (var i = 0; i < 12; i++) {
			var monthObj = { "month": monthNames[i], "showChild": false, "state": 0, "days": getMonthDays(i + 1, year, disabledList) }
			months.push(monthObj);
		}
		return months;
	}
	else {
		for (i = 0; i < 12; i++) {
			monthObj = { "month": monthNames[i], "showChild": false, "state": 0, "weeks": getMonthWeeks(i + 1, year, disabledList) }
			months.push(monthObj);
		}
		return months;
	}
}

export const getListOfYears = function (lowerLimit, upperLimit, showWeeks, showQuarters, disabledList) {

	if (lowerLimit > 999 && upperLimit > 999 && (lowerLimit <= upperLimit) && lowerLimit % 1 === 0 && upperLimit % 1 === 0) {
		let initial = lowerLimit;
		lowerLimit = parseInt(lowerLimit);
		let final = upperLimit;
		let years = [];
		if (showQuarters === true) {
			while (lowerLimit <= upperLimit) {
				var year = {
					"year": lowerLimit,
					"searchString": lowerLimit.toString().toLowerCase(),
					"showChild": false,
					"state": 0,
					"quarters": getChildren(lowerLimit, showWeeks, disabledList)
				}
				years.push(year);
				lowerLimit++;
			}			
		}
		if (showQuarters === false) {
			while (lowerLimit <= upperLimit) {
				year = {
					"year": lowerLimit,
					"searchString": lowerLimit.toString().toLowerCase(),
					"showChild": false,
					"state": 0,
					"months": getMonths(lowerLimit, showWeeks, disabledList)
				}
				years.push(year);
				lowerLimit++;
			}

		}
		
		if (disabledList) {
			for (var i = 0; i < disabledList.length; i++) {
				if (disabledList[i] >= initial && disabledList[i] <= final)
					years.splice(disabledList[i] - lowerLimit, 1);
			}
		}

		return years;
	}

	else {
		lowerLimit = 2;
		upperLimit = 1;
		let years = [];
		while (lowerLimit <= upperLimit) {
			year = {
				"year": lowerLimit,
				"searchString": lowerLimit.toString().toLowerCase(),
				"showChild": false,
				"state": 0,
				"quarters": getChildren(lowerLimit)
			}
			years.push(year);
			lowerLimit++;
		}
		return years;
	}
}

export const getMonthWeeks = function (month_number, year) {
	var firstOfMonth = new Date(year, month_number - 1, 1);
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
	for (let weekNo = 1; weekNo <= Math.ceil(used / 7); weekNo++) {
		var weekobj = { week: "Week " + weekNo, searchString: "week " + weekNo, state: 0, showChild: false, days: [] }
		for (var i = start; i < (lastOfMonth).getDate() + 1; i++) {
			var monthDate = new Date(year, month_number - 1, i);
			var dayObj = { date: i, searchString: i.toString().toLowerCase(), day: weekdays[monthDate.getDay()], state: 0 };
			weekobj.days.push(dayObj);
			if (monthDate.getDay() === 6) {
				start = i + 1;
				break;
			}
		}
		weeks.push(weekobj);
	}
	return weeks;
}

// Function to check string is quater value
export const isQuaterVal = (val) => {
	let _val = (val) ? val.toString() : '';
	return (_val === '1' || _val === '2' || _val === '3' || _val === '4' || _val === 'Q1' || _val === 'Q2' || _val === 'Q3' || _val === 'Q4' || _val === 'Q' || _val === 'q1' || _val === 'q2' || _val === 'q3' || _val === 'q4' || _val === 'q');
}

// Function to check string is month value
export const isMonthVal = (val) => {
	let _val = (val) ? val.toString() : '';
	let isExists = false;
	MONTH_SHORT_NAMES.forEach((month) => {
		let n = (month.indexOf(_val.toLowerCase()) !== -1);
		if (n === true) {
			isExists = true;
		}
	});
	return isExists;
}

// Function to check string is weeks value
export const isWeekVal = (val) => {
	let _val = (val) ? val.toString() : '';
	let isExists = false;
	WEEK_NAMES.forEach((month) => {
		let n = (month.indexOf(_val.toLowerCase()) !== -1);
		if (n === true) {
			isExists = true;
		}
	});
	return isExists;
}

// Function to check string is day value
export const isDayVal = (val) => {
	let _val = (val) ? parseInt(val) : '';
	return (_val <= 1 || _val <= 31);
}