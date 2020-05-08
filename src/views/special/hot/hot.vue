<template>
  <div class="hot" :style="specialList[status].banner" v-if="status">
    <div class="box" :style="specialList[status].top" v-if="status">
      <!-- 爆款 -->
      <div class="hots" v-if="status==0">
        <div class="goods-item" v-for="(item, index) in topList" :key="index">
          <img src="@/assets/images/special/hot-h.png" alt="" srcset="" class="corner">
          <div class="goods-info">
            <div class="hots-left">
              <div class="hots-text1">时尚金属款移动电源</div>
              <div class="hots-text2">小巧轻便，便于外出携带</div>
              <div class="price">￥<span class="num">55.00</span></div>
              <div class="btn">点击购买</div>
            </div>
            <div class="hots-right">
              <img src="@/assets/images/special/hot-img.png">
            </div>
          </div>
        </div>
      </div>
      <!-- 秒杀 -->
      <div class="ms" v-if="status==6">
        <div class="card" :style="specialList[status].hint">
          <div class="ms-left">
            <div class="time">10:00</div>
            <div class="text">
              <div>总场秒杀</div>
              <div>结束倒计时</div>
            </div>
            <downTime v-if="time" :day='time.day' :hour='time.hour' :minute='time.minute' :second='time.second' :show-colon="true"
              backgroundColor="#333" color="#fff" splitorColor="#fff"></downTime>
          </div>
          <div class="ms-right">
            <div class="ms-item" v-for="(item, index) in msList" :key="index">
              <div class="i-date">{{item.date}}</div>
              <div class="i-text">即将开始</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分类 -->
      <div class="navType" v-if="specialList[status].navType">
        <div class="nav-item cursor" v-for="(item,index) in typeList" :key="index" :style="specialList[status].navType" @click="navGo(item.id)">
          {{item.title}}
        </div>
      </div>
      <!-- 团购 -->
      <div class="group" v-if="status==2||status==6||status==7">
        <div v-for="(item, index) in items" :key="index" class="t_items">
          <div class="img">
            <img v-lazy="item.image" alt srcset />
          </div>
          <div>
            <div class="bottom text-hide2">{{item.item_name}}</div>
            <Progress :percent="item.percentNum" :hide-info="false" stroke-color="#e1251b" />
            <div class="cart">
              <div>
                <div class="text" v-if="status==2">当前进度{{item.pnum+item.cnum}}</div>
                <div class="text" v-if="status==2">总预售{{item.max_num}}</div>
              </div>
              <div class="ms-price" v-if="status==6||status==7">
                <div class="ms-num">￥<span class="p1">{{item.price}}</span><span class="p2">￥{{item.ling}}</span></div>
              </div>
              <div class="btn cursor" @click="bindYs(item.item_no,item.spec)">{{status==2?'支持':'马上抢'}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 商品 -->
      <ul class="temp" :style="specialList[status].border" v-else>
        <li v-for="(item, index) in items" :key="index">
          <goods :img='item.image' :code='item.item_no' :name='item.item_name' :price='item.price' :ling='item.ling' :value='item.spec'
            :step='item.spec' :min="item.spec" :animation="false" :numbox="false" :cnum="item.cnum" :dis="item.dis"></goods>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import goods from "@/components/goods/goods.vue";
import numberbox from "@/components/number-box/number-box.vue";
import priceView from "@/components/priceView/priceView.vue";
import downTime from "@/components/downTime/downTime.vue";
import {
  category,
  newGoods,
  buGoods,
  saleGoods,
  newShops,
  ruizi_live,
  PromotionMin,
  discountOff,
  discountOffs,
  everyday,
  addPresell
} from "@/api";
export default {
  components: {
    numberbox,
    priceView,
    downTime,
    goods
  },
  data() {
    return {
      typeList: [
        {
          id: "02",
          title: "健康美容",
          color: "#FF6F91",
          src: "icon-huazhuang"
        },
        {
          id: "04",
          title: "文体礼品",
          color: "#00C9AD",
          src: "icon-lipin"
        },
        {
          id: "09",
          title: "数码配件",
          color: "#4A9CFF",
          src: "icon-erji1"
        },
        {
          id: "06",
          title: "精品包饰",
          color: "#FF6960",
          src: "icon-bussiness"
        },
        {
          id: "05",
          title: "季节产品",
          color: "#996EC3",
          src: "icon-xiezi"
        },
        {
          id: "03",
          title: "饰品系列",
          color: "#FF6960",
          src: "icon-zhubaoshipin"
        },
        {
          id: "01",
          title: "家居用品",
          color: "#4A9CFF",
          src: "icon-beizi"
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
          id: "14",
          title: "物资耗料",
          color: "#4A9CFF",
          src: "icon-zhaohuo2press"
        }
      ],
      items: null,
      topList: [1, 2, 3, 4],
      status: null,
      specialList: [
        {
          title: "热卖爆款",
          banner: {
            backgroundImage:
              "url(" + require("@/assets/images/special/hot-b.png") + ")",
            backgroundRepeat: "repeat"
          },
          navType: {
            background:
              "linear-gradient(0deg, #f3d8c4 0%, #ffffff 100%),linear-gradient(#ffffff, #ffffff)",
            color: "#f71b4b"
          },
          border: {
            border: "solid 2px #ffffff",
            "box-shadow": " 0 0 10px #ffffff"
          }
        },
        {
          title: "今日必抢",
          banner: {
            backgroundImage:
              "url(" + require("@/assets/images/special/grab-b.png") + ")",
            backgroundRepeat: "repeat"
          },
          navType: {
            background:
              " linear-gradient(0deg, #ffa200 0%, #ffeb7e 100%), linear-gradient(#ffffff, #ffffff)",
            color: "#20458c"
          },
          border: {
            border: "solid 2px #ffffff",
            "box-shadow": " 0 0 10px #ffffff"
          }
        },
        {
          title: "众筹",
          banner: {
            backgroundImage:
              "url(" + require("@/assets/images/special/crowd-b.png") + ")",
            backgroundRepeat: "repeat"
          },
          top: "padding-top: 30vw;"
        },
        {
          title: "一折抢购",
          banner: {
            backgroundImage:
              "url(" + require("@/assets/images/special/dis-1.png") + ")",
            backgroundRepeat: "repeat"
          },
          border: {
            border: "solid 2px #ffffff",
            "box-shadow": " 0 0 10px #ffffff"
          }
        },
        {
          title: "新品首发",
          banner: {
            backgroundImage:
              "url(" + require("@/assets/images/special/new-b.png") + ")",
            backgroundRepeat: "repeat"
          },
          border: {
            border: "solid 2px #ffffff",
            "box-shadow": " 0 0 10px #ffffff"
          }
        },
        {
          title: "一个起订",
          banner: {
            backgroundImage:
              "url(" + require("@/assets/images/special/out-b.png") + ")",
            backgroundRepeat: "repeat"
          },
          navType: {
            background:
              " linear-gradient(0deg, #ff4718 0%, #ffcd6c 100%), linear-gradient(#ffffff, #ffffff)",
            color: "#ffffff"
          },
          border: {
            border: "solid 2px #ffffff",
            "box-shadow": " 0 0 10px #ffffff"
          }
        },
        {
          title: "秒杀",
          banner: {
            backgroundImage:
              "url(" + require("@/assets/images/special/ms-b.png") + ")",
            backgroundRepeat: "repeat"
          },
          hint: {
            backgroundImage:
              "url(" + require("@/assets/images/special/ms-ts.png") + ")",
            backgroundRepeat: "repeat"
          }
        },
        {
          title: "天天特价",
          banner: {
            backgroundImage:
              "url(" + require("@/assets/images/special/special-b.png") + ")",
            backgroundRepeat: "repeat"
          }
        },
        {
          title: "三折抢购",
          banner: {
            backgroundImage:
              "url(" + require("@/assets/images/special/dis-3.png") + ")",
            backgroundRepeat: "repeat"
          },
          border: {
            border: "solid 2px #ffffff",
            "box-shadow": " 0 0 10px #ffffff"
          }
        }
      ],
      time: null,
      msList: [
        {
          date: "12:00"
        },
        {
          date: "14:00"
        },
        {
          date: "16:00"
        },
        {
          date: "18:00"
        }
      ],
      cls: ""
    };
  },
  mounted() {
    if (this.status == 6) {
      this.timeDifference();
    }
    this.status = this.$route.query.id;
    // this.setBodyBackGround();
    this.loadData();
  },
  methods: {
    loadData() {
      let that = this;
      switch (this.status) {
        // 新品上线
        case "4":
          newGoods({
            p: "1",
            cls: this.cls
          }).then(res => {
            this.items = this.$xm.goodsFor(res.list, 300);
          });
          break;
        case "3":
          discountOff({
            p: 1,
            cls: this.cls
          }).then(res => {
            let list = this.$xm.goodsFor(res.list, 300);
            this.items = list;
          });
          break;
        case "8":
          discountOff({
            p: 1,
            cls: this.cls
          }).then(res => {
            let list = this.$xm.goodsFor(res.list, 300);
            this.items = list;
          });
          break;
        //天天特价
        case "7":
          everyday({
            p: 1,
            cls: this.cls
          }).then(res => {
            let list = this.$xm.goodsFor(res.list, 300);
            this.items = list;
          });
          break;
        // 全站畅销
        case "1":
          saleGoods({
            p: 1,
            cls: this.cls
          }).then(res => {
            let list = this.$xm.goodsFor(res.list, 300);
            this.items = list;
          });

          break;

        case "5":
          PromotionMin({
            p: 1,
            cls: this.cls
          }).then(res => {
            let list = this.$xm.goodsFor(res.list, 300);
            this.items = list;
          });
          break;
        // 预售
        case "2":
          ruizi_live().then(res => {
            let list = this.$xm.goodsFor(res.list, 300);
            list.forEach(item => {
              item.percentNum = this.GetPercent(
                item.pnum + item.cnum,
                item.max_num
              );
            });
            this.items = list;
          });
          break;
      }
      setTimeout(res => {
        this.spinShow = false;
      }, 300);
    },
    // 改变背景图片
    setBodyBackGround() {
      // document.body.style.backgroundSize = "100%";
      // document.body.style.backgroundRepeat = "no-repeat";
      // document.body.style.backgroundImage = this.specialList[
      //   this.status
      // ].banner.img;
    },
    // 清除背景图
    clearBodyBackGround() {
      document.body.style.backgroundImage = "";
    },
    GetPercent(num, total) {
      num = parseFloat(num);
      total = parseFloat(total);
      if (isNaN(num) || isNaN(total)) {
        return "-";
      }
      return total <= 0 ? "0" : Math.round((num / total) * 10000) / 100.0;
    },
    // 倒计时
    timeDifference(endTime) {
      endTime = "2020/4/10 13:20:00";
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
      this.time = time;
      return time;
    },
    bindYs(code,inputValue) {
      let data = {
        code:code,
        value:inputValue
      };
      addPresell({ max_buy: 40 }, data).then(res => {
        if (res.result == "success") {
          this.$Message.success("添加成功");
          this.$store.dispatch("update");
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    navGo(id) {
      this.cls = id;
      this.loadData();
    }
  },
  beforeDestroy() {
    // 离开页面的时候清除
    this.clearBodyBackGround();
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
