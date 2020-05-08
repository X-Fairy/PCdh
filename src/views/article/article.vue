<template>
  <div class="article box">
    <div class="content" v-if="info">
      <div class="title">
        {{info.title}}
      </div>
      <div class="card" v-html="info.contents">
        {{info.contents}}

      </div>
    </div>
  </div>

</template>

<script>
import { articles } from "@/api";
export default {
  components: {
    articles
  },
  data() {
    return {
      info: null
    };
  },
  mounted() {
    this.loadData(this.$route.query.key);
  },
  methods: {
    loadData(id) {
      articles({
        id: id
      }).then(res => {
        this.info = res.info;
        // let str = res.info.contents;
				// str.replace(/\<img/g, '<img style="max-width:100%;"')
				// eindex.content = str.replace(/\<img/g, '<img style="max-width:100%;"');

      });
    }
  }
};
</script>

<style lang="less" scoped>
.article {
  background-color: #fff;
  .content {
    border: 1px solid #EBEBEB;
    padding: 20px 40px;
    .title {
      text-align: center;
      font-size: 28px;
      margin:0 15px;
      padding: 15px 0;
      border-bottom: 1px solid #EBEBEB;
    }
    .card{
       margin:15px 0;
    }
  }
}
</style>
