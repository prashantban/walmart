import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import CreateItemModal from "./CreateItemModal";

export class ItemTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items : []
        };
    }

    onDeleteRow = (rows) => {
        rows.forEach(row => {
            fetch(`/api/v1/items/${row}`, {method : "DELETE"})
                .then(res => res.json())
                .then(res => res)
                .catch(err => err);
        })
    };

    createItemModal = (onModalClose, onSave, columns, validateState, ignoreEditable) => {
        const attr = {
            onModalClose, onSave, columns, validateState, ignoreEditable
        };
        return (
            <CreateItemModal { ... attr } />
        );
    };

    render() {
        const selectRowProp = {
            mode: 'checkbox'
        };

        const options = {
            insertModal: this.createItemModal,
            onDeleteRow: this.onDeleteRow
        };
        return (
            <BootstrapTable data={ this.props.items }
                            options={ options }
                            striped
                            insertRow={ true }
                            deleteRow={ true }
                            selectRow={ selectRowProp }
                            search>
                <TableHeaderColumn dataField='id' isKey = {true}>Item ID</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Item Name</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}