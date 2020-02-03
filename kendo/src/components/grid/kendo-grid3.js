import React, { Component } from 'react';
import '../App.css';
import "../../node_modules/react-datepicker/dist/react-datepicker.css";
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import {
  GridColumnMenuFilter
} from '@progress/kendo-react-grid';
import { CustomFilterUI } from '../customFilterUI';

import '@progress/kendo-theme-default/dist/all.css';
import { orderBy } from '@progress/kendo-data-query';

class ProductNameHeader extends React.Component {
  render() {
    return (
      <a className="k-link" onClick={this.props.onClick}>
        <span className="k-icon k-i-cart"></span>
        <span style={{ color: "#53d2fa" }}>{this.props.title}</span>
        <input type="textbox" />
        
      </a>
    );
  }
}

class KendoGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.createState(0, 10);
    this.pageChange = this.pageChange.bind(this);
    this.updatePagerState = this.updatePagerState.bind(this);
  }

  pageChange(event) {
    this.setState(this.createState(event.page.skip, event.page.take));
  }

  createState(skip, take) {
    const products = [
      { "ProductID": 1, "ProductName": "Tea", "CategoryID": 1, "QuantityPerUnit": "10 boxes x 20 bags", "UnitPrice": 18.0, "UnitsInStock": 39, "Discontinued": false },
      { "ProductID": 7, "ProductName": "Dried Pears", "CategoryID": 7, "QuantityPerUnit": "12 - 1 lb pkgs.", "UnitPrice": 30.0, "UnitsInStock": 15, "Discontinued": false },
      { "ProductID": 8, "ProductName": "Cranberry Sauce", "CategoryID": 2, "QuantityPerUnit": "12 - 12 oz jars", "UnitPrice": 40.0, "UnitsInStock": 6, "Discontinued": false },
      { "ProductID": 9, "ProductName": "Mishi Kobe Niku", "CategoryID": 6, "QuantityPerUnit": "18 - 500 g pkgs.", "UnitPrice": 97.0, "UnitsInStock": 29, "Discontinued": true },
      { "ProductID": 14, "ProductName": "Tofu", "CategoryID": 7, "QuantityPerUnit": "40 - 100 g pkgs.", "UnitPrice": 23.25, "UnitsInStock": 35, "Discontinued": false },
      { "ProductID": 17, "ProductName": "Alice Mutton", "CategoryID": 6, "QuantityPerUnit": "20 - 1 kg tins", "UnitPrice": 39.0, "UnitsInStock": 0, "Discontinued": false },
      { "ProductID": 19, "ProductName": "Teatime Biscuits", "CategoryID": 3, "QuantityPerUnit": "10 boxes x 12 pieces", "UnitPrice": 9.2, "UnitsInStock": 25, "Discontinued": false },
      { "ProductID": 40, "ProductName": "Boston Crab Meat", "CategoryID": 8, "QuantityPerUnit": "24 - 4 oz tins", "UnitPrice": 18.4, "UnitsInStock": 123, "Discontinued": false },
      { "ProductID": 43, "ProductName": "Coffee", "CategoryID": 1, "QuantityPerUnit": "16 - 500 g tins", "UnitPrice": 46.0, "UnitsInStock": 17, "Discontinued": false },
      { "ProductID": 48, "ProductName": "Chocolate", "CategoryID": 3, "QuantityPerUnit": "10 pkgs.", "UnitPrice": 12.75, "UnitsInStock": 15, "Discontinued": false },
      { "ProductID": 56, "ProductName": "Gnocchi di nonna Alice", "CategoryID": 5, "QuantityPerUnit": "24 - 250 g pkgs.", "UnitPrice": 38.0, "UnitsInStock": 21, "Discontinued": true },
      { "ProductID": 57, "ProductName": "Ravioli Angelo", "CategoryID": 5, "QuantityPerUnit": "24 - 250 g pkgs.", "UnitPrice": 19.5, "UnitsInStock": 36, "Discontinued": false },
      { "ProductID": 60, "ProductName": "Camembert Pierrot", "CategoryID": 4, "QuantityPerUnit": "15 - 300 g rounds", "UnitPrice": 34.0, "UnitsInStock": 19, "Discontinued": true },
      { "ProductID": 65, "ProductName": "Hot Pepper Sauce", "CategoryID": 2, "QuantityPerUnit": "32 - 8 oz bottles", "UnitPrice": 21.05, "UnitsInStock": 76, "Discontinued": false },
      { "ProductID": 72, "ProductName": "Mozzarella di Giovanni", "CategoryID": 4, "QuantityPerUnit": "24 - 200 g pkgs.", "UnitPrice": 34.8, "UnitsInStock": 14, "Discontinued": false },
      { "ProductID": 73, "ProductName": "Röd Kaviar", "CategoryID": 8, "QuantityPerUnit": "24 - 150 g jars", "UnitPrice": 15.0, "UnitsInStock": 101, "Discontinued": true }
    ];
    return {
      items: products.slice(skip, skip + take),
      total: products.length,
      skip: skip,
      pageSize: take,
      sort: [
        { field: 'ProductName', dir: 'asc' }
      ],
      pageable: this.state ? this.state.pageable : {
        buttonCount: 5,
        refresh: true,
        info: true,
        type: 'numeric',
        pageSizes: true,
        previousNext: true
      },
      columns: [{
        template: "<div class='customer-photo'></div>" +
          "<div class='customer-name'>#: ProductID #</div>",
        field: "ProductID2",
        title: "Contact Name",
        width: 240
      }, {
        field: "ProductName2",
        title: "Contact Title"
      }, {
        field: "UnitPrice2",
        title: "Company Name"
      }]
    };
  }

  updatePagerState(key, value) {
    const newPageableState = Object.assign({}, this.state.pageable, { [key]: value });
    this.setState(Object.assign({}, this.state, { pageable: newPageableState }));
  }

  CustomHeaderCell = (props) =>
    <div>
      <input type="textbox" />
    </div>



  render() {

    return (
      <div>
        <div className="example-config row">
          <div className="col-md-6">
            <dl>
              <dt>
                Pager type:
                    </dt>
              <dd>
                <input
                  type="radio"
                  name="pager"
                  id="numeric"
                  className="k-radio"
                  value="numeric"
                  defaultChecked={true}
                  onChange={e => { this.updatePagerState('type', e.target.value); }}
                />
                <label
                  style={{ margin: "7px 3em 7px 0px", lineHeight: '1.2' }}
                  className="k-radio-label"
                  htmlFor="numeric"
                >Numeric&nbsp;</label>

                <input
                  type="radio"
                  name="pager"
                  id="input"
                  className="k-radio"
                  value="input"
                  onChange={e => { this.updatePagerState('type', e.target.value); }}
                />
                <label
                  style={{ margin: "7px 3em 7px 0px", lineHeight: '1.2' }}
                  className="k-radio-label"
                  htmlFor="input"
                >Input&nbsp;</label>
              </dd>
            </dl>
            <dl>
              <dt>Max. number of buttons:</dt>
              <dd>
                <input
                  defaultValue="5"
                  className="k-textbox"
                  type="number"
                  onChange={e => { this.updatePagerState('buttonCount', e.target.valueAsNumber); }}
                />
              </dd>
            </dl>
          </div>
          <div className="col-md-6 row">
            <div className="col-md-12">
              <input
                className="k-checkbox"
                defaultChecked={true}
                id="showInfo"
                type="checkbox"
                onChange={e => { this.updatePagerState('info', e.target.checked); }}
              />
              <label
                htmlFor="showInfo"
                className="k-checkbox-label"
              >
                Show info
                    </label>
            </div>

            <div className="col-md-12">
              <input
                className="k-checkbox"
                defaultChecked={true}
                id="pageSize"
                type="checkbox"
                onChange={e => { this.updatePagerState('pageSizes', e.target.checked); }}
              />
              <label
                htmlFor="pageSize"
                className="k-checkbox-label"
              >
                Show page sizes
                    </label>
            </div>
            <div className="col-md-12">
              <input
                className="k-checkbox"
                defaultChecked={true}
                id="previousNext"
                type="checkbox"
                onChange={e => { this.updatePagerState('previousNext', e.target.checked); }}
              />
              <label
                htmlFor="previousNext"
                className="k-checkbox-label"
              >
                Show previous / next buttons
                    </label>
            </div>
          </div>
        </div>
        <Grid
          style={{ height: '450px' }}
          data={this.state.items}
          onPageChange={this.pageChange}
          total={this.state.total}
          skip={this.state.skip}
          pageable={this.state.pageable}
          pageSize={this.state.pageSize}
          columns={this.state.columns}
          sortable={true}
          sort={this.state.sort}
          onSortChange={(e) => {
            this.setState({
              sort: e.sort
            });
          }}
        >
          <Column field="ProductID" />
          <Column field={'ProductName'}
            headerCell={ProductNameHeader}
            title={'Product Name'}
            filter={'boolean'}
            columnMenu={
              props =>
                <GridColumnMenuFilter
                  {...props}
                  filterUI={CustomFilterUI}
                />
            } />
          <Column field="UnitPrice" title="Unit Price" />
        </Grid>
      </div >
    );
  }
}

export default KendoGrid;