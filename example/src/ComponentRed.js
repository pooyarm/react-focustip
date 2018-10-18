import React, { Component } from 'react';

class ComponentExport extends Component {
  render() {
    return (
      <div className="component component-red">
        <a href='#' className="shitLink" style={{position: 'absolute',top:'30%',left:'30%'}}>Shit Link</a>
        <a href='#' className="secondLink" style={{position: 'absolute',top:'20%',left:'80%'}}>Second Link</a>
      </div>
    );
  }
}

export default ComponentExport;
