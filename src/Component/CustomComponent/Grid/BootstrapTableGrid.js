import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import bootstrapTable from 'react-bootstrap-table-next/lib/src/bootstrap-table';

const { SearchBar } = Search;

const bootstrapTableGrid = (props) => {

  let selectRows = null;

  const options = {
    custom: true,
    paginationSize: props.paginationSize,
    pageStartIndex: 1,
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    totalSize: props.dataCount,
    sizePerPageList: props.dataContainsPerPage
  };

  if (props.Page == "AddUser") {

    selectRows = {
      mode: props.mode,
      clickToSelect: true,
      onSelect: props.handleOnSelect,
      onSelectAll: props.handleOnSelectAll
    };
  }
  else if (props.Page == "EditUser") {

    selectRows = {
      mode: props.mode,
      clickToSelect: true,
      onSelect: props.handleOnSelect,
      onSelectAll: props.handleOnSelectAll,
      selected: props.checked,
      nonSelectable: props.result,
      hideSelectAll: true
      
    };
  }
  else if(props.Page == "EditUserSave"){
    selectRows = {
      mode: props.mode,
      clickToSelect: true,
      onSelect: props.handleOnSelect,
      onSelectAll: props.handleOnSelectAll,
      selected: props.checked
    };

  }
  const contentTable = ({ paginationProps, paginationTableProps }) => (
    <div>

      {/* <PaginationListStandalone {...paginationProps} /> */}
      <ToolkitProvider
        keyField={props.keyOfTable}
        columns={props.columns}
        data={props.data}
        search
      >
        {
          toolkitprops => (
            <div>
              <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-8">
                  <div className="btn-group btn-group-sm" role="group">
                  </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-4">
                  <div className="form-group form-group-sm react-bs-table-search-form">
                    <SearchBar {...toolkitprops.searchProps} />
                  </div> </div>
              </div>
              <BootstrapTable
                selectRow={selectRows}
                containerClass='tableContainer'
                headerContainerClass='tableHeader'
                bodyContainerClass='bodyContainer'
                bordered={false}
                striped
                hover
                {...toolkitprops.baseProps}
                {...paginationTableProps}
              />
            </div>
          )
        }
      </ToolkitProvider>
      <PaginationListStandalone {...paginationProps} />
    </div>
  );


  const table = <PaginationProvider
    pagination={
      paginationFactory(options)
    }
  >
    {contentTable}
  </PaginationProvider>

  return (
    <div>

      {table}
    </div>
  );
};

export default bootstrapTableGrid;
