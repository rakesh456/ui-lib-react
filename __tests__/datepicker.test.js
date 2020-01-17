import DatePicker from "../src/components/Datepicker/index";
import Week from "../src/components/Datepicker/calendar-date/week";
import Month from "../src/components/Datepicker/calendar-date/month";
import DEFAULT_OPTIONS from "../src/utils/constants";
import React from "react";
import { mount, shallow } from "enzyme";
import ReactDOM from "react-dom";
import CalendarDate from "../src/components/Datepicker/calendar-date/index";
import desktop from "react-icons/lib/fa/desktop";

// Datepicker renders without crashing
it("renders without crashing", () => {
  const div = document.createElement("div");
  const options = DEFAULT_OPTIONS;
  ReactDOM.render(<DatePicker options={options} />, div);
});

// Buttons rendering default options without crashing
describe("Buttons rendering default options without crashing", () => {
  test("Button renders without crashing", () => {
    let options = {
      showButtons: true,
      selectedDate: `01/01/2019`,
      datePickerOptions: true
    };
    const wrapper = mount(
      <CalendarDate options={options} shouldCalendarOpen={true} />
    );
    // console.log(wrapper.find('.VS-ClearButton.VS-PullLeft.btn.btn-secondary').text())
    // const instant = wrapper.instance()
    wrapper.update();
    // console.log(wrapper.debug())
    const div = document.createElement("div");
    ReactDOM.render(
      <CalendarDate options={options} shouldCalendarOpen={true} />,
      div
    );
  });
});

// describe('Buttons rendering default options without crashing',()=>{
//   test('Button renders without crashing', () => {
//     const div = document.createElement('div');
//     const options = DEFAULT_OPTIONS;
//     ReactDOM.render(<Buttons options={options} />, div);
//   });
// })

// Week component renders the week element correctly
test("Week component renders without crashing", () => {
  const div = document.createElement("div");
  const options = DEFAULT_OPTIONS;
  ReactDOM.render(<Week options={options} />, div);
});

// Month component renders the month correctly
test("Month component renders without crashing", () => {
  const div = document.createElement("div");
  const options = DEFAULT_OPTIONS;
  ReactDOM.render(<Month options={options} />, div);
});

