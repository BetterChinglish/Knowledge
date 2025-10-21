/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
  const dp = new Array(s.length).fill(0);
  let maxLen = 0;
  for(let i = 1; i < s.length; i++) {
    // 判断当前字符是否为 ')'
    if(s[i] === ')') {
      // 上个字符如果为（，则匹配成功，当作： xxxxx()，长度为 dp[i-2] + 2
      if(s[i-1] === '(') {
        dp[i] = i >= 2 ? dp[i-2] + 2 : 2;
      }
      // 上个字符为 ')'，则为xxxx）), 需要找到上个）匹配的（位置的前一个位置是否为（
      else if( s[i-1] === ')' ) {
        const j = i - dp[i-1] - 1;
        // 如果为（，则匹配成功，当作 （（xxx))，长度为 dp[i-1] + 2 + dp[j-1]
        if(j >= 0 && s[j] === '(') {
          dp[i] = dp[i-1] + 2 + (j >= 1 ? dp[j-1] : 0);
        }
        // 否则不匹配，长度为0
        else{
          dp[i] = 0;
        }
      }
      maxLen = Math.max(dp[i], maxLen);
    }
    
  }
  return maxLen;
}
console.log(longestValidParentheses(')(((((()())()()))()(()))('))
