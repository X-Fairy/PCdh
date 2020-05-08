<template>
  <div class="cateGory box ">
    <div class="navbor">
      <menus :list="menuList" :url="menuURL" v-if="menuList"></menus>
      <div class="m_text18">{{size}}</div>
    </div>

    <div class="content">
      <ul class="temp">
        <li v-for="(item, index) in list" :key="index" v-if="list">
          <goods :img='item.image' :code='item.item_no' :name='item.item_name' :price='item.price' :ling='item.ling' :value='item.spec'
            :step='item.spec' :min="item.spec" :cnum="item.cnum" :dis="item.dis"></goods>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import numberbox from "@/components/number-box/number-box.vue";
import priceView from "@/components/priceView/priceView.vue";
import goods from "@/components/goods/goods.vue";
import menus from "@/components/menu/menu.vue";
import { search } from "@/api";
export default {
  components: {
    numberbox,
    priceView,
    menus,
    goods
  },
  data() {
    return {
      list: null,
      current: null,
      navBarFixed: false,
      key: "",
      thispage: "",
      menuURL: "search",
      size: null,
      menuList: null
    };
  },
  mounted() {
    this.key = this.$route.query.id;
    this.loadData();
    window.addEventListener("scroll", this.watchScroll);
    document.title = "搜索“" + this.key + "”结果";
  },
  methods: {
    loadData() {
      search({
        ser_key: this.key
      }).then(res => {
        let list = this.$xm.goodsFor(res.list, 300);
        this.thispage = res.other.thispage;
        this.list = list;
        this.menuList = res.nav;
        this.size = res.other.thispage;
      });
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
    },
    nav(url, id) {
      this.$router.push({ name: url, params: { Id: id } });
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
