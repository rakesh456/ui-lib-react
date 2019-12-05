export const DEFAULT_OPTIONS = { 'placeholder': 'Search', 'listItems': [], 'allowNewValue': false, 'maxItemCounter': 0, 'searchWithHelper': false, 'canRemoveAll': true, 'readOnly': false, 'allowHierarchy': false };

// Function to reset options with default options
export const resetTagSelectorOptions = (options) => {
    return { ...DEFAULT_OPTIONS, ...options };
}

// Function to reset options with default options
export const isValidJsonFormat = (allowHierarchy, json) => {
    let isValidFormat = true;
    let key;
    if (!json || json.length <= 0) {
        isValidFormat = false;
    } else {
        if (allowHierarchy === true) {
            json.forEach((item) => {
                for (key in item) {
                    isValidFormat = (typeof key === 'string' && typeof item[key] === 'object')
                }
            });
        } else {
            json.forEach((item) => {
                for (key in item) {
                    isValidFormat = (typeof key === 'string' && typeof item[key] === 'string')
                }
            });
        }
    }
    return isValidFormat;
}

const sortBy = fn => (a, b) => {
    const fa = fn(a)
    const fb = fn(b)
    return -(fa < fb) || +(fa > fb)
}

const getField = o => o.value

function objectFindByKey(array, key) {
    let returnArray = [];
    array.forEach((item) => {
        if(item[key] && item[key] !== 'undefined'){
            returnArray = [...item[key]];
        }
    });
    return returnArray;
}


// Function to reset options with default options
export const sortListingByType = (allowHierarchy, json) => {
    let data = [];
    if (!json || json.length <= 0) {
        return [];
    } else {
        if (allowHierarchy === true) {
            let _keys = [];
            
            json.forEach((item) => {
                let prop;
                for(prop in item) {
                    _keys.push(prop);
                }
            });
            _keys.sort();
            _keys.forEach((key) => {
                let result_obj = objectFindByKey(json, key);
                const sortByField = sortBy(getField)
                result_obj.sort(sortByField);
                data.push({[key]: result_obj});
            });
        } else {
            const sortByField = sortBy(getField)
            json.sort(sortByField)
            data = [...json];
        }
    }
    return data;
}
