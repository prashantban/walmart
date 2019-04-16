import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Items from './Items';
import { NoMatch } from './NoMatch';
import { Layout } from './components/Layout';
import { Navigation } from './components/Navigation';
import { Jumbotron } from './components/Jumbotron';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <Navigation />
                    <Jumbotron />
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/items" component={Items} />
                            <Route component={NoMatch} />
                        </Switch>
                    </Layout>
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
