/*当然有第三方库可以用，这里就不说这种处理方式了*/

/* bigint */
const num1Str = '11029479827389539048759.1827398678965834';
const num2Str = '18749837587624875689467987945876.198623876';

const num1 = BigInt(num1Str.split('.')[0]);
const num2 = BigInt(num2Str.split('.')[0]);

console.log(num1+num2);


function add(strNum1, strNum2) {
  if(strNum1.includes('.') || strNum2.includes('.')) {
    const nums1 = strNum1.split('.');
    const nums2 = strNum2.split('.');
    
    console.log(nums1, nums2)
    
    // 避免一个有小数位一个没有小数位导致split出来的数组一个长度为1一个长度为2
    if(nums1.length !== nums2.length) {
      const needPush = nums1.length > nums2.length ? nums2 : nums1;
      needPush.push('');
    }
    
    // 需要补齐的位数
    const toFill = nums1[1].length > nums2[1].length ? nums1[1].length - nums2[1].length : nums2[1].length - nums1[1].length;
    // nums1和nums2中小数位较短的那个需要补齐
    const whichToFill = nums1[1].length > nums2[1].length ? nums2 : nums1;
    
    // 末尾添加0
    whichToFill[1] += '0'.repeat(toFill);
    
    // 小数点的位置
    const decimalPlaces = nums1[1].length;
    
    // 利用bigint无论多少位都能算出来进行计算
    const sum = BigInt(nums1[0] + nums1[1]) + BigInt(nums2[0] + nums2[1]);
    
    const sumStr = sum.toString();
    
    // 添加小数位
    return sumStr.slice(0, sumStr.length - decimalPlaces) + '.' + sumStr.slice(sumStr.length - decimalPlaces);
  } else {
    return BigInt(strNum1) + BigInt(strNum2);
  }
}

console.log(add(num1Str, num2Str));