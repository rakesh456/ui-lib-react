import React from 'react';
import { shallow ,mount} from 'enzyme';
import BkeySearcher from './bkey-searcher'
import {fireEvent , waitForElement} from 'react-testing-library'

// describe('testing',()=>{
//     let options = {"dataUrl":"https://jsonplaceholder.typicode.com/users", "dataState":{
//         "skip": 0,
//         "take": 20,
//         "sort": [
//             { "field": "orderDate", "dir": "desc" }
//         ],
//         "group": []
//     },"filterDataState" :{
//         "skip": 0,
//         "take": 20,
//         "sort": [
//             { "field": "orderDate", "dir": "desc" }
//         ],
//         "group": []
//     },"valueField":"name","keyField":"id"}

//     test('testing',async ()=>{

//         const wrapper = mount(<BkeySearcher options = { options }/>)
//         {} = mount(<BkeySearcher options = { options }/>)
//         wrapper.find('.VS-SelectedDiv').simulate('click')
//         const s = await waitForElement(()=> )
//         console.log(wrapper.debug())

//     })
// })  

describe('On clicking on Selected lowergrid will get render',()=>{
    let options = {"dataUrl":"https://jsonplaceholder.typicode.com/users", "dataState":{
        "skip": 0,
        "take": 20,
        "sort": [
            { "field": "orderDate", "dir": "desc" }
        ],
        "group": []
    },"filterDataState" :{
        "skip": 0,
        "take": 20,
        "sort": [
            { "field": "orderDate", "dir": "desc" }
        ],
        "group": []
    },"valueField":"name","keyField":"id"}

    test('testing',()=>{

        const wrapper = mount(<BkeySearcher options = { options }/>)
        wrapper.find('.VS-SelectedDiv').simulate('click')
        console.log(wrapper.debug())

    })
})  