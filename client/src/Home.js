import React, {Component} from 'react'
import {OrderTable} from "./components/orders/OrderTable";

export default class Home extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            orders : []
        }
    }

    componentDidMount() {
        fetch('/api/v1/orders')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    orders : res
                })
            })
    }


    render(){
        return(
            <div>
                <OrderTable orders={this.state.orders} />
            </div>
        )
    }


}