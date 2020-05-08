<template>
  <div class="cart">
    <div class="box">
      <menus :list="menuList" :url="menuURL" v-if="menuList"></menus>
      <div style="padding:1px">
        <Table :columns="columns" :data="list" v-if="list"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;" v-if="total">
            <Page :total="total" :current="current" :page-size="pageSize" @on-change="changePage"></Page>
          </div>
        </div>
      </div>
      <div class="tableBto" :class="navBarFixed? 'navBarWrap' :''" ref="tableBto">
        <div class="left">
          <Poptip confirm title="确定要清空全部商品吗?" @on-ok="allDel">
            全部删除
          </Poptip>
        </div>

        <div class="right">
          <div class="sc-total-price">
            <div class="all m_text16">
              <label>总计：</label>
              <span>¥&nbsp; {{info.money}}&nbsp;</span>
              <span class="x-ling ">¥&nbsp; {{info.ling}}</span>
            </div>
            <div class="total-choose m_text16">
              已选择
              <em>&nbsp;{{info.sptyp}}&nbsp;</em>款<em>&nbsp;{{info.spnum}}&nbsp;</em>件商品，优惠：
              <span>¥&nbsp;{{info.sq}}</span>
            </div>
          </div>
          <div class="close cursor" @click="submit()">立即结算</div>
        </div>
      </div>
    </div>
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
      info: [], //商品列表
      columns: [
        {
          title: "商品",
          key: "item_name",
          align: "center",
          width: "250px",
          render: (h, { row }) => {
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  "align-items": "center",
                  "text-align": "left",
                  // "border-left": "1px solid #e6e6e6"
                }
              },
              [
                h("img", {
                  style: {
                    cursor: "pointer",
                    width: "80px",
                    height: "80px",
                    margin: "0 20px"
                  },
                  attrs: {
                    //设置属性
                    src: row.image ? row.image : ""
                  },
                  domProps: {
                    title: row.image ? this.image : ""
                  },
                  on: {
                    click: () => {
                      window.open(row.image);
                    }
                  }
                }),
                h("div", {
                  domProps: {
                    innerHTML: row.item_name
                  }
                })
              ]
            );
          }
        },
        {
          title: "条码",
          key: "item_no",
          align: "center",
          width: "200"
        },
        {
          title: "规格",
          key: "spec",
          align: "center"
        },
        {
          title: "单价",
          key: "price",
          align: "center",
          render: (h, { row }) => {
            // 鼠标经过有提示
            return h("div", [
              h(
                "div",
                {
                  style: {
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  domProps: {
                    title: "现单价"
                  }
                },
                `￥${row.price}`
              ),
              h(
                "div",
                {
                  style: {
                    "text-decoration": "line-through",
                    color: "#ccc",
                    fontSize: "14px",
                    marginTop: "-3px"
                  },
                  domProps: {
                    title: "原单价"
                  }
                },
                `￥${row.org_price}`
              )
            ]);
          }
        },
        {
          title: "数量",
          key: "num",
          align: "center",
          render: (h, { row }) => {
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  "justify-content": "center",
                  "align-items": "center",
                  height: "120px",
                  "line-height": "120px"
                }
              },
              [
                h(numberbox, {
                  props: {
                    value: Number(row.num),
                    step: Number(row.spec),
                    min: Number(row.spec),
                    code: row.item_no,
                    type: true,
                    url: "cart",
                    ButtonShow: false
                  },
                  on: {
                    cartLoad: () => {
                      this.loadData();
                    }
                  }
                })
              ]
            );
          }
        },

        {
          title: "小计",
          key: "org_xj",
          align: "center"
        },
        {
          title: "倒计时",
          key: "time",
          width: "200px",
          align: "center",
          render: (h, { row }) => {
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  "justify-content": "center",
                  "align-items": "center",
                  height: "120px",
                  "line-height": "120px"
                }
              },
              [
                h(downTime, {
                  props: {
                    day: row.time.day,
                    hour: row.time.hour,
                    minute: row.time.min,
                    second: row.time.second,
                    "show-colon": false
                  },
                  on: {}
                })
              ]
            );
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, { row }) => {
            return h(
              "div",
              {
                style: {
                  // "border-right": "1px solid #e6e6e6"
                }
              },
              [
                h("span", [
                  h(
                    "Poptip",
                    {
                      class: "handle",
                      props: {
                        confirm: true,
                        transfer: true,
                        placement: "top",
                        title: "确定要删除该商品吗 ?",
                        type: "error",
                        size: "small",
                        width: "150",
                        vModel: true
                      },
                      domProps: {
                        title: "删除订单"
                      },
                      style: {
                        cursor: "pointer"
                      },
                      on: {
                        "on-ok": () => {
                          // 确定删除
                          this.deleteOrder(row);
                        }
                      }
                    },
                    [
                      h("div", {
                        domProps: {
                          innerHTML: "删除"
                        }
                      })
                      // h("Icon", {
                      //   props: {
                      //     type: "ios-trash",
                      //     size: "26",
                      //     color: "#333"
                      //   },
                      //   class: "delete"
                      // })
                    ]
                  )
                ])
              ]
            );
          }
        }
      ],
      total: null, //商品总件数
      current: 1, //当前页
      pageSize:100,
      navBarFixed: false, //判断底部结算定位
      windowTop: null,
      list: [],
      menuURL: "cart",
      menuList: [
        {
          title: "网站首页",
          url: ""
        },
        {
          title: "购物车 (提示：24小时未提交自动删除！！！)"
        }
      ]
    };
  },
  mounted() {
    this.loadData();
    window.addEventListener("scroll", this.watchScroll);
  },
  methods: {
    /**
     *功能：加载数据
     *时间：2020年01月13日 14:10:25
     *作者：钟婉婷
     */
    loadData() {
      let that = this;
      //  if (res.list[i].addtime < 54000) {
      // var shi = parseInt(res.list[i].addtime / 3600);
      // var fen = parseInt(res.list[i].addtime % 3600/60);
      cartList({
        cart_times: 86400
      }).then(res => {
        let list = this.$xm.goodsFor(res.list, 300);
        list.forEach(item => {
          var shi = parseInt(item.addtime / 3600);
          var fen = parseInt((item.addtime % 3600) / 60);
          item.time = {
            day: 0,
            hour: shi,
            min: fen,
            second: 0
          };
        });
        this.list = list;
        this.info = {
          money: res.spprice,
          sq: res.shengqian,
          ling: res.org_amt,
          sptyp: res.sptyp,
          spnum: res.spnum
        };
      });
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
    // 分页
    changePage(e) {
      this.current = e;
      this.loadData();
    },
    /**
     *功能：获取高度
     *时间：2020年01月06日 11:21:02
     *作者：钟婉婷
     */

    watchScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 222) {
        this.navBarFixed = true;
      } else {
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
          this.loadData();
          this.$store.dispatch("update");
        }
      });
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
      jiesuan({
        uname: user.state.user.userInfo.uname
      }).then(res => {
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
</style>
