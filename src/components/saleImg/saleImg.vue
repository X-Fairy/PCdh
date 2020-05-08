<template>
  <div class="saleImg">
    <img :src="item.image" alt="" srcset="" v-for="(item,index) in content" :key="index" v-if="item.image" class="cursor" @click="bindImg(item.image)">
  </div>
</template>

<script>
export default {
  name: "saleImg",
  data() {
    return {};
  },
  props: {
    //批发价
    content: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  mounted() {},
  methods: {
    bindImg(pic){
      window.open(pic);
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
.saleImg {
  display: flex;
  flex-wrap: wrap;
  width: 140px;
}
img {
  width: 60px;
  height: 60px;
  margin: 2px;
}
</style>
