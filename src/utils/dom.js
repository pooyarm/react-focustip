import {easeInOutQuad} from './math';

export const scrollTo = (destination, duration = 200) => {
    return new Promise((resolve, reject) => {
        const start = window.pageYOffset;
        const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

        const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
        const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
        const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

        if ('requestAnimationFrame' in window === false) {
            window.scroll(0, destinationOffsetToScroll);
            resolve(destinationOffsetToScroll);
            return;
        }

        function scroll() {
            const now = 'now' in window.performance ? performance.now() : new Date().getTime();
            const time = Math.min(1, ((now - startTime) / duration));
            const timeFunction = easeInOutQuad(time);
            window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

            if (window.pageYOffset === destinationOffsetToScroll) {
                resolve(destinationOffsetToScroll);
                return;
            }

            requestAnimationFrame(scroll);
        }

        scroll();
    });
}
/*
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
                resolve(element.scrollTop);
            }
        };
        animateScroll();
    });
}
*/

export const calculateElementScrollTarget = (element) => {
    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    const maxScroll = documentHeight - windowHeight;
    var target = element.getBoundingClientRect().y + (window.pageYOffset || document.documentElement.scrollTop);
    target = Math.max(target - 100, 0);
    target = Math.min(target, maxScroll);
    return target;
}