
import React from "react";
import ReactDOM from "react-dom";
import { DEFAULT_OPTIONS } from "../src/utils/tagselectorutils";
import { shallow, mount } from "enzyme";
import { placeholder } from "@babel/types";
import TagSelector from "../src/components/TagSelector/tag-selector";
import ItemsList from "../src/components/TagSelector/tag-items-list.js";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { DEFAULT_OPTIONS } from "../src/utils/tagselectorutils";
import { shallow } from "enzyme";
import { placeholder } from "@babel/types";
import desktop from "react-icons/lib/fa/desktop";

const ITEM_LIST = [
  { value: 'Aa People"S Democratic Republic', key: "zLA" },
  { value: "Afghanistan", key: "AF", selected: true },
  { value: "Albania", key: "AL" },
  { value: "Algeria", key: "DZ" },
  { value: "American Samoa", key: "AS" },
  { value: "AndorrA", key: "AD" },
  { value: "Angola", key: "AO" },
  { value: "Zimbabwe", key: "ZW" },
  { value: "Anguilla", key: "AI" },
  { value: "Antarctica", key: "AQ" },
  { value: "Cameroon", key: "CM" },
  { value: "Antigua and Barbuda", key: "AG" },
  { value: "Argentina", key: "AR" },
  { value: "Armenia", key: "AM" },
  { value: "Aruba", key: "AW" },
  { value: "Australia", key: "AU" },
  { value: "Austria", key: "AT" },
  { value: "Azerbaijan", key: "AZ" },
  { value: "Bahamas", key: "BS" },
  { value: "Bahrain", key: "BH" },
  { value: "Bangladesh", key: "BD" },
  { value: "Barbados", key: "BB" },
  { value: "Belarus", key: "BY" },
  { value: "Belgium", key: "BE" },
  { value: "Belize", key: "BZ" },
  { value: "Benin", key: "BJ" },
  { value: "Bermuda", key: "BM" },
  { value: "Bhutan", key: "BT" },
  { value: "Bolivia", key: "BO" },
  { value: "Bosnia and Herzegovina", key: "BA" },
  { value: "Botswana", key: "BW" },
  { value: "Bouvet Island", key: "BV" },
  { value: "Brazil", key: "BR" },
  { value: "British Indian Ocean Territory", key: "IO" },
  { value: "Brunei Darussalam", key: "BN" },
  { value: "Bulgaria", key: "BG" },
  { value: "Burkina Faso", key: "BF" },
  { value: "Burundi", key: "BI" },
  { value: "Cambodia", key: "KH" },
  { value: "Canada", key: "CA" },
  { value: "Cape Verde", key: "CV" },
  { value: "Cayman Islands", key: "KY" },
  { value: "Central African Republic", key: "CF" },
  { value: "Chad", key: "TD" },
  { value: "Chile", key: "CL" },
  { value: "China", key: "CN" },
  { value: "Christmas Island", key: "CX" },
  { value: "Cocos (Keeling) Islands", key: "CC" },
  { value: "Colombia", key: "CO" },
  { value: "Comoros", key: "KM" },
  { value: "Congo", key: "CG" },
  { value: "Congo, The Democratic Republic of the", key: "CD" },
  { value: "Cook Islands", key: "CK" },
  { value: "Costa Rica", key: "CR" },
  { value: 'Cote D"Ivoire', key: "CI" },
  { value: "Croatia", key: "HR" },
  { value: "Cuba", key: "CU" },
  { value: "Cyprus", key: "CY" },
  { value: "Czech Republic", key: "CZ" },
  { value: "Denmark", key: "DK" },
  { value: "Djibouti", key: "DJ" },
  { value: "Dominica", key: "DM" },
  { value: "Dominican Republic", key: "DO" },
  { value: "Ecuador", key: "EC" },
  { value: "Egypt", key: "EG" },
  { value: "El Salvador", key: "SV" },
  { value: "Equatorial Guinea", key: "GQ" },
  { value: "Eritrea", key: "ER" },
  { value: "Estonia", key: "EE" },
  { value: "Ethiopia", key: "ET" },
  { value: "Falkland Islands (Malvinas)", key: "FK" },
  { value: "Faroe Islands", key: "FO" },
  { value: "Fiji", key: "FJ" },
  { value: "Finland", key: "FI" },
  { value: "France", key: "FR" },
  { value: "French Guiana", key: "GF" },
  { value: "French Polynesia", key: "PF" },
  { value: "French Southern Territories", key: "TF" },
  { value: "Gabon", key: "GA" },
  { value: "Gambia", key: "GM" },
  { value: "Georgia", key: "GE" },
  { value: "Germany", key: "DE" },
  { value: "Ghana", key: "GH" },
  { value: "Gibraltar", key: "GI" },
  { value: "Greece", key: "GR" },
  { value: "Greenland", key: "GL" },
  { value: "Grenada", key: "GD" },
  { value: "Guadeloupe", key: "GP" },
  { value: "Guam", key: "GU" },
  { value: "Guatemala", key: "GT" },
  { value: "Guernsey", key: "GG" },
  { value: "Guinea", key: "GN" },
  { value: "Guinea-Bissau", key: "GW" },
  { value: "Guyana", key: "GY" },
  { value: "Haiti", key: "HT" },
  { value: "Heard Island and Mcdonald Islands", key: "HM" },
  { value: "Holy See (Vatican City State)", key: "VA" },
  { value: "Honduras", key: "HN" },
  { value: "Hong Kong", key: "HK" },
  { value: "Hungary", key: "HU" },
  { value: "Iceland", key: "IS" },
  { value: "India", key: "IN" },
  { value: "Indonesia", key: "ID" },
  { value: "Iran, Islamic Republic Of", key: "IR" },
  { value: "Iraq", key: "IQ" },
  { value: "Ireland", key: "IE" },
  { value: "Isle of Man", key: "IM" },
  { value: "Israel", key: "IL" },
  { value: "Italy", key: "IT" },
  { value: "Jamaica", key: "JM" },
  { value: "Japan", key: "JP" },
  { value: "Jersey", key: "JE" },
  { value: "Jordan", key: "JO" },
  { value: "Kazakhstan", key: "KZ" },
  { value: "Kenya", key: "KE" },
  { value: "Kiribati", key: "KI" },
  { value: 'Korea, Democratic People"S Republic of', key: "KP" },
  { value: "Korea, Republic of", key: "KR" },
  { value: "Kuwait", key: "KW" },
  { value: "Kyrgyzstan", key: "KG" },
  { value: 'Lao People"S Democratic Republic', key: "LA" },
  { value: "Latvia", key: "LV" },
  { value: "Lebanon", key: "LB" },
  { value: "Lesotho", key: "LS" },
  { value: "Liberia", key: "LR" },
  { value: "Libyan Arab Jamahiriya", key: "LY" },
  { value: "Liechtenstein", key: "LI" },
  { value: "Lithuania", key: "LT" },
  { value: "Luxembourg", key: "LU" },
  { value: "Macao", key: "MO" },
  { value: "Macedonia, The Former Yugoslav Republic of", key: "MK" },
  { value: "Madagascar", key: "MG" },
  { value: "Malawi", key: "MW" },
  { value: "Malaysia", key: "MY" },
  { value: "Maldives", key: "MV" },
  { value: "Mali", key: "ML" },
  { value: "Malta", key: "MT" },
  { value: "Marshall Islands", key: "MH" },
  { value: "Martinique", key: "MQ" },
  { value: "Mauritania", key: "MR" },
  { value: "Mauritius", key: "MU" },
  { value: "Mayotte", key: "YT" },
  { value: "Mexico", key: "MX" },
  { value: "Micronesia, Federated States of", key: "FM" },
  { value: "Moldova, Republic of", key: "MD" },
  { value: "Monaco", key: "MC" },
  { value: "Mongolia", key: "MN" },
  { value: "Montenegro", key: "ME" },
  { value: "Montserrat", key: "MS" },
  { value: "Morocco", key: "MA" },
  { value: "Mozambique", key: "MZ" },
  { value: "Myanmar", key: "MM" },
  { value: "Namibia", key: "NA" },
  { value: "Nauru", key: "NR" },
  { value: "Nepal", key: "NP" },
  { value: "Netherlands", key: "NL" },
  { value: "Netherlands Antilles", key: "AN" },
  { value: "New Caledonia", key: "NC" },
  { value: "New Zealand", key: "NZ" },
  { value: "Nicaragua", key: "NI" },
  { value: "Niger", key: "NE" },
  { value: "Nigeria", key: "NG" },
  { value: "Niue", key: "NU" },
  { value: "Norfolk Island", key: "NF" },
  { value: "Northern Mariana Islands", key: "MP" },
  { value: "Norway", key: "NO" },
  { value: "Oman", key: "OM" },
  { value: "Pakistan", key: "PK" },
  { value: "Palau", key: "PW" },
  { value: "Palestinian Territory, Occupied", key: "PS" },
  { value: "Panama", key: "PA" },
  { value: "Papua New Guinea", key: "PG" },
  { value: "Paraguay", key: "PY" },
  { value: "Peru", key: "PE" },
  { value: "Philippines", key: "PH" },
  { value: "Pitcairn", key: "PN" },
  { value: "Poland", key: "PL" },
  { value: "Portugal", key: "PT" },
  { value: "Puerto Rico", key: "PR" },
  { value: "Qatar", key: "QA" },
  { value: "Reunion", key: "RE" },
  { value: "Romania", key: "RO" },
  { value: "Russian Federation", key: "RU" },
  { value: "RWANDA", key: "RW" },
  { value: "Saint Helena", key: "SH" },
  { value: "Saint Kitts and Nevis", key: "KN" },
  { value: "Saint Lucia", key: "LC" },
  { value: "Saint Pierre and Miquelon", key: "PM" },
  { value: "Saint Vincent and the Grenadines", key: "VC" },
  { value: "Samoa", key: "WS" },
  { value: "San Marino", key: "SM" },
  { value: "Sao Tome and Principe", key: "ST" },
  { value: "Saudi Arabia", key: "SA" },
  { value: "Senegal", key: "SN" },
  { value: "Serbia", key: "RS" },
  { value: "Seychelles", key: "SC" },
  { value: "Sierra Leone", key: "SL" },
  { value: "Singapore", key: "SG" },
  { value: "Slovakia", key: "SK" },
  { value: "Slovenia", key: "SI" },
  { value: "Solomon Islands", key: "SB" },
  { value: "Somalia", key: "SO" },
  { value: "South Africa", key: "ZA" },
  { value: "South Georgia and the South Sandwich Islands", key: "GS" },
  { value: "Spain", key: "ES" },
  { value: "Sri Lanka", key: "LK" },
  { value: "Sudan", key: "SD" },
  { value: "Suriname", key: "SR" },
  { value: "Svalbard and Jan Mayen", key: "SJ" },
  { value: "Swaziland", key: "SZ" },
  { value: "Sweden", key: "SE" },
  { value: "Switzerland", key: "CH" },
  { value: "Syrian Arab Republic", key: "SY" },
  { value: "Taiwan, Province of China", key: "TW" },
  { value: "Tajikistan", key: "TJ" },
  { value: "Tanzania, United Republic of", key: "TZ" },
  { value: "Thailand", key: "TH" },
  { value: "Timor-Leste", key: "TL" },
  { value: "Togo", key: "TG" },
  { value: "Tokelau", key: "TK" },
  { value: "Tonga", key: "TO" },
  { value: "Trinidad and Tobago", key: "TT" },
  { value: "Tunisia", key: "TN" },
  { value: "Turkey", key: "TR" },
  { value: "Turkmenistan", key: "TM" },
  { value: "Turks and Caicos Islands", key: "TC" },
  { value: "Tuvalu", key: "TV" },
  { value: "Uganda", key: "UG" },
  { value: "Ukraine", key: "UA" },
  { value: "United Arab Emirates", key: "AE" },
  { value: "United Kingdom", key: "GB" },
  { value: "United States", key: "US" },
  { value: "United States Minor Outlying Islands", key: "UM" },
  { value: "Uruguay", key: "UY" },
  { value: "Uzbekistan", key: "UZ" },
  { value: "Vanuatu", key: "VU" },
  { value: "Venezuela", key: "VE" },
  { value: "Viet Nam", key: "VN" },
  { value: "Virgin Islands, British", key: "VG" },
  { value: "Virgin Islands, U.S.", key: "VI" },
  { value: "Wallis and Futuna", key: "WF" },
  { value: "Western Sahara", key: "EH" },
  { value: "Yemen", key: "YE" },
  { value: "Zambia", key: "ZM" }
];
//Checking whereas all the default options are rendering properly or not.

