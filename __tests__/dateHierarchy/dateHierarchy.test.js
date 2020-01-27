import DatehierarchyView from "../../src/components/DateHierarchy/datehierarchyView";
import YearDisplay from "../../src/components/DateHierarchy/yearDisplay";
import QuarterView from "../../src/components/DateHierarchy/quarterView";
import MonthView from "../../src/components/DateHierarchy/monthView";
import WeekDaysView from "../../src/components/DateHierarchy/weekDaysView";
import DateHierarchy from "../../src/components/DateHierarchy/date-hierarchy";
import React from "react";
import ReactDOM from "react-dom";
import { mount, shallow } from "enzyme";
import { getListOfYears, resetDateHierarchyOptions } from "../../src/utils/datehierarchyutils";
import tree from "react-icons/lib/fa/tree";

// DateHierarchy renders without crashing
test("DateHierarchy component renders without crashing", () => {
    const div = document.createElement("div");
    const options = { "lowerLimit": "2020", "upperLimit": "2025", "showWeeks": false, "showQuarters": true, "disabledList": ["2021", "10/2020", "8/2022", "q3/2020", "Q2/2023", "w1/12/2020", "11/01/2020", "11/11/2022"] };
    ReactDOM.render(<DateHierarchy options={options} />, div);
});

// On passing Show Quarters=true the immidiate child of year should be quarter
test("The immidiate child of year should be quarter if showQuarter=true", () => {
    let options = { "lowerLimit": "2020", "upperLimit": "2025", "showWeeks": false, "showQuarters": true, "disabledList": [] };
    let years = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
    expect(Boolean(years[0].quarters)).toEqual(true);
})

// On passing SHow Quarters = false immidiate child of year should be Months
test('The immidiate child of year should be Month if showQuarter=false', () => {
    let options = { "lowerLimit": "2020", "upperLimit": "2025", "showWeeks": false, "showQuarters": false, "disabledList": [] };
    let years = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
    expect(Boolean(years[0].months)).toEqual(true);
})

//On passing showWeeks = true immidiate child of Months should be Weeks
test('The immidiate child of month should be week if showWeek=true', () => {
    let options = { "lowerLimit": "2020", "upperLimit": "2025", "showWeeks": true, "showQuarters": false, "disabledList": [] };
    let years = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
    expect(Boolean(years[0].months[0].weeks)).toEqual(true);
})

//On passing showWeeks = false immidiate chld of Months should be days
test('The immidiate child of month should be day when showWeek=false', () => {
    let options = { "lowerLimit": "2020", "upperLimit": "2025", "showWeeks": false, "showQuarters": false, "disabledList": [] };
    let years = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
    expect(Boolean(years[0].months[0].days)).toEqual(true);
})

// Disable the year if it is in the dataoption's disabledList.
test('Year Array should not contain the year which is in the disabledList', () => {
    let options = { "lowerLimit": "2020", "upperLimit": "2025", "showWeeks": false, "showQuarters": false, "disabledList": ['2023'] };
    let years = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
    var yearArray = [];
    years.forEach(year => {
        yearArray.push(year.year);
    });
    expect(yearArray).toEqual([2020, 2021, 2022, 2024, 2025]);
})

//Disable the Quarter if it is in the dataoption's disabledList.
test('Quarter Array should not contain the year Quarter which is in the disabledList', () => {
    let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": false, "showQuarters": true, "disabledList": ['Q1/2020'] };
    let years = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
    var QuarterArray = [];
    years[0].quarters.forEach(quarter => {
        QuarterArray.push(quarter.quarter);
    });
    expect(QuarterArray).toEqual(['Q2', 'Q3', 'Q4']);
})

