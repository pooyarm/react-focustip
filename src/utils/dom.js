import {easeInOutQuad} from './math';

export const scrollTo = function(element, to, duration) {
    return new Promise((resolve, reject) => {
        var start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;
            
        var animateScroll = function(){        
            currentTime += increment;
            var val = easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
            } else {
                resolve();
            }
        };
        animateScroll();
    });
}

export const scrollToElement = (element) => {
    var target = element.getBoundingClientRect().y + document.documentElement.scrollTop;
    target = Math.max(target - 100, 0);
    return scrollTo(document.documentElement, target, 200);
}