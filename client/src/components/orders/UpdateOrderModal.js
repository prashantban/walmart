import React from 'react'
import UsersLookup from "../lookups/UsersLookup";
import ItemsLookup from "../lookups/ItemsLookup";
import {Button, Modal} from "react-bootstrap";

export default class UpdateOrderModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            items: [],
            selectedUser: this.props.item.user_id,
            selectedItems: this.props.detail
        }
    }

    componentWillMount() {
        fetch('/api/v1/users')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    users: data,
                });
            });

        fetch('/api/v1/items')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    items: data,
                });
            });
    }

    addNewRecords = (items) => {
        const order_id = this.props.item.id;
        const options = {
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                items
            })
        };
        console.log(options);
        fetch(  `/api/v1/orders/${order_id}/items`, options)
            .then(res => res.json())
            .then(_res => {
                alert("Records Saved");
                this.props.onHide()
            })
            .catch(err => {
                alert("Error Saving Record");
                this.props.onHide();
            })
    };

    deleteCurrentRecords = (items) => {
        const order_id = this.props.item.id;
        console.log("new_items", items);
        return new Promise((resolve) => {
            for (let i = 0;i<items.length;i++) {
                fetch(`/api/v1/orders/${order_id}/items/${items[i].id}`, { method : "DELETE" })
                    .then(res => res.json())
                    .catch(err => err);
            }
            resolve(true);
        })
    };


    handleSaveBtnClick = () => {
        const items = this.state.selectedItems.map(val => {
            return {id : val}
        });

        if(items.length !== 0) {
            const new_items = this.props.detail.map(val => {
                return {id : val.id}
            });
            this.deleteCurrentRecords(new_items)
                .then(() => this.addNewRecords(items))
        }
        else {
            this.props.onHide();
        }
    };

    handleUserChange = (value) => {
        this.setState({ selectedUser: value });
    };

    handleItemChange = (value) => {
        this.setState({ selectedItems: value });
    };

    updateSelectedUserData = () => {
        return {
            value: this.props.item.user_id, label: this.props.item.name
        }
    };

    updateSelectedItemData = () => {
        const out = this.props.detail.map(val => {
            return {
                value: val.id, label: val.name
            }
        });
        return out;
    };

    render() {
        return (
            <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Order
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-group' key = "users">
                        <label>Select User : </label>
                        <UsersLookup triggerUpdate={this.handleUserChange} users={this.state.users} selectedUser={this.updateSelectedUserData()} isDisabled = {true}/>
                    </div>
                    <div className='form-group' key = "items">
                        <label>Select Item : </label>
                        <ItemsLookup triggerUpdate={this.handleItemChange} items={this.state.items} selectedItems={this.updateSelectedItemData()}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                    <Button onClick={ () => this.handleSaveBtnClick() }>Confirm</Button>
                </Modal.Footer>

            </Modal>
        );
    }
}
