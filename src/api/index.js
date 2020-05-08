import axios from '@/lib/axios'
import user from '@/store'
// 数组去重
function unique(arr) {
  if (!Array.isArray(arr)) {
      return
  }
  var array = [];
  for (var i = 0; i < arr.length; i++) {
      if (array .indexOf(arr[i]) === -1) {
          array .push(arr[i])
      }
  }
  return array;
}
export{unique}
// 验证码
export const code = (data) => {
  return axios.post('/NewA/Login', data);
}
// 登录
export const login = (data) => {
  return axios.post('/Home/Login/index', data);
}
// 用户金额
export const money = (data) => {
  return axios.post('/Home/Index/get_amt?hdid=' + user.state.user.userInfo.hdid, '',true);
}
// 首页信息
export const home = (data) => {
  return axios.post('/Home/Index/index', data,true);
}
// 首页商品信息
export const homeGoods = (get) => {
  return axios.post('/Home/Index/get_rec?cate=' + get.cate, "",true);
}
// 购物车信息
export const cartData = (data) => {
  return axios.post('/Home/Cart/get_cart_list?hdid=' + user.state.user.userInfo.hdid, data,true);
}
// 提交商品数量
export const subGood = (data, get) => {
  return axios.post('/Home/Cart/addCart?sn=' + get.code + "&num=" + get.value, data, true);
}
// 提交秒杀商品数量
export const subMs = (data, get) => {
  return axios.post('/Home/Promotion/addCart?sn=' + get.code + "&num=" + get.value, data, true);
}
// 提交预售商品数量
export const addPresell = (data, get) => {
  return axios.post('/Home/Cart/addPresell?sn=' + get.code + "&num=" + get.value, data, true);
}
// 购物车列表
export const cartList = (data) => {
  return axios.post('/Home/Cart/index', data, true);
}
// 修改购物车商品数量
export const cartUpdate = (get) => {
  return axios.post('/Home/Cart/changenum?sn=' + get.code + "&num=" + get.value, "", true);
}
// 删除购物车商品数量
export const delGoods = (get) => {
  return axios.post('/Home/Cart/delGoods?sn=' + get.code, "", true);
}
// 删除购物车全部商品
export const allDelGoods = (data) => {
  return axios.post('/Home/Cart/clear?uid=' + user.state.user.userInfo.uid, data)
}
// 提交购物车
export const jiesuan = (data) => {
  return axios.post('/Home/Cart/jiesuan', data, true)
}
// 提交购物车成功
export const cartSuc = (data) => {
  return axios.post('/Home/Order/success', data, true)
}
// 商品分类
export const menu = (data) => {
  return axios.post('/Home/Public/get_menu', data)
}
// 商品分类详情
export const category = (get) => {
  return axios.post('/Home/Category/index?cls=' + get.cls + "&p=" + get.p + "&max_price=" + get.max_price + "&min_price=" + get.min_price, "", true)
}
// 新品上线
export const newGoods = (get) => {
  return axios.post('/Home/Category/new_goods?cls=' + get.cls  + "&max_price=" + get.max_price + "&min_price=" + get.min_price, "", true)
}
// 补货
export const buGoods = (get) => {
  return axios.post('/Home/Category/bu_goods?cls=' + get.cls  + "&max_price=" + get.max_price + "&min_price=" + get.min_price, "", true)
}
// 爆款
export const saleGoods = (get) => {
  return axios.post('/Home/Category/get_province_sale', "", true)
}
// 店铺畅销
export const newShops = (get) => {
  return axios.post('/Home/Category/get_sale?p=' + get.p, "", true)
}
// 搜索商品
export const search = (get) => {
  return axios.post('/Home/Category/search?ser_key=' + get.ser_key, "", true)
}
// 商品详情
export const goodData = (get) => {
  return axios.post('/Home/Goods/index?id=' + get.id, "", true)
}
// 公告详情
export const articles = (get) => {
  return axios.post('/Home/Article/show?id=' + get.id, "")
}
// 未完成订单
export const orderUn = (get) => {
  return axios.post('/Home/Order/order_list?p=' + get.p, "", true)
}
// 预售订单
export const presell_list = (get) => {
  return axios.post('/Home/Order/presell_list?p=' + get.p, "", true)
}
// 已完成订单
export const orderHd = (get) => {
  return axios.post('/Home/Order/trans_list?p=' + get.p, "", true)
}
// 订单详情
export const orderView = (get) => {
  return axios.post('/Home/Order/order_view?sn=' + get.sn, "", true)
}
// 添加售后商品信息
export const getItemInfo = (get) => {
  return axios.post('/Home/User/getItemInfo?item_no=' + get.sn, "")
}
// 提交售后商品
export const saleAdd = (data) => {
  return axios.array('/Home/User/shouhou_add', data, true)
}
// 提交售后列表
export const saleList = (get) => {
  return axios.post('/Home/User/shouhou?p=' + get.p, "", true)
}
// 提交售后详情
export const saleView = (get) => {
  return axios.post('/Home/User/shouhou_view?mid=' + get.mid, "", true)
}
// 提交售后详情
export const saleDel = (get) => {
  return axios.post('/Home/User/shouhou_del?id=' + get.mid, "", true)
}
// 提交物流列表
export const sh_express = (data) => {
  return axios.post('/Home/User/sh_express', data, true)
}

