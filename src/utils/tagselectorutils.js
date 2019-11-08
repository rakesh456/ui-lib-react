export const DEFAULT_OPTIONS = {'placeholder': 'Search', 'listItems': [], 'allowNewValue': false, 'maxItemCounter': 0, 'searchWithHelper': false, 'readOnly': false, 'allowHierarchy': false};

// Function to reset options with default options
export const resetTagSelectorOptions = (options) => {
    return {...DEFAULT_OPTIONS, ...options};
}
