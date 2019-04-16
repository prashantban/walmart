import React from 'react'
import {Button, Modal} from "react-bootstrap";

export default class CreateItemModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item : ''
        }
    }

    handleSaveBtnClick = () => {
        const { onSave } = this.props;
        const newRow = {};
        const options = {
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                name : this.state.item
            })
        };
        fetch('/api/v1/items', options)
            .then(res => res.json())
            .then(res => {
                newRow["id"] = res.id;
                newRow["name"] = this.state.item;
                onSave(newRow);
            })
            .catch(err => {
                alert("Error Saving Record");
            })
    };

    updateInputValue = (evt) => {
        this.setState({
            item: evt.target.value
        });
    };

    render() {
        const { onModalClose } = this.props;
        return (
            <Modal show={true} onHide = {onModalClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create Item
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-group' key = "users">
                        <label>Enter Item Name</label>
                        <input type="text" value={this.state.item} onChange={this.updateInputValue} />
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
