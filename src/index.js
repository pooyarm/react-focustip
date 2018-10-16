import React, { Component } from 'react';

import stylesheet from './styles.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            width: 100,
            height: 100
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
        console.log('targetRect',targetRect);

        let left 	= targetRect.x + targetRect.width / 2 - this.state.width / 2;
        let top 	= (targetRect.y + targetRect.height / 2 - this.state.height / 2) /*- scrollTop*/ ;

        return {
          left,
          top
        };
        /*
        if(typeof animate == 'undefined') animate = false;
        var tPos 	= this.options.target.offset();
        var tHeight = this.options.target.outerHeight();
        var tWidth 	= this.options.target.outerWidth();
    
        var scrollTop = $(window).scrollTop();
    
        var eLeft 	= tPos.left + tWidth / 2 - this.options.width / 2;
        var eTop 	= (tPos.top + tHeight / 2 - this.options.height / 2) - scrollTop;
    
        if(animate)
          this.el.stop().animate({
            left: eLeft + 'px',
            top: eTop + 'px'
          }, 400);
        else
          this.el.css({
            left: eLeft + 'px',
            top: eTop + 'px'
          });
    
        var dWidth = $(document).width();
        var centerMargin = dWidth / 12;
    
        if(eLeft > (dWidth / 2) - centerMargin && eLeft < (dWidth / 2) + centerMargin && dWidth > 700)// center
        {
          this.el.removeClass('on-right').addClass('on-center');
          var maxWidth = dWidth / 3;
        }
        else if(eLeft > dWidth / 2) // on right
        {
          this.el.addClass('on-right').removeClass('on-center');
          var maxWidth = dWidth - (dWidth - eLeft - this.options.width) - 25;
        }
        else
        {
          this.el.removeClass('on-right').removeClass('on-center');
          var maxWidth = dWidth - eLeft - 25;
        }
    
        this.el.children('div').css('max-width', maxWidth + 'px');
        */
    }
}

export default App;