//5. check defauLt date if current date is in the limit in DD/MM/YYYY
describe("check defauLt date if current date is in the limit in DD/MM/YYYY", () => {
  test("If current date is between  lower and upper limit then default date is also is in limit the default date get displayed", () => {
    let options = {
      displayFormat: "DD/MM/YYYY",
      defaultDate: "19/01/2019",
      iconAlignment: "left",
      showErrorMessage: true,
      dateStringAlignment: "left",
      lowerLimit: "18/11/2019",
      upperLimit: "18/11/2023",
      validationMessages1: [
        { inValidFormat: "Invalid DOB" },
        { outsideRange: "" }
      ],
      isDisabled: false,
      showButtons: false,
      dateButtonPrimary: "Ok",
      showClearIcon: false,
      manualEntry: true,
      disabledList: [
        "08/07/2017",
        "09/07/2017",
        "01/11/2021",
        "20/11/2022",
        "06/2018",
        "07/2018",
        "07/2015",
        "2017",
        "19/11/2019",
        "15/01/2020"
      ],
      indicatorList: [
        { dates: ["01/10/2019", "02/11/2019"], color: "#333" },
        { dates: ["02/09/2019", "01/08/2019"], color: "#ff0000" }
      ]
    };

    const wrapper = mount(<DatePicker options={options} />);
    wrapper.setState({
      manualEntry: true,
      shouldCalendarOpen: true,
      isDisabled: false
    });
    wrapper.update();
    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("19/01/2019");
  });

  test("If current date is between  lower and upper limit and default date is some random string then blank string will displayed", () => {
    let options = {
      displayFormat: "DD/MM/YYYY",
      defaultDate: "ABCD",
      iconAlignment: "left",
      showErrorMessage: true,
      dateStringAlignment: "left",
      lowerLimit: "18/11/2019",
      upperLimit: "18/11/2023",
      validationMessages1: [
        { inValidFormat: "Invalid DOB" },
        { outsideRange: "" }
      ],
      isDisabled: false,
      showButtons: false,
      dateButtonPrimary: "Ok",
      showClearIcon: false,
      manualEntry: true,
      disabledList: [
        "08/07/2017",
        "09/07/2017",
        "01/11/2021",
        "20/11/2022",
        "06/2018",
        "07/2018",
        "07/2015",
        "2017",
        "19/11/2019",
        "15/01/2020"
      ],
      indicatorList: [
        { dates: ["01/10/2019", "02/11/2019"], color: "#333" },
        { dates: ["02/09/2019", "01/08/2019"], color: "#ff0000" }
      ]
    };

    const wrapper = mount(<DatePicker options={options} />);
    wrapper.setState({
      manualEntry: true,
      shouldCalendarOpen: true,
      isDisabled: false
    });
    wrapper.update();
    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("");
  });

  test("If current date is in between lower and upper limit and default date is undefined then current date is returned", () => {
    let options = {
      displayFormat: "DD/MM/YYYY",
      defaultDate: undefined,
      iconAlignment: "left",
      showErrorMessage: true,
      dateStringAlignment: "left",
      lowerLimit: "01/01/2020",
      upperLimit: "18/12/2023",
      validationMessages1: [
        { inValidFormat: "Invalid DOB" },
        { outsideRange: "" }
      ],
      isDisabled: false,
      showButtons: false,
      dateButtonPrimary: "Ok",
      showClearIcon: false,
      manualEntry: true,
      disabledList: [
        "08/07/2017",
        "09/07/2017",
        "01/11/2021",
        "20/11/2022",
        "06/2018",
        "07/2018",
        "07/2015",
        "2017",
        "19/11/2019",
        "15/01/2020"
      ],
      indicatorList: [
        { dates: ["01/10/2019", "02/11/2019"], color: "#333" },
        { dates: ["02/09/2019", "01/08/2019"], color: "#ff0000" }
      ]
    };

    const wrapper = mount(<DatePicker options={options} />);
    wrapper.setState({
      manualEntry: true,
      shouldCalendarOpen: true,
      isDisabled: false
    });
    wrapper.update();
    let date = new Date();
    let day = "" + date.getDate();
    let month = "" + (date.getMonth() + 1);
    day = day.length === 1 ? "0" + day : day;
    month = month.length === 1 ? "0" + month : month;
    let currentDate = [day, month, date.getFullYear()].join("/");
    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual(currentDate);
  });

  

  test("If current date before date then lower and upper limit then default date is returned ", () => {
    let options = {
      displayFormat: "DD/MM/YYYY",
      defaultDate: "25/11/2019",
      iconAlignment: "left",
      showErrorMessage: true,
      dateStringAlignment: "left",
      lowerLimit: "18/11/2021",
      upperLimit: "20/12/2025",
      validationMessages1: [
        { inValidFormat: "Invalid DOB" },
        { outsideRange: "" }
      ],
      isDisabled: false,
      showButtons: false,
      dateButtonPrimary: "Ok",
      showClearIcon: false,
      manualEntry: true,
      disabledList: [
        "08/07/2017",
        "09/07/2017",
        "01/11/2021",
        "20/11/2022",
        "06/2018",
        "07/2018",
        "07/2015",
        "2017",
        "19/11/2019",
        "15/01/2020"
      ],
      indicatorList: [
        { dates: ["01/10/2019", "02/11/2019"], color: "#333" },
        { dates: ["02/09/2019", "01/08/2019"], color: "#ff0000" }
      ]
    };

    const wrapper = mount(<DatePicker options={options} />);
    wrapper.setState({
      manualEntry: true,
      shouldCalendarOpen: true,
      isDisabled: false
    });
    wrapper.update();
    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("25/11/2019");
  });

  test("If current date is after date of upperLimit date then default date get displayed", () => {
    let options = {
      displayFormat: "DD/MM/YYYY",
      defaultDate: "19/11/2025",
      iconAlignment: "left",
      showErrorMessage: true,
      dateStringAlignment: "left",
      lowerLimit: "18/11/2019",
      upperLimit: "20/12/2019",
      validationMessages1: [
        { inValidFormat: "Invalid DOB" },
        { outsideRange: "" }
      ],
      isDisabled: false,
      showButtons: false,
      dateButtonPrimary: "Ok",
      showClearIcon: false,
      manualEntry: true,
      disabledList: [
        "08/07/2017",
        "09/07/2017",
        "01/11/2021",
        "20/11/2022",
        "06/2018",
        "07/2018",
        "07/2015",
        "2017",
        "19/11/2019",
        "15/01/2020",
        "19/11/2025"
      ],
      indicatorList: [
        { dates: ["01/10/2019", "02/11/2019"], color: "#333" },
        { dates: ["02/09/2019", "01/08/2019"], color: "#ff0000" }
      ]
    };

    const wrapper = mount(<DatePicker options={options} />);
    wrapper.setState({
      manualEntry: true,
      shouldCalendarOpen: true,
      isDisabled: false
    });
    wrapper.update();
    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("19/11/2025");
  });

  test("When default date is not present then it show current date", () => {
    let options = {
      displayFormat: "DD/MM/YYYY",
      defaultDate1: "19/11/2021",
      iconAlignment: "left",
      showErrorMessage: true,
      dateStringAlignment: "left",
      lowerLimit: "18/11/2019",
      upperLimit: "18/11/2023",
      validationMessages1: [
        { inValidFormat: "Invalid DOB" },
        { outsideRange: "" }
      ],
      isDisabled: false,
      showButtons: false,
      dateButtonPrimary: "Ok",
      showClearIcon: false,
      manualEntry: true,
      disabledList: [
        "08/07/2017",
        "09/07/2017",
        "01/11/2021",
        "20/11/2022",
        "06/2018",
        "07/2018",
        "07/2015",
        "2017",
        "19/11/2019",
        "15/01/2020"
      ],
      indicatorList: [
        { dates: ["01/10/2019", "02/11/2019"], color: "#333" },
        { dates: ["02/09/2019", "01/08/2019"], color: "#ff0000" }
      ]
    };

    const wrapper = mount(<DatePicker options={options} />);
    wrapper.setState({
      manualEntry: true,
      shouldCalendarOpen: true,
      isDisabled: false
    });
    wrapper.update();
    let date = new Date();
    let day = "" + date.getDate();
    let month = "" + (date.getMonth() + 1);
    day = day.length === 1 ? "0" + day : day;
    month = month.length === 1 ? "0" + month : month;
    let currentDate = [day, month, date.getFullYear()].join("/");

    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual(currentDate);
  });
});

