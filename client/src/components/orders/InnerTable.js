import React from "react";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";

export default class InnerTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items : []
        }
    };

    componentWillMount() {
        this.fetchItems(this.props.data)
    }

    fetchItems = (id) => {
        return fetch(`/api/v1/items?order_id=${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    items : data
                })
            })
    };

    onClickProductSelected = (cell, row) => {
        fetch(`/api/v1/orders/${row.order_id}/items/${row.id}`, { method : "DELETE" })
            .then(res => res.json())
            .then(data => {
                const items = [...this.state.items];
                const index = items.findIndex(x => x.id === row.id);
                if (index !== -1) {
                    items.splice(index, 1);
                    this.setState({items});
                }
            })
    };

    cellButton = (cell, row, enumObject, rowIndex) => {
        return (
            <button type="button" onClick={() => this.onClickProductSelected(cell, row, rowIndex)}>
                X
            </button>
        )
    }

    render() {
        return (
            <BootstrapTable data={ this.state.items }>
                <TableHeaderColumn dataField='id' isKey={ true }>Id</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Item Name</TableHeaderColumn>
                <TableHeaderColumn dataField='order_id'>Order ID</TableHeaderColumn>
                <TableHeaderColumn dataField='button' dataFormat={this.cellButton} expandable={ false }> Delete </TableHeaderColumn>
            </BootstrapTable>);
    }
}