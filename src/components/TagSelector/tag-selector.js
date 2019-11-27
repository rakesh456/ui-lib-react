import React from "react";
import { Input } from 'reactstrap';
import ReactDOM from 'react-dom';
import ItemsList from "./tag-items-list";
import TagSelectorPortal from "./portal";
import {
    guid,
    arrayIncludesInObj,
    isStringExists
} from "../../utils/utils";
import {
    sortListingByType,
    isValidJsonFormat
} from "../../utils/tagselectorutils";
import { CountryService } from '../../services/CountryService';

class TagSelector extends React.PureComponent {
    constructor(props) {
        super(props);
        const {maxItemCounter} = this.props.options;
        this.state = { shouldListOpen: false, listItems: [], filteredlistItems: [], noDataFound: false, selectedItems: [], maxItemCounter: maxItemCounter, newlyAddedElements: [], currentItemIndex: -1, currentHierarchyItemIndex: 0, hierarchyParentKey: '', hierarchyParentLength: 0};
        this.countryservice = new CountryService();
    }

    updateDimensions() {}

    componentDidMount() {
        document.addEventListener('click', this.closeTagSelector);
        if(this.el){
            const dimensions = this.el.getBoundingClientRect();
            const style = {};
            style.left = '0px';
            style.right = dimensions.right;
            style.top = '100%';
            style.zIndex = '1';
            this.setState({ style: style });
        }

        // const countriesData = this.countryservice.getCountries(this);
        // const citiesData = this.countryservice.getCities(this);
        // const {listItems, allowHierarchy} = this.props.options;

        // this.setState({
        //     listItems: (allowHierarchy === true)? citiesData : countriesData
        // });
    }

    setJsonData(listItems){
        const {allowHierarchy} = this.props.options;
        if(isValidJsonFormat(allowHierarchy, listItems)){
            this.setState({
                listItems: sortListingByType(allowHierarchy, listItems)
            });
        }
    }
    
    setSelectedItems(selectedItems){
        let currentSelectedItems = [...this.state.selectedItems];
        if(isValidJsonFormat(false, selectedItems)){
            selectedItems.forEach((item) => {
                this.checkItemExistInList(item, (isExists) => {
                    if(isExists){
                        let results = currentSelectedItems.filter((obj) => {
                            return obj.value === item.value
                        });
                        
                        console.log('results ', results);
                        if(!results || results.length <= 0){
                            currentSelectedItems.push(item);
                        }
                    }
                })           
            });
            this.setState({
                selectedItems: currentSelectedItems
            });
        }
    }

    checkItemExistInList = (item, callback) => {
        const { allowHierarchy } = this.props.options;
        const { listItems } = this.state;
        if(allowHierarchy){
            // Function to check object contains in list
            let key;
            let flag = false;
            listItems.forEach((element, index) => {
                for (key in element) {
                    const _item = element[key];
                    if(flag === false){
                        let results = _item.filter((obj) => {
                            return (obj.value === item.value && obj.key === item.key)
                        });
                        flag = (results && results.length > 0);
                    }
                }
            });
            callback(flag);
        } else {
            let results = listItems.filter((obj) => {
                return (obj.value === item.value && obj.key === item.key)
            });
            callback((results && results.length > 0));
        }
    }
    
    refresh(){
        this.setState({
            selectedItems: []
        });
    }

    addItemAndUpdateList = (obj) => {
        const {listItems, newlyAddedElements} = this.state;
        let _items = [...listItems];
        let _newItems = [...newlyAddedElements];
        _items.push(obj);
        _newItems.push(obj);
        this.setState({
            listItems: [..._items],
            newlyAddedElements: [..._newItems]
        });
    }

    appendNewElement(obj) {
        const {allowHierarchy} = this.props.options;
        if(allowHierarchy === false){
            this.addItemAndUpdateList(obj);
            let _val = (this.inputEl && this.inputEl.value)? this.inputEl.value : '';
            this.updateFilterItems(_val);
        }
    }

    onAddNewItemHandler = (value) => {
        if(value){
            let obj = {'key': value, 'value': value};
            this.addItemAndUpdateList(obj);
            this.onSelectHandler(obj);
            this.setState({
                shouldListOpen: false
            });
        }
    }
    
    getNewlyAdded() {
        return this.state.newlyAddedElements;
    }
    
    getSelectedValues() {
        return this.state.selectedItems;
    }
    
    getSelectedCounter() {
        const {selectedItems} = this.state;
        return (selectedItems)? selectedItems.length : 0;
    }

    onFocus = () => {
        this.setState({
            shouldListOpen: true
        });

        this.props.onFocus();
        this.updateFilterItems('');
    }

    onBlur = () => {
        // this.setState({ shouldListOpen: false});
        this.props.onBlur();
    }