// 添加物流列表
export const sh_express_add = (data) => {
  return axios.array('/Home/User/sh_express_add', data, true)
}

// 获取物流列表
export const sh_express_list = (get) => {
  return axios.post('/Home/User/sh_express_list?p=' + get.p, "", true)
}

// 获取物流详情
export const sh_express_view = (get) => {
  return axios.post('/Home/User/sh_express_view?mid=' + get.mid, "", true)
}
// 预售
export const ruizi_live = (data) => {
  return axios.post("/Home/Presell/index", data, true)
}
// 一件起订
export const PromotionMin = (get) => {
  return axios.post("/Home/Promotion/min?cls=" + get.cls + "&p=" + get.p + "&max_price=" + get.max_price + "&min_price=" + get.min_price, "", true)
}
// 一折抢购
export const discountOff = (get) => {
  return axios.post("/Home/Promotion/discount?off="+get.off+"&cls=" + get.cls  + "&max_price=" + get.max_price + "&min_price=" + get.min_price, "", true)
}
// IP
export const get_ip = (get) => {
  return axios.post("/Home/Index/get_ip", "", true)
}

// 获取签到记录
export const sign_record = (data) => {
  return axios.post("/Home/Index/sign_record", data, true)
}

// 点击签到
export const user_sign = (data) => {
  return axios.post("/Home/Index/user_sign", data, true)
}


// 领取优惠券
export const sign_coupon = (data) => {
  return axios.post("/Home/Index/sign_coupon", "", true)
}

// 天天特价
export const everyday = (data) => {
  return axios.post("/Home/Promotion/discount/off/everyday", "", true)
}

// 首页新品
export const new_goods = (data) => {
  return axios.post("/Home/Index/new_goods", "", true)
}
// 首页爆款
export const get_hot = (data) => {
  return axios.post("/Home/Index/get_hot", "", true)
}
// 首页优惠券
export const show_coupon = (data) => {
  return axios.post("/Home/Index/show_coupon", "", true)
}
// 首页新品
export const get_coupon = (data) => {
  return axios.post("/Home/Index/get_coupon", data, true)
}
// 今日必抢
export const get_mustbuymust = (data) => {
  return axios.post("/Home/Index/get_mustbuymust", "", true)
}
// 今日必抢更多详情
export const get_mustbuy = (get) => {
  return axios.post("/Home/Category/get_mustbuy", "", true)
}
// 个人中心-优惠券
export const user_Coupon = (get) => {
  return axios.post("/Home/Coupon/index?status="+get.status,"", true)
}
// 秒杀
export const seckill = (get) => {
  return axios.post("/Home/Promotion/miaosha?tid="+get.tid,"", true)
}
// 直播
export const specialData = (data) => {
  return axios.post("/Home/special/index/hd_title/live", "", true)
}