// 6. check defaut date if current date is in the limit in MM/DD/YYYY
describe("check defaut date if current date is in the limit in MM/DD/YYYY", () => {
  test("If both current and default date is in limit then it returns default date", () => {
    const options = {
      displayFormat: "MM/DD/YYYY",
      defaultDate: "06/02/2019",
      iconAlignment: "Left",
      dateStringAlignment: "Left",
      lowerLimit: "05/25/2018",
      upperLimit: "01/01/2023",
      showErrorMessage: true,
      validationMessages: [
        { inValidFormat: "Invalid DOB" },
        { outsideRange: "Date is out of range" }
      ],
      isDisabled: false,
      showButtons: false,
      showClearIcon: false,
      manualEntry: true,
      disabledList: [
        "11/25/2020",
        "11/29/2000",
        "11/13/2019",
        "11/14/2019",
        "06/2016",
        "2015"
      ],
      indicatorList: [
        { dates: ["10/01/2019", "11/01/2019"], color: "#333" },
        { dates: ["09/02/2019", "08/01/2019"], color: "#ff0000" }
      ]
    };

    const wrapper = mount(<DatePicker options={options} />);
    wrapper.setState({
      manualEntry: true,
      shouldCalendarOpen: true,
      isDisabled: false
    });
    wrapper.update();
    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("06/02/2019");
  });

  test("If both current date is in limit and default date is not in the limit it is before the lower limit date then it returns blank string", () => {
    const options = {
      displayFormat: "MM/DD/YYYY",
      defaultDate: "06/02/2017",
      iconAlignment: "Left",
      dateStringAlignment: "Left",
      lowerLimit: "05/25/2018",
      upperLimit: "01/01/2023",
      showErrorMessage: true,
      validationMessages: [
        { inValidFormat: "Invalid DOB" },
        { outsideRange: "Date is out of range" }
      ],
      isDisabled: false,
      showButtons: false,
      showClearIcon: false,
      manualEntry: true,
      disabledList: [
        "11/25/2020",
        "11/29/2000",
        "11/13/2019",
        "11/14/2019",
        "06/2016",
        "2015"
      ],
      indicatorList: [
        { dates: ["10/01/2019", "11/01/2019"], color: "#333" },
        { dates: ["09/02/2019", "08/01/2019"], color: "#ff0000" }
      ]
    };

    const wrapper = mount(<DatePicker options={options} />);
    wrapper.setState({
      manualEntry: true,
      shouldCalendarOpen: true,
      isDisabled: false
    });
    wrapper.update();
    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("");
  });

  test("If both current date is in limit and default date is not in the limit it is after the upper limit date then it returns blank string", () => {
    const options = {
      displayFormat: "MM/DD/YYYY",
      defaultDate: "06/02/2025",
      iconAlignment: "Left",
      dateStringAlignment: "Left",
      lowerLimit: "05/25/2018",
      upperLimit: "01/01/2023",
      showErrorMessage: true,
      validationMessages: [
        { inValidFormat: "Invalid DOB" },
        { outsideRange: "Date is out of range" }
      ],
      isDisabled: false,
      showButtons: false,
      showClearIcon: false,
      manualEntry: true,
      disabledList: [
        "11/25/2020",
        "11/29/2000",
        "11/13/2019",
        "11/14/2019",
        "06/2016",
        "2015"
      ],
      indicatorList: [
        { dates: ["10/01/2019", "11/01/2019"], color: "#333" },
        { dates: ["09/02/2019", "08/01/2019"], color: "#ff0000" }
      ]
    };

    const wrapper = mount(<DatePicker options={options} />);
    wrapper.setState({
      manualEntry: true,
      shouldCalendarOpen: true,
      isDisabled: false
    });
    wrapper.update();
    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("");
  });

  test("If current is in limit and default date is blank then it returns blank string", () => {
    const options = {
      displayFormat: "MM/DD/YYYY",
      defaultDate: "",
      iconAlignment: "Left",
      dateStringAlignment: "Left",
      lowerLimit: "05/25/2018",
      upperLimit: "01/01/2023",
      showErrorMessage: true,
      validationMessages: [
        { inValidFormat: "Invalid DOB" },
        { outsideRange: "Date is out of range" }
      ],
      isDisabled: false,
      showButtons: false,
      showClearIcon: false,
      manualEntry: true,
      disabledList: [
        "11/25/2020",
        "11/29/2000",
        "11/13/2019",
        "11/14/2019",
        "06/2016",
        "2015"
      ],
      indicatorList: [
        { dates: ["10/01/2019", "11/01/2019"], color: "#333" },
        { dates: ["09/02/2019", "08/01/2019"], color: "#ff0000" }
      ]
    };

    const wrapper = mount(<DatePicker options={options} />);
    wrapper.setState({
      manualEntry: true,
      shouldCalendarOpen: true,
      isDisabled: false
    });
    wrapper.update();
    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("");
  });

  test("If current is in limit and default date is undefined then it returns current date", () => {
    const options = {
      displayFormat: "MM/DD/YYYY",
      defaultDate: undefined,
      iconAlignment: "Left",
      dateStringAlignment: "Left",
      lowerLimit: "05/25/2018",
      upperLimit: "01/01/2023",
      showErrorMessage: true,
      validationMessages: [
        { inValidFormat: "Invalid DOB" },
        { outsideRange: "Date is out of range" }
      ],
      isDisabled: false,
      showButtons: false,
      showClearIcon: false,
      manualEntry: true,
      disabledList: [
        "11/25/2020",
        "11/29/2000",
        "11/13/2019",
        "11/14/2019",
        "06/2016",
        "2015"
      ],
      indicatorList: [
        { dates: ["10/01/2019", "11/01/2019"], color: "#333" },
        { dates: ["09/02/2019", "08/01/2019"], color: "#ff0000" }
      ]
    };

    const wrapper = mount(<DatePicker options={options} />);
    wrapper.setState({
      manualEntry: true,
      shouldCalendarOpen: true,
      isDisabled: false
    });
    wrapper.update();
    let date = new Date();
    let day = "" + date.getDate();
    let month = "" + (date.getMonth() + 1);
    day = day.length === 1 ? "0" + day : day;
    month = month.length === 1 ? "0" + month : month;
    let currentDate = [month, day, date.getFullYear()].join("/");
    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual(currentDate);
  });

  test("If current is in limit and default date is undefined then it returns current date", () => {
    const options = {
      displayFormat: "MM/DD/YYYY",
      defaultDate: "01/21/2020",
      iconAlignment: "Left",
      dateStringAlignment: "Left",
      lowerLimit: "05/25/2018",
      upperLimit: "01/01/2023",
      showErrorMessage: true,
      validationMessages: [
        { inValidFormat: "Invalid DOB" },
        { outsideRange: "Date is out of range" }
      ],
      isDisabled: false,
      showButtons: false,
      showClearIcon: false,
      manualEntry: true,
      disabledList: [
        "01/21/2020",
        "11/25/2020",
        "11/29/2000",
        "11/13/2019",
        "11/14/2019",
        "06/2016",
        "2015"
      ],
      indicatorList: [
        { dates: ["10/01/2019", "11/01/2019"], color: "#333" },
        { dates: ["09/02/2019", "08/01/2019"], color: "#ff0000" }
      ]
    };

    const wrapper = mount(<DatePicker options={options} />);
    wrapper.setState({
      manualEntry: true,
      shouldCalendarOpen: true,
      isDisabled: false
    });
    wrapper.update();
    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("01/21/2020");
  });
});

