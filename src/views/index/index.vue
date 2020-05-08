<template>
  <div class="box scroll">
    <!-- 固定左侧导航 -->
    <!-- <div class="fixationLeft" :class="navBarFixed? 'navBarLeftWrap' :'fixationLeftWrap'">
      <div class="title" :style="navBackground">热点关注</div>
      <Anchor>
        <AnchorLink :href="item.id" :title="item.title" v-for="(item, index) in indexList" :key="index" class="item"
          :class="[item.status?'text_li':'text']" />
      </Anchor>
    </div> -->
    <!-- <navRight></navRight> -->
    <!-- 头部 -->
    <div class="header">
      <!-- 左侧导航 -->
      <div class="navLeft"></div>
      <!-- 轮播图背景 -->
      <div class="backBanner" :style="{'background-color':avtiveColor}" v-if="avtiveColor">
      </div>
      <!-- 轮播图 -->
      <div class="banner">
        <Carousel autoplay arrow='never' trigger="hover" v-model="index" easing="213" loop @on-change="changeBanner">
          <CarouselItem v-for="(item, index) in banner" :key="index">
            <div class="bannerItem" @click="bindBanner(item)">
              <img :src="item.image" />
            </div>
          </CarouselItem>
        </Carousel>
        <!-- 轮播图右侧活动 -->
        <div class="navScrollRs">
          <!-- 活动 -->
          <Scroll class="seckill-box">
            <div v-for="(item, index) in seckill" :key="index" class="seckill-item animated fadeIn cursor" @click="navGo(item.id)">
              <img v-lazy="item.url" alt srcset />
            </div>
          </Scroll>
          <!-- 公告栏 -->
          <div class="navRight">
            <div class="g_top">
              <div class="m_text16">Hi~欢迎光临熙美诚品</div>
              <div v-if="user" class="m_text16 username">
                尊敬的客户:
                <div class="userCard">
                  <div class="m_text16">{{user.uname}}</div>
                  <img src="@/assets/images/SVIP.png" class="vip" />
                </div>
              </div>
              <div class="hy">
                <Button @click="navTo('reverse')" class="hyBut m_text14">管理中心</Button>
                <Button class="hyBut m_text14" @click="admin">会员系统</Button>
              </div>
              <div class="g_hr">

              </div>
            </div>
            <div class="g_bottom">
              <div class="title">
                <div class="name m_text16 ">熙美公告</div>
                <!-- <div class="more m_text16">
                  更多公告
                  <Icon type="ios-arrow-forward" />
                </div> -->
              </div>
              <div class="item text-hide cursor m_text14" v-for="(item,index) in noticeList" :key="index" @click="bindNot(item.id)">{{item.title}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 优惠券 -->
    <!-- <div class="discount-card">
      <div class="nav">
        <div class="img">
          <img v-lazy="discount.url" alt="" srcset="">
        </div>
        <div class="x-title" style=" margin-right: 20px;">领券中心</div>
        <div class="x-text">每周二10点抢优惠券</div>
      </div>
      <div class="d-ul">
        <div class="d-li" v-for="(item, index) in discount.list" :key="index">
          <div class="left" :style="discount.back">
            <div class="img">
              <img v-lazy="item.url" alt="" srcset="">
            </div>
            <div class="info">
              <div class="price">¥<span class="num">200</span></div>
              <div class="hint">出货满3000使用</div>
              <div class="time">有效时间：一周</div>
            </div>
          </div>
          <div class="right" :style="item.status==0?discount.success:discount.error">
            <div :class="item.status==0?'success':'error'">{{item.status==0?'立即领取':'已抢完'}}</div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- 活动分类 -->
    <!-- <div class="activity-card">
      <div class="activity-item" v-for="(item, index) in activity.list" :key="index" :style="activity.navBackground" @click="">
        <div class="a-left">
          <div class="name">{{item.name}}</div>
          <div class="t1" v-if="item.id=='ms'">{{item.text1}}
            <downTime :day="0" :hour="22" :minute="12" :second="22" backgroundColor="#000" color="#fff" style="margin-top:13px"></downTime>
          </div>
          <div v-else class="d1 m_text19 ">{{item.text1}}</div>
          <div class="t2 m_text16 ">{{item.text2}}</div>
          <div class="t3 m_text16">{{item.text3}}</div>
          <div class="right" v-if="item.id=='1'||item.id=='2'||item.id=='4'">
            <img src="@/assets/images/a-right.png" alt="" srcset="">
          </div>
        </div>
        <div class="a-right">
          <img :src="item.src" alt="" srcset="">
        </div>
      </div>
    </div> -->
    <!-- 秒杀模块 -->
    <div class="seckill" id="seckill" v-if="seckillType">
      <div class="banner cursor" @click="seckillTo(seckillType.tid)">
        <div class="title m_text36">限时秒杀</div>
        <div class="title m_text36">低至
          <div class="seck_b_icon iconfont icon-1"></div>
          折</div>
        <div class="seck_b_num m_text18">{{seckillType.title}}</div>
        <div class="over m_text16">秒杀{{seckillType.screen=="will"?'开始':'结束'}}倒计时</div>
        <downTime :day="seckillType.time.day" :hour="seckillType.time.hour" :minute="seckillType.time.minute" :second="seckillType.time.second"
          backgroundColor="#000" color="#fff" v-if="seckillType"></downTime>
      </div>
      <div class="seck_goods" v-if="seckillType">
        <div v-for="(item, index) in seckillType.list.slice(0, 4)" :key="index" class="items animated fadeIn">
          <div class="img cursor" @click="seckillTo(seckillType.tid)">
            <img v-lazy="item.image" alt srcset />
          </div>
          <div class="title">
            <div class="text-hide m_text14">{{item.item_name}}</div>
            <Progress :percent="item.num" stroke-color="#ec383e" />
            <div class="number m_text12">
              ￥<span class="price m_text16">{{item.miao_price}}</span>
              <span class="x-ling m_text14">￥{{item.base_price}}</span>
              <Button class="btn-rad" :class="[seckillType.screen=='will'?'msBtn':'msBtn-on']" @click="addCart(seckillType.screen,item)">
                <span class="m_text10">{{seckillType.screen=="will"?'即将开始':'立即抢购'}}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div class="seckillRight">
        <img src="@/assets/images/ys.png" alt="" srcset="" class="seckill_R_img cursor" @click="navGo('presell')">
        <img src="@/assets/images/zb.png" alt="" srcset="" class="seckill_R_img cursor" @click="navGo('player')">
      </div>
    </div>
    <!-- 活动 -->
    <div class="special">
      <div class="spec-card-a ">
        <div class="spec-heard cursor text-hide" @click="navGo('new')">
          <div class="spec-left">
            <div class="spec-tag"></div>
            <div class="spec-name m_text18">
              新品首发
            </div>
            <div class="iconfont icon-icon-- spec-icon"></div>
          </div>
          <div class="spec-text m_text13">每日10点、16点上新</div>
        </div>
        <Carousel v-model="special" loop arrow="always" dots="none" autoplay v-if="newList" class="fadeIn">
          <CarouselItem v-for="(item, index) in newList" :key="index" class="s-a-goods">
            <img :src="item.image" alt="" srcset="" class="s-a-img cursor" title="查看商品详情" @click="navDetails(item.item_no)">
            <!-- <div class="m_text14 s-a-text">
              新品首发
            </div> -->
            <div class="m_text14">
              {{item.item_name}}
            </div>
            <div class="s-a-text">
              <div class="m_text16 cc1 s-a-price">到手价：{{item.price}}元</div>
              <div class="m_text14 s-a-price">零售价：{{item.ling}}元</div>
            </div>
          </CarouselItem>
        </Carousel>
      </div>
      <div class="spec-card-b">
        <div class="spec-heard cursor text-hide" @click="navGo('hot')">
          <div class="spec-left">
            <div class="spec-tag"></div>
            <div class="spec-name m_text18">
              爆款推荐
            </div>
            <div class="iconfont icon-icon-- spec-icon"></div>
          </div>
          <div class="spec-text m_text13">热卖精选爆款商品</div>
        </div>
        <div class="s-b-goods fadeIn" v-if="hotList">
          <div v-for="(item, index) in hotList" :key="index" class="s-b-items">
            <img v-lazy="item.image" alt srcset class="s-b-img cursor" title="查看商品详情" @click="navDetails(item.item_no)" />
            <div class="text-hide m_text12 s-b-text ">{{item.item_name}}</div>
            <div class="s-a-price m_text12 cc1">￥<span class="m_text14">{{item.price}}</span></div>
            <div class="s-b-tag m_text12">
              热卖
            </div>
          </div>
        </div>
      </div>
      <div class="spec-card-c ">
        <div class="spec-heard cursor text-hide" @click="navGo('sale')">
          <div class="spec-left">
            <div class="spec-tag"></div>
            <div class="spec-name m_text18">
              今日必抢
            </div>

            <div class="iconfont icon-icon-- spec-icon"></div>
          </div>
          <div class="spec-text m_text13 ">近日潮流爆品 过期不更</div>
        </div>
        <div class="s-c-goods fadeIn" v-if="mustbuyList">
          <div v-for="(item, index) in mustbuyList.slice(0, 2)" :key="index" class="s-c-items cursor" @click="navDetails(item.item_no)">
            <div class="s-c-items-top">
              <div>
                <div class="m_text14 font-Regular s-c-text text-hide ">{{item.item_name}}</div>
                <span class="m_text12 font-Regular s-c-code">{{item.item_no}}</span>
                <div class="m_text14 cc1 font-Regular">批发价：{{item.price}}元</div>
                <div class="m_text12 font-Regular">零售价：{{item.ling}}元</div>
              </div>
              <img v-lazy="item.image" alt srcset class="s-c-img" />
            </div>
            <!-- <div class="s-c-items-bt">
              <Progress :percent="65" stroke-color="#e3e4e5" :hide-info="true" />
              <div class=" m_text12 cc1">剩余：100件</div>
            </div> -->
          </div>
        </div>
      </div>
      <div class="spec-card-d">
        <div class="spec-heard text-hide cursor" @click="navTo('discount')">
          <div class="spec-left">
            <div class="spec-tag"></div>
            <div class="spec-name m_text18">
              领券中心
            </div>
            <div class="iconfont icon-icon-- spec-icon"></div>
          </div>
          <div class="spec-text m_text13 cc2">查看更多</div>
        </div>
        <div class="s-d-back"></div>
        <div class="s-d-goods  animated fadeIn" v-if="couponList">
          <div class="s-d-items" v-for="(item, index) in couponList.slice(0, 3)" :key="index">
            <div class="s-d-items-left">
              <div class="s-d-left-icon">
                <img :src="item.status=='may'?djqImg[1]:djqImg[0]" alt="" srcset="" class="s-d-left-img">
              </div>
              <div class="s-d-left-info">
                <div class="m_text12 cc1 s-d-num">
                  ¥<span class="m_text35 ">{{item.money}}</span>
                </div>
                <div class="m_text12 cc3 s-d-left-text text-hide">
                  满{{item.min}}使用
                </div>
                <div class="m_text12">
                  <Progress :percent="item.percent" stroke-color="#ec383e" :stroke-width="5"/>
                  <!-- 有效时间：7天 -->
                </div>
              </div>
            </div>
            <div class="s-d-items-righta cc2 m_text14 cursor" v-if="item.status=='ed'" title="点击领取" @click="bindCoupon(item.money)"> </div>
            <div class="s-d-items-rightb cc2 m_text14 cursor" v-if="item.status=='may'" title="点击领取" @click="bindCoupon(item.money)"> </div>
            <div class="s-d-items-rightc cc2 m_text14 cursor" v-if="item.status=='no'" title="点击领取" @click="bindCoupon(item.money)"> </div>
          </div>
        </div>
      </div>
    </div>
    <!-- IP -->
    <div class="new" id="new">
      <div class="nav">
        <div class="left">
          <div class="x-title" style=" margin-right: 20px;">
            <span style="color:#e1252f">IP</span>
            正版尖货</div>
          <div class="x-text">热门IP周边衍生品</div>
        </div>
        <div class="right x-span">
          国外热门IP品牌 正版授权合作商品
        </div>
      </div>
      <ul class="temp">
        <li v-for="(item, index) in IPlist.slice(0,4)" :key="index">
          <goods :img='item.image' :code='item.item_no' :name='item.item_name' :price='item.price' :ling='item.ling' :value='item.spec'
            :step='item.spec' :min="item.spec" :cnum="item.cnum" :dis="item.dis"></goods>
        </li>
      </ul>
    </div>
    <!-- 商品分类 -->
    <div class="allType" v-for="(item, index) in goodsList" :key="index" :id="item.id">
      <div class="items" v-if="status>=index">
        <div class="heard">
          <div class="left">
            <div>
              <img v-lazy="item.icon" alt srcset />
            </div>
            <div class="x-title">{{item.cls_name}}</div>
            <div class="icon_2">
              <img v-lazy="item.right" alt srcset />
            </div>
          </div>
          <div class="right">
            <div v-for="(item, index) in item.typeList" :key="index" class="type x-span cursor" @click="navGo(item.cls_no)">{{ item.cls_name }}</div>
          </div>
        </div>
        <div class="banner cursor" @click="navCateGory(item.id)" title="查看">
          <img v-lazy="item.rec_pic" alt srcset />
        </div>
        <ul class="temp">
          <li v-for="(item, index) in item.items.slice(0,4)" :key="index">
            <goods :img='item.image' :code='item.item_no' :name='item.item_name' :price='item.price' :ling='item.ling' :value='item.spec'
              :step='item.spec' :min="item.spec" :cnum="item.cnum" :dis="item.dis"></goods>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import numberbox from "@/components/number-box/number-box.vue";
import priceView from "@/components/priceView/priceView.vue";
import goods from "@/components/goods/goods.vue";
import navRight from "@/components/navRight/navRight.vue";
import downTime from "@/components/downTime/downTime.vue";
import {
  home,
  homeGoods,
  get_ip,
  new_goods,
  get_hot,
  show_coupon,
  get_coupon,
  get_mustbuymust
} from "@/api";
export default {
  components: {
    numberbox,
    priceView,
    goods,
    navRight,
    downTime
  },
  data() {
    return {
      djqImg: [
        require("@/assets/images/djq.png"),
        require("@/assets/images/djq-on.png")
      ],
      goodsBack: [
        //商品banner
        {

          icon: require("@/assets/images/typeIcon1.png"),
          right: require("@/assets/images/typeRight1.png"),
          id: "01"
        },
        {

          icon: require("@/assets/images/typeIcon2.png"),
          right: require("@/assets/images/typeRight2.png"),
          id: "02"
        },
        {

          icon: require("@/assets/images/typeIcon3.png"),
          right: require("@/assets/images/typeRight3.png"),
          id: "04"
        },
        {

          icon: require("@/assets/images/typeIcon4.png"),
          right: require("@/assets/images/typeRight4.png"),
          id: "03"
        },
        {

          icon: require("@/assets/images/typeIcon5.png"),
          right: require("@/assets/images/typeRight5.png"),
          id: "05"
        },
        {

          icon: require("@/assets/images/typeIcon6.png"),
          right: require("@/assets/images/typeRight6.png"),
          id: "06"
        },
        {

          icon: require("@/assets/images/typeIcon7.png"),
          right: require("@/assets/images/typeRight7.png"),
          id: "07"
        },
        {

          icon: require("@/assets/images/typeIcon7.png"),
          right: require("@/assets/images/typeRight7.png"),
          id: "08"
        },
        {

          icon: require("@/assets/images/typeIcon8.png"),
          right: require("@/assets/images/typeRight8.png"),
          height: "24px;",
          id: "09"
        },
        {

          icon: require("@/assets/images/typeIcon9.png"),
          right: require("@/assets/images/typeRight9.png"),
          width: "28px",
          height: "32px",
          id: "10"
        }
      ],
      ys: {
        id: "2",
        src: "/special/hot"
      },
      special: 0,
      IPlist: [],
      goodsList: [], //商品列表
      goodsNum: 0,
      newList: [],
      hotList: [],
      navBackground: {
        backgroundImage: "url(" + require("@/assets/images/navRight.png") + ")",
        backgroundRepeat: "repeat"
      },
      current: null,
      index: 0, //轮播图索引
      indexList: [
        {
          id: "#01",
          title: "家居百货",
          color: "#4A9CFF",
          status: true,
          img: "../../static/home/beizi.png"
        },
        {
          id: "#02",
          title: "健康美容",
          color: "#FF6F91",
          status: true,
          img: "../../static/home/huazhuang.png"
        },
        {
          id: "#03",
          title: "饰品系列",
          color: "#FF6960",
          status: true,
          img: "../../static/home/zhubaoshipin.png"
        },
        {
          id: "#04",
          title: "文体礼品",
          color: "#00C9AD",
          status: true,
          img: "../../static/home/liwu.png"
        },
        {
          id: "#05",
          title: "季节产品",
          color: "#996EC3",
          status: true,
          img: "../../static/home/xiezi.png"
        },
        {
          id: "#06",
          title: "精品包饰",
          color: "#FF6960",
          status: true,
          img: "../../static/home/bag.png"
        },
        {
          id: "#07",
          title: "儿童玩具",
          color: "#00C9AD",
          status: true,
          img: "../../static/home/shipin_1.png"
        },
        {
          id: "#08",

          title: "毛绒公仔",
          color: "#FFC125",
          status: true,
          img: "../../static/home/wanju.png"
        },
        {
          id: "#09",
          title: "数码配件",
          color: "#4A9CFF",
          status: true,
          img: "../../static/home/erji_1.png"
        },
        {
          id: "#10",
          title: "休闲食品",
          color: "#FF6F91",
          status: true,
          img: "../../static/home/lingshi_2.png"
        }
      ],
      typeList: null,
      banner: [],
      items: [
        {
          code: "100",
          min: 10,
          max: 300,
          status: 1,
          num: 20,
          url:
            "https://ximiphoto.oss-cn-hangzhou.aliyuncs.com/thumb/6939837675836.jpg?x-oss-process=style/440"
        },
        {
          code: "100",
          min: 10,
          max: 300,
          status: 2,
          num: 30,
          url:
            "https://ximiphoto.oss-cn-hangzhou.aliyuncs.com/thumb/6939837675836.jpg?x-oss-process=style/440"
        },
        {
          code: "100",
          min: 10,
          max: 300,
          status: 1,
          num: 20,
          url:
            "https://ximiphoto.oss-cn-hangzhou.aliyuncs.com/thumb/6939837675836.jpg?x-oss-process=style/440"
        },
        {
          code: "100",
          min: 10,
          max: 300,
          status: 2,
          num: 30,
          url:
            "https://ximiphoto.oss-cn-hangzhou.aliyuncs.com/thumb/6939837675836.jpg?x-oss-process=style/440"
        }
      ],
      seckill: [
        {
          url: require("@/assets/images/s1.png"),
          title: "天天特价",
          id: "sale"
        },
        {
          url: require("@/assets/images/s2.png"),
          title: "限时清仓  一个起订",
          id: "one"
        },
        {
          url: require("@/assets/images/s3.png"),
          title: "1折疯抢",
          id: "dis"
        }
      ],
      navBarFixed: false,
      user: this.$store.state.user.userInfo,
      screenwidth: 0,
      avtiveColor: "#f0f0f0",
      status: 0,
      noticeList: null,
      couponList: null,
      mustbuyList: null,
      seckillType: null,
      member_url:null
    };
  },
  mounted() {
    this.loadData();
    setTimeout(() => {
      this.newData();
      this.hotData();
      this.mustbuyData();
      this.coupon();
      this.loadIP();
    }, 300);
    window.addEventListener("scroll", this.watchScroll);
    const that = this;
    this.$nextTick(function() {
      window.addEventListener("scroll", this.onScroll);
    });
  },
  methods: {
    get_bodywidth() {
      //动态获取浏览器高度
      const that = this;
      window.onresize = () => {
        return (() => {
          window.screenwidth = document.documentElement.clientwidth;
          that.screenwidth = window.screenwidth;
        })();
      };
    },

    admin() {
      let href = this.member_url;
      window.open(href, "_blank");
    },
    loadData() {
      home().then(res => {
        this.noticeList = res.gg;
        if (res.banners) {
          res.banners.forEach(item => {
            item.image =
              "http://img.xmvogue.com/ggao/" +
              item.pic +
              "?x-oss-process=style/yuan";
          });
        }
        this.banner = res.banners;
        this.avtiveColor = this.banner[0].background;
        let msList = this.$xm.goodsFor(res.miaosha.list, 300);
        msList.forEach(row => {
          row.num = this.$xm.GetPercent(row.percent, Number(row.qty));
        });
        if (res.miaosha) {
          this.seckillType = {
            screen: res.miaosha.screen,
            time: this.$xm.timeDifference(res.miaosha.now, res.miaosha.totime),
            list: msList,
            tid: res.miaosha.tid,
            title:res.miaosha.title,
          };
        }
        this.member_url=res.member_url;
      });
    },
    // 新品上线
    newData() {
      new_goods().then(res => {
        this.newList = this.$xm.goodsFor(res.list, 300);
      });
    },
    // 爆款
    hotData() {
      get_hot().then(res => {
        this.hotList = this.$xm.goodsFor(res.list, 300);
      });
    },
    // 商品分类
    loadGoods() {
      this.status++;
      let cate = this.$xm.PrefixZero(this.status, 2);
      homeGoods({
        cate: cate
      }).then(res => {
        let row = this.$xm.goodsFor(res.list, 300);
        this.goodsBack.forEach(item => {
          if (item.id == cate) {
            item.items = row;
            item.typeList = res.sub_cls;
            item.rec_pic = res.rec_pic;
            item.cls_name=res.cls_name
            this.goodsList.push(item);
          }
        });
      });
    },
    // IP
    loadIP() {
      get_ip().then(res => {
        let row = this.$xm.goodsFor(res.list, 300);
        this.IPlist = row;
      });
    },
    mustbuyData() {
      get_mustbuymust().then(res => {
        this.mustbuyList = this.$xm.goodsFor(res.list, 300);
      });
    },
    // 代金券列表
    coupon() {
      show_coupon().then(res => {
        this.couponList = res.list;
      });
    },
    // 领取代金券
    bindCoupon(money) {
      get_coupon({
        money: money
      }).then(res => {
        if (res.res == "success") {
          this.$Message.success(res.msg);
          this.coupon();
        } else {
          this.$Message.error(res.msg);
        }
      });
    },

    /**
     *功能：公告栏
     *时间：2020年04月20日 14:00:06
     *作者：钟婉婷
     */
    bindNot(id) {
      this.$router.push({
        path: "article",
        query: {
          key: id
        }
      });
    },
    navGo(id) {
      this.$router.push({
        path: "/cateGory",
        query: {
          id: id
        }
      });
    },
    navTo(url) {
      this.$router.push({
        name: url
      });
      if (url == "technology") {
        this.$store.dispatch("upIndex", url);
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
    seckillTo(key) {
      this.$router.push({
        path: "/cateGory",
        query: {
          id: "miaosha",
          key: key
        }
      });
    },

    /**
     *功能：跳转详情页面
     *时间：2020年01月06日 15:07:42
     *作者：钟婉婷
     */
    navDetails(code) {
      const { href } = this.$router.resolve({
        name: "details",
        query: {
          code: code
        }
      });
      window.open(href, "_blank");
    },
    /**
     *功能：商品移入
     *时间：2019年12月26日 14:11:18
     *作者：钟婉婷
     */
    enter(index) {
      this.current = index;
    },
    /**
     *功能：商品移出
     *时间：2019年12月26日 14:11:25
     *作者：钟婉婷
     */
    leave() {
      this.current = null;
    },
    /**
     *功能：高度
     *时间：2020年01月04日 14:44:54
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
     *功能：触发banner
     *时间：2020年03月28日 14:45:16
     *作者：钟婉婷
     */
    changeBanner(oldValue, value) {
      this.avtiveColor = this.banner[value].background;
    },
    /**
     *功能：点击轮播图
     *时间：2020年05月03日 12:00:30
     *作者：钟婉婷
     */
    bindBanner(e) {
      console.log(e);
      if(e.link!='#'){
        window.open(e.link, "_blank");
      }
    },
    titleAlert(title) {
      console.log(title);
      alert(title);
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
    // 滚动事件触发下拉加载
    onScroll() {
      let scrollBottom =
        this.getScrollHeight() - this.getClientHeight() - this.getScrollTop();
      setTimeout(() => {
        if (scrollBottom <= 450) {
          setTimeout(() => {
            if (this.status <= 9) {
              this.loadGoods();
            }
          }, 300);
        }
      }, 300);
    },
    navCateGory(id, name) {
      this.$router.push({
        path: "/cateGory",
        query: {
          id: id,
          keyWord: name ? name : ""
        }
      });
    },
    // 添加购物车
    addCart(status, row) {
      let data = {
        code: row.item_no,
        value: row.purchase_spec
      };
      if (status == "current") {
        subGood({ max_buy: 40 }, data).then(res => {
          if (res.result == "success") {
            this.$Message.success("添加成功");
            this.$store.dispatch("update");
          } else {
            this.$Message.error(res.msg);
          }
        });
      } else {
        this.$Message.success("秒杀即将开始");
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
