<template>
  <div class="priceView">
    <div class="price m_text16">
     配送价￥
      <span class="num m_text18">{{price}}</span>
    </div>
    <div class="m_text18">零售￥{{ling}}</div>
  </div>
</template>

<script>
export default {
    name:'priceView',
    props:{
      //批发价
    price: {
      type: String,
      default: '1'
    },
    // 销售价
    ling: {
      type: String,
      default: '1'
     },
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
