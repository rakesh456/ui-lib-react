export const DEFAULT_OPTIONS = {'placeholder': 'Search', 'listItems': [], 'allowNewValue': false, 'maxItemCounter': 0, 'searchWithHelper': false, 'readOnly': false, 'allowHierarchy': false};

// Function to reset options with default options
export const resetTagSelectorOptions = (options) => {
    return {...DEFAULT_OPTIONS, ...options};
}

// Function to reset options with default options
export const isValidJsonFormat = (allowHierarchy, json) => {
    let isValidFormat = true;
    let key;
    if(!json || json.length <= 0){
        isValidFormat = false;
    } else {
        if(allowHierarchy === true){
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

// Function to reset options with default options
export const sortListingByType = (allowHierarchy, json) => {
    if(!json || json.length <= 0){
        return [];
    } else {
        if(allowHierarchy === true){
            // json.sort(function (a, b) {
            //     return a.value - b.value;
            // });
        } else {
            // let data = json.sort(function (a, b) {
            //     return b.value - a.value;
            // });
            // console.log(' data ', JSON.stringify(data));
        }
    }
    return json;
}
