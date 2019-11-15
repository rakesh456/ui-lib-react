import React from "react";
import { Button } from 'reactstrap';
import {
    guid
} from "../../utils/utils";
import { CountryService } from '../../services/CountryService';

class ItemsList extends React.PureComponent {
    constructor(props) {
        super(props);
        const {maxItemCounter} = this.props.options;
        this.state = { selectedItems: [], maxItemCounter: maxItemCounter, newlyAddedElements: []};
        this.countryservice = new CountryService();
    }
    
    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
    }

    selectItem(event, item) {
        this.props.onSelect(item);
    }
    
    getUlListClass = () => {
        const { allowNewValue } = this.props.options;
        const { filteredlistItems, noDataFound } = this.props;

        return "VS-AutocompleteItems " + ((noDataFound && (!filteredlistItems || filteredlistItems.length <= 0))? ((allowNewValue === true)? 'VS-AddNewItem' : 'VS-NoData') : '');
    }
    
    getLiListClass = (item) => {
        var foundValue = false;
        if(this.props.selectedItems){
            foundValue = this.props.selectedItems.filter((obj) =>obj.key === item.key);
        }
        return (foundValue && foundValue.length > 0) ? "VS-ItemSelected VS-LiItems" : "VS-LiItems";
    }
    
    getHeirarchyLiListClass = (item) => {
        var foundValue = false;
        // if(this.props.selectedItems){
        //     foundValue = this.props.selectedItems.filter((obj) =>obj.key === item.key);
        // }
        return (foundValue && foundValue.length > 0) ? "VS-ItemSelected VS-LiItems" : "VS-LiItems";
    }

    renderSubitem(item, index) {
        const _uuid = guid();
        const items = Object.keys(item).map((ele, index) => {
            return <li className={this.getHeirarchyLiListClass(item)} onClick={(e) => this.selectItem(e, item[ele])} key={index + '_span'}> {item[ele].value} </li>;
        });

        return (
            <div key={_uuid}>
                {items}
            </div>
        )
    }
    
    renderHeirarchyItem(item, index) {
        const items = Object.keys(item).map((ele, index1) => {
            return (
                <div key={guid()} className='VS-HeirarchyItems'>
                    {
                        (item[ele] && item[ele].length > 0)? <li className='VS-HeirarchyTitle' key={index1 + '_key'}> {ele} </li> : ''
                    }
                    <ul key={index1 + '_val'}> {this.renderSubitem(item[ele], index1)} </ul>
                </div>
            );
        });

        return ( items )
    }
    
    renderHeirarchyItems() {
        const { allowNewValue } = this.props.options;
        const { filteredlistItems, listItems } = this.props;

        return (
            <ul className={this.getUlListClass()}>
                {
                    (listItems && listItems.length > 0)?
                        (filteredlistItems && filteredlistItems.length > 0)? 
                            filteredlistItems.map((item, index) => this.renderHeirarchyItem(item, index))
                        : (allowNewValue === true)? 'Do you want to add "' + this.props.inputEl.value + '" to list' : 'No Data Found' :
                        'No List Items'
                }
            </ul>
        );
    }

    renderLIItem(item, index) {
        const { selectedItems } = this.state;
        const {searchWithHelper} = this.props.options;

        if(!selectedItems || selectedItems.length <= 0){
        return <li className={this.getLiListClass(item)} key={index + '_item'} onClick={(e) => this.selectItem(e, item)}><span className='VS-CodeText'>{item.value}</span>{(searchWithHelper === true)? <span className="VS-HelperText VS-PullRight">{item.key}</span> : ''}</li>
        } else {
            let itemFound = selectedItems.filter((obj) =>obj.key === item.key);
            return (
                (itemFound.length)?
                null : <li className={this.getLiListClass(item)} key={index + '_item'} onClick={(e) => this.selectItem(e, item)}><span className='VS-CodeText'>{item.value}</span> {(searchWithHelper === true)? <span className="VS-HelperText VS-PullRight">{item.key}</span> : ''}</li>
            );
        }
    }
    
    renderULItems() {
        const { allowNewValue, allowHierarchy, searchWithHelper } = this.props.options;
        const { filteredlistItems, listItems } = this.props;
        return (
            <ul className={this.getUlListClass()}>
                {
                    (listItems && listItems.length > 0)?
                        (filteredlistItems && filteredlistItems.length > 0)? 
                            filteredlistItems.map((item, index) => this.renderLIItem(item, index))
                        : (allowNewValue === true && allowHierarchy === false && searchWithHelper === false)? this.addItemButton() : 'No Data Found' :
                        'No List Items'
                }
            </ul>
        );
    }

    addItemButton = () => {
        return (
            <span>{
                    <span>Do you want to add "{this.props.inputEl.value}" to list? <br /><Button className="VS-AddButton" onClick={() => this.addNewItem(this.props.inputEl.value)}>ADD</Button></span>
                }
            </span>
        )
    }

    addNewItem = () => {
        this.props.addNewItem(this.props.inputEl.value);
    }
    
    getContainerClass = () => {
        return "VS-TagSelectorContainer VS-modal";
    }

    render() {
        const { allowHierarchy } = this.props.options;
        return (
            <div id="VS-Scrollbar" className={this.getContainerClass()} style={this.props.style} tabIndex="0">
                {
                    (allowHierarchy === true)?
                    this.renderHeirarchyItems() 
                    : this.renderULItems() 
                }
            </div> 
        );
    }
}

export default ItemsList;