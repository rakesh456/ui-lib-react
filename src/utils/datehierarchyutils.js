export const DEFAULT_OPTIONS = { 'lowerLimit': new Date().getFullYear(), 'upperLimit': new Date().getFullYear() + 1, "showQuaters": true, 'showWeeks': false };

export const MONTH_NAMES = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

export const MONTH_SHORT_NAMES = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

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
	if (showWeeks === false) {
		var quarterArray = [{
			"quarter": "Q1",
			"showChild": false,
			"state": 0,
			"months": [
				{
					"month": "Jan",
					"showChild": false,
					"state": 0,
					"days": getMonthDays(1, year),
				},
				{
					"month": "Feb",
					"showChild": false,
					"state": 0,
					"days": getMonthDays(2, year),

				},
				{
					"month": "Mar",
					"showChild": false,
					"state": 0,
					"days": getMonthDays(3, year)
				}
			]
		},
		{
			"quarter": "Q2",
			"showChild": false,
			"state": 0,
			"months": [
				{
					"month": "Apr",
					"showChild": false,
					"state": 0,
					"days": getMonthDays(4, year)
				},
				{
					"month": "May",
					"showChild": false,
					"state": false,
					"days": getMonthDays(5, year)
				},
				{
					"month": "Jun",
					"showChild": false,
					"state": 0,
					"days": getMonthDays(6, year)
				}
			]
		},
		{
			"quarter": "Q3",
			"showChild": false,
			"state": 0,
			"months": [
				{
					"month": "Jul",
					"showChild": false,
					"state": 0,
					"days": getMonthDays(7, year)
				},
				{
					"month": "Aug",
					"showChild": false,
					"state": 0,
					"days": getMonthDays(8, year)
				},
				{
					"month": "Sep",
					"showChild": false,
					"state": 0,
					"days": getMonthDays(9, year)
				}
			]
		},
		{
			"quarter": "Q4",
			"showChild": false,
			"state": 0,
			"months": [
				{
					"month": "Oct",
					"showChild": false,
					"state": 0,
					"days": getMonthDays(10, year)
				},
				{
					"month": "Nov",
					"showChild": false,
					"state": 0,
					"days": getMonthDays(11, year)
				},
				{
					"month": "Dec",
					"showChild": false,
					"state": 0,
					"days": getMonthDays(12, year)
				}
			]
		}
		]
	} else {
		quarterArray = [
			{
				"quarter": "Q1",
				"showChild": false,
				"state": 0,
				"months": [{
					"month": "Jan",
					"showChild": false,
					"state": 0,
					"weeks": getMonthWeeks(1, year)
				},
				{
					"month": "Feb",
					"showChild": false,
					"state": 0,
					"weeks": getMonthWeeks(2, year),

				},
				{
					"month": "Mar",
					"showChild": false,
					"state": 0,
					"weeks": getMonthWeeks(3, year)
				}
				]
			},
			{
				"quarter": "Q2",
				"showChild": false,
				"state": 0,
				"months": [{
					"month": "Apr",
					"showChild": false,
					"state": 0,
					"weeks": getMonthWeeks(4, year)
				},
				{
					"month": "May",
					"showChild": false,
					"state": false,
					"weeks": getMonthWeeks(5, year)
				},
				{
					"month": "Jun",
					"showChild": false,
					"state": 0,
					"weeks": getMonthWeeks(6, year)
				}
				]
			},
			{
				"quarter": "Q3",
				"showChild": false,
				"state": 0,
				"months": [{
					"month": "Jul",
					"showChild": false,
					"state": 0,
					"weeks": getMonthWeeks(7, year)
				},
				{
					"month": "Aug",
					"showChild": false,
					"state": 0,
					"weeks": getMonthWeeks(8, year)
				},
				{
					"month": "Sep",
					"showChild": false,
					"state": 0,
					"weeks": getMonthWeeks(9, year)
				}
				]
			},
			{
				"quarter": "Q4",
				"showChild": false,
				"state": 0,
				"months": [{
					"month": "Oct",
					"showChild": false,
					"state": 0,
					"weeks": getMonthWeeks(10, year)
				},
				{
					"month": "Nov",
					"showChild": false,
					"state": 0,
					"weeks": getMonthWeeks(11, year)
				},
				{
					"month": "Dec",
					"showChild": false,
					"state": 0,
					"weeks": getMonthWeeks(12, year)
				}
				]
			}
		]
	}
	return quarterArray;
}

export const getListOfYears = function (lowerLimit, upperLimit, showWeeks, disabledList) {
	if (lowerLimit > 999 && upperLimit > 999 && (lowerLimit <= upperLimit) && lowerLimit % 1 === 0 && upperLimit % 1 === 0) {
		let initial = lowerLimit;
		let final = upperLimit;
		let years = [];
		while (lowerLimit <= upperLimit) {
			var year = {
				"year": parseInt(lowerLimit),
				"showChild": false,
				"state": 0,
				"quarters": getChildren(lowerLimit, showWeeks)
			}
			years.push(year);
			lowerLimit++;
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
		var weekobj = { week: "Week " + weekNo, state: 0, showChild: false, days: [] }
		for (var i = start; i < (lastOfMonth).getDate() + 1; i++) {
			var monthDate = new Date(year, month_number - 1, i);
			var dayObj = { date: i, day: weekdays[monthDate.getDay()], state: 0 };
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
    let _val = (val)? val.toString() : '';
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