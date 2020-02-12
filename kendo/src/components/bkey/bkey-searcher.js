import React from 'react';
import '../../App.css';
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import countries from './../countries.json';
import { process } from '@progress/kendo-data-query';
class BkeySearcher extends React.Component {
    constructor(props) {
        const dataState = {
            skip: 0,
            take: 20,
            sort: [
                { field: 'orderDate', dir: 'desc' }
            ],
            group: [
            ]
        };
        const filterDataState = {
            skip: 0,
            take: 20,
            sort: [
                { field: 'orderDate', dir: 'desc' }
            ],
            group: [
            ]
        };
        super(props);
        this.state = {
            showBelowGrid: true,
            dataState: dataState,
            filterDataState: filterDataState,
            countries: countries,
            dataResult: process(countries, dataState),
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
    }

    toggleBelowGrid = () => {
        this.setState({ showBelowGrid: !this.state.showBelowGrid });
    }

    addItemToFilterList = (item, isAdd) => {
        if (isAdd) {
            let result = this.state.filterList.filter((obj) => {
                return obj.value === item.value
            });

            if (result.length <= 0) {
                let _items = [...this.state.filterList];
                _items.push(item);
                this.setState({ filterList: _items });
                this.filterDataStateChange([..._items], {'data': this.state.filterDataState});
            }

            let filteredCountries = [...this.state.countries];

            let ind = this.state.countries.findIndex((element) => {
                return element.value === item.value;
            });

            if (ind !== -1) {
                filteredCountries.splice(ind, 1)
            }

            this.setState({ countries: [...filteredCountries] });
            this.dataStateChange([...filteredCountries], {'data': this.state.dataState});
        } else {
            let result = this.state.countries.filter((obj) => {
                return obj.value === item.value
            });

            if (result.length <= 0) {
                let _items = [...this.state.countries];
                _items.push(item);
                this.setState({ countries: _items });
                this.dataStateChange([..._items], {'data': this.state.dataState});
            }

            let filteredCountries = [...this.state.filterList];

            let ind = this.state.filterList.findIndex((element) => {
                return element.value === item.value;
            });

            if (ind !== -1) {
                filteredCountries.splice(ind, 1)
            }

            this.setState({ filterList: [...filteredCountries] });
            this.filterDataStateChange([...filteredCountries], {'data': this.state.filterDataState});
        }
    }

    dataStateChange = (data, event) => {
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
                        onRowClick={(e) => {
                            this.addItemToFilterList(e.dataItem, false);
                        }}
                    >
                        <GridColumn field="value" title="Value" />
                        <GridColumn field="key" title="Key" />
                    </Grid>
                    <div className="VS-SelectedDiv" onClick={this.toggleBelowGrid}>{this.state.dataResult.length} Selected</div>
                    {
                        (this.state.showBelowGrid === true) ?
                            <Grid
                                data={this.state.dataResult}
                                {...this.state.dataState}
                                onDataStateChange={e => this.dataStateChange(this.state.countries, e)}
                                filterable={true}
                                onPageChange={this.pageChange}
                                style={{ height: "250px", width: "400px" }}
                                columns={this.state.columns}
                                onRowClick={(e) => {
                                    this.addItemToFilterList(e.dataItem, true);
                                }}
                            >
                                <GridColumn field="value" title="Value" template="<button class='customEdit'>My Edit</button>" />
                                <GridColumn field="key" title="Key" />
                            </Grid> : ''
                    }
                </div>
            </div>
        );
    }
}

export default BkeySearcher;