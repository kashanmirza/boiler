import React, { Component } from 'react';
import Buttonscomponent from '../CustomComponent/Buttonscomponent';
import Input from '../CustomComponent/Input/Input';
import { connect } from 'react-redux';
import { GetUsers, GetRoles, SaveIdForRole, ClearState } from '../../store/Actions/role';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import Tablebutton from '../CustomComponent/Tablebutton';
import Useravatar from '../CustomComponent/Useravatar';
import Anchorcomponent from '../CustomComponent/Anchorcomponent';
import Alertmesgcomponent from '../CustomComponent/Alertmesgcomponent';
import Enums from '../../Common/Enum';


class SearchRole extends Component {

  constructor(props) {
    super(props);

    this.state = {

      searchArea: true,
      resultArea: true,
      addArea: true,
      addMemberForm: false,
      genericArea: true,

      orderForm: {
        RoleName: {
          elementType: 'Textinputcomponent',
          elementConfig: {
            type: 'text',
            placeholder: 'Role Name',
            labelname: 'Role Name',
            disabled: false
          },
          value: '',
          validation: {
            required: false
          },
          valid: false,
          touched: false
        },
        Status: {
          elementType: 'Reactselectcomponent',
          elementConfig: {
            options: [
              { value: 'all', lable: 'All' },
              { value: Enums.USER_AND_ROLE_MANAGEMENT_STATUS.PENDING, lable: Enums.USER_AND_ROLE_MANAGEMENT_STATUS.PENDING },
              { value: Enums.USER_AND_ROLE_MANAGEMENT_STATUS.APPROVED, lable: Enums.USER_AND_ROLE_MANAGEMENT_STATUS.APPROVED },
              { value: Enums.USER_AND_ROLE_MANAGEMENT_STATUS.REJECTED, lable:Enums.USER_AND_ROLE_MANAGEMENT_STATUS.REJECTED }
            ],
            labelname: 'Status',
            placeholder: 'Status',
          },
          validation: {},
          value: 'all',
          valid: true
        },
        CreatedBy: {
          elementType: 'Reactselectcomponent',
          elementConfig: {
            options: [
              // { value: 'pending', lable: 'Pending' },
              // { value: 'approved', lable: 'Approved' },
              // { value: 'rejected', lable: 'Rejected' }
            ],
            labelname: 'Created By',
            placeholder: 'Created By',
          },
          validation: {},
          value: 'pending',
          valid: true
        },
      }
    }
  }

  componentWillMount() {
    this.props.onClearState("No");
  }

  componentDidMount() {
    this.props.onGetUsers();
    this.setWhereCriteria();
  }

  searchAreaCollapse() {
    this.setState({
      searchArea: !this.state.searchArea
    })
  }

  resultAreaCollapse() {
    this.setState({
      resultArea: !this.state.resultArea
    })
  }

  addAreaCollapse() {
    this.setState({
      addArea: !this.state.addArea
    })
  }

  addMember() {
    // this.setState({
    //   addMemberForm: true,
    //   genericArea: false,
    // })
    this.props.history.push('/Role/Role');
  }

  setWhereCriteria() {
    let roleName = this.state.orderForm.RoleName.value;
    let status = this.state.orderForm.Status.value;
    let createdBy = this.state.orderForm.CreatedBy.value;
    console.log(roleName + status + createdBy + '------------------------');
    const data = {
      Role: {
        Name: roleName,
        Status: status,
        Users: createdBy
      },
    }

    this.props.onGetRoles(data);
  }

  searchResult() {

    this.setWhereCriteria();
    //this.props.history.push('/Role/Role');
  }

  cancelFunc() {
    this.setState({
      addMemberForm: false,
      genericArea: true,
    })
  }

