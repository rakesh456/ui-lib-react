import React from 'react';
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
import orders from './../orders.json';
import esMessages from './../es.json';
import { process } from '@progress/kendo-data-query';
loadMessages(esMessages, 'es-ES');
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
orders.forEach(o => {
  o.orderDate = new Date(o.orderDate);
  o.shippedDate = o.shippedDate === 'NULL' ? undefined : new Date(o.shippedDate);
});

// class DetailComponent extends GridDetailRow {
//   render() {
//     const address = this.props.address;
//     return (
//       <div>
//         <section style={{ width: "200px", float: "left" }}>
//           <p><strong>Street:</strong> {address.street}</p>
//           <p><strong>City:</strong> {address.city}</p>
//           <p><strong>Country:</strong> {address.country}</p>
//           <p><strong>Postal Code:</strong> {address.postalCode}</p>
//         </section>
//         <Grid style={{ width: "500px" }} data={address.website}></Grid>
//       </div>
//     );
//   }
// }





class FxGrid extends React.Component {
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
      take: 10,
      sort: [
        { field: "name", dir: 'desc' }
      ],
      group: [
        { field: this.props.options.groupBy }
      ]
    };
    this.state = {
      dataResult: process(orders, dataState),
      dataState: dataState,
      currentLocale: this.locales[0]
    };
  }

  //   const dataUrl = this.props.options.dataUrl.toString();
  //   fetch(dataUrl).then((resp) =>
  //     resp.json()
  //   ).then((orders) => {
  //     console.log('state',this.dataState)
  //     this.state = {
  //       dataResult: process(orders, dataState),
  //       dataState: dataState,
  //       currentLocale: this.locales[0]
  //     };
  //   })
  // }
  // componentDidMount() {
  // }

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

  dataStateChange = (event) => {

    this.setState({
      dataResult: process(orders, event.data),
      dataState: event.data
    });
  }


  Search = (event) => {
    let Standard = (value) => {
      var date = value.toString();
      return new Date(date);
    }
    const eventData = {
      "filter": {
        "logic": "or",
        "filters": [
          {
            "field": "customerID",
            "operator": "contains",
            "value": event.target.value
          },
          {
            "field": "shipName",
            "operator": "contains",
            "value": event.target.value
          },
          {
            "field": "employeeID",
            "operator": "contains",
            "value": event.target.value
          },
          {
            "field": "freight",
            "operator": "contains",
            "value": event.target.value
          },
          {
            "field": "shipAddress.country",
            "operator": "contains",
            "value": event.target.value
          },
          {
            "field": "orderID",
            "operator": "contains",
            "value": event.target.value
          },
          {
            "field": "orderDate",
            "operator": "eq",
            "value": Standard(event.target.value)
          },
          {
            "field": "shippedDate",
            "operator": "eq",
            "value": Standard(event.target.value)
          }

        ]
      },
      "sort": [
        {
          "field": "orderDate",
          "dir": "desc"
        }
      ],
      "skip": 0,
      "take": 20,
      "group": [
        {
          "field": "customerID"
        }
      ]
    }

    this.setState({
      dataResult: process(orders, eventData),
    })
  }
  renderGrid(column) {
    console.log(column);
    return (
      <GridColumn field={column.field} width={column.width} filter={column.filter} title={column.title} format={column.format} filterable={column.filterable} locked field={column.lockedfield} />
    )
  }


  render() {
    let options = this.props.options;
    console.log('gridcoulmns', options.showColumns);
    return (
      <LocalizationProvider language={this.state.currentLocale.language}>
        <IntlProvider locale={this.state.currentLocale.locale} >
          <div>
            {(options.globalSearch) ?
              <input className="VS-GlobalSearch" type="text" placeholder="Search in entire columns" data={this.state.dataResult}
                {...this.state.dataState} onChange={this.Search}
              ></input> : ""}
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

              // detail={DetailComponent}
              // expandField="expanded"
              // onExpandChange={this.expandChange}
              >
                <GridToolbar>
                  Locale:&nbsp;&nbsp;&nbsp;
                                <DropDownList
                    value={this.state.currentLocale}
                    textField="language"
                    onChange={(e) => { this.setState({ currentLocale: e.target.value }); }}
                    data={this.locales} />&nbsp;&nbsp;&nbsp;
                               {(options.exportToExcel) ? <button
                    title="Export to Excel"
                    className="k-button k-primary"
                    onClick={this.exportExcel}
                  >
                    Export to Excel
                                </button> : ""}
                  {(options.exportToPdf) ?
                    <button className="k-button k-primary" onClick={this.exportPDF}>Export to PDF</button> : ""}
                </GridToolbar>
                {options.showColumns.forEach(column => {
                  this.renderGrid(column);
                })}
              </Grid>
            </ExcelExport>
            <GridPDFExport
              ref={(element) => { this._pdfExport = element; }}
              margin="1cm" >
              {
                <Grid data={process(orders, { skip: this.state.dataState.skip, take: this.state.dataState.take })} >
                  {options.showColumns.forEach(column => {
                    this.renderGrid(column);
                  })}
                </Grid>
              }
            </GridPDFExport>

          </div>
        </IntlProvider>
      </LocalizationProvider>
    );
  }
}

export default FxGrid;