    onKeyDownHandler = (evt) => {
        if(evt){
            evt = (evt) ? evt : window.event;
            const charCode = (evt.which) ? evt.which : evt.keyCode;
            const _val = this.state.currentItemIndex;
            const {allowHierarchy} = this.props.options;
            
            let _counter = (charCode === 38 && _val >= 0)? -1 : (charCode === 40 && _val < this.state.filteredlistItems.length)? 1 : 0;

            let _indexChanged = false;
            let _itemIndex = this.state.currentItemIndex;
            let _hierarchyIndex = this.state.currentHierarchyItemIndex;
            let _hierarchyParentKey = this.state.hierarchyParentKey;
            let _hierarchyParentLength = this.state.hierarchyParentLength;
            let _list = this.state.filteredlistItems[_hierarchyIndex];

            console.log(_hierarchyIndex, ' this.state.filteredlistItems.length ', this.state.filteredlistItems.length);
            if(_list && allowHierarchy === true){
                let _key = '';
                let _len = 0;
                for (const key in _list) {
                    _len = _list[key].length;
                            
                    if((_itemIndex + 1) >= _len && _counter === 1){
                        _itemIndex = 0;
                        _indexChanged = true;
                        _hierarchyParentLength = _len;

                        let _list2 = this.state.filteredlistItems[_hierarchyIndex + 1];
                        for (const key in _list2) {
                            _hierarchyParentKey = key;
                            _hierarchyIndex = this.state.currentHierarchyItemIndex + 1;
                        }
                    } else if((_itemIndex) <= 0 && _counter === -1){
                        _indexChanged = true;
                        
                        let _list2 = this.state.filteredlistItems[_hierarchyIndex - 1];
                        for (const key in _list2) {
                            _hierarchyParentKey = key;
                            _itemIndex = _list2[key].length - 1;
                            _hierarchyIndex = this.state.currentHierarchyItemIndex - 1;
                        }
                    }
                }
            }

            this.setState({
                currentItemIndex: (_indexChanged)? _itemIndex : (((_hierarchyIndex + 1) === this.state.filteredlistItems.length)? this.state.currentItemIndex : (this.state.currentItemIndex + (_counter))),
                currentHierarchyItemIndex: _hierarchyIndex,
                hierarchyParentKey: _hierarchyParentKey,
                hierarchyParentLength: _hierarchyParentLength
            });

            if(charCode === 13){
                this.addItemOnEnter();
            }
        }
    }

    updateHierarchyIndexHandler = () => {
        this.setState({
            currentHierarchyItemIndex: (this.state.currentHierarchyItemIndex + 1)
        });
    }

    addItemOnEnter = () => {
        if(this.state.currentItemIndex >= 0){
            let listItems = [...this.state.listItems];
            let item = listItems[this.state.currentItemIndex];
            if(item){
                if(!arrayIncludesInObj(this.state.selectedItems, 'key', item.key)){
                    let selectedItems = [...this.state.selectedItems];
                    selectedItems.push(item);
                    this.setState({ selectedItems: selectedItems });
                } else {
                    let selectedItems = [...this.state.selectedItems];
                    selectedItems = selectedItems.filter((obj) => {
                        return obj.key !== item.key;
                    });
                    this.setState({ selectedItems: selectedItems });
                }
                this.props.onSelect(item);
            }
        }
    }

    filterItemsList = (e) => {
        setTimeout(() => {
            let _val = (this.inputEl && this.inputEl.value)? this.inputEl.value : '';
            this.updateFilterItems(_val);
            if(_val && this.state.filteredlistItems.length <= 0){
                this.props.onNotFound();
            }
        }, 250);
    }

    updateFilterItems = (_val) => {
        const {listItems} = this.state;
        const {allowHierarchy} = this.props.options;
        let key;
        let results = [];
        if(allowHierarchy === true){
            let results1 = [];
            listItems.forEach((element, index) => {
                for (key in element) {
                    const _item = element[key];
                    const _key = key;
                    let obj = _item.filter(o => isStringExists(o.value, _val));
                    if(obj && obj.length > 0){
                        if(!results1[_key]){
                            results1.push({[_key]: []});
                        }
                        if(results1[index]){
                            results1[index][_key] = [...obj];
                        }
                    } else {
                        results1[index] = {};
                        results1[index][_key] = [];
                    }
                }
            });
            results = (_val && results1.length > 0)? [...results1] : [...listItems];
        } else {
            results = (_val)? this.state.listItems.filter((item, index) => (this.checkStringSearchInListByType(item, _val))) : [...this.state.listItems];
        }
        
        const sortedList = sortListingByType(allowHierarchy, results);

        let _key = '';
        let _len = 0;
        for (const key in sortedList[0]) {
            _len = sortedList[0][key].length;
            _key = key;
        }

        this.setState({ filteredlistItems: sortedList, noDataFound: (results.length <= 0), currentHierarchyItemIndex: 0, hierarchyParentKey: _key, hierarchyParentLength: _len });
    }

    checkStringSearchInListByType = (item, _val) => {
        const {searchWithHelper} = this.props.options;
        if(searchWithHelper){
            return (isStringExists(item.value, _val) || isStringExists(item.key, _val))
        } else {
            return (isStringExists(item.value, _val))
        }
    }
    