// 7. check the default date if current date is not in the limit in DD/MM/YYYY
describe('check the default date if current date is not in the limit in DD/MM/YYYY',()=>{

  test('If current date is not in the limit then it will return default date',()=>{

    let options = {
      displayFormat: "DD/MM/YYYY",
      defaultDate: '23/08/2022',
      iconAlignment: "left",
      showErrorMessage: true,
      dateStringAlignment: "left",
      lowerLimit: "18/11/2021",
      upperLimit: "18/12/2014",
      validationMessages1: [
        { inValidFormat: "Invalid DOB" },
        { outsideRange: "" }
      ],
      isDisabled: false,
      showButtons: false,
      dateButtonPrimary: "Ok",
      showClearIcon: false,
      manualEntry: true,
      disabledList: [
        "08/07/2017",
        "09/07/2017",
        "01/11/2021",
        "20/11/2022",
        "06/2018",
        "07/2018",
        "07/2015",
        "2017",
        "19/11/2019",
        "15/01/2020"
      ],
      indicatorList: [
        { dates: ["01/10/2019", "02/11/2019"], color: "#333" },
        { dates: ["02/09/2019", "01/08/2019"], color: "#ff0000" }
      ]
    };

    const wrapper = mount(<DatePicker options={options} />);
    wrapper.setState({
      manualEntry: true,
      shouldCalendarOpen: true,
      isDisabled: false
    });
    wrapper.update();
    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("23/08/2022");


  })


  test('If current date is not in the limit and default date is blank string then it will return blank string',()=>{

    let options = {
      displayFormat: "DD/MM/YYYY",
      defaultDate: '',
      iconAlignment: "left",
      showErrorMessage: true,
      dateStringAlignment: "left",
      lowerLimit: "18/11/2021",
      upperLimit: "18/12/2014",
      validationMessages1: [
        { inValidFormat: "Invalid DOB" },
        { outsideRange: "" }
      ],
      isDisabled: false,
      showButtons: false,
      dateButtonPrimary: "Ok",
      showClearIcon: false,
      manualEntry: true,
      disabledList: [
        "08/07/2017",
        "09/07/2017",
        "01/11/2021",
        "20/11/2022",
        "06/2018",
        "07/2018",
        "07/2015",
        "2017",
        "19/11/2019",
        "15/01/2020"
      ],
      indicatorList: [
        { dates: ["01/10/2019", "02/11/2019"], color: "#333" },
        { dates: ["02/09/2019", "01/08/2019"], color: "#ff0000" }
      ]
    };

    const wrapper = mount(<DatePicker options={options} />);
    wrapper.setState({
      manualEntry: true,
      shouldCalendarOpen: true,
      isDisabled: false
    });
    wrapper.update();
    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("");


  })

  test('If current date is not in the limit and default date is some random string then it will return blank string',()=>{

    let options = {
      displayFormat: "DD/MM/YYYY",
      defaultDate: 'ABCD',
      iconAlignment: "left",
      showErrorMessage: true,
      dateStringAlignment: "left",
      lowerLimit: "18/11/2021",
      upperLimit: "18/12/2014",
      validationMessages1: [
        { inValidFormat: "Invalid DOB" },
        { outsideRange: "" }
      ],
      isDisabled: false,
      showButtons: false,
      dateButtonPrimary: "Ok",
      showClearIcon: false,
      manualEntry: true,
      disabledList: [
        "08/07/2017",
        "09/07/2017",
        "01/11/2021",
        "20/11/2022",
        "06/2018",
        "07/2018",
        "07/2015",
        "2017",
        "19/11/2019",
        "15/01/2020"
      ],
      indicatorList: [
        { dates: ["01/10/2019", "02/11/2019"], color: "#333" },
        { dates: ["02/09/2019", "01/08/2019"], color: "#ff0000" }
      ]
    };

    const wrapper = mount(<DatePicker options={options} />);
    wrapper.setState({
      manualEntry: true,
      shouldCalendarOpen: true,
      isDisabled: false
    });
    wrapper.update();
    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("");


  })

  test('If current date is not in the limit and default date is also not in the limit then it will return default date',()=>{

    let options = {
      displayFormat: "DD/MM/YYYY",
      defaultDate: '16/01/2020',
      iconAlignment: "left",
      showErrorMessage: true,
      dateStringAlignment: "left",
      lowerLimit: "18/11/2021",
      upperLimit: "18/12/2014",
      validationMessages1: [
        { inValidFormat: "Invalid DOB" },
        { outsideRange: "" }
      ],
      isDisabled: false,
      showButtons: false,
      dateButtonPrimary: "Ok",
      showClearIcon: false,
      manualEntry: true,
      disabledList: [
        "08/07/2017",
        "09/07/2017",
        "01/11/2021",
        "20/11/2022",
        "06/2018",
        "07/2018",
        "07/2015",
        "2017",
        "19/11/2019",
        "15/01/2020"
      ],
      indicatorList: [
        { dates: ["01/10/2019", "02/11/2019"], color: "#333" },
        { dates: ["02/09/2019", "01/08/2019"], color: "#ff0000" }
      ]
    };

    const wrapper = mount(<DatePicker options={options} />);
    wrapper.setState({
      manualEntry: true,
      shouldCalendarOpen: true,
      isDisabled: false
    });
    wrapper.update();
    let date = new Date();
    let day = "" + date.getDate();
    let month = "" + (date.getMonth() + 1);
    day = day.length === 1 ? "0" + day : day;
    month = month.length === 1 ? "0" + month : month;
    let currentDate = [ day,month, date.getFullYear()].join("/");
    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual('16/01/2020');


  })

  test("If current date is not in between lower and upper limit and default date is undefined then lower limit is returned", () => {
    let options = {
      displayFormat: "DD/MM/YYYY",
      defaultDate: undefined,
      iconAlignment: "left",
      showErrorMessage: true,
      dateStringAlignment: "left",
      lowerLimit: "18/11/2019",
      upperLimit: "18/12/2019",
      validationMessages1: [
        { inValidFormat: "Invalid DOB" },
        { outsideRange: "" }
      ],
      isDisabled: false,
      showButtons: false,
      dateButtonPrimary: "Ok",
      showClearIcon: false,
      manualEntry: true,
      disabledList: [
        "08/07/2017",
        "09/07/2017",
        "01/11/2021",
        "20/11/2022",
        "06/2018",
        "07/2018",
        "07/2015",
        "2017",
        "19/11/2019",
        "15/01/2020"
      ],
      indicatorList: [
        { dates: ["01/10/2019", "02/11/2019"], color: "#333" },
        { dates: ["02/09/2019", "01/08/2019"], color: "#ff0000" }
      ]
    };

    const wrapper = mount(<DatePicker options={options} />);
    wrapper.setState({
      manualEntry: true,
      shouldCalendarOpen: true,
      isDisabled: false
    });
    wrapper.update();
    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("18/11/2019");
  });
})