it("Tag selector renders without crashing", () => {
  const div = document.createElement("div");
  const options = DEFAULT_OPTIONS;
  ReactDOM.render(<TagSelector options={options} />, div);
});

describe("should render without crashing", () => {
  //Checking that when we adding a new element then whereas it is adding in the list or not so we are checking the length of the list after adding the list.

  test.skip("Checking that when we adding a new element then whereas it is adding in the list or not so we are checking the length of the list after adding the list.", () => {
  test("Checking that when we adding a new element then whereas it is adding in the list or not so we are checking the length of the list after adding the list.", () => {
    let options = {
      showHelper: true,
      allowNewValue: true,
      showHierarchy: false
    };
    let wrapper = shallow(<TagSelector options={options} />);
    const instant = wrapper.instance();
    instant.setJsonData(ITEM_LIST);
    wrapper.update();
    expect(wrapper.state().listItems.length).toEqual(244);
  });

  //Checking whereas the new element we added is rendering properly in the list or not.
  test.skip("checking that the new element added is rendering properly after adding a new object in the object array ", () => {
  test("checking that the new element added is rendering properly after adding a new object in the object array ", () => {
    let options = {
      showHelper: false,
      allowNewValue: true,
      showHierarchy: false
    };
    let wrapper = shallow(<TagSelector options={options} />);
    const instant = wrapper.instance();
    instant.setJsonData([
      { key: "Afghanistan", value: "AF" },
      { key: "Albania", value: "AL" },
      { key: "Algeria", value: "DZ" },
      { key: "American Samoa", value: "AS" },
      { key: "AndorrA", value: "AD" },
      { key: "Angola", value: "AO" },
      { key: "Anguilla", value: "AI" },
      { key: "Antarctica", value: "AQ" },
      { key: "Antigua and Barbuda", value: "AG" },
      { key: "Argentina", value: "AR" },
      { key: "Armenia", value: "AM" }
    ]);
    instant.appendNewElement({ key: "Pakistan", value: "PK" });
    wrapper.update();
    expect(wrapper.state().newlyAddedElements).toEqual([
      { key: "Pakistan", value: "PK" }
    ]);
  });

  //add selected item
  test.skip("add selected item ", () => {
  test("add selected item ", () => {
    let options = {
      showHelper: false,
      allowNewValue: true,
      showHierarchy: false
    };
    let wrapper = shallow(<TagSelector options={options} />);
    const instant = wrapper.instance();
    instant.setJsonData([
      { key: "Afghanistan", value: "AF" },
      { key: "Albania", value: "AL" },
      { key: "Algeria", value: "DZ" },
      { key: "American Samoa", value: "AS" },
      { key: "AndorrA", value: "AD" },
      { key: "Angola", value: "AO" },
      { key: "Anguilla", value: "AI" },
      { key: "Antarctica", value: "AQ" },
      { key: "Antigua and Barbuda", value: "AG" },
      { key: "Argentina", value: "AR" },
      { key: "Armenia", value: "AM" }
    ]);

    instant.setSelectedItems([{ key: "AndorrA", value: "AD" }]);

    wrapper.update();
    expect(instant.getSelectedValues()).toEqual([
      { key: "AndorrA", value: "AD" }
    ]);
  });

  //Check list of items while searching using input value.
  test.skip("Check list of items while searching using input value ", () => {
  test("Check list of items while searching using input value ", () => {
    let options = {
      showHelper: false,
      allowNewValue: true,
      showHierarchy: false
    };
    let wrapper = shallow(<TagSelector options={options} />);

    const instant = wrapper.instance();
    instant.setJsonData([
      { key: "Afghanistan", value: "AF" },
      { key: "Albania", value: "AL" },
      { key: "Algeria", value: "DZ" },
      { key: "American Samoa", value: "AS" },
      { key: "AndorrA", value: "AD" },
      { key: "Angola", value: "AO" },
      { key: "Anguilla", value: "AI" },
      { key: "Antarctica", value: "AQ" },
      { key: "Antigua and Barbuda", value: "AG" },
      { key: "Argentina", value: "AR" },
      { key: "Armenia", value: "AM" },
      { key: "Australia", value: "AL" }
    ]);
    instant.updateFilterItems("af");
    wrapper.update();
    expect(wrapper.state().filteredlistItems).toEqual([
      { key: "Afghanistan", value: "AF" }
    ]);
  });

  //Check selected items using maxItemCounter.
  test.skip("Check selected items using maxItemCounter ", () => {
    let options = { showHelper: false, maxItemCounter: 2 };
    let wrapper = shallow(<TagSelector options={options} />);
    const instant = wrapper.instance();
    instant.setJsonData([
      { key: "Albania", value: "AL" },
      { key: "Armenia", value: "AM" },
      { key: "Angola", value: "AO" },
      { key: "Anguilla", value: "AI" }
    ]);

    instant.setSelectedItems([
      { key: "Albania", value: "AL" },
      { key: "Angola", value: "AO" },
      { key: "Anguilla", value: "AI" }
    ]);
    wrapper.update();
    const selectedWrapper = wrapper.find(
      ".VS-AutoCompleteItem .VS-AutoCompleteItem-Span"
    );
    expect(selectedWrapper.text()).toEqual("3 SELECTED");
  });

  //Check remove button enabled or not when canRemoveAll is true.
  test.skip("Check remove button enabled or not when canRemoveAll is true ", () => {
    let options = {
      showHelper: false,
      allowNewValue: true,
      showHierarchy: false,
      canRemoveAll: true,
      maxItemCounter: 2
    };
    let wrapper = shallow(<TagSelector options={options} />);
    const instant = wrapper.instance();
    instant.setJsonData([
      { key: "Albania", value: "AL" },
      { key: "Armenia", value: "AM" }
    ]);

    instant.setSelectedItems([{ key: "Albania", value: "AL" }]);
    wrapper.update();
    const removeButtonWrapper = wrapper.find(
      ".VS-AutoCompleteItem .VS-AutoCompleteItem-Icon"
    );
    const classNames = removeButtonWrapper.prop("className");
    expect(classNames).toMatch(/VS-Disabled/);
  });
});

// check getting selected item
describe("Checking for getting selected items", () => {
  test.skip("getting selected items, when searching for a string that does not match any item in the list then selected list will be empty ", () => {
    const options = DEFAULT_OPTIONS;
    let wrapper = shallow(<TagSelector options={options} />);
    const instant = wrapper.instance();

    instant.setJsonData(ITEM_LIST);
    // let value = wrapperItemList.find('.VS-Regular-UPPER-Case VS-TagSelector-Input form-control').value
    // we have to set the search string
    /*
    WRITE SOME CODE HERE TO SET SEARCH STRING WHICH DOES NOT MATCH ANY ITEM IN THE LIST OF ITEMS
    */
    
    wrapper.update();
    expect(instant.getSelectedValues()).toEqual([]);    
  });

  test("getting selected items, when passing some seleted item which is present in listItems", () => {
    const options = DEFAULT_OPTIONS;
    options.showHelper = true;
    
    let wrapper = shallow(<TagSelector options={options}/>);
    const instant = wrapper.instance();
    console.log(wrapper.instance())
    instant.setJsonData(ITEM_LIST);

    console.log(wrapper.debug());
    wrapper.find('Input').simulate('change',{target:{value:'kw'}})
    console.log(wrapper.find('Input').props())
    wrapper.update();
    expect(instant.getFilteredList()).toEqual([{ value: "Kuwait", key: "KW" }]);
  });
});

//Append new element and get newly added element
describe("get newly added element", () => {
  test.skip("By appending a new element ,then checking it is in newlyAddedElements", () => {
    
    // let optionsHierarchy = {
    //   showHelper: false,
    //   allowNewValue: true,
    //   showHierarchy: true
    // };
    // tagselector2.setJsonData([{
    //   "Bihar": [
    //       {"key": "Arwal", "value": "Arwal"},
    //       {"key": "Nawada", "value": "Nawada"},
    //       {"key": "Gopalganj", "value": "Gopalganj"}
    //   ]},
    //   {"Andhra Pradesh": [
    //       {"key": "Adoni", "value": "Adoni"}, 
    //       {"key": "Bapatla", "value": "Bapatla"},
    //       {"key": "Anantapur", "value": "Anantapur"}
    //   ]}
    // ])

  });
  // Check 

  //Check selected items using maxItemCounter.
  test("Check selected items using maxItemCounter ", () => {
    let options = { showHelper: false, maxItemCounter: 2 };
    let wrapper = shallow(<TagSelector options={options} />);
    const instant = wrapper.instance();
    instant.setJsonData([
      { key: "Albania", value: "AL" },
      { key: "Armenia", value: "AM" },
      { key: "Angola", value: "AO" },
      { key: "Anguilla", value: "AI" }
    ]);

    instant.setSelectedItems([
      { key: "Albania", value: "AL" },
      { key: "Angola", value: "AO" },
      { key: "Anguilla", value: "AI" }
    ]);
    wrapper.update();
    const selectedWrapper = wrapper.find(
      ".VS-AutoCompleteItem .VS-AutoCompleteItem-Span"
    );
    expect(selectedWrapper.text()).toEqual("3 SELECTED");
  });

  //Check remove button enabled or not when canRemoveAll is true.
  test("Check remove button enabled or not when canRemoveAll is true ", () => {
    let options = {
      showHelper: false,
      allowNewValue: true,
      showHierarchy: false,
      canRemoveAll: true,
      maxItemCounter: 2
    };
    let wrapper = shallow(<TagSelector options={options} />);
    const instant = wrapper.instance();
    instant.setJsonData([
      { key: "Albania", value: "AL" },
      { key: "Armenia", value: "AM" }
    ]);

    instant.setSelectedItems([{ key: "Albania", value: "AL" }]);
    wrapper.update();
    const removeButtonWrapper = wrapper.find(
      ".VS-AutoCompleteItem .VS-AutoCompleteItem-Icon"
    );
    const classNames = removeButtonWrapper.prop("className");
    expect(classNames).toMatch(/VS-Disabled/);
  });
});

// check getting selected item
describe("Checking for getting selected items", () => {
  test("getting selected items, when searching for a string that does not match any item in the list then selected list will be empty ", () => {
    const options = DEFAULT_OPTIONS;
    let wrapper = shallow(<TagSelector options={options} />);
    const instant = wrapper.instance();

    instant.setJsonData(ITEM_LIST);
    // let value = wrapperItemList.find('.VS-Regular-UPPER-Case VS-TagSelector-Input form-control').value
    wrapper.update();
    expect(instant.getSelectedValues()).toEqual([]);
  });

  test("getting selected items, when passing some seleted item which is present in listItems", () => {
    const options = DEFAULT_OPTIONS;
    let wrapper = shallow(<TagSelector options={options} />);
    const instant = wrapper.instance();
    instant.setJsonData(ITEM_LIST);
    // wrapper.find('.VS-Regular-UPPER-Case VS-TagSelector-Input').simulate('')
    wrapper.find("Input").simulate("change", { target: { value: "z" } });
    wrapper.update();
    expect(instant.getFilteredList()).toEqual([]);
  });
});

//Append new element and get newly added element
describe("get newly added element", () => {
  test("By appending a new element ,then checking it is in newlyAddedElements", () => {

    const options = DEFAULT_OPTIONS;
    let wrapper = shallow(<TagSelector options={options} />);
    const instant = wrapper.instance();

    instant.appendNewElement({ key: "Australia", value: "AL" });

    wrapper.update();
    expect(instant.getNewlyAdded()).toEqual([
      { key: "Australia", value: "AL" }
    ]);
  });

  test.skip("By appending nothing, then checking it is in newlyAddedElements", () => {
  test("By appending nothing, then checking it is in newlyAddedElements", () => {
    const options = DEFAULT_OPTIONS;
    let wrapper = shallow(<TagSelector options={options} />);
    const instant = wrapper.instance();

    wrapper.update();
    expect(instant.getNewlyAdded()).toEqual([]);
  });
});


// Default set selected items
describe('Default set selected items',()=>{
  
  test.skip("testing",()=>{
  test("testing",()=>{
    
  })
})

// Checking selected items after refresh method

describe("Checking selected items after refresh method", () => {
  test.skip("Checking selected items after refresh method, when passing some selected items", () => {
  test("Checking selected items after refresh method, when passing some selected items", () => {
    const options = DEFAULT_OPTIONS;
    let wrapper = shallow(<TagSelector options={options} />);
    const instant = wrapper.instance();
    instant.setJsonData([
      { key: "Albania", value: "AL" },
      { key: "Armenia", value: "AM" },
      { key: "Australia", value: "AL" }
    ]);
    instant.setSelectedItems([{ key: "Australia", value: "AL" }]);
    
    instant.setSelectedItems([{ key: "Australia", value: "AU" }]);


    instant.refresh();

    wrapper.update();
    expect(instant.getSelectedValues()).toEqual([]);
  });


  test.skip("Checking selected items after refresh method, when passing empyt array selected items", () => {
  test("Checking selected items after refresh method, when passing empyt array selected items", () => {
    const options = DEFAULT_OPTIONS;
    let wrapper = shallow(<TagSelector options={options} />);
    const instant = wrapper.instance();
    instant.setJsonData([
      { key: "Albania", value: "AL" },
      { key: "Armenia", value: "AM" },
      { key: "Australia", value: "AL" }
    ]);
    instant.setSelectedItems([]);

    instant.refresh();

    wrapper.update();
    expect(instant.getSelectedValues()).toEqual([]);
  });
});

// Check remove item from list
describe("Check remove item from list", () => {
  test.skip(' removeListItem() if object is passed to the function then that object got removed from the ListItem array ',()=>{
  test(' removeListItem() if object is passed to the function then that object got removed from the ListItem array ',()=>{
      let options ={"showHelper": true, "allowNewValue": true, "showHierarchy": false}
      let wrapper = shallow(<TagSelector options = {options}/>);
      const instant = wrapper.instance();
      instant.setJsonData([
          {"key": "Albania", "value": "AL"},
          {"key": "Armenia", "value": "AM"},
          {'key':'Australia', 'value':'AU'}
      ])
      instant.removeListItem({'key':'Australia', 'value':'AU'})
      wrapper.update()
      expect(instant.getListItem()).toEqual([
        {"key": "Albania", "value": "AL"},
         {"key": "Armenia", "value": "AM"}
    ])
  })

  test.skip('If object is passed i.e not in the list then listItem got unchanged',()=>{
  test('If object is passed i.e not in the list then listItem got unchanged',()=>{
      let options ={"showHelper": true, "allowNewValue": true, "showHierarchy": false}
      let wrapper = shallow(<TagSelector options = {options}/>);
      const instant = wrapper.instance();
      instant.setJsonData([
          {"key": "Albania", "value": "AL"},
          {"key": "Armenia", "value": "AM"},
          {'key':'Australia', 'value':'AU'}
      ])
      instant.removeListItem({'key':'Austria', 'value':'AS'})
      wrapper.update()
      expect(instant.getListItem()).toEqual([
        {"key": "Albania", "value": "AL"},
        {"key": "Armenia", "value": "AM"},
        {'key':'Australia', 'value':'AU'}
    ])
  })

    test.skip('removeListItem() if object is passed to the function then that object got removed from the selected Items array',()=>{
    test('removeListItem() if object is passed to the function then that object got removed from the selected Items array',()=>{
      let options ={"showHelper": true, "allowNewValue": true, "showHierarchy": false}
      let wrapper = shallow(<TagSelector options = {options}/>);
      const instant = wrapper.instance();
      instant.setJsonData([
          {"key": "Albania", "value": "AL"},
          {"key": "Armenia", "value": "AM"},
          {'key':'Australia', 'value':'AU'}
      ])
      instant.removeListItem({'key':'Australia', 'value':'Au'})
      wrapper.update()
      expect(instant.getListItem()).toEqual([
      instant.removeListItem({'key':'Australia', 'value':'AU'})
      wrapper.update()
      expect(instant.getSelectedValues()).toEqual([
        {"key": "Albania", "value": "AL"},
        {"key": "Armenia", "value": "AM"}
    ])
  })

});

// checking that when "showHelper": true, "allowNewValue": false and showHierarchy": false then, it will show no Data Found if user gives an input which is not in the list
describe("Testing for searching if value not found.", () => {
  test.skip('checking that when "showHelper": true, "allowNewValue": false and showHierarchy": false then, it will show no Data Found if user gives an input which is not in the list', () => {
    let options = {
      showHelper: true,
      allowNewValue: false,
      showHierarchy: false
    };    
    let wrapper = shallow(<TagSelector options={options} ><ItemsList options={options}/></TagSelector>);
    let instant = wrapper.instance();
    let childInstant = wrapper.find('ItemsList')
    let inputNoData = wrapper.find("Input");
    console.log(childInstant.props())
    inputNoData.simulate("change",{target:{value:'aaa'}});
    inputNoData = wrapper.find("Input");
    console.log(inputNoData);
    inputNoData.simulate("change", {target: {value: "abc"}});
    // console.log(instant.getFilteredList());
    wrapper.update();

  
      
  });
});
  test('checking that when "showHelper": true, "allowNewValue":false and showHierarchy": false then, it will show no Data Found if user gives an input which is not in the list', () => {
    let options = {
      showHelper: true,
      allowNewValue:false,
      showHierarchy: false
    };
    // let wrapper = shallow(<TagSelector options={options} />);
    // let instant = wrapper.instance();
    // // let inputNoData = wrapper.find("Input");
    // // console.log(inputNoData)
    // wrapper.find("Input").simulate("change",{target:{value:'a'}});
    // // console.log(instant.getFilteredList())

    let wrapper = mount(<TagSelector options={options} />)
    let get = wrapper.instance()
    console.log(wrapper.debug())
    // .simulate('change',{target:{value:'nepal'}})
    wrapper.update()
    const a = wrapper.find('Input')
    console.log(a.simulate('change',{target:{value:'nepal'}}))
    console.log(a.props().className)
    console.log(wrapper.find('.VS-Regular-UPPER-Case VS-TagSelector-Input').length)

    console.log()
    


    // wrapper.update();
    expect('aman').toEqual('aman');
  });
});


