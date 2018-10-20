export const easeInOutQuad = (t, b, c, d) => {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};

export const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}