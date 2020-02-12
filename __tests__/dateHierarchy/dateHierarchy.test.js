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
import compass from "react-icons/lib/fa/compass";

// DateHierarchy renders without crashing
test("DateHierarchy component renders without crashing", () => {
    const div = document.createElement("div");
    const options = { "lowerLimit": "2020", "upperLimit": "2025", "showWeeks": false, "showQuarters": true, "disabledList": ["2021", "10/2020", "8/2022", "q3/2020", "Q2/2023", "w1/12/2020", "11/01/2020", "11/11/2022"] };
    ReactDOM.render(<DateHierarchy options={options} />, div);
});

// On passing Show Quarters=true the immediate child of year should be quarter
test("The immediate child of year should be quarter if showQuarter=true", () => {
    let options = { "lowerLimit": "2020", "upperLimit": "2025", "showWeeks": false, "showQuarters": true, "disabledList": [] };
    let years = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
    expect(Boolean(years[0].quarters)).toEqual(true);
})

// On passing Show Quarters=true the immediate child of year should be quarter by component
test('On passing Show Quarters=true the immediate child of year should be quarter',()=>{
    let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": false, "showQuarters": true, "disabledList": [] };
    const wrapper = mount(<DatehierarchyView options={options} onChange= {()=>{}}/>)
    wrapper.find('Input').simulate('change',{target:{value:'2020'}})
<<<<<<< HEAD
    wrapper.find('.VS-Plus-Minus').simulate('click')
=======
>>>>>>> 895bacb2a8a235d72376fd6e0ac98009d0d9417c
    expect(wrapper.find('QuarterView').find('div').at(0).props().children[0].props.className).toEqual('VS-QuarterRow');
})


// // On passing SHow Quarters = false immediate child of year should be Months
test('The immediate child of year should be Month if showQuarter=false', () => {
    let options = { "lowerLimit": "2020", "upperLimit": "2025", "showWeeks": false, "showQuarters": false, "disabledList": [] };
    let years = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
    expect(Boolean(years[0].months)).toEqual(true);
})

// On passing SHow Quarters = false immediate child of year should be Months by component
test('On passing SHow Quarters = false immediate child of year should be Months',()=>{
    let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": false, "showQuarters": false, "disabledList": [] };
    const wrapper = mount(<DatehierarchyView options={options} onChange= {()=>{}}/>)
    wrapper.find('.VS-Plus-Minus').simulate('click')
    expect(wrapper.find('MonthView').find('div').at(0).props().children[0].props.className).toEqual('VS-MonthRow');
})

// //On passing showWeeks = true immediate child of Months should be Weeks
test('The immediate child of month should be week if showWeek=true', () => {
    let options = { "lowerLimit": "2020", "upperLimit": "2025", "showWeeks": true, "showQuarters": false, "disabledList": [] };
    let years = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
    expect(Boolean(years[0].months[0].weeks)).toEqual(true);
})

