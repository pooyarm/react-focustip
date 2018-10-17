import React, { Component } from 'react';

import stylesheet from './styles.css';
import { scrollTo } from './utils/dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            visibility: false,
            width: 100,
            height: 100,
        };
    }
    renderStep() {
        let step = this.props.steps[this.state.step];
        if (!step) return null;
        let target = document.querySelector(step.target);
        console.log('state', this.state);
        console.log('step', step);
        console.log('target',target);

        this.scroll(target).then(this.makeVisible.bind(this));

        let styles = this.calculateStyles(target);

        return (
            <div className={this.classNames()} style={styles}>
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
        return this.renderStep();
    }
    next() {
        this.setState({
            ...this.state,
            step: this.state.step + 1,
            visibility: false
        });
    }
    makeVisible() {
      if (this.state.visibility === true) return true;
      this.setState({
        ...this.state,
        visibility: true
      });
    }

    calculateStyles(target) {
        let {left, top} = this.calculatePosition(target);

        return {
          left,
          top,
        };
    }
    
    calculatePosition(target) {
      let targetRect = target.getBoundingClientRect();

      let left 	= targetRect.x + targetRect.width / 2 - this.state.width / 2;
      let top 	= (targetRect.y + targetRect.height / 2 - this.state.height / 2) /*- scrollTop*/ ;
      
      return {
        left,
        top
      }
    }

    classNames() {
        var classNames = [stylesheet.focustip];
        classNames.push((this.state.visibility)?stylesheet['focustip--visible']:stylesheet['focustip--invisible']);
        return classNames.join(' ');
    }
    
    scroll(element) {
      var target = element.getBoundingClientRect().y + document.documentElement.scrollTop;
      target = Math.max(target - 200, 0);
      return scrollTo(document.documentElement, target, 200);
    }
}

export default App;