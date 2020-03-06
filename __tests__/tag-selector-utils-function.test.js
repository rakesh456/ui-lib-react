
import { isValidJsonFormat, sortListingByType, resetTagSelectorOptions } from '../src/utils/tagselectorutils';
import { DEFAULT_OPTIONS } from '../src/utils/tagselectorutils';


// 1. Test for resetTagSelectorOptions

describe('Testing on function resetTagSelectorOptions', () => {
  let options = { myproperty: 'five' }
  DEFAULT_OPTIONS['myproperty'] = 'five';
  test('testing', () => {
    expect(resetTagSelectorOptions(options)).toEqual(DEFAULT_OPTIONS)
  })
})


// 2. Test for isValidJsonFormat

describe('Testing on function isValidJsonFormat', () => {
  let jsonHierarchy = [{
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  }]

  let json = [{
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": "Romaguera-Crona"
  }, {
    "id": 2,
    "name": "jhon Graham",
    "username": "Bret",
    "email": "jhon@april.biz",
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": "Raymond-Crona"
  }]
  let emptyJson = []
  let undefinedJson;
  let input = [jsonHierarchy, jsonHierarchy, json, json, emptyJson, undefinedJson, emptyJson, undefinedJson]
  let expectedOutput = [true, false, false, true, false, false, false, false]
  let allowHierarchy = [true, false, true, false, false, false, true, true]
  let messages = ['Testing for valid hierarchy json file for that function return true',
    'Testing for simple valid json file then function returns true',
    'Passing empty json file then function returns false',
    'Passing inValid json file then function returns false']
  for (let i = 0; i < input.length; i++) {
    test(`${messages[i]}`, () => {
      expect(isValidJsonFormat(allowHierarchy[i], input[i]))
        .toEqual(expectedOutput[i])
    })
  }
})

// 3. Test for sortListingByType

describe('Testing on fucntion sortListingByType', () => {
  let inputHierarchy = [{ 'friuits': ['mango', 'apple', 'orange', 'cherry', 'pineapple'] },
  { 'animals': ['cat', 'dog', 'lion', 'tiger'] }
  ]
  let inputNoHierarchy = [{ 'fruits': 'mango', 'animals': 'cat' },
  { 'car': 'audi', 'bike': 'hunk' }]
  let emptyJson = []
  let undefinedJson;
  let outputOfInputHierarchy = [{ 'animals': ['cat', 'dog', 'lion', 'tiger'] },
  { 'friuits': ['mango', 'apple', 'orange', 'cherry', 'pineapple'] }]
  let outputOfInputNoHierarchy = [{ 'animals': 'cat', 'fruits': 'mango' },
  { 'bike': 'hunk', 'car': 'audi' }]
  let input = [inputHierarchy, inputNoHierarchy, emptyJson, undefinedJson]
  let output = [outputOfInputHierarchy, outputOfInputNoHierarchy, [], []]
  let allowHierarchy = [true, false, false, false]
  let messages = ['Testing for valid hierarchy json file for that function return in sorted order of property',
    'Testing for non hierarchy valid json file then function returns in sorted order of property',
    'Passing empty json file then function returns empty array',
    'Passing inValid json file then function returns empty array']
  for (let i = 0; i < input.length; i++) {
    test(`${messages[i]}`, () => {
      expect(sortListingByType(allowHierarchy[i], input[i]))
        .toEqual(output[i])
    })
  }
})