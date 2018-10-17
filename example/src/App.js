import React, { Component } from 'react';

import Focustip from 'react-focustip';

import ComponentRed from './ComponentRed';
import ComponentMellow from './ComponentMellow';
import ComponentBlue from './ComponentBlue';
import ComponentYellow from './ComponentYellow';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {run:false};
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({run: true});
    },2000)
  }
  render() {
    var steps = [
      {
        target: '.shitBtn',
        content: 'Focustip provides a way for you to introduce your page and more...',
        ok: 'I see',
        color: '#44B85D'
      },
      {
        target: '.shitLink',
        content: 'Buy and download Focustip files via this link.',
        ok: 'Ok',
        color: '#000000'
      },
      {
        target: '.secondLink',
        content: 'Having trouble with Focustip? Support is available....',
        ok: 'Ok',
        color: '#000000'
      },
    ]
    return (
      <div>
        <Focustip
          steps={steps}
          run={this.state.run}
        />
        <div className="component-holder">
          <ComponentRed />
          <ComponentBlue />
          <ComponentYellow />
          <ComponentMellow />
        </div>
      </div>
    );
  }
}

export default App;