  inputChangeHandler = (event, inputIdentifier) => {

    const updateOrderForm = {
      ...this.state.orderForm
    }

    const updatedFormElement = {
      ...updateOrderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;

    //updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.valid = true;
    updatedFormElement.touched = true;
    updateOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updateOrderForm) {
      formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updateOrderForm, formIsValid: formIsValid });
  }

  editRow(row) {

    // this.setState({
    //   row: row,
    //   editID: row.uID,
    //   isEdit: true,
    //   uName: row.uName,
    //   uEmail: row.uEmail,
    //   uCell: row.uCell,
    //   uDescription: row.uDescription,
    //   uStatus: row.uStatus,
    // })
    //debugger;
    //console.log('ID'+row.ID)
    const data = {
      Id: row.id,
      Status: row.status
    }
    this.props.onSaveIdForRoles(data).then(
      (res) => {
        this.props.history.push('/Role/EditRole');
      }
    );


  }

  updateItem(row) {
    var udata = this.props.usersList;
    for (let i = 0; i < udata.length; i++) {
      if (udata[i].uID == this.state.editID) {
        udata[i].uName = this.state.uName;
        udata[i].uEmail = this.state.uEmail;
        udata[i].uCell = this.state.uCell;
        udata[i].uDescription = this.state.uDescription;
        udata[i].uStatus = this.state.uStatus;
      }
    }
    this.props.editItem(udata);
    this.setState({
      editID: null,
      isEdit: false,
    })
    this.setState({ uName: '', uEmail: '', uCell: '', uDescription: '', uStatus: '' });
    console.log('update item', row);
  }

  viewRow(row) {
    this.setState({
      showModal: true,
      row: row
    })
    console.log('Row View', row);
  }

  deleteRow(row) {
    var index = this.props.usersList.indexOf(row);
    this.props.deleteItem(row);
    this.props.usersList.splice(index, 1);
    this.setState(this.props.usersList);
  }



  render() {

    function avatarFormatter(params, row) {
      return <Useravatar
        Useravatarname={row.roleName}
        rowData={row} />
    }

    function anchorFormatter(cell, row) {
      return <Anchorcomponent
        anchotDisplayName={row.roleName}
        rowData={row}
      // invokeAnchorButtonhandlar={this.viewRow.bind(this)}
      />
    }

    function columnStatusFormat(fieldValue, cell, row) {
      if (fieldValue != null) {
        return fieldValue.replace(" ", "") + '-status';
      }
    }

    function buttonFormatter(cell, row) {
      return (
        <Tablebutton
          rowData={row}
          editButtonHandlar={this.editRow.bind(this)}
          viewButtonHandlar={this.viewRow.bind(this)}
          deleteButtonHandlar={this.deleteRow.bind(this)}
          visibilityEdit={true}
          visibilityDelete={false}
          visibilityUpdate={false} />
      );
    }

    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    // const listItems = this.props.users.map((link) =>
    // <li key={link.value}>{link.lable}</li> 
    // );
    let frm = (
      <div>

        {/* <form onSubmit={this.purchaseHandler}> */}
        <form>

          {/* <Input inputtype="input" type="text" name="name" placeholder="Name"></Input> */}
          {/* <Input elementType="..." elementConfig="..." value="..."></Input> */}
          {formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              valueType={formElement.id}
              placeholder={formElement.config.elementConfig.placeholder}
              id={formElement.id}
              labelname={formElement.config.elementConfig.labelname}
              inputLable={formElement.config.elementConfig.labelname}
              inputType={formElement.config.elementConfig.type}
              disabled={formElement.config.elementConfig.disabled}
              inputID=""
              elementType={formElement.config.elementType}
              list={formElement.id == "CreatedBy" ? this.props.users : formElement.config.elementConfig.options}
              // elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event) => this.inputChangeHandler(event, formElement.id)}></Input>
          ))}

        </form>
      </div>
    )

    let dataTable = null;
    if (this.props.error == null || this.props.error == '' && this.props.roles != null) {

      dataTable =
        <BootstrapTable
          data={this.props.roles}
          pagination={true}
          search={true}
          containerClass='tableContainer'
          headerContainerClass='tableHeader'
          bodyContainerClass='bodyContainer'
          bordered={false}
          striped
          hover>
          <TableHeaderColumn width="50" isKey dataField='id'>ID</TableHeaderColumn>
          <TableHeaderColumn width="50" dataFormat={avatarFormatter.bind(this)} dataField='roleName'></TableHeaderColumn>
          <TableHeaderColumn dataSort={true} dataFormat={anchorFormatter.bind(this)} dataField='roleName'>Role Name</TableHeaderColumn>
          <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
          <TableHeaderColumn dataField='createdBy'>Created By</TableHeaderColumn>
          <TableHeaderColumn dataAlign='center' dataField='status' columnClassName={columnStatusFormat}>Status</TableHeaderColumn>
          <TableHeaderColumn dataAlign='right' dataField='actions' dataFormat={buttonFormatter.bind(this)}>Actions</TableHeaderColumn>
        </BootstrapTable>
    }

    let errorMsg = null;
    if (this.props.error !== '' && this.props.error !== null) {
      errorMsg = <div className="col-md-12"><Alertmesgcomponent
        messageClassName="alert alert-danger"
        messageTitle=""
        messageDescription={this.props.error}
      />
      </div>
    }

    return (

      <div className="col-md-12">
        <div className="row">

          {this.state.genericArea ?
            <div>
              <div className="customCollapse">
                <h1>Search
              <a href="javascript:;" onClick={() => this.searchAreaCollapse()}>
                    <i className={this.state.searchArea === false ? 'icon-arrow-left' : 'icon-arrow-down'}></i></a></h1>
                {this.state.searchArea ?
                  <div className="customCollapseContent clearfix">
                    {frm}

                    <div className="col-md-12">
                      <Buttonscomponent
                        buttonFunction={() => this.searchResult()}
                        btnType="button"
                        btnCalss="btn btn-warning btnRight"
                        btnTitle="Search"
                      />
                      <Buttonscomponent
                        buttonFunction={() => this.addMember()}
                        btnType="button"
                        btnCalss="btn btn-info btnRight"
                        btnTitle="Add Role"
                      />
                    </div>

                  </div>
                  : null}
              </div>

              <div className="customCollapse">
                <h1>Results
              <a href="javascript:;" onClick={() => this.resultAreaCollapse()}>
                    <i className={this.state.resultArea === false ? 'icon-arrow-left' : 'icon-arrow-down'}></i></a></h1>
                {this.state.resultArea ?
                  <div className="customCollapseContent clearfix">
                    {errorMsg}
                    {dataTable}

                  </div>
                  : null}
              </div>
            </div>
            : null}

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.reducerRole.users,
    error: state.reducerRole.error,
    roles: state.reducerRole.roles
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onGetUsers: () => dispatch(GetUsers()),
    onGetRoles: (data) => dispatch(GetRoles(data)),
    onSaveIdForRoles: (data) => dispatch(SaveIdForRole(data)),
    onClearState: () => dispatch(ClearState("No"))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchRole);


