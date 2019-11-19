import TagSelector from '../src/components/TagSelector/tag-selector';
import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import {DEFAULT_OPTIONS} from '../src/utils/tagselectorutils';
import { shallow } from 'enzyme';
import { placeholder } from '@babel/types';

//Checking whereas all the default options are rendering properly or not.

test('Tag-Selector component renders the default options correctly', () => {
    const options = DEFAULT_OPTIONS;
    const rendered = renderer.create(
      <TagSelector options={options} />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
});
describe('should render without crashing', () => {

    //Checking that when we adding a new element then whereas it is adding in the list or not so we are checking the length of the list after adding the list.

    test('checking that when "searchWithHelper": true, "allowNewValue": true and allowHierarchy": false then, it will show no Data Found if user gives an input which is not in the list', () => {
        let options ={"searchWithHelper": false, "allowNewValue": true, "allowHierarchy": false}
        let wrapper = shallow(<TagSelector options={options} />);
        const instant = wrapper.instance();
        instant.setJsonData([ 
            {"key": "Afghanistan", "value": "AF"}, 
            {"key": "Albania", "value": "AL"}, 
            {"key": "Algeria", "value": "DZ"}, 
            {"key": "American Samoa", "value": "AS"}, 
            {"key": "AndorrA", "value": "AD"}, 
            {"key": "Angola", "value": "AO"}, 
            {"key": "Anguilla", "value": "AI"}, 
            {"key": "Antarctica", "value": "AQ"}, 
            {"key": "Antigua and Barbuda", "value": "AG"}, 
            {"key": "Argentina", "value": "AR"}, 
            {"key": "Armenia", "value": "AM"}]);
        instant.appendNewElement({"key": "Pakistan", "value": "PK"});
        wrapper.update();
        expect(wrapper.state().listItems.length).toEqual(12);
    })


 //Checking whereas the new element we added is rendering properly in the list or not.

    test('checking that the new element added is rendering properly after adding a new object in the object array ', () => {
        let options ={"searchWithHelper": false, "allowNewValue": true, "allowHierarchy": false}
        let wrapper = shallow(<TagSelector options={options} />);
        const instant = wrapper.instance();
        instant.setJsonData([ 
            {"key": "Afghanistan", "value": "AF"}, 
            {"key": "Albania", "value": "AL"}, 
            {"key": "Algeria", "value": "DZ"}, 
            {"key": "American Samoa", "value": "AS"}, 
            {"key": "AndorrA", "value": "AD"}, 
            {"key": "Angola", "value": "AO"}, 
            {"key": "Anguilla", "value": "AI"}, 
            {"key": "Antarctica", "value": "AQ"}, 
            {"key": "Antigua and Barbuda", "value": "AG"}, 
            {"key": "Argentina", "value": "AR"}, 
            {"key": "Armenia", "value": "AM"}]);
        instant.appendNewElement({"key": "Pakistan", "value": "PK"});
        wrapper.update();
        console.log('wrapper',wrapper.state());
        expect(wrapper.state().newlyAddedElements).toEqual([{"key": "Pakistan", "value": "PK"}]);    
    })

})