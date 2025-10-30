/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    
    const leftMax = [], rightMax = [];
    let max = 0;
    for (let i = 0; i < height.length; i++) {
      leftMax[i] = max;
      max = Math.max(max, height[i]);
    }
    max = 0;
    for (let i = height.length - 1; i >= 0; i--) {
        rightMax[i] = max;
        max = Math.max(max, height[i]);
    }
    let res = 0;
    for (let i = 0; i < height.length; i++) {
        const min = Math.min(leftMax[i], rightMax[i]);
        if (min > height[i]) {
            res += min - height[i];
        }
    }
    return res;
};