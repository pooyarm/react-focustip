import React from 'react';
import PropTypes from 'prop-types';

import stylesheet from './styles.css';
import { hexToRgb, randomColor } from './utils/color';

class Presentation extends React.Component {
    targetElement = false;

    constructor(props) {
        super(props);
        this.state = {
            color: (this.props.step.color)? false : randomColor()
        };
    }
    
    componentDidMount() {
    }

    componentWillUnmount() {
        document.body.classList.remove(stylesheet.focustipBodyLock);
    }

    render() {
        document.body.classList.add(stylesheet.focustipBodyLock);

        let step = this.props.step;
        let styles = this.styles(this.target(), step);

        return (
            <div className={this.classNames()} style={styles}>
              <span className={stylesheet.focustip__lens} style={this.lensStyles(this.target(), step)}></span>
              <div className={this.contentWrapperClassNames(this.target(), step)}>
                <div className={stylesheet.focustip__content}>
                  {step.content}
                </div>
                <div className={stylesheet.focustip__ok} onClick={this.props.nextHandler}>
                    {this.ok(step)}
                </div>
              </div>
            </div>
        );
    }

    target() {
        if (this.targetElement) return this.targetElement;
        this.targetElement = this.props.step.target;
        return this.targetElement;
    }

    ok(step) {
        return step.ok || this.props.ok;
    }

    styles(target, step) {
        let {left, top}     = this.position(target, step);
        let {width, height} = this.dimension(target, step);
        return {
            left,
            top,
            width,
            height
        };
    }

    dimension(target, step) {
        return {
            width:  step.size,
            height: step.size
        }
    }

    lensStyles(target, step) {
        return {
            borderColor: this.lensBorderColor(target, step)
        };
    }

    lensBorderColor(target, step) {
        let rgba = (step.color && hexToRgb(step.color)) || this.state.color;
        return `rgba(${rgba.r},${rgba.g},${rgba.b},0.8)`;
    }

    contentWrapperClassNames(target, step) {
        let classNames = [stylesheet.focustip__contentWrapper];

        let {left, top} = this.position(target, step);

        if ((top + step.size) > this.props.windowDimension.height * 2/3) {
            classNames.push(stylesheet['focustip__contentWrapper--top']);
        }

        // if ((left + step.size * 0.3 + 400) > this.props.windowDimension.width) {
        if (left > this.props.windowDimension.width / 2) {
            classNames.push(stylesheet['focustip__contentWrapper--left']);
        }

        return classNames.join(' ');
    }
    
    position(target, step) {
        let targetRect = target.getBoundingClientRect();

        let left 	= (targetRect.x + targetRect.width / 2 - step.size / 2);
        let top 	= (targetRect.y + targetRect.height / 2 - step.size / 2) /*- scrollTop*/ ;
        
        return {
            left,
            top
        }
    }

    classNames() {
        var classNames = [stylesheet.focustip];
        classNames.push(stylesheet['focustip--visible']);
        return classNames.join(' ');
    }
}

Presentation.propTypes = {
    step:               PropTypes.object.isRequired,
    windowDimension:    PropTypes.object.isRequired,
    size:               PropTypes.number,
    ok:                 PropTypes.string,
}

Presentation.defaultProps = {
    size:   100,
    ok:     'Ok'
};

export default Presentation;