<template>
  <div class="box">
    <div class="card">
      <div class="title">
        <div class="m_text35">订单提交成功！</div>
        <div class="btn cursor" @click="navTo">订单列表</div>
      </div>
      <div class="goods">
        <div class=" m_text14">订单号：</div>
        <div class=" m_text14">商品总数：</div>
        <div class=" m_text14">订单金额：</div>
      </div>
      <div class="goodsInfo" v-if="info">
        <div class="code">
          <div v-for="(item,index) in no" :key="item">{{item}}</div>
        </div>
        <div class="num"> <span class="m_text35">{{info.qty}}</span> 件</div>
        <div class="price">实付金额：<span class=" cc1">￥{{info.sheet_amt}}</span> 元</div>
      </div>
    </div>
  </div>

</template>

<script>
import { cartSuc } from "@/api";
export default {
  data() {
    return {
      info: null,
      no:null
    };
  },
  mounted() {
    this.loadData(this.$route.query.key);
  },
  methods: {
    loadData(id) {
      cartSuc({
        sheet_no: id
      }).then(res => {
        this.info = res.info;
        this.no = res.list;
      });
    },
    navTo() {
      this.$router.push({
        name: "orderData",
        query: {
          id: this.no
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
