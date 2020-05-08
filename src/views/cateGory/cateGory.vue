<template>
  <div class="cateGory box ">
    <!-- 加载动画 -->
    <loading v-if="spinShow"></loading>
    <!-- 导航 -->
    <menus class="navbor" :list="menuList" :url="menuURL" v-if="menuList"></menus>
    <div class="content">
      <!-- banner图 -->
      <div class="banner animated fadeIn" v-if="banner">
        <img :src="banner" alt="">
      </div>
      <!-- 秒杀模块 -->
      <div class="msCard" v-if="time">
        <div class="msItems">
          <div class="over m_text20">秒杀{{time.screen=="will"?'开始':'结束'}}倒计时</div>
          <downTime :day="time.day" :hour="time.hour" :minute="time.minute" :second="time.second" backgroundColor="#000" color="#fff" v-if="time">
          </downTime>
        </div>
      </div>
      <!-- 分类区间 -->
      <div class="classify" v-if="clsList">
        <div class="fyFlex" :class="navBarFixed? 'box' :''">
          <div class="left">
            <div class="menu">
              <div class="title m_text16">
                分类：
              </div>
              <div class="text">
                <Button class="btn1" :class="cls==item.cls_no? 'btnActive' :''" v-for="(item,index) in clsList" :key="index"
                  @click="bindCls(item.cls_no)">{{item.cls_name}}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 价格区间 -->
      <div class="classify" :class="navBarFixed? 'navBarWrapTop' :''" v-if="sectionList">
        <div class="fyFlex" :class="navBarFixed? 'box' :''">
          <div class="left">
            <div class="menu">
              <div class="title m_text16">
                按配送价区间：
              </div>
              <div class="text">
                <Button class="btn2" :class="sIndex==index? 'btnActive' :''" v-for="(item,index) in sectionList" :key="index"
                  @click="bindSection(index)">
                  {{!item.status?item.min+'~'+item.max:item.text}}
                </Button>
              </div>
            </div>
          </div>
          <Page v-if="currentPage" :current='currentPage.thispage' :total='currentPage.total' :page-size="20" simple @on-change="bindPage" />
        </div>
      </div>
      <!-- 折扣区间 -->
      <div class="classify" v-if="disList">
        <div class="fyFlex" :class="navBarFixed? 'box' :''">
          <div class="left">
            <div class="menu">
              <div class="title m_text16">
                折扣区间：
              </div>
              <div class="text">
                <Button class="btn1" :class="dIndex==item? 'btnActive' :''" v-for="(item,index) in disList" :key="index"
                  @click="bindDis(item)">{{item}}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 商品 -->
      <ul class="temp">
        <li v-for="(item, index) in list" :key="index" v-if="list">
          <goods :img='item.image' :code='item.item_no' :name='item.item_name' :price='item.price' :miao_price="item.miao_price" :ling='item.ling'
            :base_price="item.base_price?item.base_price:''" :value='item.spec?item.spec:item.purchase_spec'
            :step='item.spec?item.spec:item.purchase_spec' :cnum="item.cnum" :type="goodsType"
            :endDate="item.expire_date?item.expire_date:''" :arrvialDate="item.deliver_date?item.deliver_date:''"
            :percent="item.percent&&item.percent!='0.0'?item.percent:0" :dis="item.dis?item.dis:''" @change="update()"></goods>
        </li>
      </ul>
      <!-- 分页 -->
      <div class="pages" v-if="currentPage">
        <Page :total='currentPage.total' :page-size="20" :current='currentPage.thispage' show-total show-elevator @on-change="bindPage" />
      </div>
    </div>
  </div>
</template>

