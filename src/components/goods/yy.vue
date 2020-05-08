<template>
  <div class="goods">
    <div class="t_items " :class="{'itemsActive':current==code}" @mouseenter="enter(code)" @mouseleave="leave()">
      <div class="top cursor" @click="navDetails(code)">
        <img v-lazy="img" alt srcset title="查看详情" />
      </div>
      <div :class="{'centerActive':current==code}" v-if="animation" class="goodsBox">
        <priceView :price="price" :ling="ling"></priceView>
        <div class="num m_text16">
          {{code}}
        </div>
        <div class="bottom text-hide m_text15" :title="name">{{name}}</div>
        <div v-if="numbox">
          <div class="cart" v-show="current==code">
            <numberbox :ButtonShow="ButtonShow" :value='value' :step='step' :code="code" :min="step" :cnum="cnum" :type="type" :url="url"></numberbox>
          </div>
        </div>
        <div v-else>
          <div class="cart">
            <numberbox :ButtonShow="ButtonShow" :value='value' :step='step' :code="code" :min="step" :cnum="cnum" :type="type" :url="url"></numberbox>
          </div>
        </div>
      </div>
      <div class="goodsBox" v-else>
        <priceView :price="price" :ling="ling"></priceView>
        <div class="num m_text16">
          {{code}}
        </div>
        <div class="bottom text-hide m_text16" :title="name">{{name}}</div>
        <div v-if="numbox">
          <div class="cart" v-show="current==code">
            <numberbox :ButtonShow="ButtonShow" :value='value' :step='step' :code="code" :min="step" :cnum="cnum" :type="type" :url="url"></numberbox>
          </div>
        </div>
        <div v-else>
          <div class="cart">
            <numberbox :ButtonShow="ButtonShow" :value='value' :step='step' :code="code" :min="step" :cnum="cnum" :type="type" :url="url"></numberbox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numberbox from "@/components/number-box/number-box.vue";
import priceView from "@/components/priceView/priceView.vue";
export default {
  name: "goods",
  components: {
    numberbox,
    priceView
  },
  data() {
    return {
      current: null
    };
  },
  props: {
    index: {
      type: Number,
      default: 0
    },
    img: {
      type: String,
      default: ""
    },
    code: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    price: {
      type: String,
      default: "1"
    },
    ling: {
      type: String,
      default: "1"
    },
    value: {
      type: Number,
      default: 1
    },
    step: {
      type: Number,
      default: 1
    },
    animation: {
      type: Boolean,
      default: true
    },
    numbox: {
      type: Boolean,
      default: true
    },
    cnum: {
      type: Number,
      default: 0
    },
    //是否显示按钮
    ButtonShow: {
      type: Boolean,
      default: true
    },
    //类型
    type: {
      type: Boolean,
      default: false
    },
    url: {
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
