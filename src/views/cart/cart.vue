<template>
  <div class="cart">
    <div class="box">
      <div class="navBor">
        <menus :list="menuList" :url="menuURL" v-if="menuList"></menus>
        <div class="dis" v-if="list.length!=0 && coupon.c>0">
          <Select v-model="hb" :placeholder="+coupon.c+'个可用，最高减'+coupon.money+'元'" v-if="coupon.c>0" @on-change="bindSelet">
            <!-- <Option value="请选择">请选择</Option> -->
            <Option v-for="(item,index) in coupon_list" :value="index" :key="index" :label="'选中 ￥'+item.money+'元'">
              <div class="coupon_item">
                <div>￥{{ item.money }}</div>
                <div>{{item.expire_time+'前使用'}}</div>
              </div>
            </Option>
          </Select>
          <img src="@/assets/images/money.png" alt="" srcset="" class="money">
        </div>
      </div>
      <!-- 购物车导入 -->
      <div style="padding:1px">
        <div class="cart_Goods">
          <!-- 商品分类 -->
          <div class="cart_left" v-if="list.length!=0">
            <div class="caert_content">
              <div class="cart_left_title m_text18">分类结算</div>
              <div class="cart_left_text m_text14 cursor" :class="[cateNavIndex==null?'cart_left_active':'']" @click="bindCateNav(null,'')">
                <span>全部</span><span>￥{{allMoney}}</span>
              </div>
              <div class="cart_left_text m_text14 cursor" :class="[cateNavIndex==index?'cart_left_active':'']" v-for="(item,index) in cateNav"
                :key="index" @click="bindCateNav(index,item)">
                <span>{{item.title?item.title:item.huodong_name}}</span><span>￥{{item.amt}}</span>
              </div>
            </div>
          </div>
          <div :class="[list.length==0?'cateTable1':'cateTable2']">
            <div class="tableHeard">
              <div class="table_Heard_left">
                购物车中共<em class="cc1">&nbsp;{{info.sptyp}}&nbsp;</em>款商品 共<em class="cc1">&nbsp;{{info.spnum}}&nbsp;</em>件
                <span style="margin-left:20px">总额<span class="cc1">&nbsp;¥{{info.money}}&nbsp;</span> <span class="x-ling"
                    v-if="info.ling && info.ling!=info.money">¥{{info.ling}}</span>元</span>
                <span v-if="hb!=null" class="cc1">，红包优惠：<span>¥&nbsp;{{coupon_list[hb].money}}</span></span>
              </div>
              <div class="table_Heard_right">
                <div class="table_Heard_hr m_text14 cursor" @click="ImportModal=true" title="商品快速导入购物车">导入</div>
                <Poptip confirm title="确定要清空全部商品吗?" @on-ok="allDel">
                  <div class="m_text14 cursor">清空</div>
                </Poptip>
              </div>
            </div>
            <Table :columns="columns" :data="list" v-if="list" ref="selection" @on-select-all="selectAll" @on-selection-change="changeSelect"></Table>
            <div class="page" v-if="total>20">
              <Page :total="total" :page-size="pageSize" show-elevator show-total @on-change="changePage" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  :class="navBarFixed? 'navBarWrap' :''" -->
    <div class="tableBto" ref="tableBto" :class="navBarFixed? 'navBarWrap' :''">
      <div class="comm_box">
        <div class="left">
          <Poptip confirm title="确定要清空全部商品吗?" @on-ok="allDel">
            <div class="m_text14">清空</div>
          </Poptip>
          <div class="m_text14 f1" @click="ImportModal=true" title="商品快速导入购物车">导入</div>
        </div>
        <div class="right">
          <div class="sc-total-price">
            <div class="all">
              <label>总计：</label>
              <span class="cc1">¥&nbsp; <span class="m_text18">{{info.money}}&nbsp;&nbsp;</span></span>
              <span class="x-ling" v-if="info.ling && info.ling!=info.money">¥&nbsp; {{info.ling}}</span>
            </div>
            <div class="total-choose">
              已选择
              <em>&nbsp;{{info.sptyp}}&nbsp;</em>款
              <span v-if="info.spnum"><em>&nbsp;{{info.spnum}}&nbsp;</em>件商品</span>
              <span v-if="info.sq">，折扣优惠：<span>¥&nbsp;{{info.sq}}</span></span>
              <span v-if="hb!=null" class="cc1">，红包优惠：¥&nbsp;{{coupon_list[hb].money}}</span>
            </div>
          </div>
          <div class="close cursor" @click="submit()">立即结算</div>
        </div>
      </div>
    </div>

    <!-- 购物车导入模块 -->
    <Modal v-model="ImportModal" transfer :mask-closable="false" title="购物车导入" @on-ok="ImportReady" @on-cancel="ImportModal=false" :loading="true"
      :footer-hide="isFooter" class="import_cart">
      <Input v-model="importValue" type="textarea" :rows="26" placeholder="请输入商品条码，数量" v-if="isShowInput" />
      <ul v-else class="import_result">
        <li v-for="(item,index) in importArr" :key="index">
          <span>
            {{item.code}}
            <Icon :type="item.icon" :color="item.icon==='md-close' ? 'red' : '#336a83'" />
          </span>
          <p class="import_right">{{item.tip}}</p>
        </li>
      </ul>
      <div v-if="isResult" class="export_result">
        <p>温馨提示：一共有<span> {{canImport.length}} </span>款商品导入成功，<span> {{noCanImport.length}} </span>款商品导入失败。</p>
      </div>
    </Modal>
  </div>
