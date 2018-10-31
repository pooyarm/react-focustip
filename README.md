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

## Props

| Property      | Type               | Default                               | Description                                                                                                                                  |
|:--------------|:-------------------|:--------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------|
| `steps`         | array of objects | required                             | Array of step objects to show. |
| `run`           | boolean          | required                             | To handle when should focustip starts. |
| `size`          | number           | 100                                  | To define lens size in pixels. |
| `ok`            | string           | 'Ok'                                 | To define Ok button text. |
| `onComplete`    | function         | undefined                            | Callback when all steps has done |
| `onNext`        | function         | undefined                            | Callback when each step has done |

Note that the run flag should be false at initiate the component, and when all components and target elements initiated into page we should set run flag true.

### Step Object
As mentioned above, steps property should be an array of step objects, here is the properties of step object:
```js
{
  target: '.first-step-element',    // Query selector of step target element (required)
  content: 'Lorem ipsum dolor sit amet.',   // Can be String or JSX (required)
  ok: 'I see',    // To define custom Ok button text for this element (optional) (Default: default ok in props) (String or JSX)
  color: '#b7ad3e',   // Background color in hex format (optional) (default = random color)
  size: 70,   // To define lens size in pixels (optional) (default = default size in props)
}
```


## License

MIT © [pooyarm](https://github.com/pooyarm)
