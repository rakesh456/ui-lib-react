/* eslint-disable import/first */
import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, GridColumn, GridDetailRow, GridToolbar } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { GridPDFExport } from '@progress/kendo-react-pdf';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { IntlProvider, load, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';

import likelySubtags from '../../utils/supplemental/likelySubtags.json';
import currencyData from '../../utils/supplemental/currencyData.json';
import weekData from '../../utils/supplemental/weekData.json';

import numbers from '../../utils/es-AR/numbers.json';
import currencies from '../../utils/es-AR/currencies.json';
import caGregorian from '../../utils/es/ca-gregorian.json';
import dateFields from '../../utils/es/dateFields.json';
import timeZoneNames from '../../utils/es/timeZoneNames.json';
import '@progress/kendo-theme-default/dist/all.css';
load(
  likelySubtags,
  currencyData,
  weekData,
  numbers,
  currencies,
  caGregorian,
  dateFields,
  timeZoneNames
);

import esMessages from './../es.json';
loadMessages(esMessages, 'es-ES');

import { process } from '@progress/kendo-data-query';
import orders from './../orders.json';

orders.forEach(o => {
  o.orderDate = new Date(o.orderDate);
  o.shippedDate = o.shippedDate === 'NULL' ? undefined : new Date(o.shippedDate);
});

class DetailComponent extends GridDetailRow {
  render() {
    const dataItem = this.props.dataItem;
    return (
      <div>
        <section style={{ width: "200px", float: "left" }}>
          <p><strong>Street:</strong> {dataItem.shipAddress.street}</p>
          <p><strong>City:</strong> {dataItem.shipAddress.city}</p>
          <p><strong>Country:</strong> {dataItem.shipAddress.country}</p>
          <p><strong>Postal Code:</strong> {dataItem.shipAddress.postalCode}</p>
        </section>
        <Grid style={{ width: "500px" }} data={dataItem.details}></Grid>
      </div>
    );
  }
}

class KendoGrid extends React.Component {
  locales = [
    {
      language: 'en-US',
      locale: 'en'
    },
    {
      language: 'es-ES',
      locale: 'es'
    }
  ]
  constructor(props) {
    super(props);
    const dataState = {
      skip: 0,
      take: 20,
      sort: [
        { field: 'orderDate', dir: 'desc' }
      ],
      group: [
        { field: 'customerID' }
      ]
    };
    this.state = {
      dataResult: process(orders, dataState),
      dataState: dataState,
      currentLocale: this.locales[0]
    };
  }

  dataStateChange = (event) => {
    this.setState({
      dataResult: process(orders, event.data),
      dataState: event.data
    });
  }

  expandChange = (event) => {
    const isExpanded =
      event.dataItem.expanded === undefined ?
        event.dataItem.aggregates : event.dataItem.expanded;
    event.dataItem.expanded = !isExpanded;

    this.setState({ ...this.state });
  }

  _pdfExport;
  exportExcel = () => {
    this._export.save();
  }

  _export;
  exportPDF = () => {
    this._pdfExport.save();
  }

  render() {
    return (
      <LocalizationProvider language={this.state.currentLocale.language}>
        <IntlProvider locale={this.state.currentLocale.locale} >
          <div>
            <ExcelExport
              data={orders}
              ref={(exporter) => { this._export = exporter; }}
            >
              <Grid
                style={{ height: '700px' }}
                sortable
                filterable
                groupable
                reorderable
                pageable={{ buttonCount: 4, pageSizes: true }}

                data={this.state.dataResult}
                {...this.state.dataState}
                onDataStateChange={this.dataStateChange}

                filterOperators={{
                    'text': [
                        { text: 'grid.filterContainsOperator', operator: 'contains' },
                        { text: 'grid.filterEqOperator', operator: 'eq' },
                    ],
                    'numeric': [
                        { text: 'grid.filterEqOperator', operator: 'eq' }
                    ],
                    'date': [
                        { text: 'grid.filterEqOperator', operator: 'eq' }
                    ],
                    'boolean': [
                        { text: 'grid.filterEqOperator', operator: 'eq' }
                    ]
                }}

                // onFilterChange={(e) => {
                //     this.setState({
                //         filter: e.filter
                //     });
                // }}

                detail={DetailComponent}
                expandField="expanded"
                onExpandChange={this.expandChange}
              >
                <GridToolbar>
                  Locale:&nbsp;&nbsp;&nbsp;
                                <DropDownList
                    value={this.state.currentLocale}
                    textField="language"
                    onChange={(e) => { this.setState({ currentLocale: e.target.value }); }}
                    data={this.locales} />&nbsp;&nbsp;&nbsp;
                                <button
                    title="Export to Excel"
                    className="k-button k-primary"
                    onClick={this.exportExcel}
                  >
                    Export to Excel
                                </button>&nbsp;
                                <button className="k-button k-primary" onClick={this.exportPDF}>Export to PDF</button>
                </GridToolbar>
                <GridColumn field="customerID" width="200px" title="Customer Id" />
                <GridColumn field="orderDate" filter="date" format="{0:D}" width="300px" />
                <GridColumn field="shipName" width="280px" />
                <GridColumn field="freight" filter="numeric" width="200px" />
                <GridColumn field="shippedDate" filter="date" format="{0:D}" width="300px" />
                <GridColumn field="employeeID" filter="numeric" width="200px" />
                <GridColumn locked field="orderID" filterable={false} title="ID" width="90px" />
              </Grid>
            </ExcelExport>
            <GridPDFExport
              ref={(element) => { this._pdfExport = element; }}
              margin="1cm" >
              {
                <Grid data={process(orders, { skip: this.state.dataState.skip, take: this.state.dataState.take })} >
                  <GridColumn field="customerID" width="200px" />
                  <GridColumn field="orderDate" filter="date" format="{0:D}" width="300px" />
                  <GridColumn field="shipName" width="280px" />
                  <GridColumn field="freight" filter="numeric" width="200px" />
                  <GridColumn field="shippedDate" filter="date" format="{0:D}" width="300px" />
                  <GridColumn field="employeeID" filter="numeric" width="200px" />
                  <GridColumn locked field="orderID" filterable={false} title="ID" width="90px" />
                </Grid>
              }
            </GridPDFExport>
          </div>
        </IntlProvider>
      </LocalizationProvider>
    );
  }
}

export default KendoGrid;