</template>
<script>
import numberbox from "@/components/number-box/number-box.vue";
import downTime from "@/components/downTime/downTime.vue";
import menus from "@/components/menu/menu.vue";
import user from "@/store";
import {
  cartData,
  subGood,
  cartUpdata,
  cartUpdate,
  delGoods,
  allDelGoods,
  jiesuan
} from "@/api";
import { cartList } from "@/api";
export default {
  components: {
    numberbox,
    downTime,
    menus
  },
  data() {
    return {
      info: [], //商品信息
      // 总金额
      allMoney:0,
      url: require("@/assets/images/djsTime.png"),
      show: false,
      single: false,
      columns: [
        // {
        //   type: "selection",
        //   width: 60,
        //   align: "center"
        // },
        {
          title: "商品",
          key: "item_name",
          align: "center",
          width: "350px",
          render: (h, { row }) => {
            return (
              <div class="tdBorder goods">
                <img
                  src={row.image}
                  alt=""
                  srcset=""
                  class="tdImg" 
                  onClick={() => this.navDetails(row)}                
                />
                <div class="card">
                  <div class="m_text14 text-hide2 goods-title" onClick={() => this.navDetails(row)}>{row.item_name}</div>
                  <div class="m_text14 code" onClick={() => this.navDetails(row)}>{row.item_no}</div>
                  <div class="time m_text14">
                    <img src={this.url} alt="" srcset="" class="tdImgTime" />
                    <downTime
                      day={row.time.day}
                      hour={row.time.hour}
                      minute={row.time.min}
                      second={row.time.second}
                    ></downTime>
                  </div>
                </div>
              </div>
            );
          }
        },

        // {
        //   title: "规格",
        //   key: "spec",
        //   align: "center",
        //   render: (h, { row }) => {
        //     return (
        //       <div class="tdBorder m_text14" style="justify-content: center">
        //         {row.spec}
        //       </div>
        //     );
        //   }
        // },
        {
          title: "单价",
          key: "price",
          align: "center",
          render: (h, { row }) => {
            return (
              <div
                class="tdBorder"
                style="justify-content: center;flex-direction: column;"
              >
                <div title="批发价" class="m_text14">
                  ￥{row.price}
                </div>
                {row.price != row.org_price && (
                  <em class="x-ling ling m_text14" title="销售价">
                    ￥{row.org_price}
                  </em>
                )}
              </div>
            );
          }
        },
        {
          title: "数量",
          key: "num",
          align: "center",
          width: "150",
          render: (h, { row }) => {
            return (
              <div class="tdBorder m_text14" style="justify-content: center;">
                <numberbox
                  ButtonShow={this.show}
                  value={row.num}
                  step={row.spec}
                  min={row.spec}
                  code={row.item_no}
                  type={true}
                  url="cart"
                  on-cartLoad={() => this.upData()}
                ></numberbox>
              </div>
            );
          }
        },
        {
          title: "小计",
          key: "org_xj",
          align: "center",
          render: (h, { row }) => {
            return (
              <div class="tdBorder" style="justify-content: center;flex-direction: column;" >
                <div class="org m_text14" title="批发价">{row.xj}</div>
                {row.xj != row.org_xj && (
                  <em class="x-ling ling m_text14" title="销售价">
                    ￥{row.org_xj}
                  </em>
                )}
              </div>
              
            );
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, { row }) => {
            return (
              <div
                class="tdBorder"
                style="justify-content: center; border-right: solid 1px #e6e6e6;"
              >
                <Poptip
                  confirm={true}
                  transfer={true}
                  placement="top"
                  title="确定要删除该商品吗?"
                  on-on-ok={() => this.deleteOrder(row)}
                >
                  <div class="cursor">删除</div>
                </Poptip>
              </div>
            );
          }
        }
      ],
      select: [],
      total: null, //商品总件数
      current: 1, //当前页
      navBarFixed: true, //判断底部结算定位
      windowTop: null,
      list: [],  //当前展示商品列表
      inlist:[], //原始商品列表
      menuURL: "cart",
      menuList: [
        {
          title: "网站首页",
          url: ""
        },
        {
          title: "购物车 (提示：24小时未提交自动删除！！！)"
        }
      ],
      ImportModal: false, // 是否显示商品导入弹窗
      importArr: [], // 购物车商品导入返回结果数据
      isResult: false, // 是否显示商品导入结果条数提示
      canImport: [], // 可以导入的商品数据
      noCanImport: [], // 不可以导入的商品数据
      isShowInput: true, // 是否显示导入输入框
      importValue: "", // 要导入的商品数据
      allImport: [], // 购物车商品要导入的数据
      isFooter: false, // 是否显示导入弹窗的底部
      coupon_list: [],
      hb: null,
      coupon: null,
      cateNav: [],
      cateNavIndex: null,
      cls: null,
      total: 0,
      // 所有页面的数据
      totalPage: [],
      // 每页显示数量
      pageSize: 100,
      // 共几页
      pageNum: 1,
      // 当前显示的数据
      dataShow: "",
      // 默认当前显示第一页
      currentPage: 0,
      //选择红包索引
      sIndex: null
    };
  },
  watch: {
    ImportModal(val, oldVal) {
      if (!val) {
        this.importArr = [];
        this.importValue = "";
        this.isResult = false;
        this.canImport = [];
        this.noCanImport = [];
        this.isFooter = false;
        this.isShowInput = true;
      }
    }
  },
  mounted() {
    this.loadData();
    window.addEventListener("scroll", this.watchScroll);
  },
  methods: {
    handleSelectAll() {
      this.single = !this.single;
      this.$refs.selection.selectAll(this.single);
    },

    selectAll(e) {
      this.single = true;
      this.select = e;
    },
    changeSelect(e) {
      if (e.length == this.list.length) {
        this.single = true;
      } else {
        this.single = false;
      }
      this.select = e;
    },
    /**
     *功能：加载数据
     *时间：2020年01月13日 14:10:25
     *作者：钟婉婷
     */
    loadData() {
      let that = this;
      cartList({
        cart_times: 86400
      }).then(res => {
        let list = this.$xm.goodsFor(res.list, 300);
        list.forEach(item => {
          item.num = Number(item.num);
          item.time = this.formatSeconds(item.addtime);
        });
        var inlist=res.list;
        this.inlist=inlist;
        this.coupon_list = res.coupon_list;
        this.coupon = res.coupon;
        this.cateNav = res.hd_list.concat(res.cate);
        this.allMoney=res.spprice
        this.info = {
          money: res.spprice, //实付金额
          money_s: res.spprice, //实付2金额
          sq: res.shengqian, //折扣金额
          ling: res.org_amt, //原价金额
          ling_s: res.org_amt, //原价2金额
          sptyp: res.sptyp, //商品款数
          spnum: res.spnum //商品件数
        };
        // 根据后台数据的条数和每页显示数量算出一共几页,得0时设为1 ;
        this.total = res.list.length;
        this.pageNum = Math.ceil(list.length / this.pageSize) || 1;
        for (let i = 0; i < this.pageNum; i++) {
          this.totalPage[i] = list.slice(
            this.pageSize * i,
            this.pageSize * (i + 1)
          );
        }
        this.list = this.totalPage[this.currentPage];
        this.showFotter();
      });
    },
    formatSeconds(value) {
      let result = parseInt(value);
      let h = Math.floor(result / 3600);
      let m = Math.floor((result / 60) % 60);
      let s = Math.floor(result % 60);
      let time = {
        day: 0,
        hour: h,
        min: m,
        second: s
      };
      return time;
    },
    navDetails(code) {
      const { href } = this.$router.resolve({
        name: "details",
        query: {
          code: code.item_no
        }
      });
      window.open(href, "_blank");
    },
    // 时间差
    timeDifference(endTime) {
      var oDate1 = new Date();
      var oDate2 = new Date(endTime);
      var s1 = oDate1.getTime(),
        s2 = oDate2.getTime();
      var total = (s2 - s1) / 1000;
      var day = parseInt(total / (24 * 60 * 60)); //计算整数天数
      var afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数
      var hour = parseInt(afterDay / (60 * 60)); //计算整数小时数
      var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数
      var min = parseInt(afterHour / 60); //计算整数分
      var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //取得算出分后剩余的秒数
      let time = {
        day: day,
        hour: hour,
        min: min,
        second: afterMin
      };
      return time;
    },
    /**
     *功能：选中红包
     *时间：2020年05月01日 15:42:30
     *作者：钟婉婷
     */
    bindSelet(e) {
      console.log(e);
      this.sIndex = e;
      let money = this.info.money_s
        ? this.info.money_s - Number(this.coupon_list[e].money)
        : "";
      this.info.money = money ? money.toFixed(2) : ""; //实付金额
      let ling = this.info.ling_s
        ? this.info.ling_s + Number(this.coupon_list[e].money)
        : "";
      this.info.ling = ling ? ling.toFixed(2) : ""; //原价
    },
    // 分页
    changePage(e) {
      this.currentPage = e - 1;
      this.list = this.totalPage[this.currentPage];
    },
    // 获取滚动条当前的位置
    getScrollTop() {
      let scrollTop = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop;
      }
      return scrollTop;
    },
    // 获取当前可视范围的高度
    getClientHeight() {
      let clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
      } else {
        clientHeight = Math.max(
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
      }
      return clientHeight;
    },

    // 获取文档完整的高度
    getScrollHeight() {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
    },
    /**
     *功能：获取高度
     *时间：2020年01月06日 11:21:02
     *作者：钟婉婷
     */
    watchScroll() {
      // var scrollTop =
      //   window.pageYOffset ||
      //   document.documentElement.scrollTop ||
      //   document.body.scrollTop;
      // if (scrollTop > 222) {
      //   this.navBarFixed = true;
      // } else {
      //   this.navBarFixed = false;
      // }
      let scrollBottom = this.getScrollHeight() - this.getClientHeight() - this.getScrollTop();
      setTimeout(() => {
        if (scrollBottom <= 560) {
          this.navBarFixed = false;
        } else {
          if (!this.navBarFixed) {
            this.navBarFixed = true;
          }
        }
      }, 300);
    },
    showFotter() {
      if (this.list.length < 5) {
        this.navBarFixed = false;
      }
    },
    /**
     *功能：删除商品
     *时间：2020年04月21日 10:20:10
     *作者：钟婉婷
     */
    deleteOrder(row) {
      let data = {
        code: row.item_no
      };
      delGoods(data).then(res => {
        if (res.result == "success") {
          this.$Message.success("删除成功");          
          if(this.cateNavIndex || this.cateNavIndex==0){
            let goods=[],spnum = 0     //总款式
            if (row.huodong) {
              this.list.forEach(item=>{
                if(item.item_no!==row.item_no){
                  goods.push(item)
                }
              })
            }
            goods.forEach(item => {
              item.num = Number(item.num);
              item.time = this.formatSeconds(item.addtime);
              spnum += item.num;     
            });
            
            let arry = this.$xm.goodsFor(goods, 300);
            this.total = arry.length;
            this.pageNum = Math.ceil(arry.length / this.pageSize) || 1;
            for (let i = 0; i < this.pageNum; i++) {
              this.totalPage[i] = arry.slice(
                this.pageSize * i,
                this.pageSize * (i + 1)
              );
            }
            this.list = this.totalPage[this.currentPage];
            let totalMoney=0,amtMoney=0;
            this.list.forEach(ele=>{
              ele.org_xj=Number(ele.org_xj);
              ele.xj=Number(ele.xj);
              totalMoney+=ele.org_xj;
              amtMoney+=ele.xj;
            })
            amtMoney=amtMoney.toFixed(2);
            if(this.list.length==0){
              this.cateNavIndex=null;
              this.loadData();
            }else{
              this.cls = row.cls ? row.cls : row.huodong;
              this.info = {
                money: amtMoney,
                money_s: amtMoney,
                sq: "",
                ling: totalMoney.toFixed(2),
                sptyp: goods.length,
                spnum: spnum
              };
            }           
          }else{
            this.loadData();
          }
          
          this.$store.dispatch("update");
        }
      });
    },
    /**
     *功能：更新购物车
     *时间：2020年05月02日 17:03:13
     *作者：钟婉婷
     */
    upData() {
      if (this.cateNavIndex) {
        cartList({
          cart_times: 86400
        }).then(res => {
          this.cateNav = res.hd_list.concat(res.cate);
          this.bindCateNav(this.cateNavIndex, this.cateNav[this.cateNavIndex]);
        });
      } else {
        this.loadData();
      }
    },
    /**
     *功能：切换商品分类
     *时间：2020年05月01日 17:06:04
     *作者：钟婉婷
     */
    bindCateNav(index, item) {
      //选择索引
      this.cateNavIndex = index;
      if(this.cateNavIndex==null){
        this.loadData();
      }else{
        let goods=[],  //展示商品列表
        spnum = 0     //总款式
        //判断是否为活动or商品分类
        if (item.huodong) {
          this.inlist.forEach(row=>{
            if(item.huodong==row.huodong){
              goods.push(row)
            }
          })
        } else {
          goods = item.goods;
        }
        goods.forEach(row => {
          row.num = Number(row.num);
          row.time = this.formatSeconds(row.addtime);
          spnum += row.num;
        });
        let arry = this.$xm.goodsFor(goods, 300);
        this.total = arry.length;
        this.pageNum = Math.ceil(arry.length / this.pageSize) || 1;
        for (let i = 0; i < this.pageNum; i++) {
          this.totalPage[i] = arry.slice(
            this.pageSize * i,
            this.pageSize * (i + 1)
          );
        }
        this.list = this.totalPage[this.currentPage];
        this.cls = item.cls ? item.cls : item.huodong;
        this.info = {
          money: item.amt,
          money_s: item.amt,
          sq: "",
          ling: "",
          sptyp: goods.length,
          spnum: spnum
        };
        if (this.sIndex != null) {
          this.bindSelet(this.sIndex);
        }
        this.showFotter();
      }
     
    },
    /**
     *功能：全部删除
     *时间：2020年04月21日 10:29:52
     *作者：钟婉婷
     */
    allDel() {
      allDelGoods().then(res => {
        this.$Message.success("删除成功");
        this.loadData();
        this.$store.dispatch("update");
      });
    },
    /**
     *功能：提交购物车
     *时间：2020年04月21日 11:12:41
     *作者：钟婉婷
     */
    submit() {
      let params = {
        uname: user.state.user.userInfo.uname
      };
      if (this.cls!=null) {
        params.cls = this.cls;
      }      
      if (this.sIndex!=null) {
        params.coupon_id = this.coupon_list[this.sIndex].id;
      }
      console.log(params);
      jiesuan(params).then(res => {
        if (res) {
          this.$router.push({
            path: "success",
            query: {
              key: res
            }
          });
          this.$Message.success("提交成功");
          this.loadData();
          this.$store.dispatch("update");
        }
      });
    },
    /**
     * 购物车提交商品导入准备工作
     */
    ImportReady() {
      this.allImport = this.$xm.transformArrTo(
        this.importValue
          .trim()
          .replace(/[\r\n]/g, ",")
          .split(",")
      );
      this.allImport.forEach(ele => {
        switch (ele[1]) {
          case "0":
            this.importArr.push({
              code: ele[0],
              tip: "商品数量不能为0",
              icon: "md-close"
            });
            this.noCanImport.push(ele[0]);
            break;
          case "":
            this.importArr.push({
              code: ele[0],
              tip: "商品数量不能为空",
              icon: "md-close"
            });
            this.noCanImport.push(ele[0]);
            break;
          default:
            this.ImportQuery(ele);
            break;
        }
      });
    },
    /**
     * 购物车商品导入提交请求
     */
    ImportQuery(ele) {
      this.isShowInput = false;
      let data = {
        code: ele[0],
        value: ele[1]
      };
      let that = this;
      subGood({ max_buy: 40 }, data).then(res => {
        let result = res.result;
        switch (result) {
          case "success":
            that.importArr.push({
              code: ele[0],
              tip: "导入成功",
              icon: "md-checkbox"
            });
            this.canImport.push(ele[0]);
            break;
          case "error":
            that.importArr.push({
              code: ele[0],
              tip: res.msg,
              icon: "md-close"
            });
            this.noCanImport.push(ele[0]);
            break;
        }
        let canLen = that.canImport.length;
        let noCanLen = that.noCanImport.length;
        let allLen = that.allImport.length;
        /* console.log(canLen, '可以导入')
            console.log(noCanLen, '不可以导入')
            console.log(allLen, '全部需要导入') */
        if (canLen + noCanLen === allLen) {
          this.$store.dispatch("update");
          that.isResult = true;
          this.isFooter = true;
          this.loadData();
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@media (min-width: 1200px) {
  @import "index.less";
}
@media (max-width: 1200px) {
  @import "w1200.less";
}

/deep/ .ivu-select-not-found li {
  font-size: 14px;
}

/deep/ .tdImg {
  cursor: pointer;
  width: 80px;
  height: 80px;
  margin-right: 20px;
}

/deep/ .uni-countdown {
  padding: 0 !important;
}
/deep/.uni-countdown__splitor {
  justify-content: center;
  line-height: 22px;
  padding: 0 2px;
  font-size: 14px;
}

/deep/.uni-countdown__number {
  line-height: 28px;
  justify-content: center;
  height: 28px;
  width: 28px;
  font-size: 16px;
  border-radius: 3px;
  border: 1px solid #000;
  margin: 0 2px;
  text-align: center;
  padding: 0 !important;
}

/deep/ .ivu-modal-body {
  height: 600px !important;
}
.import_cart {
  user-select: none;
  ul {
    height: 500px;
    overflow: auto;
  }
  li {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    font-size: 15px;
    .import_right {
      margin-right: 10px;
      background: #eee;
      border-radius: 4px;
      padding: 0px 10px;
      display: flex;
      justify-content: flex-start;
    }
  }
  .export_result {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    border-top: 1px solid #eee;
    left: 0;
    right: 0;
    height: 80px;
    align-items: center;
    p {
      span {
        color: #7b302c;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
  // /deep/ .tableBoder{
  //   border: 1px solid red;
  //   padding: 10px;
  // }
}
</style>
