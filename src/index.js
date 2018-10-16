import React, { Component } from 'react';

import stylesheet from './styles.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0
        };
    }
    renderStep() {
        let step = this.props.steps[this.state.step];
        if (!step) return null;
        console.log('state', this.state);
        console.log('step', step);
        let target = document.querySelector(step.target);
        console.log('target',target);

        let styles = this.calculateStyles(target);

        return (
            <div className={stylesheet.focustip} style={styles}>
              <span className={stylesheet.focustip__lens}></span>
              <div className={stylesheet.focustip__contentWrapper}>
                <div className={stylesheet.focustip__content}>
                  {step.content}
                </div>
                <div className={stylesheet.focustip__ok} onClick={this.next.bind(this)}>
                    {step.ok}
                </div>
              </div>
            </div>
        );
    }
    render() {
        if (!this.props.run) return null;
        console.log('this.props',this.props);
        return this.renderStep();
    }
    next() {
        this.setState({
            ...this.state,
            step: this.state.step + 1
        });
    }
    calculateStyles(target) {
        let targetRect = target.getBoundingClientRect();
        let styles = {
            left: targetRect.x + 'px',
            top: targetRect.y + 'px'
        }
        return styles;
    }
}

export default App;