import React from 'react';
import Select from "react-select";

// Lookup for All Items
export default class ItemsLookup extends React.Component {

    state = {
        selectedOption: this.props.selectedItems,
    };

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        let arr = selectedOption.map(option => option.value);
        this.props.triggerUpdate(arr)
    };

    render() {
        console.log(this.props, this.state);
        let items = this.props.items;
        let optionItems = items.map((item) => {
            let obj = {
                value: item.id, label: item.name
            };
            return obj;
        });
        return (
            <Select
                isMulti
                onChange={this.handleChange}
                defaultValue={this.state.selectedOption}
                name="Users"
                options={optionItems}
                className="basic-multi-select"
                classNamePrefix="select"
                isClearable="false"
            />
        );
    }
}