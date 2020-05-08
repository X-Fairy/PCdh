<template>
  <div class="pages">
    <div></div>
    <Page :total='content.total' :page-size="20" :current='content.thispage' show-total show-elevator @on-change="changPage" />
  </div>
</template>

<script>
export default {
  name: "topPage",
  props: {
    //批发价
    content: {
      type: Object,
      default: ""
    }
  },
  methods:{
    changPage(e){
      this.$emit('change',e)
    }
  }
};
</script>

<style lang="less" scoped>
.pages {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
</style>
