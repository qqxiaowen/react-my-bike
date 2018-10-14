import React, { Component } from 'react';
import './App.less'

class App extends Component {
  componentWillMount(){
    console.log(this.props)
  }
  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}

export default App;
