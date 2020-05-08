// 数字补零
function PrefixZero(num, n) {
  return (Array(n).join(0) + num).slice(-n);
}

// 商品图片

function goodsFor(goods, size) {
  // Object.entries
  if (!size) {
    size = 300
  }
  let arr = Object.values(goods)
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index].item_no;
    if (arr[index].spec) {
      arr[index].spec = Number(arr[index].spec);
    }
    if (arr[index].cnum) {
      arr[index].cnum = Number(arr[index].cnum);
    }
    if (arr[index].purchase_spec) {
      arr[index].purchase_spec = Number(arr[index].purchase_spec);
    }
    if (arr[index].percent) {
      // let percent=arr[index].percent
      arr[index].percent =Number(arr[index].percent);
    }
    arr[index].image = 'http://img.xmvogue.com/thumb/' + element + '.jpg?x-oss-process=style/' + size;
  }
  return arr
}

/**
* 一维数组转二位数组
* @param {Array} data 需要转的原数组
*/
function transformArrTo(data) {
  let newArr = [];
  while (data.length >= 2) {
    newArr.push(data.splice(0, 2));
  }
  return newArr;
}

/**
*功能：num为基数，total为总数
*时间：2020年05月01日 11:00:11
*作者：钟婉婷
*/
function GetPercent(num, total) {
  num = parseFloat(num);
  total = parseFloat(total);
  if (isNaN(num) || isNaN(total)) {
    return "-";
  }
  return total <= 0 ? "0" : Math.round((num / total) * 10000) / 100.0;
}

/**
*功能：时间戳转时间
*时间：2020年05月01日 15:09:24
*作者：钟婉婷
*/
function formatDateTime(timestamp) {
  var date = new Date(timestamp * 1000);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '/' + m + '/' + d + ' ' + h + ':' + minute + ':' + second;
}

  /**
  *功能：倒计时
  *时间：2020年05月03日 14:49:58
  *作者：钟婉婷
  */
 function timeDifference(s1, s2) {
   var total = s2 - s1;
   var day = parseInt(total / (24 * 60 * 60)); //计算整数天数
   var afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数
   var hour = parseInt(afterDay / (60 * 60)); //计算整数小时数
   var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数
   var min = parseInt(afterHour / 60); //计算整数分
   var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //取得算出分后剩余的秒数
   let time = {
     day: day,
     hour: hour,
     minute: min,
     second: afterMin
   };
   return time;
 }
export default {
  PrefixZero,
  goodsFor,
  transformArrTo,
  GetPercent,
  formatDateTime,
  timeDifference
}
