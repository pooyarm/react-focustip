import { random } from "./math";

export const hexToRgb = function(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

export const randomColor = function(maxBrighness = 150) {
    return {
        r: random(0,maxBrighness),
        g: random(0,maxBrighness),
        b: random(0,maxBrighness)
    }
}