import React from 'react';
import PropTypes from 'prop-types';

import { scrollTo, calculateElementScrollTarget } from './utils/dom';

class Scroller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scroll: -1
        }
    }

    target() {
        return this.props.target;
    }

    render () {
        let scrollTarget = calculateElementScrollTarget(this.target());
        if (scrollTarget === this.state.scroll) {
            return this.props.children;
        }

        this.scroll(scrollTarget);
        return null;
    }
    
    scroll(target) {
        scrollTo(target, 200).then((scroll) => {
            this.setState({
                ...this.state,
                scroll
            })
        });;
    }
}

Scroller.propTypes = {
    target: PropTypes.object.isRequired,
    windowDimension: PropTypes.object.isRequired
}

export default Scroller;