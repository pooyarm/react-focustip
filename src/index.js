import React, { Component } from 'react';
import PropTypes from 'prop-types';

import stylesheet from './styles.css';
import { scrollTo } from './utils/dom';
import { hexToRgb } from './utils/color';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            visibility: false,
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

        let styles = this.calculateStyles(target, step);

        return (
            <div className={this.classNames()} style={styles}>
              <span className={stylesheet.focustip__lens} style={this.calculateLensStyles(target, step)}></span>
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

    calculateStyles(target, step) {
        let {left, top} = this.calculatePosition(target, step);
        let {width, height} = this.calculateDimension(target, step);
        return {
          left,
          top,
          width,
          height
        };
    }

    calculateDimension(target, step) {
        return {
            width:  this.size(step) + 'px',
            height: this.size(step) + 'px'
        }
    }

    calculateLensStyles(target, step) {
        return {
            borderColor: this.lensBorderColor(target, step)
        };
    }

    lensBorderColor(target, step) {
        let rgba = hexToRgb(step.color);
        return `rgba(${rgba.r},${rgba.g},${rgba.b},0.8)`;
    }

    size(step) {
        return (step.size || this.props.size);
    }
    
    calculatePosition(target, step) {
      let targetRect = target.getBoundingClientRect();

      let left 	= targetRect.x + targetRect.width / 2 - this.size(step) / 2;
      let top 	= (targetRect.y + targetRect.height / 2 - this.size(step) / 2) /*- scrollTop*/ ;
      
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

App.propTypes = {
    steps:  PropTypes.arrayOf(PropTypes.object).isRequired,
    run:    PropTypes.bool.isRequired,
    size:   PropTypes.number
}

App.defaultProps = {
    size:   100
};

export default App;