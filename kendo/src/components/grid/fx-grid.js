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
import { process, normalizeFilters } from '@progress/kendo-data-query';
import { locales } from '../../utils/utils'
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

class DetailComponent extends GridDetailRow {
  constructor(props){
    super(props);

  }
  // renderdetailedColumn=(column, Index)=>{
  //   return(
  //     <p><strong>Street:</strong> {dataItem.shipAddress.street}</p>
  //   )
  // }
  render() {
    console.log("this.props",this.props);
    const dataItem = this.props.dataItem;
    return (
      <div>
        <Grid style={{ width: "500px" }} data={dataItem.details}></Grid>
      </div>
    );
  }
}


class FxGrid extends React.Component {
  constructor(props) {
    super(props);
    const dataState = this.props.options.dataState;
    // this.state = {
    //   dataResult: '',
    //   dataState: dataState,
    //   currentLocale: locales[0],
    //   json: ''
    // };

    // const dataUrl = this.props.options.dataUrl;
    // fetch(dataUrl, {
    // }).then((resp) =>
    //   resp.json()
    // ).then((data) => {
    //   this.setState({
    //     dataResult: process(data, dataState),
    //     dataState: dataState,
    //     currentLocale: locales[0],
    //     json: data
    //   });
    // })
    this.state = {
      dataResult: process(orders, dataState),
      dataState: dataState,
      currentLocale: locales[0]
    };
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

  dataStateChange = (event) => {

    this.setState({
      // dataResult: process(this.state.json, event.data),
      dataResult: process(orders, event.data),
      dataState: event.data
    });
  }


  Search = (event) => {
    let Standard = (value) => {
      var date = value.toString();
      return new Date(date);
    }
    let columnField = this.props.options.showColumns.map(function (item) {
      return item.field;
    });
    let dataState = this.props.options.dataState
    let filters = (value) => {
      let filterArray = [];
      for (var i = 0; i < columnField.length; i++) {
        if (this.props.options.showColumns[i].filter === "text") {
          filterArray.push({
            "field": columnField[i],
            "operator": "contains",
            "value": value
          })
        }
        if (this.props.options.showColumns[i].filter === "numeric") {
          filterArray.push({
            "field": columnField[i],
            "operator": "eq",
            "value": value
          })
        }
        if (this.props.options.showColumns[i].filter === "date") {
          filterArray.push({
            "field": columnField[i],
            "operator": "eq",
            "value": Standard(value)
          })
        }
        if (this.props.options.showColumns[i].filter === "boolean") {
          filterArray.push({
            "field": columnField[i],
            "operator": "contains",
            "value": value
          })
        }
      }
      return filterArray
    };
    const eventData = {
      "filter": {
        "logic": "or",
        "filters": filters(event.target.value)
      },
      "skip": 0,
      "take": 20,
      "sort": [
        { "field": "orderDate", "dir": "desc" }
      ],
      "group": [
        { "field": "orderDate" }
      ]
    }

    this.setState({
      // dataResult: process(this.state.json, eventData),
      dataResult: process(orders, eventData),
    })
  }
  renderGrid(column, Index) {
    return (
      <GridColumn key={Index} field={column.field} width={column.width} title={column.title} filter={column.filter} data={column.data} />
    )
  }


  render() {
    let options = this.props.options;
    return (
      <LocalizationProvider language={this.state.currentLocale.language}>
        <IntlProvider locale={this.state.currentLocale.locale} >
          <div className="VS-Parent">
            {(options.globalSearch) ?
              <label className="VS-SearchLabel" >Search:<input className="VS-GlobalSearch" type="text" placeholder="Search in entire columns" data={this.state.dataResult}
                {...this.state.dataState} onChange={this.Search}
              ></input></label> : ""}
            <ExcelExport
              // data={this.state.json}
              data={orders}

              ref={(exporter) => { this._export = exporter; }}
            >
              <Grid
                style={{ height: '700px' }}
                sortable
                filterable
                groupable
                resizeable
                reorderable
                pageable={{ buttonCount: 4, pageSizes: true }}
                selectedField="selected"
                // onSelectionChange={this.selectionChange}
                // onHeaderSelectionChange={this.headerSelectionChange}
                onRowClick={this.rowClick}

                data={this.state.dataResult}
                {...this.state.dataState}
                onDataStateChange={this.dataStateChange}

                filterOperators={{
                  'text': [
                    { text: 'grid.filterContainsOperator', operator: 'contains' },
                    { text: 'grid.filterEqOperator', operator: 'eq' }
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
                {
                  options.showColumns.map((column, Index) => this.renderGrid(column, Index))
                }
              </Grid>
            </ExcelExport>
            <GridPDFExport
              ref={(element) => { this._pdfExport = element; }}
              margin="1cm" >
              {
                // <Grid data={process(this.state.json, { skip: this.state.dataState.skip, take: this.state.dataState.take })} >
                <Grid data={process(orders, { skip: this.state.dataState.skip, take: this.state.dataState.take })} >
                  {
                    options.showColumns.map((column, Index) => this.renderGrid(column, Index))
                  }
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