// On passing showWeeks = true immediate child of Months should be Weeks by components 
test('On passing showWeeks = true immediate child of Months should be Weeks',()=>{
    let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": [] };
    const wrapper = mount(<DatehierarchyView options={options} onChange= {()=>{}}/>)
    wrapper.find('.VS-Plus-Minus').simulate('click')
    wrapper.find('.VS-Month-Plus-Minus').at(0).simulate('click')
    expect(wrapper.find('WeekDaysView').find('div').at(0).props().children[0].props.className).toEqual('VS-WeekRow');
})
// //On passing showWeeks = false immediate chld of Months should be days
test('The immediate child of month should be day when showWeek=false', () => {
    let options = { "lowerLimit": "2020", "upperLimit": "2025", "showWeeks": false, "showQuarters": false, "disabledList": [] };
    let years = getListOfYears(options.lowerLimit, options.upperLimit, options.showWeeks, options.showQuarters, options.disabledList);
    expect(Boolean(years[0].months[0].days)).toEqual(true);
})
// On passing showWeeks = false immediate chld of Months should be days by components 
test('On passing showWeeks = false immediate chld of Months should be days',()=>{
    let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": false, "showQuarters": false, "disabledList": [] };
    const wrapper = mount(<DatehierarchyView options={options} />)
    wrapper.find('.VS-Plus-Minus').simulate('click')
    wrapper.find('.VS-Month-Plus-Minus').at(0).simulate('click')
    expect(wrapper.find('MonthView').find('div').at(4).props().className).toEqual('VS-DayRow');
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

<<<<<<< HEAD
=======
//All the children should be checked if the parent's checkbox is checked.
test('All the children should be checked if the checkbox of parent is checked', () => {
    let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": ['1/1/2020', '04/1/2020'] };
    let wrapper = shallow(<DatehierarchyView options={options} />);

    // console.log(wrapper.debug());
    // console.log(wrapper.find('.VS-MonthRow .VS-Checkbox').props());
    // console.log('years',wrapper.instance());
})

>>>>>>> 895bacb2a8a235d72376fd6e0ac98009d0d9417c
// 1.Toggle the Year to expand and collapse on clicking the +/- button.
describe("Toggle the Year to expand and collapse on clicking the +/- button.",()=>{
    test('Check if + is clicked Year will get expand',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": [] }
        const wrapper = mount(<DatehierarchyView options={options} />)
        wrapper.find('.VS-Plus-Minus').simulate('click')
        expect(wrapper.find('MonthView').length).toEqual(1)
    })

    test('Check if - is Clicked Year will get collapsed',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": [] }
        const wrapper = mount(<DatehierarchyView options={options} />)
        wrapper.find('.VS-Plus-Minus').simulate('click')
        wrapper.find('.VS-Plus-Minus').simulate('click')
        wrapper.update()
        expect(wrapper.find('MonthView').length).toEqual(0)
    })
})

// 2.Toggle the Quarter to expand and collapse on clicking the +/- button.
describe('Toggle the Quarter to expand and collapse on clicking the +/- button.',()=>{

    test('Check if + is clicked Quater will get expand',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": true, "disabledList": [] }
        const wrapper = mount(<DatehierarchyView options={options} />)
        wrapper.find('.VS-Plus-Minus').simulate('click')
        wrapper.find('.VS-Quarter-Plus-Minus').at(0).simulate('click')
        wrapper.update()
        expect(wrapper.find('MonthView').length).toEqual(1)

    })

    test('Check if - is clicked Quater will get collapse',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": true, "disabledList": [] }

        const wrapper = mount(<DatehierarchyView options={options} />)
        wrapper.find('.VS-Plus-Minus').simulate('click')
        wrapper.find('.VS-Quarter-Plus-Minus').at(0).simulate('click')
        wrapper.find('.VS-Quarter-Plus-Minus').at(0).simulate('click')
        wrapper.update()
        expect(wrapper.find('MonthView').length).toEqual(0)

    })
})

// 3.Toggle the Month to expand and collapse on clicking the +/- button.
describe('Toggle the Month to expand and collapse on clicking the +/- button.',()=>{

    test('Check if + is clicked month will get expand',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": [] }
        const wrapper = mount(<DatehierarchyView options={options} />)
        wrapper.find('.VS-Plus-Minus').simulate('click')
        wrapper.find('.VS-Month-Plus-Minus').at(0).simulate('click')
        wrapper.update()
        expect(wrapper.find('WeekDaysView').length).toEqual(1)
    })

    test('Check if - is clicked Quater will get collapse',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": [] }
        const wrapper = mount(<DatehierarchyView options={options} />)
        wrapper.find('.VS-Plus-Minus').simulate('click')
        wrapper.find('.VS-Month-Plus-Minus').at(0).simulate('click')
        wrapper.find('.VS-Month-Plus-Minus').at(0).simulate('click')
        wrapper.update()
        expect(wrapper.find('WeekDaysView').length).toEqual(0)
    })
})

