import React, { Component } from 'react';
import '../App.css';
import "../../node_modules/react-datepicker/dist/react-datepicker.css";
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { process } from '@progress/kendo-data-query';

class KendoGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownlistCategory: null,

      gridDataState: {
        sort: [
          { field: "ProductName", dir: "asc" }
        ],
        page: { skip: 0, take: 10 }
      }
    };
  }

  handleDropDownChange = (e) => {
    let newDataState = { ...this.state.gridDataState }
    if (e.target.value.CategoryID !== null) {
      newDataState.filter = {
        logic: 'and',
        filters: [{ field: 'CategoryID', operator: 'eq', value: e.target.value.CategoryID }]
      }
      newDataState.skip = 0
    } else {
      newDataState.filter = []
      newDataState.skip = 0
    }
    this.setState({
      dropdownlistCategory: e.target.value.CategoryID,
      gridDataState: newDataState
    });
  }

  pageChange = (event) => {
    this.setState({
      page: {
        skip: event.page.skip,
        take: event.page.take
      }
    });
  }

  render() {
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
    ]

    const categories = [
      { "CategoryID": 1, "CategoryName": "Beverages" },
      { "CategoryID": 2, "CategoryName": "Condiments" },
      { "CategoryID": 3, "CategoryName": "Confections" },
      { "CategoryID": 4, "CategoryName": "Dairy Products" },
      { "CategoryID": 5, "CategoryName": "Grains/Cereals" },
      { "CategoryID": 6, "CategoryName": "Meat/Poultry" },
      { "CategoryID": 7, "CategoryName": "Produce" },
      { "CategoryID": 8, "CategoryName": "Seafood" }
    ];

    return (
      <div className="VS-shape-rounded-fill VS-modal">
        <div>
          <h1>Hello KendoReact!</h1>
          <p>
            <DropDownList
              data={categories}
              dataItemKey="CategoryID"
              textField="CategoryName"
              defaultItem={{ CategoryID: null, CategoryName: "Product categories" }}
              onChange={this.handleDropDownChange}
            />
            &nbsp; Selected category ID: <strong>{this.state.dropdownlistCategory}</strong>
          </p>
          <Grid
            data={process(products, this.state.gridDataState)}
            pageable={true}
            sortable={true}
            {...this.state.gridDataState}
            onDataStateChange={this.handleGridDataStateChange}
            onPageChange={this.pageChange}
            style={{ height: "400px" }}
          >
            <GridColumn field="ProductName" title="Product Name" />
            <GridColumn field="UnitPrice" title="Price" format="{0:c}" />
            <GridColumn field="UnitsInStock" title="Units in Stock" />
            <GridColumn field="Discontinued" />
          </Grid>
        </div>
      </div>
    );
  }
}


export default KendoGrid;