<template>
  <div>
    <Spin fix>
      <Icon type="ios-loading" size=40 class="demo-spin-icon-load"></Icon>
      <!-- <div class="title">...</div> -->
    </Spin>
  </div>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.loading {
  position: absolute;
  bottom: 0;
   top: 0;
  width: 100%;
  height: 100%;
}
.title{
  font-size: 30px;
}
/deep/ .ivu-spin-fix {
  background:rgba(255,255,255,0.3);
}

.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
</style>
