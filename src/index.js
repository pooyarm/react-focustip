import React, { Component } from 'react';
import PropTypes from 'prop-types';

import stylesheet from './styles.css';
import { scrollTo } from './utils/dom';
import { hexToRgb } from './utils/color';

class App extends React.Component {
    resizeHandler = false;

    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            visibility: false,
            window: this.windowDimension()
        };

        this.onResize = this.onResize.bind(this);
    }
    componentDidMount() {
        window.addEventListener('resize', this.onResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
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
        console.log('styles',styles);

        return (
            <div className={this.classNames()} style={styles}>
              <span className={stylesheet.focustip__lens} style={this.calculateLensStyles(target, step)}></span>
              <div className={this.contentWrapperClassNames(target, step)}>
                <div className={stylesheet.focustip__content}>
                  {step.content}
                </div>
                <div className={stylesheet.focustip__ok} onClick={this.next.bind(this)}>
                    {this.ok(step)}
                </div>
              </div>
            </div>
        );
    }
    render() {
        if (!this.props.run) return null;
        return this.renderStep();
    }
    onResize() {
        clearTimeout(this.resizeHandler);
        this.resizeHandler = setTimeout(this.updateDimension.bind(this), 200);
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
    windowDimension() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }
    updateDimension() {
        this.setState({
            ...this.state,
            window: this.windowDimension()
        });
    }

    ok(step) {
        return step.ok || this.props.ok;
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

    contentWrapperClassNames(target, step) {
        let classNames = [stylesheet.focustip__contentWrapper];

        let {left, top} = this.calculatePosition(target, step);

        if ((top + this.size(step)) > this.state.window.height * 2/3) {
            classNames.push(stylesheet['focustip__contentWrapper--top']);
        }

        if ((left + this.size(step) * 0.3 + 400) > this.state.window.width) {
            classNames.push(stylesheet['focustip__contentWrapper--left']);
        }

        return classNames.join(' ');
    }

    size(step) {
        return (step.size || this.props.size);
    }
    
    calculatePosition(target, step) {
        let targetRect = target.getBoundingClientRect();

        let left 	= (targetRect.x + targetRect.width / 2 - this.size(step) / 2);
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
        target = Math.max(target - 100, 0);
        return scrollTo(document.documentElement, target, 200);
    }
}

App.propTypes = {
    steps:  PropTypes.arrayOf(PropTypes.object).isRequired,
    run:    PropTypes.bool.isRequired,
    size:   PropTypes.number,
    ok:     PropTypes.string,
}

App.defaultProps = {
    size:   100,
    ok:     'Ok'
};

export default App;