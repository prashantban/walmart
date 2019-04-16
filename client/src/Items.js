import React, {Component} from 'react'
import {ItemTable} from "./components/items/ItemTable";

export default class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : []
        }
    }

    componentDidMount() {
        fetch('/api/v1/items')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    items : res
                })
            })
    }

    render(){
        return(
            <div>
                <ItemTable items={this.state.items} />
            </div>
        )
    }


}