// 4.Toggle the Week to expand and collapse on clicking the +/- button.
describe('Toggle the Week to expand and collapse on clicking the +/- button',()=>{
    test('testing expand ',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": [] }
        const wrapper = mount(<DatehierarchyView options={options} />)
        wrapper.find('.VS-Plus-Minus').simulate('click')
        wrapper.find('.VS-Month-Plus-Minus').at(0).simulate('click')
        wrapper.find('.VS-Week-Plus-Minus').at(0).simulate('click')
        wrapper.find('.VS-week-Plus-Minus').at(0).simulate('click')
        wrapper.update()
        expect(wrapper.find('.VS-WeekDayRow').length).toEqual(4)
    })

    test('testing collapse ',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": [] }
        const wrapper = mount(<DatehierarchyView options={options} />)
        wrapper.find('.VS-Plus-Minus').simulate('click')
        wrapper.find('.VS-Month-Plus-Minus').at(0).simulate('click')
        wrapper.find('.VS-Week-Plus-Minus').at(0).simulate('click')
        wrapper.find('.VS-Week-Plus-Minus').at(0).simulate('click')
        wrapper.update()
        expect(wrapper.find('.VS-WeekDayRow').length).toEqual(0)
    })
})

// 9.Toggle the check box sign on clicking it, it should be either checked or unchecked.
describe("Toggle the check box sign on clicking it, it should be either checked or unchecked.",()=>{
    test('If click happens checkBox then it should be checked',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": [] }
        const wrapper = mount(<DatehierarchyView options={options} />)
        wrapper.find("input").at(2).simulate('change')
        expect(wrapper.find("input").at(2).props().checked).toEqual(1)
    })

    test('If click happens on checked checkBox then it should be unchecked',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": [] }
        const wrapper = mount(<DatehierarchyView options={options} />)
        wrapper.find("input").at(2).simulate('change')
        wrapper.find("input").at(2).simulate('change')
        expect(wrapper.find("input").at(2).props().checked).toEqual(0)

    })
})

// 10. On checking the parent's checkbox all type of its child's checkbox should also be checked.
describe('On checking the parents checkbox all type of its childs checkbox should also be checked.',()=>{
    test('testing Year as parent and child as months',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": [] }
        const wrapper = mount(<DatehierarchyView options={options} />)
        wrapper.find('.VS-Plus-Minus').simulate('click')
        wrapper.find("input").at(2).simulate('change')
        for(let i = 0;i<12;i++){
        expect(wrapper.find(".VS-MonthRow .VS-Checkbox").at(i).props().checked).toEqual(1)
        expect(wrapper.find(".VS-MonthRow .VS-Checkbox").at(i).props().checked).toEqual(true)
        }
    })

    test('testing Year as parent and child as quaters',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": true, "disabledList": [] }
        const wrapper = mount(<DatehierarchyView options={options} />)
        wrapper.find('.VS-Plus-Minus').simulate('click')
        wrapper.find("input").at(2).simulate('change')
        for(let i = 0;i<4;i++){
        expect(wrapper.find(".VS-QuarterRow .VS-Checkbox").at(i).props().checked).toEqual(1)
        expect(wrapper.find(".VS-QuarterRow .VS-Checkbox").at(i).props().checked).toEqual(true)
        }
    })

    test('testing Year as quaters and child as months',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": true, "disabledList": [] }
        const wrapper = mount(<DatehierarchyView options={options} />)
        wrapper.find('.VS-Plus-Minus').simulate('click')
        wrapper.find("input").at(2).simulate('change')
        wrapper.find('.VS-Quarter-Plus-Minus').at(0).simulate('click')
        for(let i = 0;i<3;i++){
        expect(wrapper.find(".VS-MonthRow .VS-Checkbox").at(i).props().checked).toEqual(1)
        expect(wrapper.find(".VS-MonthRow .VS-Checkbox").at(i).props().checked).toEqual(true)
        }
        })
})

// 11. Parent's checkbox should be partially checked if all the child's of the same are not checked.
describe('Parents checkbox should be partially checked if all the childs of the same are not checked.',()=>{
    test('If some childs of parent are checked then parent ',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": [] }
        const wrapper = mount(<DatehierarchyView options={options} />)
        wrapper.find('.VS-Plus-Minus').simulate('click')
        wrapper.find("input").at(3).simulate('change')
        expect(wrapper.find("input").at(2).props().checked).toEqual(-1)
    })
})

