import axios from 'axios';
import config from '@/config'
import qs from 'qs'
import iView from 'view-design';
import store from '@/store'
let userInfo = store.state.user.userInfo
const baseURL = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro;
function post(url, params, token) {
  // console.log(store.state.user.userInfo.uname)
  return new Promise((resolve) => {
    if (token) {
      let cooking = {
        hdid: store.state.user.userInfo.hdid,
        uid: store.state.user.userInfo.uid
      }
      params = Object.assign(cooking, params);
    }
    axios.post(baseURL + url, qs.stringify(params))
      .then(res => {
        // console.log(res.data)
        resolve(res.data)
        iView.LoadingBar.finish()
      })
      .catch(error => {
        iView.LoadingBar.finish()
        iView.Notice.info({
          title: '请求失败',
          desc: '网络异常'
        });
      });
  })
}

function convertData(data) {
  if (typeof data === 'object') {
    var convertResult = "";
    var n = 0;
    for (var c in data) {
      if (typeof (data[c]) == "string" || typeof (data[c]) == "number") {
        convertResult += c + "=" + data[c] + "&";
      }
      if (typeof (data[c]) == 'object') {
        for (var i in data[c]) {
          convertResult += c + "[]=" + data[c][i] + "&";
        }
      }
    }
    // console.log(convertResult)
    convertResult = convertResult.substring(0, convertResult.length - 1)
    return convertResult;
  } else {
    return data;
  }
}

function array(url, params, token) {
  return new Promise((resolve) => {
    if (token) {
      let cooking = {
        hdid: store.state.user.userInfo.hdid,
        uid: store.state.user.userInfo.uid
      }
      params = Object.assign(cooking, params);
    }
    axios.post(baseURL + url, convertData(params))
      .then(res => {
        // console.log(res.data)
        resolve(res.data)
        iView.LoadingBar.finish()
      })
      .catch(error => {
        iView.LoadingBar.finish()
        iView.Notice.info({
          title: '请求失败',
          desc: '网络异常'
        });
      });
  })
}

function code(success, error) {
  axios({
    url: baseURL + '/Public/verify.php',
    responseType: 'arraybuffer',
    codeImg: true,
  }).then(res => {
    console.log(res)
    success(res.data)
  }).catch(res => {
    console.log(res)
  })
}

export default {
  post: post,
  code: code,
  array: array,
  baseURL:baseURL
}
