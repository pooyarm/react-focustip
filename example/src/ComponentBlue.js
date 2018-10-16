import React, { Component } from 'react';
//import Hello from 'react-focustip';

class ComponentExport extends Component {
  render() {
    return (
      <div className="component component-blue">
        <button className="shitBtn" style={{position: 'absolute',top:'40%',left:'20%'}}>Shit button</button>
      </div>
    );
  }
}

export default ComponentExport;