// 30. Check years list status after close click first time
describe(' Check years list status after close click first time',()=>{
    test('Check years list status after close click first time',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": []}
        const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)
        wrapper.find('Input').simulate('change',{target:{value:'2020'}})
        wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
        expect(wrapper.find('Input').props().value).toEqual('')
    })
})

// 36.State of select all checkbox should be checked if everything is checked or partially checked if something is not checked
describe('State of select all checkbox should be checked if everything is checked or partially checked if something is not checked',()=>{
    test(' fully checked ',()=>{

        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": []}
        const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)
        wrapper.find('Input').simulate('change',{target:{value:'2020'}})
        wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
        expect(wrapper.find('.VS-Checkbox').at(0).props().checked).toEqual(true)

    })

    test(' partical checked ',()=>{

        let options = { "lowerLimit": "2020", "upperLimit": "2021", "showWeeks": true, "showQuarters": false, "disabledList": []}
        const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)
        wrapper.find('Input').simulate('change',{target:{value:'2020'}})
        wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
        expect(wrapper.find('.VS-Checkbox').at(0).props().checked).toEqual(true)

    })
})

// 40.if user search for 1st time and after clicking on the close filter and doing next search with checking exclude from selection except the data searched everything should be checked.
test('if user search for 1st time and after clicking on the close filter and doing next search with checking exclude from selection except the data searched everything should be checked.',()=>{
    let options = { "lowerLimit": "2020", "upperLimit": "2022", "showWeeks": true, "showQuarters": false, "disabledList": []}
        const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)
        wrapper.find('Input').simulate('change',{target:{value:'2020'}})
        wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
        wrapper.find('Input').simulate('change',{target:{value:'2021'}})
        wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(2).simulate('change',{target:{checked:true}})
        wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
        expect(wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(1).props().checked).toEqual(1)
        expect(wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(2).props().checked).toEqual(0)
        expect(wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(3).props().checked).toEqual(1)
})      

//41. if user search any data for the first time and then clicked on close filter then he search again and closes it with exclude from selection and then he is search again some data and closes it with add to previous exclusion then it should exclude the search results from the checked data.
test('if user search any data for the first time and then clicked on close filter then he search again and closes it with exclude from selection and then he is search again some data and closes it with add to previous exclusion then it should exclude the search results from the checked data.',()=>{

    let options = { "lowerLimit": "2020", "upperLimit": "2022", "showWeeks": true, "showQuarters": false, "disabledList": []}
    const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)
    wrapper.find('Input').simulate('change',{target:{value:'2020'}})
    wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
    wrapper.find('Input').simulate('change',{target:{value:'2021'}})
    wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(2).simulate('change',{target:{checked :true}})
    wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(1).simulate('click')
    wrapper.find('Input').simulate('change',{target:{value:'2022'}})
    wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(2).simulate('change',{target:{checked :true}})
    wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
    expect(wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(1).props().checked).toEqual(1)
    expect(wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(2).props().checked).toEqual(0)
    expect(wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(3).props().checked).toEqual(0)
})

// 35. If exclude from selection is already done then Add To Previous exclusion checkbox should be there.
test('If exclude from selection is already done then Add To Previous exclusion checkbox should be there.',()=>{
    let options = { "lowerLimit": "2020", "upperLimit": "2022", "showWeeks": true, "showQuarters": false, "disabledList": []}
    const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)
    wrapper.find('Input').simulate('change',{target:{value:'2020'}})
    wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
    wrapper.find('Input').simulate('change',{target:{value:'2021'}})
    wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(2).simulate('change',{target:{checked :true}})
    wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(1).simulate('click')
    wrapper.find('Input').simulate('change',{target:{value:'2022'}})
    expect(wrapper.find('.VS-Checkbox-Container').at(2).text()).toEqual('Add To Previous Exclusions')

})

