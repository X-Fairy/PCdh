<template>
  <div class="header">
    <!-- 标签 -->
    <div class="top">
      <div class="box" style="position:relative">
        <div class="card" style="position:relative">
          <div class="left m_text14">
            我们每天向全球消费者传递快乐和惊喜!
            <!-- <span class="mediaC">测试</span> -->
          </div>
          <div class="right">
            <div v-for="(item,index) in tipList" :key="index" class="right-item" style="position:relative">
              <div class="r-info cursor" @mouseenter="enterNavbor(item.id)" @mouseleave="leaveNavbor(item.id)" @click="navGo(index)">
                <div v-if="item.id==1" class="m_text15">{{item.status?"尊敬的客户："+item.data:'请登录'}}</div>
                <div v-if="item.name" class="m_text15">{{item.name}}</div>
                <div v-if="item.value" class="active m_text15 right-item-value">{{item.status?"￥"+item.data:item.value}}</div>
              </div>
              <div v-if="item.border" class="right-item-hr"></div>

            </div>
          </div>
        </div>
        <!--  -->
        <!-- 会员签到 -->
        <div class="member" v-show="meHide" @mouseenter="enterNavbor(4)" @mouseleave="leaveNavbor(4)">
          <div v-if="signStatus!=null" class="card1">
            <div class="me-left">
              <Steps :current="signStatus">
                <Step :content="item.id+'天'" :icon="signStatus>=item.id?'ios-checkmark-circle':'ios-radio-button-off'"
                  v-for="(item, index) in memberList" :key="index">
                </Step>
              </Steps>

              <!-- <div class="m_text15">再连续签到5天，可获得【15元优惠券】</div> -->
            </div>
            <div class="me-right">
              <div class="me-btn cursor" @click="bindSign" :class="[today==0?'active':'sub']">
                {{today==0?"签到":"已签到"}}
              </div>
              <div class="me-btn cursor active" @click="getCoupon" v-if="get_coupon==1" >
                领取优惠券
              </div>

            </div>
            <div class="m_text14 ts">
              <div class="m_text14"> 1.累计签到3天可领取5元券，6天可领取15元券</div>
              <div class="m_text14">2.每日关注首页-优惠券板块，定期活动主题优惠券限时领取；</div>
            </div>
          </div>
          <div v-else class="card2">
            <div class="me-left">
              <div class="m_text15">连续签到获得全场通用优惠券</div>
            </div>
            <div class="me-right">
              <div class="me-btn cursor" @click="bindSign">
                签到
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- 搜索栏 -->
    <div class="bottom">
      <div class="box" style="position:relative">
        <!-- 搜索 -->
        <div class="action comm_box">
          <div class="a-flex">

            <div class="logo" @click="navTo('/')">
              <img src="@/assets/images/LOGO.png" alt="" srcset="">
            </div>

            <div class="search">
              <Input search enter-button="搜索" placeholder="请输入搜索关键词…" class="h_search" @on-search='bindSearch' />
              <div class="hint">
                <div v-for="(item,index) in searchList" :key="index" @click="navTo('/search',item)" class="h_card">
                  <div class="text m_text14">{{item}} </div>
                  <div class="hr" v-if="index!=7"></div>
                </div>
              </div>
            </div>
            <div class="cart">
              <Button shape="circle" @click="navTo('/cart')" class="cartBtn">
                <div class="cartIcon">
                  <img src="@/assets/images/cart.png" alt="" srcset="">
                  
                </div>
                <div style="margin:0 5px" class="m_text14">购物车</div>
                <div class="num" :title="'购物车金额：'+ cartMoney">
                  ￥{{ cartMoney}}
                  <!-- <div class="cartnum">{{ cartCount}}</div> -->
                </div>
              </Button>
            </div>
            <!-- <div class="logoRight cursor">
              <img src="@/assets/images/logo_c7.png" alt="" srcset="" @click="avtiveTo('/cateGory','yushou')">
            </div> -->
          </div>
        </div>
        <!--活动列表 -->
        <div class="navbar comm_box">
          <div class="n-card">
            <div class="left m_text16" @mouseenter="enter()" @mouseleave="leave()">
              <img src="@/assets/images/classify.png" alt="" srcset="" class="classify">
              商品分类</div>
            <div v-for="(item,index) in items" :key="index" @click="navCateGory(item.id)" class="catrText m_text16">
              {{item.title}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分类详情 -->
    <div class="box" style="position:relative">
      <div class="navLeft" v-if="navStatus||url=='index'" @mouseenter="enter()" @mouseleave="leave()">
        <div v-for="(item, index) in classifyList" :key="index" class="left_item"
          @mouseenter="enter_pb(item.cls_id)" @mouseleave="leave_pb(item.cls_id)">
          <div class="icon iconfont m_text19" :class="item.src">
          </div>
          <div class="m_text16" @click="navCateGory(item.cls_id,item.cls_name)">
            {{ item.cls_name }}
          </div>
        </div>
      </div>
      <div class="navLeft_pb" v-show="navLeftStatus" @mouseenter="enter_qu()" @mouseleave="leave_qu()">
        <div class="classify" v-for="(item,index) in childs" :key="index">
          <div class="title m_text16"  @click="navCateGory(item.cls_id)">
            {{item.cls_name}}
            <Icon type="ios-arrow-forward" />
          </div>
          <div class="text">
            <a class="did m_text12" v-for="(eve,s) in item.child" :key="s"  @click="navCateGory(eve.cls_id)">
              {{eve.cls_name}}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧图标 -->
    <div class="fixationRight" :class="navBarFixed? 'navBarLeftWrap' :'fixationLeftWrap'" v-if="hide">
      <div class="list">
        <div class="icon" v-for="(item, index) in iconList" :key="index" :class="[item.status?'min':'max',index==2?'iconleft':'']">
          <img v-if="index==5" v-lazy="item.url" alt srcset @click="backTop" />
          <img v-else-if="index==0" v-lazy="item.url" alt srcset/>
          <img v-else v-lazy="item.url" alt srcset @click="navCateGory(item.id)" class="cursor" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { money, menu, sign_record, user_sign, sign_coupon } from "@/api";
import { mapGetters, mapState } from "vuex";
export default {
  name: "navHeader",
  data() {
    return {
      hide:false,
      navLeftStatus: false, //导航子分类显示
      iconList: [
        {
          url: require("@/assets/images/r1.png")
        },
        {
          status: true,
          id: "dis",
          url: require("@/assets/images/r2.png")
        },
        {
          status: true,
          id: "one",
          url: require("@/assets/images/r7.png")
        },
        {
          id: "dis3",
          status: true,
          url: require("@/assets/images/r3.png")
        },
        {
          id: "discount",
          src: "discount",
          url: require("@/assets/images/hbIcon.png")
        },
        // {
        //   url: require("@/assets/images/r5.png")
        // },
        {
          url: require("@/assets/images/r6.png")
        }
      ],
      active: {
        title: "家居百货",
        id: "02",
        list: [
          {
            title: "耳机",
            data: [
              {
                title: "塑料杯"
              },
              {
                title: "塑料杯"
              },
              {
                title: "塑料杯"
              },
              {
                title: "塑料杯"
              }
            ]
          }
        ]
      },
      classifyList: [],
      childs: [],
      items: [
        {
          title: "新品首发",
          id: "new",
          url: "/special/hot",
          src: require("@/assets/images/left1.png")
        },
        {
          title: "今日必抢",
          id: "sale",
          url: "/special/hot",
          src: require("@/assets/images/left2.png")
        },
        {
          title: "预售优惠",
          id: "presell",
          url: "/special/hot",
          src: require("@/assets/images/left4.png")
        },
        {
          title: "一个起订",
          id: "one",
          url: "/special/hot",
          src: require("@/assets/images/left4.png")
        },
        {
          title: "一折抢购",
          id: "dis",
          url: "/special/hot",
          src: require("@/assets/images/left4.png")
        },
        {
          title: "最新补货",
          id: "bu",
          url: "/cateGory",
          src: require("@/assets/images/left4.png")
        },

        {
          title: "热卖爆款",
          id: "hot",
          url: "/cateGory",
          src: require("@/assets/images/left6.png")
        }
        // {
        //   title: "限时秒杀",
        //   id: "rep",
        //   url: "/cateGory",
        //   src: require("@/assets/images/left7.png")
        // }
      ],

      typeList: [
        {
          id: "01",
          title: "家居用品",
          color: "#4A9CFF",
          src: "icon-beizi"
        },
        {
          id: "02",
          title: "健康美容",
          color: "#FF6F91",
          src: "icon-huazhuang"
        },
        {
          id: "03",
          title: "饰品系列",
          color: "#FF6960",
          src: "icon-zhubaoshipin"
        },
        {
          id: "04",
          title: "文体礼品",
          color: "#00C9AD",
          src: "icon-lipin"
        },
        {
          id: "05",
          title: "季节产品",
          color: "#996EC3",
          src: "icon-xiezi"
        },
        //  {
        //   id: "05",
        //   title: "节日礼品",
        //   color: "#4A9CFF",
        //   src: "icon-zhaohuo2press"
        // },
        {
          id: "06",
          title: "精品包饰",
          color: "#FF6960",
          src: "icon-bussiness"
        },
        {
          id: "07",
          title: "儿童玩具",
          color: "#FF6F91",
          src: "icon-wanju1"
        },
        {
          id: "08",
          title: "毛绒公仔",
          color: "#FFC125",
          src: "icon-wanju2"
        },
        {
          id: "09",
          title: "数码配件",
          color: "#4A9CFF",
          src: "icon-erji1"
        },
        {
          id: "10",
          title: "休闲食品",
          color: "#FF6F91",
          src: "icon-huazhuang"
        },
        {
          id: "14",
          title: "物资耗料",
          color: "#4A9CFF",
          src: "icon-zhaohuo2press"
        }
      ],
      searchList: [
        "口罩",
        "香水",
        "耳机",
        "毛巾",
        "数据线",
        "面膜",
        "化妆包",
        "拖鞋"
      ],
      navBarFixed: false,
      navStatus: false,
      url: null,
      user: null,
      tipList: [
        {
          status: false,
          value: "",
          id: "1",
          border: true,
          url: "login",
          data: null
        },
        {
          status: false,
          name: "您的余额",
          value: "点击查看",
          id: "2",
          border: true,
          data: null
        },
        {
          value: "我的订单",
          id: "3",
          border: true,
          url: "reverse"
        },
        {
          value: "会员签到",
          id: "4"
        }
      ],
      memberList: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        },
        {
          id: 5
        },
        {
          id: 6
        }
      ],
      signStatus: null,
      meHide: false,
      cartValue: "",
      memberStatus: 0,
      today: null,
      get_coupon: null
    };
  },
  mounted() {
    /**
     *功能：获取用户信息
     *时间：2020年04月21日 10:03:59
     *作者：钟婉婷
     */
    if (this.$store.state.user.userInfo.hdid) {
      this.tipList[0].status = true;
      this.tipList[0].data = this.$store.state.user.userInfo.uname;
    }
    /**
     *功能：监控高度
     *时间：2020年01月06日 11:21:18
     *作者：钟婉婷
     */
    window.addEventListener("scroll", this.watchScroll);
    this.url = this.$route.name;
    this.loadData();
    this.sign();
  },
  watch: {
    $route(to, from) {
      // console.log(to.name);
      this.url = to.name;
    }
  },
  computed: {
    ...mapState({
      cartCount: state => state.cart.cartCount,
      cartMoney: state => state.cart. cartMoney
     
    })
  },
  methods: {
    loadData() {
      menu().then(res => {
        let list = this.typeList;
        let data = Object.values(res);
        if (list) {
          list.forEach((eve, k) => {
            data.forEach((item, index) => {
              if (item.cls_id == eve.id) {
                eve.child = item.child;
                eve.cls_id = item.cls_id;
                eve.cls_name = item.cls_name;

              }
            });
          });
        }
        this.$store.dispatch("update");
        this.classifyList = list;
      });
    },
    // 获取签到
    sign() {
      sign_record().then(res => {
        this.signStatus = res.days;
        this.today = res.today;
        this.get_coupon = res.get_coupon;
      });
    },
    bindSign() {
      if (this.today == 0) {
        user_sign({
          src: "PC"
        }).then(res => {
          if (res.res == "success") {
            this.$Message.success("签到成功");
            this.sign();
          } else {
            this.$Message.success("签到失败");
          }
        });
      } else {
        this.$Message.success("今日已签到");
      }
    },
    getCoupon() {
      sign_coupon({
        src: "PC"
      }).then(res => {
        if (res.res == "success") {
          this.$Message.success("领取成功");
          this.sign();
          this.$router.push({
            name: "discount"
          });
        }
      });
    },
    /**
     *功能：回到顶部
     *时间：2020年01月11日 14:46:15
     *作者：钟婉婷
     */
    // backTop() {
    //   // let top = document.documentElement.scrollTop || document.body.scrollTop;
    //   // // 实现滚动效果
    //   // const timeTop = setInterval(() => {
    //   //   document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
    //   //   if (top <= 0) {
    //   //     clearInterval(timeTop);
    //   //   }
    //   // }, 10);
    //   let nowTop =
    //     document.body.scrollTop || document.documentElement.scrollTop; // 获取当前滚动条位置
    //   if (nowTop > 0) {
    //     window.requestAnimationFrame(this.backTop);
    //     window.scrollTo(0, nowTop - nowTop / 5);
    //   }
    // },
    /**
     *功能：跳转页面
     *时间：2020年01月06日 11:20:46
     *作者：钟婉婷
     */
    navGo(index) {
      let list = this.tipList[index];
      if (list.url) {
        if (list.url == "login") {
          this.$store.commit("outUser");
        }
        this.$router.push({ name: list.url });
      }
      if (list.id == 2) {
        money().then(res => {
          list.status = true;
          list.data = res;
        });
      }
    },
    navTo(url, id) {
      if (id) {
        this.$router.push({
          path: url,
          query: {
            id: id
          }
        });
      } else {
        this.$router.push({ path: url });
      }
    },
    avtiveTo(url, id) {
      if (id) {
        this.$router.push({
          path: url,
          query: {
            id: id
          }
        });
      } else {
        this.$router.push({ path: url });
      }
    },
    bindSearch(id) {
      if (id) {
        this.navTo("/search", id);
      }
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
      if (scrollTop > 217) {
        this.navBarFixed = true;
      } else {
        this.navBarFixed = false;
      }
    },
    /**
     *功能：跳转详情页面
     *时间：2020年01月06日 15:07:42
     *作者：钟婉婷
     */
    navCateGory(id, name) {
      if (id == "discount") {
        this.$router.push({
          name: "discount"
        });
      } else {
        this.$router.push({
          path: "/cateGory",
          query: {
            id: id
          }
        });
      }

      this.navLeftStatus = false;
    },
    /**
     *功能：商品分类移入
     *时间：2020年01月06日 15:21:47
     *作者：钟婉婷
     */
    enter() {
      if (this.$route.name != "index") {
        this.navStatus = true;
      }
    },
    /**
     *功能：移出
     *时间：2020年01月06日 15:22:15
     *作者：钟婉婷
     */
    leave() {
      if (this.$route.name != "index") {
        this.navStatus = false;
      }
    },
    /**
     *功能：父类移入
     *时间：2020年01月06日 15:21:47
     *作者：钟婉婷
     */
    enter_pb(id) {
      if (this.$route.name != "index") {
        this.navStatus = true;
      }
      if (id) {
        let list = this.classifyList;
        list.forEach((item, index) => {
          if (id == item.cls_id) {
            this.childs = item.child;
          }
        });
        this.navLeftStatus = true;
      }
    },
    backTop() {
      let nowTop =
        document.body.scrollTop || document.documentElement.scrollTop; // 获取当前滚动条位置
      if (nowTop > 0) {
        window.requestAnimationFrame(this.backTop);
        window.scrollTo(0, nowTop - nowTop / 5);
      }
    },
    /**
     *功能：父类移出
     *时间：2020年01月06日 15:22:15
     *作者：钟婉婷
     */
    leave_pb(id) {
      if (this.$route.name != "index") {
        this.navStatus = false;
      }
      if (id) {
        this.navLeftStatus = false;
      }
    },
    enter_qu() {
      if (this.$route.name != "index") {
        this.navStatus = true;
      }
      this.navLeftStatus = true;
    },
    /**
     *功能：移出
     *时间：2020年01月06日 15:22:15
     *作者：钟婉婷
     */
    leave_qu() {
      if (this.$route.name != "index") {
        this.navStatus = false;
      }
      this.navLeftStatus = false;
    },
    /**
     *功能：顶部栏移入
     *时间：2020年04月09日 10:35:42
     *作者：钟婉婷
     */
    enterNavbor(id) {
      if (id == 4) {
        this.meHide = true;
      }
    },
    /**
     *功能：顶部栏移出
     *时间：2020年04月09日 10:36:17
     *作者：钟婉婷
     */
    leaveNavbor(id) {
      if (id == 4) {
        this.meHide = false;
      }
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
