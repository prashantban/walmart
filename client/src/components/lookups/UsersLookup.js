import React from 'react';
import Select from 'react-select';

// Lookup for All Users in the System
export default class UsersLookup extends React.Component {

    state = {
        selectedOption: this.props.selectedUser,
    };


    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        this.props.triggerUpdate(selectedOption.value)
    };

    render() {
        let users = this.props.users;
        let optionItems = users.map((user) => {
            let obj = {
                value: user.id, label: user.name
            };
            return obj;
        });
        return (
            <Select
                className="basic-single"
                onChange={this.handleChange}
                classNamePrefix="select"
                defaultValue={this.state.selectedOption}
                name="Users"
                options={optionItems}
                isDisabled = {this.props.isDisabled}
            />
        );
    }
}