// 31. Check years list status after add to current selection  issue 
describe('Check years list status after add to current selection',()=>{

    test('testing',()=>{

        let options = { "lowerLimit": "2020", "upperLimit": "2021", "showWeeks": true, "showQuarters": false, "disabledList": []}
        const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)
        wrapper.find('Input').simulate('change',{target:{value:'2020'}})
        // console.log(wrapper.debug())
        wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
        expect(wrapper.find('.VS-Checkbox').at(0).props().checked).toEqual()


    })

})

// 34. For first time searching add to current selection should be hide
// describe('For first time searching add to current selection should be hide',()=>{

//     test('testing',()=>{

//         let options = { "lowerLimit": "2020", "upperLimit": "2021", "showWeeks": true, "showQuarters": false, "disabledList": []}
//         const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)
//         wrapper.find('Input').simulate('change',{target:{value:'2020'}})
//         // console.log(wrapper.debug())
//         wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
//         // console.log(wrapper.debug())
//         wrapper.find('Input').simulate('change',{target:{value:'2021'}})
//         // console.log(wrapper.debug())
//     })
// })


// 36.State of select all checkbox should be checked if everything is checked or partially checked if something is not checked
describe('State of select all checkbox should be checked if everything is checked or partially checked if something is not checked',()=>{
    test(' fully checked ',()=>{

        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": []}
        const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)
        wrapper.find('Input').simulate('change',{target:{value:'2020'}})
        wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
        expect(wrapper.find('.VS-Checkbox').at(0).props().checked).toEqual(true)

    })

    test(' partical checked ',()=>{

        let options = { "lowerLimit": "2020", "upperLimit": "2021", "showWeeks": true, "showQuarters": false, "disabledList": []}
        const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)
        wrapper.find('Input').simulate('change',{target:{value:'2020'}})
        wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
        expect(wrapper.find('.VS-Checkbox').at(0).props().checked).toEqual(true)

    })
})

// 37.Get values button should display all the selected dates .
// test('Get values button should display all the selected dates ',()=>{
//     let options = { "lowerLimit": "2020", "upperLimit": "2021", "showWeeks": true, "showQuarters": false, "disabledList": []}
//         const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)
//         wrapper.find('Input').simulate('change',{target:{value:'2020'}})
        
//         // console.log(wrapper.debug())
//         // console.log(wrapper)
// })

// 40.if user search for 1st time and after clicking on the close filter and doing next search with checking exclude from selection except the data searched everything should be checked.
test('if user search for 1st time and after clicking on the close filter and doing next search with checking exclude from selection except the data searched everything should be checked.',()=>{
    let options = { "lowerLimit": "2020", "upperLimit": "2021", "showWeeks": true, "showQuarters": false, "disabledList": []}
        const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)
        wrapper.find('Input').simulate('change',{target:{value:'2020'}})
        wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
        wrapper.find('Input').simulate('change',{target:{value:'2021'}})
        wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(2).simulate('change',{target:{checked :true}})
        wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
        expect(wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(1).props().checked).toEqual(1)
        expect(wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(14).props().checked).toEqual(0)
})      

//41. if user search any data for the first time and then clicked on close filter then he search again and closes it with exclude from selection and then he is search again some data and closes it with add to previous exclusion then it should exclude the search results from the checked data.
test('if user search any data for the first time and then clicked on close filter then he search again and closes it with exclude from selection and then he is search again some data and closes it with add to previous exclusion then it should exclude the search results from the checked data.',()=>{

    let options = { "lowerLimit": "2020", "upperLimit": "2022", "showWeeks": true, "showQuarters": false, "disabledList": []}
    const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)
    wrapper.find('Input').simulate('change',{target:{value:'2020'}})
    wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
    wrapper.find('Input').simulate('change',{target:{value:'2021'}})
    wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(2).simulate('change',{target:{checked :true}})
    wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(1).simulate('click')
    wrapper.find('Input').simulate('change',{target:{value:'2022'}})
    wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(2).simulate('change',{target:{checked :true}})
    wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
    expect(wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(1).props().checked).toEqual(1)
    expect(wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(14).props().checked).toEqual(0)
    expect(wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(27).props().checked).toEqual(0)
})

