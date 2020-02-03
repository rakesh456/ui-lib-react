import React, { Component } from 'react';
import '../../App.css';
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";
import { Grid, GridColumn as Column, GridDetailRow } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import { filterBy } from '@progress/kendo-data-query';
import { PagingState } from '@devexpress/dx-react-grid';
import {
  GridColumnMenuFilter
} from '@progress/kendo-react-grid';
import { CustomFilterUI } from '../customFilterUI';

class DetailComponent extends GridDetailRow {
  render() {
    const data = this.props.dataItem.details;
    if (data) {
      return (
        <Grid data={data}>
          <Column field="title" title="title" />
          <Column field="date" title="date" format="{0:c}" />
        </Grid>
      );
    }
    return (
      <div style={{ height: "50px", width: '100%' }}>
        <div style={{ position: 'absolute', width: '100%' }}>
          <div className="k-loading-image" />
        </div>
      </div>
    );
  }
}

class KendoGrid extends React.Component {
  baseUrl = 'http://68.183.84.35:8089/getTodos';
  init = {};

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      filter: {
        logic: "and",
        filters: [
        ]
      },
      filterable: {
        mode: "row"
      },
      pageable: {
        buttonCount: 5,
        info: true,
        type: 'numeric',
        pageSizes: [5, 10, 15, 20, 50, 100],
        previousNext: true
      },
      currentPageCount: 0,
      totalRecords: 0,
      pageSize: 20,
      skip: 0,
      take: 10,
      columns: [{
        field: "_id",
        title: "ID"
      }, {
        field: "title",
        title: "Title",
        filterable: {
          cell: {
            operator: "contains",
            suggestionOperator: "contains"
          }
        }
      }, {
        field: "date",
        title: "DATE"
      }]
    };
    this.expandChange = this.expandChange.bind(this);
  }

  expandChange(event) {
    event.dataItem.expanded = event.value;
    let categoryID = event.dataItem.CategoryID;
    this.setState({ ...this.state });

    if (!event.value || event.dataItem.details) {
      return;
    }

    fetch(this.baseUrl, this.init)
      .then(response => response.json())
      .then(json => {
        let data = this.state.categories.slice();
        let index = data.findIndex(d => d.CategoryID === categoryID);
        data[index].details = json.result;
        this.setState({ categories: data });
      });
  }

  componentDidMount() {
    this.updateGridList({}, this.state.skip, this.state.take);
  }

  onFilterChange = (e) => {
    console.log('e ', e);
    let _filter = (e.filter) ? e.filter : {
      logic: "and",
      filters: [
        { field: "title", operator: "contains", value: "" }
      ]
    };

    this.setState({
      filter: _filter,
      skip: 0,
      take: 10
    });
    this.updateGridList(_filter, 0, 10);
  }

  pageChange = (event) => {
    this.setState({
      skip: event.page.skip,
      take: event.page.take
    });
    this.updateGridList({}, event.page.skip, event.page.take);
  }

  updateGridList = (filter, skip, take) => {
    let _filters = (filter && filter.filters) ? filter.filters : this.state.filter.filters;
    let _skip = (skip) ? skip : this.state.skip;
    let _take = (take) ? take : this.state.take;

    if (_filters) {
      this.init = { method: 'POST', accept: 'application/json', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ 'filters': _filters, 'skip': _skip, 'take': _take }) };
    } else {
      this.init = { method: 'POST', accept: 'application/json', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ 'skip': _skip, 'take': _take }) };
    }

    console.log(' init ', this.init);

    fetch(this.baseUrl, this.init)
      .then(response => response.json())
      .then(json => this.setState({ categories: json.result, totalRecords: json.totalRecords }));
  }

  render() {
    const titleFilter = { multi: true, search: true };

    return (
      <div>
        {this.state.pageSizes}
        <Grid
          style={{ height: '620px' }}
          data={this.state.categories}
          filterable={this.state.filterable}
          filter={this.state.filter}
          onFilterChange={this.onFilterChange}
          pageable={this.state.pageable}
          total={this.state.totalRecords}
          skip={this.state.skip}
          take={this.state.take}
          onPageChange={this.pageChange}
          columns={this.state.columns}
        >

          <Column field="_id" title="ID" width="200px" />
          <Column field={'title'}
                  title={'Title'}
                  filter={'string'}
                  columnMenu={
                      props =>
                          <GridColumnMenuFilter
                              {...props}
                              filterUI={CustomFilterUI}
                          />
                  } />
          <Column field="date" title="Date" width="240px" />
        </Grid>
      </div>
    );
  }
}

export default KendoGrid;