<template>
  <div class="menu">
    <Breadcrumb separator=">">
      <BreadcrumbItem v-for="(item,index) in navList" :key="index" :to="item.url">
        <Icon type="ios-home" size="24" v-if="item.title=='网站首页'"></Icon>
        {{item.title}}
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
export default {
  name: "menus",
  data() {
    return {
      num: 213,
      navList:this.list
    };
  },
  props: {
    list: {
      type: Array,
      default: null
    },
    url: {
      type: String,
      default: ""
    }
  },
  mounted() {
    if (this.list) {
      this.list.forEach(item => {
        if (item.title == "网站首页") {
          item.url = { name: "index"};
        } else {
          if (item.url) {
            let id = item.url;
            item.id = id;
            item.url = { path: this.url, query: { id: item.id } };
          } else {
            item.url = "";
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
// /deep/ .ivu-breadcrumb-item-link{
//   font-size:18px;
//   color:#1d8c9f !important;
// }

@media (min-width: 1200px) {
  .menu {
    margin: 15px 0;
  }
  /deep/ .ivu-breadcrumb-item-link {
    font-size: 16px !important;
  }
}
@media (max-width: 1200px) {
  .menu {
    margin: 1.227vw 0;
  }
  /deep/ .ivu-breadcrumb-item-link {
    font-size: 1.309vw !important;
  }
}
</style>
