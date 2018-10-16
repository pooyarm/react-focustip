import React, { Component } from 'react';

class ComponentExport extends Component {
  render() {
    return (
      <div className="component component-red">
        <a href='#' className="shitLink" style={{position: 'absolute',top:'30%',left:'40%'}}>Shit button</a>
      </div>
    );
  }
}

export default ComponentExport;