// 35. If exclude from selection is already done then Add To Previous exclusion checkbox should be there.
test('If exclude from selection is already done then Add To Previous exclusion checkbox should be there.',()=>{
    let options = { "lowerLimit": "2020", "upperLimit": "2022", "showWeeks": true, "showQuarters": false, "disabledList": []}
    const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)
    wrapper.find('Input').simulate('change',{target:{value:'2020'}})
    wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
    wrapper.find('Input').simulate('change',{target:{value:'2021'}})
    wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(2).simulate('change',{target:{checked :true}})
    wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(1).simulate('click')
    wrapper.find('Input').simulate('change',{target:{value:'2022'}})
    expect(wrapper.find('.VS-Checkbox-Container').at(2).text()).toEqual('Add To Previous Exclusions')

})
// // 32.search for any data first time and after close search again for different data and close again with checking the adding to current selection it should merge our 1st and 2nd search result
describe('search for any data first time and after close search again for different data and close again with checking the adding to current selection it should merge our 1st and 2nd search result',()=>{
    test('For year',()=>{

        let options = { "lowerLimit": "2020", "upperLimit": "2022", "showWeeks": true, "showQuarters": false, "disabledList": []}
        const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)
        wrapper.find('Input').simulate('change',{target:{value:'2020'}})
        wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
        wrapper.find('Input').simulate('change',{target:{value:'2021'}})
        wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(1).simulate('change',{target:{checked :true}})
        wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
        expect(wrapper.find('.VS-Checkbox').at(1).props().checked).toEqual(1)
        expect(wrapper.find('.VS-Checkbox').at(2).props().checked).toEqual(1)
        expect(wrapper.find('.VS-Checkbox').at(14).props().checked).toEqual(1)

    })

    test('For Month',()=>{

        let options = { "lowerLimit": "2020", "upperLimit": "2021", "showWeeks": true, "showQuarters": false, "disabledList": []}
        const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)
        wrapper.find('Input').simulate('change',{target:{value:'jan'}})
        wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
        wrapper.find('Input').simulate('change',{target:{value:'feb'}})
        wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(1).simulate('change',{target:{checked :true}})
        wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
        expect(wrapper.find('.VS-Checkbox').at(2).props().checked).toEqual(1)
        expect(wrapper.find('.VS-Checkbox').at(3).props().checked).toEqual(1)
        expect(wrapper.find('.VS-Checkbox').at(15).props().checked).toEqual(1)
        expect(wrapper.find('.VS-Checkbox').at(16).props().checked).toEqual(1)

    })

    test('For Weeks',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2021", "showWeeks": true, "showQuarters": false, "disabledList": []}
        const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)
        wrapper.find('Input').simulate('change',{target:{value:'week1'}})
        wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
        wrapper.find('Input').simulate('change',{target:{value:'week2'}})
        wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(1).simulate('change',{target:{checked :true}})
        wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
        expect(wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(3).props().checked).toEqual(1)
        expect(wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(4).props().checked).toEqual(1)
        for(let i = 0;i<24;i++){
            wrapper.find('.VS-Month-Plus-Minus').at(i).simulate('click')
        }
        console.log(wrapper.find('.VS-WeekRow .VS-Tooltip').at(0).text())
        expect(wrapper.find('.VS-WeekRow .VS-Checkbox').at(0).props().checked).toEqual(1)
        expect(wrapper.find('.VS-WeekRow .VS-Checkbox').at(1).props().checked).toEqual(1)
        
    })

    test('For Quaters',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2021", "showWeeks": true, "showQuarters": true, "disabledList": []}
        const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)
        wrapper.find('Input').simulate('change',{target:{value:'Q1'}})
        wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
        wrapper.find('Input').simulate('change',{target:{value:'Q2'}})
        wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(1).simulate('change',{target:{checked :true}})
        wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
        expect(wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(2).props().checked).toEqual(1)
        expect(wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(3).props().checked).toEqual(1)
        expect(wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(7).props().checked).toEqual(1)
        expect(wrapper.find('.VS-Checkbox-Container .VS-Checkbox').at(8).props().checked).toEqual(1)
    })
})


