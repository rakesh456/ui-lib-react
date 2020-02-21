import React from 'react';
import '../../App.css';
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";
import { Grid, GridColumn, GridCell } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import { process } from '@progress/kendo-data-query';
import styles from './style.module.css'
import { CommonDragLogic } from '@progress/kendo-react-grid/dist/npm/drag/CommonDragLogic';

class BkeySearcher extends React.Component {
    constructor(props) {
        super(props);
        const dataState =  props.options.dataState
        const filterDataState = props.options.filterDataState        
        this.state = {
            showBelowGrid: false,
            dataState: dataState,
            filterDataState: filterDataState,
            data: "",
            masterData:[],
            filteredResult: [],
            filterList: [],
            columns: [
                {
                    title: "Preview ",
                    template: '<input type="button" class="k-button info" name="info" value="Info" />',
                    headerTemplate: '<label>  <input type="checkbox" id="checkAll"/>Print All</label>',
                    filterable: false,
                    sortable: false,
                    width: 100
                }
            ]
        };
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        var myInit = { 
        method: 'GET',
        headers: myHeaders,
        mode: 'no-cors',
        cache: 'default' 
        };
        
        var myRequest = new Request(this.props.options.dataUrl, myInit);
        console.log(myRequest)
        fetch(myRequest.url).then((resp)=> resp.json()).then((data)=>{
            this.setState({
                data: data,
                dataResult: process(data, dataState),
            })
            
        })
       
    }
   
    toggleBelowGrid = () => {
        this.setState({ showBelowGrid: !this.state.showBelowGrid });
    }

    addItemToFilterList = (item, isAdd) => {
        if (isAdd) {
            let result = this.state.filterList.filter((obj) => {
                return obj[this.props.options.valueField] === item[this.props.options.valueField]
            });
            if (result.length <= 0) {
                console.log()
                let _items = [...this.state.filterList];
                _items.push(item);
                this.setState({ filterList: _items });
                this.filterDataStateChange([..._items], {'data': this.state.filterDataState});
            }
            
            let filteredCountries = [...this.state.data];
            let ind = this.state.data.findIndex((element) => {
                return element[this.props.options.valueField] === item[this.props.options.valueField];
            });

            if (ind !== -1) {
                filteredCountries.splice(ind, 1)
            }

            this.setState({ data : [...filteredCountries] });
            this.dataStateChange([...filteredCountries], {'data': this.state.dataState});
        } else {
            let result = this.state.data.filter((obj) => {
                return obj[this.props.options.valueField] === item[this.props.options.valueField]
            });

            if (result.length <= 0) {
                let _items = [...this.state.data];
                _items.push(item);
                this.setState({ data: _items });
                this.dataStateChange([..._items], {'data': this.state.dataState});
            }

            let filteredCountries = [...this.state.filterList];
            let ind = this.state.filterList.findIndex((element) => {
                return element.name === item.name;
            });

            if (ind !== -1) {
                filteredCountries.splice(ind, 1)
            }
            this.setState({ filterList: [...filteredCountries] });
            this.filterDataStateChange([...filteredCountries], {'data': this.state.filterDataState});
        }
    }

    dataStateChange = (data, event) => {
       data.sort((a,b)=> (a[this.props.options.keyField] > b[this.props.options.keyField])? 1:-1)
        this.setState({
            dataResult: process(data, event.data),
            dataState: event.data
        });
    }
    
    filterDataStateChange = (data, event) => {

        this.setState({
            filteredResult: process(data, event.data),
            filterDataState: event.data
        });
    }

    plusSign = (props)=>{
        return (
            
            <td className={styles.sign}>
            <span className='key'>{props.dataItem.id}</span> <a className={styles.plus} onClick={(e) => {
                    this.addItemToFilterList(props.dataItem, true);
                }}>+</a>
            </td>
        );

    }

    crossSign = (props)=>{
        return (
            <td className={styles.sign}>
            <span className='key'>{props.dataItem.id}</span> <a  className={styles.plus} onClick={(e) => {
                    this.addItemToFilterList(props.dataItem, false);
                }}>x</a>
            </td>
        );
    }

    refresh(){
        const dataState =  this.props.options.dataState
        const filterDataState = this.props.options.filterDataState
        if(this.state.filteredResult.data != undefined){
            this.state.filteredResult.data.forEach((eachObj)=>{
                this.state.data.push(eachObj)
            })
        }   
        this.state.data.sort((a,b)=> a[this.props.options.keyField] > b[this.props.options.keyField] ? 1: -1 )
        this.setState ({
            showBelowGrid: false,
            dataState: dataState,
            filterDataState: filterDataState,
            data: this.state.data,
            dataResult: process(this.state.data, dataState),
            filteredResult: [],
            filterList: [],
            columns: [
                {
                    title: "Preview ",
                    template: '<input type="button" class="k-button info" name="info" value="Info" />',
                    headerTemplate: '<label>  <input type="checkbox" id="checkAll"/>Print All</label>',
                    filterable: false,
                    sortable: false,
                    width: 100
                }
            ]
        }) 
    }

    resetData(){
        fetch('http://dummy.restapiexample.com/api/v1/employees').then((resp)=> resp.json()).then((nextData)=>{
            console.log(nextData.data)
    
        

        this.setState ({
            showBelowGrid: false,
            dataState: this.props.options.dataState,
            filterDataState: this.props.options.filterDataState,
            data: nextData.data,
            dataResult: process(this.state.data, this.props.options.dataState),
            filteredResult: [],
            filterList: [],
            columns: [
                {
                    title: "Preview ",
                    template: '<input type="button" class="k-button info" name="info" value="Info" />',
                    headerTemplate: '<label>  <input type="checkbox" id="checkAll"/>Print All</label>',
                    filterable: false,
                    sortable: false,
                    width: 100
                }
            ]
        }) 

    })
        
    }
    render() {
        return (
            <div className="VS-shape-rounded-fill VS-modal">
                <div>
                    <Grid
                        data={this.state.filteredResult}
                        dataState={this.state.filterDataState}
                        onDataStateChange={e => this.filterDataStateChange(this.state.filterList, e)}
                        filterable={true}
                        style={{ height: "250px", width: "400px" }}
                        // onRowClick={(e) => {
                        //     this.addItemToFilterList(e.dataItem, false);
                        // }}
                        
                    >
                        <GridColumn field={this.props.options.valueField} title="Value" />
                        <GridColumn field={this.props.options.keyField} title="Key" cell = {this.crossSign} />
                    </Grid>
                    <div className="VS-SelectedDiv" onClick={this.toggleBelowGrid}>{this.state.filterList.length} Selected</div>
                    {
                        
                        (this.state.showBelowGrid === true) ?
                            <Grid
                                data={this.state.dataResult}
                                {...this.state.dataState}
                                onDataStateChange={e => this.dataStateChange(this.state.data, e)}
                                filterable={true}
                                onPageChange={this.pageChange}
                                style={{ height: "250px", width: "400px" }}
                                columns={this.state.columns}
                                // onRowClick={(e) => {
                                //     this.addItemToFilterList(e.dataItem, true);
                                // }}
                            >
                                <GridColumn field= {this.props.options.valueField} title="Value" template="<button class='customEdit'>My Edit</button>" />
                                <GridColumn field={this.props.options.keyField} title="Key" selectable="selectable" cell = {this.plusSign} />
                                
                            </Grid> : ''

                    }
                </div>
            </div>
        );
    }
}

export default BkeySearcher;