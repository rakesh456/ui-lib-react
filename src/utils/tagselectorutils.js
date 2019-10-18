export const DEFAULT_OPTIONS = {'placeholder': 'options.placeholder', 'listItems': []};

// Function to reset options with default options
export const resetTagSelectorOptions = (options) => {
    return {...DEFAULT_OPTIONS, ...options};
}

export const resolveFieldData = (data, field) => {
    if(data && field) {
        if (this.isFunction(field)) {
            return field(data);
        }
        else if(field.indexOf('.') === -1) {
            return data[field];
        }
        else {
            let fields = field.split('.');
            let value = data;
            for(var i = 0, len = fields.length; i < len; ++i) {
                if (value == null) {
                    return null;
                }
                value = value[fields[i]];
            }
            return value;
        }
    }
    else {
        return null;
    }
}