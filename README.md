# react-focustip

> 

[![NPM](https://img.shields.io/npm/v/react-focustip.svg)](https://www.npmjs.com/package/react-focustip) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-focustip
```

## Usage

```jsx
import React, { Component } from 'react'

import Focustip from 'react-focustip';

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {run:false};
  }
  componentDidMount() {
    // make steps visible after 1 second
    setTimeout(() => {
      this.setState({run: true});
    },1000)
  }
  render () {
    return (
      <Focustip
        steps={[
          {
            target: '.first-step-element',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          },
          {
            target: '.second-step-element',
            content: 'Nunc in nisi at ante congue vehicula at eget dui.',
            ok: 'I see',
            color: '#44B85D'
          }
        ]}
        run={this.state.run}
        onComplete={() => {
          console.log('completed');
        }}
        onNext={(step) => {
          console.log('onNext', step)
        }}
      />
      // rest elements comes here, steps target elements should be here
      ...
    )
  }
}
```

## License

MIT © [pooyarm](https://github.com/pooyarm)