<script>
import goods from "@/components/goods/goods.vue";
import menus from "@/components/menu/menu.vue";
import loading from "@/components/loading/loading.vue";
import downTime from "@/components/downTime/downTime.vue";
import {
  category,
  newGoods,
  buGoods,
  get_mustbuymust,
  newShops,
  ruizi_live,
  PromotionMin,
  discountOff,
  saleGoods,
  get_mustbuy,
  discountOffs,
  seckill,
  specialData
} from "@/api";
export default {
  components: {
    goods,
    menus,
    loading,
    downTime
  },
  data() {
    return {
      list: null,
      current: null,
      navBarFixed: false,
      currentPage: {
        thispage: 1
      },
      cls: "", //获取当前分类
      sectionList: [
        {
          min: "",
          max: "",
          status: true,
          text: "全部"
        },
        {
          min: "0",
          max: "10"
        },
        {
          min: "11",
          max: "20"
        },
        {
          min: "21",
          max: "40"
        },
        {
          min: "41",
          max: "60"
        },
        {
          min: "60",
          max: "",
          status: true,
          text: "60以上"
        }
      ],
      sIndex: 0, //价格区间
      menuList: null,
      menuURL: null,
      clsList: [
        {
          cls_no: "01",
          cls_name: "家居用品"
        },
        {
          cls_no: "02",
          cls_name: "健康美容"
        },
        {
          cls_no: "03",
          cls_name: "饰品系列"
        },
        {
          cls_no: "04",
          cls_name: "文体礼品"
        },
        {
          cls_no: "05",
          cls_name: "季节产品"
        },

        {
          cls_no: "06",
          cls_name: "精品包饰"
        },
        {
          cls_no: "07",
          cls_name: "儿童玩具"
        },
        {
          cls_no: "08",
          cls_name: "毛绒公仔"
        },
        {
          cls_no: "09",
          cls_name: "数码配件"
        },
        {
          cls_no: "10",
          cls_name: "休闲食品"
        },
        {
          cls_no: "14",
          cls_name: "物资耗料"
        }
      ],
      banner: null,
      spinShow: true,
      goodsType: "goods",
      type: "", //当前活动
      id: null, //判断活动ID,
      type: null,
      disList: null, //折扣列表
      dIndex: "1.0", //折扣id
      time: null //倒计时
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    if (this.id == "dis3") {
      this.dIndex = "3.0";
    }
    this.menuURL = this.$route.path;
    this.loadData();
    window.addEventListener("scroll", this.watchScroll);
  },
  methods: {
    loadData() {
      let that = this;
      let params = {
        cls: this.cls ? this.cls : "",
        max_price: this.max_price ? this.sectionList[this.sIndex].max : "",
        min_price: this.min_price ? this.sectionList[this.sIndex].min : ""
      };
      this.list = null;
      this.menuList = null;
      switch (this.id) {
        // 新品
        case "new":
          document.title = "新品首发";
          this.currentPage = null;
          newGoods(params).then(res => {
            let list = this.$xm.goodsFor(res.list, 300);
            this.list = list;
            this.menuList = res.nav;
          });
          this.banner = require("@/assets/images/cate/new.png");
          break;
        //预售
        case "presell":
          document.title = "预售优惠";
          this.clsList = null;
          this.sectionList = null;
          this.currentPage = null;
          ruizi_live().then(res => {
            let list = this.$xm.goodsFor(res.list, 300);
            // list.forEach(item => {
            //   item.percentNum = this.$xm.GetPercent(
            //     item.pnum + item.cnum,
            //     item.max_num
            //   );
            // });
            this.list = list;
            this.menuList = res.nav;
            this.banner = require("@/assets/images/cate/presell.jpg");
            this.goodsType = "presell";
          });
          break;
        // 补货
        case "bu":
          document.title = "最新补货";
          this.currentPage = null;
          buGoods(params).then(res => {
            let list = this.$xm.goodsFor(res.list, 300);
            this.list = list;
            this.menuList = res.nav;
          });
          this.banner = require("@/assets/images/cate/bu.jpg");
          break;
        // 今日必抢
        case "sale":
          document.title = "今日必抢";
          this.clsList = null;
          this.sectionList = null;
          this.currentPage = null;
          get_mustbuy().then(res => {
            let list = this.$xm.goodsFor(res.list, 300);
            this.list = list;
            this.menuList = res.nav;
          });
          this.banner = require("@/assets/images/cate/now.jpg");
          break;
        // 一件起订
        case "one":
          document.title = "一件起订";

          params.p = this.currentPage.thispage;
          PromotionMin(params).then(res => {
            let list = this.$xm.goodsFor(res.list, 300);
            this.list = list;
            this.menuList = res.nav;
            if (res.other.totalPage) {
              this.currentPage = {
                thispage: res.other.thispage,
                totalPage: res.other.thispage,
                total: Number(res.other.total)
              };
            }
          });
          this.banner = require("@/assets/images/cate/one.jpg");
          break;
        //一折
        case "dis":
          document.title = "折扣专区";
          this.currentPage = null;
          params.off = this.dIndex;
          discountOff(params).then(res => {
            let list = this.$xm.goodsFor(res.list, 300);
            this.list = list;
            this.menuList = res.nav;
            this.disList = res.dis_rate;
          });
          this.banner = require("@/assets/images/cate/dis.jpg");
          break;
        case "dis3":
          document.title = "折扣专区";
          this.currentPage = null;
          params.off = this.dIndex;
          discountOff(params).then(res => {
            let list = this.$xm.goodsFor(res.list, 300);
            this.list = list;
            this.menuList = res.nav;
            this.disList = res.dis_rate;
          });
          this.banner = require("@/assets/images/cate/dis.jpg");
          break;
        // 热卖爆款
        case "hot":
          this.clsList = null;
          this.sectionList = null;
          this.currentPage = null;
          document.title = "热卖爆款";
          saleGoods().then(res => {
            let list = this.$xm.goodsFor(res.list, 300);
            this.list = list;
            this.menuList = res.nav;
          });
          this.banner = require("@/assets/images/cate/hot.jpg");
          break;
        // 秒杀
        case "miaosha":
          this.clsList = null;
          this.sectionList = null;
          this.currentPage = null;
          document.title = "秒杀";
          this.banner = require("@/assets/images/cate/dis.jpg");
          this.goodsType = "miaosha";
          seckill({
            tid: this.$route.query.key
          }).then(res => {
            let list = this.$xm.goodsFor(res.list, 300);
            this.list = list;
            this.menuList = res.nav;
            // 判断开始还是结束
            if (res.now > res.info.start_time) {
              //即将结束
              this.time = this.$xm.timeDifference(res.now, res.info.end_time);
              this.time.screen = "over";
            } else {
              //即将开始
              this.time = this.$xm.timeDifference(res.now, res.info.start_time);
              this.time.screen = "will";
            }
          });

          break;
        // 直播
        case "player":
          this.clsList = null;
          this.sectionList = null;
          this.currentPage = null;
          specialData().then(res => {
            let list = this.$xm.goodsFor(res.list, 300);
            this.list = list;
            this.menuList = res.nav;
          });
          this.banner = require("@/assets/images/cate/player.jpg");
          break;

        default:
          category({
            cls: this.id,
            p: this.currentPage.thispage,
            max_price: this.sectionList[this.sIndex].max,
            min_price: this.sectionList[this.sIndex].min
          }).then(res => {
            if (res.list) {
              this.type = "goods";
              let list = this.$xm.goodsFor(res.list, 300);
              this.list = list;
              this.currentPage = {
                thispage: res.other.thispage,
                totalPage: res.other.thispage,
                total: Number(res.other.total)
              };
              this.banner = res.other.rec_pic;
              this.clsList = res.sub_cls;
              console.log(res.nav);
              this.menuList = res.nav;
            } else {
              this.list = null;
            }
          });
      }
      setTimeout(res => {
        this.spinShow = false;
      }, 300);
    },
    /**
     *功能：选中价格区间
     *时间：2020年05月01日 16:09:39
     *作者：钟婉婷
     */
    bindSection(index) {
      this.sIndex = index;
      this.cls = "";

      this.currentPage = {
        thispage: 1
      };
      this.loadData();
    },
    /**
     *功能：选中商品分类
     *时间：2020年05月01日 16:08:30
     *作者：钟婉婷
     */
    bindCls(id) {
      if (this.type) {
        this.id = id;
      } else {
        this.cls = id;
      }
      this.sIndex = 0;
      this.currentPage = {
        thispage: 1
      };
      this.loadData();
    },
    /**
     *功能：选择折扣
     *时间：2020年05月03日 10:31:56
     *作者：钟婉婷
     */
    bindDis(e) {
      this.cls = "";
      this.sIndex = 0;
      this.dIndex = e;
      this.loadData();
    },
    /**
     *功能：跳转页面
     *时间：2020年04月21日 13:29:03
     *作者：钟婉婷
     */
    bindPage(e) {
      this.currentPage.thispage = e;
      this.loadData();
      this.backTop();
    },
    /**
     *功能：更新数据
     *时间：2020年05月01日 14:03:25
     *作者：钟婉婷
     */
    update() {
      console.log(this.sIndex);
      this.loadData();
    },
    /**
     *功能：回到顶部
     *时间：2020年05月01日 14:03:09
     *作者：钟婉婷
     */
    backTop() {
      let nowTop =
        document.body.scrollTop || document.documentElement.scrollTop; // 获取当前滚动条位置
      if (nowTop > 0) {
        window.requestAnimationFrame(this.backTop);
        window.scrollTo(0, nowTop - nowTop / 5);
      }
    },
    watchScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 550) {
        this.navBarFixed = true;
      } else {
        this.navBarFixed = false;
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
/deep/.uni-countdown__splitor {
  justify-content: center;
  line-height: 30px;
  padding: 0 2px;
  font-size: 14px;
  font-weight: bold;
}

/deep/.uni-countdown__number {
  line-height: 26px;
  justify-content: center;
  width: 36px;
  height: 30px;
  font-weight: bold;
  font-size: 20px;
  border-radius: 0;
  margin: 0 2px;
  border: 1px solid #000;
  padding: 0 5px;
  background-color: #333333;
}
</style>
