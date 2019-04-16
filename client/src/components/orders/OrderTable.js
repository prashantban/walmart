import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import CreateOrderModal from "./CreateOrderModal";
import InnerTable from "./InnerTable";
import UpdateOrderModal from "./UpdateOrderModal";

export class OrderTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items : this.props.orders,
            modalShow: false,
            selectedItem : {},
            selectedItemDetail : []
        };
    }

    isExpandableRow = (row) => true;

    onAddRow = (row) => {
        const items = this.props.orders;
        items.push(row);
        this.forceUpdate()
    };

    onDeleteRow = (rows) => {
        rows.forEach(row => {
            fetch(`/api/v1/orders/${row}`, {method : "DELETE"})
                .then(res => res.json())
                .then(res => res)
                .catch(err => err);
        })
    };

    expandComponent = (row) => {
        return (
            <InnerTable data={ row.id } />
        );
    };

    expandColumnComponent = ({ isExpandableRow, isExpanded }) => {
        let content = '';

        if (isExpandableRow) {
            content = (isExpanded ? '(-)' : '(+)' );
        } else {
            content = ' ';
        }
        return (
            <div> { content } </div>
        );
    }

    createOrderModal = (onModalClose, onSave, columns, validateState, ignoreEditable) => {
        const attr = {
            onModalClose, onSave, columns, validateState, ignoreEditable
        };
        return (
            <CreateOrderModal { ... attr } />
        );
    };

    onClickProductSelected = (cell, row) => {
        fetch(`/api/v1/items?order_id=${row.id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({ modalShow: true, selectedItem : row, selectedItemDetail : data });
            });

    };

    modalClose = () => this.setState({ modalShow: false })

    cellButton = (cell, row, enumObject, rowIndex) => (
        <button type="button" onClick={() => this.onClickProductSelected(cell, row, rowIndex)}>
            Update
        </button>
    )

    render() {
        const options = {
            expandBy: 'column',
            insertModal: this.createOrderModal,
            onAddRow: this.onAddRow,
            onDeleteRow: this.onDeleteRow
        };
        const selectRowProp = {
            mode: 'checkbox',
            clickToSelect: false,
            clickToExpand: true
        };

        return (
            <BootstrapTable data={ this.props.orders }
                            options={ options }
                            striped
                            expandableRow={ this.isExpandableRow }
                            expandComponent={ this.expandComponent }
                            insertRow={ true }
                            deleteRow={ true }
                            bordered={ false }
                            selectRow={ selectRowProp }
                            expandColumnOptions={ {
                                expandColumnVisible: true,
                                expandColumnComponent: this.expandColumnComponent,
                                columnWidth: 50
                            } }
                            search>
                <TableHeaderColumn dataField='id' isKey = {true}>Order ID</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>User Name</TableHeaderColumn>
                <TableHeaderColumn dataField='user_id'>User ID</TableHeaderColumn>
                <TableHeaderColumn dataField='button' dataFormat={this.cellButton} expandable={ false }> Action </TableHeaderColumn>
                <UpdateOrderModal show={this.state.modalShow} onHide={this.modalClose} item={this.state.selectedItem} detail={this.state.selectedItemDetail } ></UpdateOrderModal>
            </BootstrapTable>
        );
    }
}