// // 36.State of select all checkbox should be checked if everything is checked and partially checked if something is not checked.
describe('State of select all checkbox should be checked if everything is checked and partially checked if something is not checked.',()=>{
    test('State of select all should be 1 if everything is checked',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2021", "showWeeks": true, "showQuarters": false, "disabledList": []}
        const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)
        wrapper.find('.VS-Checkbox').at(1).simulate('change',{target:{checked :true}})
        wrapper.find('.VS-Checkbox').at(2).simulate('change',{target:{checked :true}})
        expect(wrapper.find('.VS-Checkbox').at(0).props().checked).toEqual(true)
    })
    test('State of select all should be -1 if something is not checked.',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2021", "showWeeks": true, "showQuarters": false, "disabledList": []}
        const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)
        wrapper.find('.VS-Checkbox').at(1).simulate('change',{target:{checked :true}})
        expect(wrapper.find('.VS-Checkbox').at(0).props().checked).toEqual(true)
    })
    test('State of select all should be 0 if no item is  checked.',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2021", "showWeeks": true, "showQuarters": false, "disabledList": []}
        const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)     
        expect(wrapper.find('.VS-Checkbox').at(0).props().checked).toEqual(false)
    })
})

// 42.Search for any data any if user manually unchecking the data after search then the search all search results checkbox should be unchecked
describe('Search for any data any if user manually unchecking the data after search then the select all search results checkbox should be unchecked',()=>{
    test('Search for any data any if user manually unchecking the data after search then the select all search results checkbox should be partially checked',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": []}
        const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)
        wrapper.find('Input').simulate('change',{target:{value:'2020'}})
        wrapper.find('.VS-YearRow .VS-Checkbox').at(2).simulate('change',{target:{checked:false}})
        expect(wrapper.find('.VS-Checkbox-Container.VS-Action .VS-Checkbox').at(0).props().checked).toEqual(false)
    })
})

// 42.Search for any data any if user manually unchecking the data after search then the search all search results checkbox should be partially checked
describe('Search for any data any if user manually unchecking the data after search then the select all search results checkbox should be partially checked',()=>{
    test('Search for any data any if user manually unchecking the data after search then the select all search results checkbox should be partially checked',()=>{
        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": []}
        const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)
        wrapper.find('Input').simulate('change',{target:{value:'2020'}})
        wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
        wrapper.find('.VS-Checkbox').at(2).simulate('change',{target:{checked :false}})   
        wrapper.find('.VS-Checkbox').at(4).simulate('change',{target:{checked :false}})
        expect(wrapper.find('.VS-Checkbox').at(0).props().checked).toEqual(true)
    })
})

// 41.During search either it is first time or other time select all search results should be there which is checked uncheked and partial checked according to the searched data
describe('During search either it is first time or other time select all search results should be there which is checked uncheked and partial checked according to the searched data',()=>{
    test('when searching first time',()=>{

        let options = { "lowerLimit": "2020", "upperLimit": "2020", "showWeeks": true, "showQuarters": false, "disabledList": []}
        const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)
        wrapper.find('Input').simulate('change',{target:{value:'2020'}})
        console.log(wrapper.debug());
        expect(wrapper.find('.VS-Checkbox-Container').at(0).text()).toEqual('Select All Search Results')
    })

    test('when searching second time',()=>{

        let options = { "lowerLimit": "2020", "upperLimit": "2021", "showWeeks": true, "showQuarters": false, "disabledList": []}
        const wrapper = mount(<DatehierarchyView options={options} onChange = {()=>{}} />)
        wrapper.find('Input').simulate('change',{target:{value:'2020'}})
        wrapper.find('.VS-Shape.VS-TextDark.VS-CloseIcon').at(2).simulate('click')
        wrapper.find('Input').simulate('change',{target:{value:'2021'}})
        expect(wrapper.find('.VS-Checkbox-Container').at(0).text()).toEqual('Select All Search Results')
    })
    
})

