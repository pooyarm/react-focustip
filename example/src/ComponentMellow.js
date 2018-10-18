import React, { Component } from 'react';

class ComponentExport extends Component {
  render() {
    return (
      <div className="component component-mellow">
        <a href='#' className="bottomLink" style={{position: 'absolute',top:'90%',left:'70%'}}>Bottom Link</a>
      </div>
    );
  }
}

export default ComponentExport;