    closeTagSelector = (e) => {
        let shouldListOpen = true;
        
        if (((e.target && e.target.classList && !e.target.classList.contains("VS-TagSelector-Input") && this.state.shouldListOpen === true)) && (e.target.nodeName !== 'path')) {
            if(e.target.classList.contains("VS-App-header") || e.target.classList.length === 0){
                this.setState({
                    shouldListOpen: false
                });
            } else {
                this.setState({
                    shouldListOpen: shouldListOpen
                });
            }
        }
    }

    onSelectHandler = (item) => {
        this.setState({ shouldListOpen: true });
        if(!arrayIncludesInObj(this.state.selectedItems, 'key', item.key)){
            let selectedItems = [...this.state.selectedItems];
            selectedItems.push(item);
            this.setState({ selectedItems: selectedItems });
        } else {
            let selectedItems = [...this.state.selectedItems];
            selectedItems = selectedItems.filter((obj) => {
                return obj.key !== item.key;
            });
            this.setState({ selectedItems: selectedItems });
        }
        
        this.inputEl.value = '';
        this.inputEl.focus();
        this.updateFilterItems('');
        this.props.onSelect(item);
    }
    
    removeItem(item, index) {
        if(index >= 0){
            let selectedItems = [...this.state.selectedItems];
            selectedItems.splice(index, 1);
            this.setState({ selectedItems: selectedItems });
            this.props.onDeSelect(item);
        } else {
            this.props.onDeSelect(this.state.selectedItems);
            this.setState({ selectedItems: [] });
        }
    }
    
    getPlaceholder(){
        const options = this.props.options;
        return options.placeholder;
    }

    getContainerClass = () => {
        return "VS-TagSelectorContainer VS-modal";
    }
    
    renderRemoveIcon(item, index){
        const { canRemoveAll, readOnly } = this.props.options;
        return (
            (canRemoveAll === true && readOnly === false)? <span className="VS-AutoCompleteItem-Icon pi pi-fw pi-times" onClick={(e) => this.removeItem(item, index)}>X</span> : <span className="VS-AutoCompleteItem-Icon VS-Disabled pi pi-fw pi-times">X</span>
        )
    }

    renderSelectedItems() {
        const { selectedItems, maxItemCounter } = this.state;
        const { readOnly } = this.props.options;
        return (
            <ul>
                {
                    (selectedItems && selectedItems.length > 0)?
                        (maxItemCounter === 0 || maxItemCounter >= selectedItems.length)?
                            selectedItems.map((item, index) =>  {
                                return <li key={index + '_data'}><span key={index + '_item'} className="VS-AutoCompleteItem" >{item.value} {this.renderRemoveIcon(item, index)}</span></li>
                            }) : <li><span className="VS-AutoCompleteItem" >{selectedItems.length} SELECTED {this.renderRemoveIcon(null, -1)}</span></li>
                    :  ''
                }
                <li>
                    <Input ref={(el) => this.inputEl = ReactDOM.findDOMNode(el)} type="text"
                        className={`VS-Regular-UPPER-Case VS-TagSelector-Input`}
                        placeholder={this.getPlaceholder()}
                        onKeyDown={(e) => this.onKeyDownHandler(e)}
                        onClick={this.onFocus}
                        onBlur={this.onBlur}
                        onChange={this.filterItemsList}
                        readOnly={readOnly}
                    />
                </li>
            </ul>
        );
    }

    render() {
        const { shouldListOpen, listItems, filteredlistItems, noDataFound, selectedItems, currentItemIndex, currentHierarchyItemIndex } = this.state;
        const { options } = this.props;
        const { readOnly } = this.props.options;
        const _uuid = guid();
        let _selectedInput = this.renderSelectedItems();
        const readOnlyClass = (readOnly === true)? 'VS-ReadOnly' : '';
        return (
            <div className="VS-App">
                <div id={`${_uuid}`}></div>
                <header className="VS-App-header">
                    <div>
                        <div ref={(el) => this.el = el}>
                            <div className={`VS-Tag-Input-Border ${readOnlyClass}`}>
                                {_selectedInput}
                            </div>
                        </div>
                        {
                            (shouldListOpen && readOnly !== true) ?
                                <TagSelectorPortal parent="#parent" position="right" arrow="center" uuid={_uuid}>
                                    <ItemsList style={this.state.style} inputEl={this.inputEl} selectedItems={selectedItems} listItems={listItems} filteredlistItems={filteredlistItems} options={options} noDataFound={noDataFound} onSelect={this.onSelectHandler} addNewItem={this.onAddNewItemHandler} currentItemIndex={currentItemIndex} currentHierarchyItemIndex={currentHierarchyItemIndex} updateHierarchyIndex={this.updateHierarchyIndexHandler}> </ItemsList>
                                </TagSelectorPortal>
                                : ''
                        }
                    </div>
                </header>
            </div>
        );
    }
}

export default TagSelector;