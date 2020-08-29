import React, { Component } from 'react';
import './App.css';
import {Menu} from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import './App.css';
import Home from './Home'
import EvaUnit from './EvaUnit'
import Angel from './Angel'
import Pilot from './Pilot'
import People from './People'

class App extends Component {

  state = {}


// handleItemClick = (e, { name }) => {this.setState({ activeItem: name});}

  render() {
    const { activeItem } = this.state
    return (

      <Router >
        <div className="App">

          <Menu>
            <Menu.Item
                as={Link}
                to="/"
                name='Home'
                active={activeItem === 'Home'}
                // onClick={this.handleItemClick}
              ></Menu.Item>
            <Menu.Item
              as={Link}
              to="/EvaUnit"
              name='EvaUnit'
              active={activeItem === 'EvaUnit'}
              // onClick={this.handleItemClick}
            ></Menu.Item>
            <Menu.Item
              as={Link}
              to="/Angel"
              name='Angel'
              active={activeItem === 'Angel'}
              // onClick={this.handleItemClick}
            ></Menu.Item>
            <Menu.Item
              as={Link}
              to="/Pilot"
              name='Pilot'
              active={activeItem === 'Pilot'}
              // onClick={this.handleItemClick}
            ></Menu.Item>
            <Menu.Item
              as={Link}
              to="/People"
              name='People'
              active={activeItem === 'People'}
              // onClick={this.handleItemClick}
            ></Menu.Item>
            
        </Menu>


          <Route exact path = "/"  component = {Home} />
          <Route path = "/EvaUnit" component = {EvaUnit} />
          <Route path = "/Angel" component = {Angel} />
          <Route path = "/Pilot" component = {Pilot} />
          <Route path = "/People" component = {People} />

          
        </div>

      </Router>    

    );
  }
}

export default App;