// 8. checking the default Year in MM/YYYY format
describe("checking the default Year in MM/YYYY format",()=>{

  
  test('If default date is in limit then it returns the date value in default date',()=>{

    let options = {"displayFormat": "MM/YYYY", "defaultDate": "11/2020", "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "11/2001", "upperLimit": "09/2024", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["11/2019", "12/2011", "11/2013", "10/2024", "06/2016", "2015"]};

    
    const wrapper = mount(<DatePicker options={options} />);
    // console.log(wrapper.debug())
    // wrapper.setState({
    //   manualEntry: true,
    //   shouldCalendarOpen: true,
    //   isDisabled: false
    // });
    wrapper.update();
    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("11/2020");
  });

  test('If default date is not in limit then it returns the date value in default date',()=>{

    let options = {"displayFormat": "MM/YYYY", "defaultDate": "10/2019", "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "11/2021", "upperLimit": "09/2024", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["11/2019", "12/2011", "11/2013", "10/2024", "06/2016", "2015"]};

    
    const wrapper = mount(<DatePicker options={options} />);
    // console.log(wrapper.debug())
    wrapper.update();
    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("10/2019");
  });

  test('If default date is undefined in limit then it returns the current date value ',()=>{

    let options = {"displayFormat": "MM/YYYY", "defaultDate": undefined, "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "11/2001", "upperLimit": "09/2024", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["11/2019", "12/2011", "11/2013", "10/2024", "06/2016", "2015"]};

    
    const wrapper = mount(<DatePicker options={options} />);
    // console.log(wrapper.debug())
    wrapper.update();
    let date = new Date();
    let month = "" + (date.getMonth() + 1);
    month = month.length === 1 ? "0" + month : month;
    let currentDate = [month, date.getFullYear()].join("/");

    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual(currentDate);
  });

  test('If default date is present in disabledDate list then it returns the empty string ',()=>{

    let options = {"displayFormat": "MM/YYYY", "defaultDate": '10/2024', "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "11/2001", "upperLimit": "09/2024", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["11/2019", "12/2011", "11/2013", "10/2024", "06/2016", "2015"]};

    
    const wrapper = mount(<DatePicker options={options} />);
    // console.log(wrapper.debug())
    wrapper.update();

    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("");
  });


  test('If default date is empty string then it returns blank string',()=>{

    let options = {"displayFormat": "MM/YYYY", "defaultDate": "", "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "11/2021", "upperLimit": "09/2024", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["11/2019", "12/2011", "11/2013", "10/2024", "06/2016", "2015"]};

    
    const wrapper = mount(<DatePicker options={options} />);
    // console.log(wrapper.debug())
    wrapper.update();
    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("");
  });

  test('If default date is any random string then it returns blank string',()=>{

    let options = {"displayFormat": "MM/YYYY", "defaultDate": "ABCD", "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "11/2021", "upperLimit": "09/2024", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["11/2019", "12/2011", "11/2013", "10/2024", "06/2016", "2015"]};

    
    const wrapper = mount(<DatePicker options={options} />);
    // console.log(wrapper.debug())
    wrapper.update();
    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("");
  });
})

// 9. checking the default Year in QQ/YYYY format
describe('checking the default Year in QQ/YYYY format',()=>{

  test('If default date is in limit then it returns default date',()=>{
    const options = {"displayFormat": "QQ/YYYY", "defaultDate": "Q1/2015", "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "Q2/2013", "upperLimit": "Q3/2037", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["Q2/2011", "Q3/2011", "2015"]}

    const wrapper = mount(<DatePicker options={options} />);
    // console.log(wrapper.debug())
    wrapper.update();

    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("Q1/2015");
  })

  test('If default date is previous quater/year then lower limit then it return blank string',()=>{
    const options = {"displayFormat": "QQ/YYYY", "defaultDate": "Q1/2015", "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "Q2/2016", "upperLimit": "Q3/2037", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["Q2/2011", "Q3/2011", "2015"]}

    const wrapper = mount(<DatePicker options={options} />);
    // console.log(wrapper.debug())
    wrapper.update();

    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("");
  })

  test('If default date is after quater/year then upper limit then it return blank string',()=>{
    const options = {"displayFormat": "QQ/YYYY", "defaultDate": "Q1/2039", "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "Q2/2016", "upperLimit": "Q3/2037", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["Q2/2011", "Q3/2011", "2015"]}

    const wrapper = mount(<DatePicker options={options} />);
    // console.log(wrapper.debug())
    wrapper.update();

    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("");
  })

  test('If default date is present in the disabled list then it returns blank string',()=>{
    const options = {"displayFormat": "QQ/YYYY", "defaultDate": "Q1/2015", "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "Q2/2013", "upperLimit": "Q3/2037", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["Q1/2015","Q2/2011", "Q3/2011", "2015"]}

    const wrapper = mount(<DatePicker options={options} />);
    // console.log(wrapper.debug())
    wrapper.update();

    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("");
  })

  test('If default date is empty string then it returns blank string',()=>{
    const options = {"displayFormat": "QQ/YYYY", "defaultDate": "", "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "Q2/2013", "upperLimit": "Q3/2037", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["Q1/2015","Q2/2011", "Q3/2011", "2015"]}

    const wrapper = mount(<DatePicker options={options} />);
    // console.log(wrapper.debug())
    wrapper.update();

    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("");
  })

  test('If default date is random string then it returns blank string',()=>{
    const options = {"displayFormat": "QQ/YYYY", "defaultDate": "ABCD", "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "Q2/2013", "upperLimit": "Q3/2037", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["Q1/2015","Q2/2011", "Q3/2011", "2015"]}

    const wrapper = mount(<DatePicker options={options} />);
    // console.log(wrapper.debug())
    wrapper.update();

    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("");
  })

  test('If default date is  undefined then it returns current date quater/year',()=>{
    const options = {"displayFormat": "QQ/YYYY", "defaultDate": undefined, "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "Q2/2013", "upperLimit": "Q3/2037", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["Q1/2015","Q2/2011", "Q3/2011", "2015"]}

    const wrapper = mount(<DatePicker options={options} />);
    // console.log(wrapper.debug())
    wrapper.update();
    let date = new Date()
    let month = date.getMonth() + 1
    let quater =  month > 9 ? '4' : month > 6 ? '3' : month > 3 ? '2' : '1';
    let year = date.getFullYear()
    let result = ["Q"+quater,year].join("/")
    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual(result);
  })


})

// 10.checking the default Year in YYYY format
describe('checking the default Year in YYYY format',()=>{

  test('testing',()=>{

    const options = {"displayFormat": "YYYY", "defaultDate": "2022", "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "2007", "upperLimit": "2024", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["2007", "2008", "2015"]}

    const wrapper = mount(<DatePicker options={options} />);
    // console.log(wrapper.debug())
    wrapper.update();

    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("2022");

  })

  test('If default year is previous year to lower limit then it returns blank string',()=>{

    const options = {"displayFormat": "YYYY", "defaultDate": "2001", "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "2007", "upperLimit": "2024", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["2007", "2008", "2015"]}

    const wrapper = mount(<DatePicker options={options} />);
    // console.log(wrapper.debug())
    wrapper.update();

    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("");

  })

  test('If default year is after year to upper limit then it returns blank string',()=>{

    const options = {"displayFormat": "YYYY", "defaultDate": "2027", "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "2007", "upperLimit": "2024", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["2007", "2008", "2015"]}

    const wrapper = mount(<DatePicker options={options} />);
    // console.log(wrapper.debug())
    wrapper.update();

    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("");

  })

  test('If default year is present in diabled list then it returns blank string',()=>{

    const options = {"displayFormat": "YYYY", "defaultDate": "2010", "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "2007", "upperLimit": "2024", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["2010","2007", "2008", "2015"]}

    const wrapper = mount(<DatePicker options={options} />);
    // console.log(wrapper.debug())
    wrapper.update();

    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("");

  })


  test('If default year is undefined then it returns current year',()=>{

    const options = {"displayFormat": "YYYY", "defaultDate": undefined, "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "2007", "upperLimit": "2024", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["2010","2007", "2008", "2015"]}

    const wrapper = mount(<DatePicker options={options} />);
    // console.log(wrapper.debug())
    wrapper.update();
    let date = new Date()
    let currentYear = ""+date.getFullYear()
    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual(currentYear);

  })

  test('If default year is empty string then it also returns blank string',()=>{

    const options = {"displayFormat": "YYYY", "defaultDate": "", "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "2007", "upperLimit": "2024", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["2010","2007", "2008", "2015"]}

    const wrapper = mount(<DatePicker options={options} />);
    // console.log(wrapper.debug())
    wrapper.update();
    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("");

  })

  test('If default year is any random string then it also returns blank string',()=>{

    const options = {"displayFormat": "YYYY", "defaultDate": "ABCD", "iconAlignment":"Left", "dateStringAlignment": "Left", "lowerLimit": "2007", "upperLimit": "2024", "showErrorMessage": true, "isDisabled": false, "showButtons": false, "showClearIcon": false, "manualEntry": true, "disabledList": ["2010","2007", "2008", "2015"]}

    const wrapper = mount(<DatePicker options={options} />);
    // console.log(wrapper.debug())
    wrapper.update();
    expect(
      wrapper
        .find(".VS-Regular-UPPER-Case.VS-Calendar-Input.VS-TextLeft")
        .props().value
    ).toEqual("");

  })
})

// 11.Check cancel and ok buttons value are setting properly or not using dateButtonPrimary and dateButtonSecondary options

describe('Check cancel and ok buttons value are setting properly or not using dateButtonPrimary and dateButtonSecondary options',()=>{

  test('testing',()=>{
    let options = {}
    const wrapper = mount(<DatePicker options = {options} />)
    console.log(wrapper.debug())
  })
})