// Disable the Month if it is in the dataoptions's disabledList.
test('Month Array should not contain the Month which is in the DisabledList', () => {
    let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": false, "showQuarters": false, "disabledList": ['10/2020', '5/2020', '06/2020'] };
    let years = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
    var MonthArray = [];
    years[0].months.forEach(month => {
        MonthArray.push(month.month);
    });
    expect(MonthArray).toEqual(['Jan', 'Feb', 'Mar', 'Apr', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec']);
})

// Disable the Week if it is in the dataoption's disableList.
test('Week Array should not contain the Week which is in the DisabledList', () => {
    let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": ['W1/01/2020'] };
    let years = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
    var WeekArray = [];
    years[0].months[0].weeks.forEach(week => {
        WeekArray.push(week.week);
    });
    expect(WeekArray).toEqual(['Week 2', 'Week 3', 'Week 4', 'Week 5']);
})

// Disable the Day if it is in the dataoptions,s disabledList.
test('Days Array should not contain the day which is in the disabledList', () => {
    let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": false, "showQuarters": false, "disabledList": ['01/01/2020', '01/05/2020', '1/25/2020', '01/18/2020'] };
    let years = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
    var DayArray = [];
    years[0].months[0].days.forEach(day => {
        DayArray.push(day.day);
    });
    expect(DayArray).toEqual([2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 30, 31]);
})

// There should be an indicator point on the year if there is any Quarter is disabled.
test('There should be an indicator point on the year if there is any quarter is disabled', () => {
    let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": false, "showQuarters": true, "disabledList": ['Q1/2020'] };
    let years = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
    expect(Boolean(years[0].hasDisabled)).toEqual(true);
})

// There should be an indicator point on the year if there is any Month is disabled, When showQaurters = false.
test('There should be an indicator point on the year if there is any month is disabled if and only if showQuarters=false', () => {
    let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": false, "showQuarters": false, "disabledList": ['10/2020', '5/2020'] };
    let years = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
    expect(Boolean(years[0].hasDisabled)).toEqual(true);
})

// There should be an indicator point on the Quarter if there is any Month is disabled.
test('there should be an indicator point on the Quarter if there is any Month is Disabled ', () => {
    let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": false, "showQuarters": true, "disabledList": ['1/2020'] };
    let years = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
    expect(Boolean(years[0].quarters[0].hasDisabled)).toEqual(true);
})

//There should be an indicator point on the Month if there is any Week is disabled.
test('There should be an indicator point on the Month if there is any Week is Disabled if and only if there showWeeks=true', () => {
    let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": ['w1/1/2020'] };
    let years = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
    expect(Boolean(years[0].months[0].hasDisabled)).toEqual(true);
})

//There should be an indicator point on the Month if there is any day is disabled.
test('There should be an indicator point on the Month if there is any day is disabled if and only if showWeeks=false', () => {
    let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": false, "showQuarters": false, "disabledList": ['1/1/2020'] };
    let years = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
    expect(Boolean(years[0].months[0].hasDisabled)).toEqual(true);
})

//There should be an indicator point on the Week if there is any Day is Disabled.
test('There should be an indicator point on the Week if there is any Day is disabled if and only if showWeeks=true', () => {
    let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": ['1/1/2020', '04/1/2020'] };
    let years = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
    expect(Boolean(years[0].months[0].weeks[0].hasDisabled)).toEqual(true);
})

//All the children should be checked if the parent's checkbox is checked.
test('All the children should be checked if the checkbox of parent is checked', () => {
    let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": ['1/1/2020', '04/1/2020'] };
    let wrapper = shallow(<DatehierarchyView options={options} />);
    console.log(wrapper.debug());
    // wrapper.find('.VS-Plus-Minus').simulate('click');
    // console.log('years',wrapper.instance());
})

// 1.Toggle the Year to expand and collapse on clicking the +/- button.
describe("Toggle the Year to expand and collapse on clicking the +/- button.",()=>{


    test('Check if + is clicked Year will get expand',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": [] }
        const wrapper = mount(<DatehierarchyView options={options} />)
        // wrapper.setState({
        //     isSearching :true
        // })
        // wrapper.update()
        console.log(wrapper.debug())
        wrapper.find('.VS-Plus-Minus').simulate('click')
        // wrapper.update()
        
        // console.log(wrapper.debug())
        expect(wrapper.find('MonthView').length).toEqual(1)
    })

    test('Check if - is Clicked Year will get collapsed',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": [] }
        const wrapper = mount(<DatehierarchyView options={options} />)
        // wrapper.setState({
        //     isSearching :true
        // })
        // wrapper.update()
        // console.log(wrapper.debug())
        wrapper.find('.VS-Plus-Minus').simulate('click')
        wrapper.find('.VS-Plus-Minus').simulate('click')
        wrapper.update()
        
        // console.log(wrapper.debug())
        expect(wrapper.find('MonthView').length).toEqual(0)
    })
})

// 2.Toggle the Quarter to expand and collapse on clicking the +/- button.
describe('Toggle the Quarter to expand and collapse on clicking the +/- button.',()=>{

    test('Check if + is clicked Quater will get expand',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": true, "disabledList": [] }

        const wrapper = mount(<DatehierarchyView options={options} />)
        // wrapper.setState({
        //     isSearching :true
        // })
        // wrapper.update()
        // console.log(wrapper.debug())
        wrapper.find('.VS-Plus-Minus').simulate('click')
        wrapper.find('.VS-Quarter-Plus-Minus').at(0).simulate('click')
        wrapper.update()
        
        // console.log(wrapper.debug())
        expect(wrapper.find('MonthView').length).toEqual(1)

    })

    test('Check if - is clicked Quater will get collapse',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": true, "disabledList": [] }

        const wrapper = mount(<DatehierarchyView options={options} />)
        // wrapper.setState({
        //     isSearching :true
        // })
        // wrapper.update()
        // console.log(wrapper.debug())
        wrapper.find('.VS-Plus-Minus').simulate('click')
        wrapper.find('.VS-Quarter-Plus-Minus').at(0).simulate('click')
        wrapper.find('.VS-Quarter-Plus-Minus').at(0).simulate('click')
        wrapper.update()
        
        // console.log(wrapper.debug())
        expect(wrapper.find('MonthView').length).toEqual(0)

    })
})

