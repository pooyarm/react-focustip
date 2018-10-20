import React from 'react';
import PropTypes from 'prop-types';

import Presentation from './presentation';
import Scroller from './scroller';

class App extends React.Component {
    resizeHandler = false;

    constructor(props) {
        super(props);
        this.state = {
            step: 0,
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

    onResize() {
        clearTimeout(this.resizeHandler);
        this.resizeHandler = setTimeout(this.updateDimension.bind(this), 200);
    }

    render() {
        if (!this.props.run) return null;
        let step = this.step();
        if (!step) return null;
        return (
            <Scroller
                target={step.target}
                windowDimension={this.state.window}
                >
                <Presentation
                    step={step}
                    windowDimension={this.state.window}
                    nextHandler={this.next.bind(this)}
                />
            </Scroller>
        )
    }

    step() {
        let step = this.props.steps[this.state.step];
        if (!step) return false;

        step.size = this.size(step);

        return step;
    }

    size(step) {
        return (step.size || this.props.size);
    }

    next() {
        if (this.state.step + 1 < this.props.steps.length) {
            this.props.onNext && this.props.onNext(this.state.step);
        } else {
            this.props.onComplete && this.props.onComplete();
        }

        this.setState({
            ...this.state,
            step: this.state.step + 1,
            visibility: false
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
}

App.propTypes = {
    steps:      PropTypes.arrayOf(PropTypes.object).isRequired,
    run:        PropTypes.bool.isRequired,
    size:       PropTypes.number,
    ok:         PropTypes.string,
    
    onComplete: PropTypes.func,
    onNext:     PropTypes.func
}

App.defaultProps = {
    size:   100,
    ok:     'Ok'
};

export default App;