import React from "react";
import ReactDOM from 'react-dom';
import TagSelectorPortal from "./portal";
import {
    guid,
    arrayIncludesInObj,
    isStringExists
} from "../../utils/utils";
import { CountryService } from '../../services/CountryService';

class TagSelector extends React.PureComponent {

    constructor(props) {
        super(props);
        const {listItems, maxItemCounter} = this.props.options;
        this.state = { shouldListOpen: false, listItems: (listItems)? listItems : [], filteredlistItems: [], noDataFound: false, selectedItems: [], maxItemCounter: maxItemCounter, newlyAddedElements: []};
        this.countryservice = new CountryService();
    }

    updateDimensions() {}

    componentDidMount() {
        document.addEventListener('click', this.closeCalendar);
        const dimensions = this.el.getBoundingClientRect();
        const style = {};
        style.left = '0px';
        style.right = dimensions.right;
        style.top = '100%';
        style.zIndex = '1';
        this.setState({ style: style });

        const countriesData = this.countryservice.getCountries(this);
        const citiesData = this.countryservice.getCities(this);
        const {listItems, allowHierarchy} = this.props.options;

        this.setState({
            listItems: (allowHierarchy === true)? citiesData : countriesData
        });
    }

    appendNewElement(obj) {
        const {listItems, newlyAddedElements} = this.state;
        let _items = [...listItems];
        let _newItems = [...newlyAddedElements];
        _items.push(obj);
        _newItems.push(obj);
        this.setState({
            listItems: _items,
            newlyAddedElements: _newItems
        });
        let _val = (this.inputEl && this.inputEl.value)? this.inputEl.value : '';
        this.updateFilterItems(_val);
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
        this.setState({ shouldListOpen: false});
        this.props.onBlur();
    }

