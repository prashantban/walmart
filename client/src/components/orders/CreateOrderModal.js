import React from 'react'
import UsersLookup from "../lookups/UsersLookup";
import ItemsLookup from "../lookups/ItemsLookup";
import {Button, Modal} from "react-bootstrap";

export default class CreateOrderModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users : [],
            items : [],
            selectedUser : null,
            selectedItems : []
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

    handleSaveBtnClick = () => {
        const { onSave } = this.props;
        const newRow = {};
        const items = this.state.selectedItems.map(val => {
            return {id : val}
        });
        const options = {
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                user_id : this.state.selectedUser,
                items
            })
        };
        fetch('/api/v1/orders', options)
            .then(res => res.json())
            .then(res => {
                newRow["id"] = res.order_id;
                newRow["user_id"] = this.state.selectedUser;
                onSave(newRow);
            })
            .catch(err => {
                alert("Error Saving Record");
            })

    };

    handleUserChange = (value) => {
        this.setState({ selectedUser: value });
    };

    handleItemChange = (value) => {
        this.setState({ selectedItems: value });
    };

    render() {
        const { onModalClose } = this.props;
        return (
            <Modal show={true} onHide = {onModalClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create Order
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-group' key = "users">
                        <label>Select User : </label>
                        <UsersLookup triggerUpdate={this.handleUserChange} users={this.state.users}/>
                    </div>
                    <div className='form-group' key = "items">
                        <label>Select Item : </label>
                        <ItemsLookup triggerUpdate={this.handleItemChange} items={this.state.items}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={ onModalClose }>Close</Button>
                    <Button onClick={ () => this.handleSaveBtnClick() }>Confirm</Button>
                </Modal.Footer>

            </Modal>

        );
    }
}
