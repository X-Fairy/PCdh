<template>
  <div>
    <div class="goods animated fadeIn" v-if="key=='goods'">
      <div class="t_items" :class="{'itemsActive':current==code}" @mouseenter="enter(code)" @mouseleave="leave()">
        <div class="top cursor" @click="navDetails(code)">
          <img v-lazy="img" alt srcset title="查看详情" />
        </div>
        <div class="animationNum centerActive">
          <div class="num m_text16" style=" background-color: #f3f3f3;">
            <span class="s1">{{code}}</span>
            <span class="s2">{{name}}</span>
          </div>
          <div class="numberbox">
            <div class="numberLeft">
              <div v-if="dis" style="display:flex;align-items: center;">
                <div class="disnum m_text15">{{dis}}折</div>
                <div class="dis"></div>
                <div class="price m_text16">￥{{price}}</div>
              </div>
              <div v-else style="margin-left: 5px">
                <span v-if="!dis" class="ling  m_text15">配送价</span>
                <span class="price m_text16">￥{{price}}</span>
              </div>
              <div class="ling m_text15">
                零售￥{{ling}}
              </div>
            </div>
            <div class="cartBtn cursor" @contextmenu.prevent="show">
              <img src="@/assets/images/cartSub.png" alt="" class="cartImgB" v-if="num!=0" @click="subCart" title="减少商品数量">
              <img src="@/assets/images/cartAdd.png" alt="" srcset="" class="cartImgA" @click="addCart" title="添加购物车">
              <div class="cartText">{{num=="0"||num==""?"":num}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="group" v-if="key=='presell'||key=='miaosha'" :class="{'itemsActive':current==code}" @mouseenter="enter(code)" @mouseleave="leave()">
      <div class="group_items">
        <div class="group_img cursor" @click="navDetails(code)">
          <img v-lazy="img" alt srcset />
        </div>
        <div class="group_info">
          <div class="group_bottom text-hide">{{name}}</div>
          <Progress :percent="percent" :hide-info="false" stroke-color="#e1251b" />
          <div class="group_cart">
            <div>
              <div style="display:flex;justify-content: space-between;">
                <div class="cc1 m_text14" style="margin-right:8px;">{{key=='miaosha'?'秒杀价':'配送价'}}
                  <span class="cc1 m_text16">￥{{key=='miaosha'?miao_price:price}}</span>
                </div>
                <div v-if="key=='miaosha'" class="m_text14 group_text">
                  原价<span class="group_text m_text14 x-ling">￥{{base_price}}</span>
                </div>
                <div class="group_text m_text14" v-else>零售￥{{ling}}</div>
              </div>
              <div class="date">
                <div class="end-date" v-if="endDate!=''">截止:{{endDate}}</div>
                <div class="arrvial-daye" v-if="arrvialDate!=''">到货:{{arrvialDate}}</div>
              </div>
            </div>            
            <div class="group_Btn cursor" @contextmenu.prevent="show">
              <img src="@/assets/images/cartSub.png" alt="" class="group_ImgB" v-if="num!=0" @click="subCart" title="减少商品数量">
              <img src="@/assets/images/cartAdd.png" alt="" srcset="" class="group_ImgA" @click="addCart" title="添加购物车">
              <div class="group_Text">{{num=="0"||num==""?"":num}}</div>
            </div>
            
            <!-- <div class="group_btn cursor" @click="addCart">马上抢</div> -->
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numberbox from "@/components/number-box/number-box.vue";
import priceView from "@/components/priceView/priceView.vue";
import {
  cartData,
  subGood,
  cartUpdata,
  cartUpdate,
  delGoods,
  addPresell,
  subMs
} from "@/api";
export default {
  name: "goods",
  components: {
    numberbox,
    priceView
  },
  data() {
    return {
      current: null,
      num: this.cnum,
      key: this.type
    };
  },
  props: {
    // 当前选中
    index: {
      type: Number,
      default: 0
    },
    // 图片
    img: {
      type: String,
      default: ""
    },
    // 条码
    code: {
      type: String,
      default: ""
    },
    // 品名
    name: {
      type: String,
      default: ""
    },
    // 批发价
    price: {
      type: String,
      default: ""
    },
    // 销售价
    ling: {
      type: String,
      default: ""
    },
    // 规格
    value: {
      type: Number,
      default: 1
    },
    // 规格
    step: {
      type: Number,
      default: 1
    },
    // 当前购物车数量
    cnum: {
      type: Number,
      default: 0
    },
    // 商品类型
    type: {
      type: String,
      default: "goods"
    },
    //是否显示按钮
    ButtonShow: {
      type: Boolean,
      default: true
    },
    // 进度条
    percent: {
      type: Number,
      default: 0
    },
    // 截止时间
    endDate:{
      type: String,
      default: ""
    },
    // 到货时间
    arrvialDate:{
      type: String,
      default: ""
    },
    // 当前页面
    url: {
      type: String,
      default: ""
    },
    dis: {
      type: String,
      default: ""
    },
    // 秒杀价格
    miao_price: {
      type: String,
      default: ""
    },
    // 秒杀原价
    base_price: {
      type: String,
      default: ""
    }
  },
  methods: {
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
    show() {
      // console.log(123);
    },
    subCart() {
      let value = this.num;
      let step = this.step;
      if (value == step) {
        let data = {
          code: this.code
        };
        delGoods(data).then(res => {
          if (res.result == "success") {
            this.num = 0;
            this.$Message.success("删除成功");
            this.$store.dispatch("update");
          }
        });
      } else {
        value = value - step;
        let data = {
          code: this.code,
          value: value
        };
        cartUpdate(data).then(res => {
          if (res.result == "success") {
            this.num = value;
            this.$Message.success("修改成功");
            this.$store.dispatch("update");
          } else {
            this.$Message.error(res.msg);
          }
        });
      }
    },
    // 添加购物车
    addCart() {
      let data = {
        code: this.code,
        value: this.step
      };
      if (this.key == "goods") {
        subGood({ max_buy: 40 }, data).then(res => {
          if (res.result == "success") {
            this.$Message.success("添加成功");
            this.$store.dispatch("update");
            this.num = this.step + this.num;
          } else {
            this.$Message.error(res.msg);
          }
        });
      } else if (this.key == "miaosha") {
        subMs({ max_buy: 40 }, data).then(res => {
          if (res.result == "success") {
            this.$Message.success("添加成功");
            this.$store.dispatch("update");
            this.$emit("change");
            this.num = this.step + this.num;
          } else {
            this.$Message.error(res.msg);
          }
        });
      } else if (this.key == "presell") {
        addPresell({ max_buy: 40 }, data).then(res => {
          if (res.result == "success") {
            this.$Message.success("添加成功");
            this.$store.dispatch("update");
            this.$emit("change");
            this.num = this.step + this.num;
          } else {
            this.$Message.error(res.msg);
          }
        });
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
