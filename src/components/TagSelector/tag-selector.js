import React from "react";
import ReactDOM from 'react-dom';
import { Input } from 'reactstrap';
import TagSelectorPortal from "./portal";
import {
    resolveFieldData
} from "../../utils/tagselectorutils";
import {
    guid,
} from "../../utils/utils";
import { CountryService } from '../../services/CountryService';

class TagSelector extends React.PureComponent {

    constructor(props) {
        super(props);
        const {listItems} = this.props.options;
        this.state = { shouldListOpen: false, listItems: (listItems)? listItems : [], filteredlistItems: [], noDataFound: false, selectedItems: [] };
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
        this.setState({
            listItems: countriesData
        });
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
        // this.props.onBlur();
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
        }, 250);
    }

    updateFilterItems = (_val) => {
        console.log(' _val ', _val);
        let results = (_val)? this.state.listItems.filter((country, index) => (country.name.startsWith(_val))) : [...this.state.listItems];
        console.log(' length ', results.length);
        results = results.filter((item,idx) => idx <= 5)
        console.log(' results ', results);
        
        this.setState({ filteredlistItems: results, noDataFound: (results.length <= 0) });
    }


    selectItem(event, item) {
        console.log(' item ', item);
        this.inputEl.value = '';
        this.inputEl.focus();
    }
    
    getPlaceholder(){
        const options = this.props.options;
        return options.placeholder;
    }

    getContainerClass = () => {
        const { showButtons } = this.props.options;
        return "VS-TagSelectorContainer VS-modal";
    }
    
    getUlListClass = () => {
        const { noDataFound, filteredlistItems } = this.state;
        return "VS-AutocompleteItems " + ((noDataFound && (!filteredlistItems || filteredlistItems.length <= 0))? 'VS-NoData' : '');
    }

    itemTemplate(item) {
        return (
            <div className="p-clearfix">
                <div style={{ fontSize: '16px', float: 'right', margin: '10px 10px 0 0' }}>{item.name}</div>
            </div>
        );
    }

    renderItems() {
        const { noDataFound, filteredlistItems } = this.state;
        return (
            <ul className={this.getUlListClass()}>
                {
                    (filteredlistItems && filteredlistItems.length > 0)? 
                        filteredlistItems.map((item, index) => <li key={index + '_item'} className="p-autocomplete-list-item" onClick={(e) => this.selectItem(e, item)}>{item.name}</li>)
                    : 'No Data Found'
                }
            </ul>
        );
    }

    render() {
        const { shouldListOpen, noDataFound } = this.state;
        const _uuid = guid();

        return (
            <div className="VS-App">
                <div id={`${_uuid}`}></div>
                <header className="VS-App-header">
                    <div>
                        <div ref={(el) => this.el = el}>
                            <div className={`VS-Tag-Input-Border`}>
                                <input ref={(el) => this.inputEl = ReactDOM.findDOMNode(el)} type="text"
                                    className={`VS-Regular-UPPER-Case VS-Calendar-Input`}
                                    placeholder={this.getPlaceholder()}
                                    onClick={this.onFocus}
                                    onBlur={this.onBlur}
                                    onChange={this.filterItemsList}
                                />
                            </div>
                        </div>
                        {
                            (shouldListOpen) ?
                                <TagSelectorPortal parent="#parent" position="right" arrow="center" uuid={_uuid}>
                                    <div className={this.getContainerClass()} style={this.state.style} tabIndex="0" onKeyDown={(e) => this.props.onKeyDown(e)}>
                                        {this.renderItems()}
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