    closeCalendar = (e) => {
        var shouldListOpen = true;

        if (((e.target && e.target.classList && !e.target.classList.contains("VS-Calendar-Input") && this.state.shouldListOpen === true)) && (e.target.nodeName !== 'path')) {
            if(e.target.classList.contains("VS-App-header")){
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
        const {searchWithHelper} = this.props.options;
        let results = [];
        if(searchWithHelper){
            results = (_val)? this.state.listItems.filter((item, index) => (isStringExists(item.value, _val) || isStringExists(item.key, _val))) : [...this.state.listItems];
        } else {
            results = (_val)? this.state.listItems.filter((item, index) => (isStringExists(item.value, _val))) : [...this.state.listItems];
        }
        
        this.setState({ filteredlistItems: results, noDataFound: (results.length <= 0) });
    }

    selectItem(event, item) {
        if(!arrayIncludesInObj(this.state.selectedItems, 'key', item.key)){
            let selectedItems = [...this.state.selectedItems];
            selectedItems.push(item);
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
    
    getUlListClass = () => {
        const { noDataFound, filteredlistItems } = this.state;
        const { allowNewValue } = this.props.options;

        return "VS-AutocompleteItems " + ((noDataFound && (!filteredlistItems || filteredlistItems.length <= 0))? ((allowNewValue === true)? 'VS-AddNewItem' : 'VS-NoData') : '');
    }
    
    getLiListClass = (item) => {
        var foundValue = this.state.selectedItems.filter((obj) =>obj.key === item.key);
        return (foundValue && foundValue.length > 0) ? "VS-ItemDisabled" : "";
    }

    itemTemplate(item) {
        return (
            <div className="p-clearfix">
                <div style={{ fontSize: '16px', float: 'right', margin: '10px 10px 0 0' }}>{item.key}</div>
            </div>
        );
    }

    renderSubitem(item, index) {
        const _uuid = guid();
        const items = Object.keys(item).map((ele, index) => {
            return <li onClick={(e) => this.selectItem(e, item[ele])} key={index + '_span'}> {item[ele].value} </li>;
        });

        return (
            <div key={_uuid}>
                {items}
            </div>
        )
    }
    
    renderHeirarchyItem(item, index) {
        // console.log(' 1item ', item);

        const items = Object.keys(item).map((ele, index1) => {
            return (
                <div key={guid()} className='VS-HeirarchyItems'>
                    <li className='VS-HeirarchyTitle' key={index1 + '_key'}> {ele} </li>
                    <ul key={index1 + '_val'}> {this.renderSubitem(item[ele], index1)} </ul>
                </div>
            );
        });

        return ( items )
    }
    
    
    renderHeirarchyItems() {
        const { filteredlistItems, listItems } = this.state;
        const { allowNewValue } = this.props.options;

        return (
            <ul className={this.getUlListClass()}>
                {
                    (listItems && listItems.length > 0)?
                        (filteredlistItems && filteredlistItems.length > 0)? 
                            filteredlistItems.map((item, index) => this.renderHeirarchyItem(item, index))
                        : (allowNewValue === true)? 'Do you want to add "' + this.inputEl.value + '" to list' : 'No Data Found' :
                        'No List Items'
                }
            </ul>
        );
    }

    renderLIItem(item, index) {
        const { selectedItems } = this.state;

        if(!selectedItems || selectedItems.length <= 0){
            return <li className={this.getLiListClass(item)} key={index + '_item'} onClick={(e) => this.selectItem(e, item)}><span className='VS-CodeText'>{item.value}</span> <span className='VS-HelperText VS-PullRight'>{item.key}</span></li>
        } else {
            let itemFound = selectedItems.filter((obj) =>obj.key === item.key);
            return (
                (itemFound.length)?
                null : <li className={this.getLiListClass(item)} key={index + '_item'} onClick={(e) => this.selectItem(e, item)}><span className='VS-CodeText'>{item.value}</span> <span className='VS-HelperText VS-PullRight'>{item.key}</span></li>
            );
        }
    }
    
    renderULItems() {
        const { filteredlistItems, listItems } = this.state;
        const { allowNewValue, allowHierarchy } = this.props.options;

        return (
            <ul className={this.getUlListClass()}>
                {
                    (listItems && listItems.length > 0)?
                        (filteredlistItems && filteredlistItems.length > 0)? 
                            filteredlistItems.map((item, index) => this.renderLIItem(item, index))
                        : (allowNewValue === true)? 'Do you want to add "' + this.inputEl.value + '" to list' : 'No Data Found' :
                        'No List Items'
                }
            </ul>
        );
    }

    renderRemoveIcon(item, index){
        const { readOnly } = this.props.options;
        return (
            (readOnly === false)? <span className="VS-AutoCompleteItem-Icon pi pi-fw pi-times" onClick={(e) => this.removeItem(item, index)}>X</span> : <span className="VS-AutoCompleteItem-Icon VS-Disabled pi pi-fw pi-times">X</span>
        )
    }

    renderSelectedItems() {
        const { selectedItems, maxItemCounter } = this.state;
        return (
            <ul>
                {
                    (selectedItems && selectedItems.length > 0)?
                        (maxItemCounter === 0 || maxItemCounter >= selectedItems.length)?
                            selectedItems.map((item, index) =>  {
                                return <li key={index + '_data'}><span key={index + '_item'} className="VS-AutoCompleteItem" >{item.key} {this.renderRemoveIcon(item, index)}</span></li>
                            }) : <li><span className="VS-AutoCompleteItem" >{selectedItems.length} SELECTED {this.renderRemoveIcon(null, -1)}</span></li>
                    :  ''
                }
                <li>
                    <input ref={(el) => this.inputEl = ReactDOM.findDOMNode(el)} type="text"
                        className={`VS-Regular-UPPER-Case VS-Calendar-Input`}
                        placeholder={this.getPlaceholder()}
                        onClick={this.onFocus}
                        onBlur={this.onBlur}
                        onChange={this.filterItemsList}
                    />
                </li>
            </ul>
        );
    }

    render() {
        const { shouldListOpen } = this.state;
        const { allowHierarchy } = this.props.options;
        const _uuid = guid();
        let _selectedInput = this.renderSelectedItems();

        return (
            <div className="VS-App">
                <div id={`${_uuid}`}></div>
                <header className="VS-App-header">
                    <div>
                        <div ref={(el) => this.el = el}>
                            <div className={`VS-Tag-Input-Border`}>
                                {_selectedInput}
                            </div>
                        </div>
                        {
                            (shouldListOpen) ?
                                <TagSelectorPortal parent="#parent" position="right" arrow="center" uuid={_uuid}>
                                    <div id="VS-Scrollbar" className="VS-Scrollbar" className={this.getContainerClass()} style={this.state.style} tabIndex="0" onKeyDown={(e) => this.props.onKeyDown(e)}>
                                        {
                                            (allowHierarchy === true)?
                                            this.renderHeirarchyItems() 
                                            : this.renderULItems() 
                                        }
                                    </div> 
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