// 3.Toggle the Month to expand and collapse on clicking the +/- button.
describe('Toggle the Month to expand and collapse on clicking the +/- button.',()=>{

    test('Check if + is clicked month will get expand',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": [] }

        const wrapper = mount(<DatehierarchyView options={options} />)
        // wrapper.setState({
        //     isSearching :true
        // })
        // wrapper.update()
        // console.log(wrapper.debug())
        wrapper.find('.VS-Plus-Minus').simulate('click')
        wrapper.find('.VS-Month-Plus-Minus').at(0).simulate('click')
        wrapper.update()
        
        // console.log(wrapper.debug())
        expect(wrapper.find('WeekDaysView').length).toEqual(1)
    })

    test('Check if - is clicked Quater will get collapse',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": [] }

        const wrapper = mount(<DatehierarchyView options={options} />)
        // wrapper.setState({
        //     isSearching :true
        // })
        // wrapper.update()
        // console.log(wrapper.debug())
        wrapper.find('.VS-Plus-Minus').simulate('click')
        wrapper.find('.VS-Month-Plus-Minus').at(0).simulate('click')
        wrapper.find('.VS-Month-Plus-Minus').at(0).simulate('click')
        wrapper.update()
        
        // console.log(wrapper.debug())
        expect(wrapper.find('WeekDaysView').length).toEqual(0)
    })
})

// 4.Toggle the Week to expand and collapse on clicking the +/- button.
describe('Toggle the Week to expand and collapse on clicking the +/- button',()=>{

    test('testing expand ',()=>{

        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": [] }
        const wrapper = mount(<DatehierarchyView options={options} />)
        // wrapper.setState({
        //     isSearching :true
        // })
        // wrapper.update()
        // console.log(wrapper.debug())
        wrapper.find('.VS-Plus-Minus').simulate('click')
        wrapper.find('.VS-Month-Plus-Minus').at(0).simulate('click')
        wrapper.find('.VS-week-Plus-Minus').at(0).simulate('click')

        wrapper.update()
        
        // console.log(wrapper.debug())
        expect(wrapper.find('.VS-WeekDayRow').length).toEqual(4)

    })

    test('testing collapse ',()=>{

        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": [] }
        const wrapper = mount(<DatehierarchyView options={options} />)
        // wrapper.setState({
        //     isSearching :true
        // })
        // wrapper.update()
        // console.log(wrapper.debug())
        wrapper.find('.VS-Plus-Minus').simulate('click')
        wrapper.find('.VS-Month-Plus-Minus').at(0).simulate('click')
        wrapper.find('.VS-week-Plus-Minus').at(0).simulate('click')
        wrapper.find('.VS-week-Plus-Minus').at(0).simulate('click')
        wrapper.update()
        
        // console.log(wrapper.debug())
        expect(wrapper.find('.VS-WeekDayRow').length).toEqual(0)

    })
})

// 9.Toggle the check box sign on clicking it, it should be either checked or unchecked.
describe("Toggle the check box sign on clicking it, it should be either checked or unchecked.",()=>{

    test('If click happens checkBox then it should be checked',()=>{

        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": [] }
        const wrapper = mount(<DatehierarchyView options={options} />)
        // console.log(wrapper.find("input").at(2).props())
        wrapper.find("input").at(2).simulate('change')
        expect(wrapper.find("input").at(2).props().checked).toEqual(1)

    })

    test('If click happens on checked checkBox then it should be unchecked',()=>{

        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": [] }
        const wrapper = mount(<DatehierarchyView options={options} />)
        // console.log(wrapper.find("input").at(2).props())
        wrapper.find("input").at(2).simulate('change')
        wrapper.find("input").at(2).simulate('change')
        expect(wrapper.find("input").at(2).props().checked).toEqual(0)

    })
})

// 10. On checking the parent's checkbox all type of its child's checkbox should also be checked.
describe('On checking the parents checkbox all type of its childs checkbox should also be checked.',()=>{
 
    test('testing',()=>{

        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": [] }
        const wrapper = mount(<DatehierarchyView options={options} />)
        //  
        console.log(wrapper.debug())
        wrapper.find('.VS-Plus-Minus').simulate('click')
        wrapper.find("input").at(2).simulate('change')
        console.log(wrapper.debug())
        // expect(wrapper.find("input").at(2).props().checked).toEqual(true)

    })
})

// 11. Parent's checkbox should be partially checked if all the child's of the same are not checked.
describe('Parents checkbox should be partially checked if all the childs of the same are not checked.',()=>{

    test('If some childs of parent are checked then parent ',()=>{

        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": [] }
        const wrapper = mount(<DatehierarchyView options={options} />)
        //  
        console.log(wrapper.debug())
        wrapper.find('.VS-Plus-Minus').simulate('click')
        wrapper.find("input").at(3).simulate('change')
        console.log(wrapper.debug())
        expect(wrapper.find("input").at(2).props().checked).toEqual(-1)

    })
})