<template>
  <div class="sale">
    <div class="routerHeard">
      <div class="left">
        明细
      </div>
    </div>
    <div class="info m_text16" v-if="info">
      <div class="m_text16">
        售后编号:{{info.shsn}}
      </div>
      <div class="m_text16">
        售后类型:{{info.lx}}
      </div>
      <div class="m_text16">
        数量:{{info.qty}}
      </div>
      <div class="m_text16">
        审核状态:{{data[0]?data[0].stat_html:''}}
      </div>
      <div class="m_text16">
        进度:{{info.zt}}
      </div>
    </div>
    <Table :columns="columns" :data="data" v-if="data"></Table>

  </div>
</template>

<script>
import { saleView } from "@/api";
import saleImg from "@/components/saleImg/saleImg.vue";
export default {
  components: {
    saleImg
  },
  data() {
    return {
      columns: [
        {
          title: "商品",
          key: "item_name",
          align: "center",
          width: "300px",
          render: (h, { row }) => {
            return (
              <div class="tdBorder">
                <img
                  v-lazy={row.image}
                  alt=""
                  srcset=""
                  class="tdImg cursor"
                  onClick={() => this.navDetails(row.code)}
                />
                <div class="card">
                  <div class="m_text14 text-hide2">{row.item_name}</div>
                  <div class="m_text14 code">{row.item_no}</div>
                </div>
              </div>
            );
          }
        },

        {
          title: "数量",
          align: "center",
          key: "qty"
        },
        {
          title: "理由",
          align: "center",
          key: "reason"
        },
        {
          title: "上传图片",
          align: "center",
          key: "pics",
          render: (h, { row }) => {
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  "align-items": "center",
                  "text-align": "center",
                  "justify-content": "center",
                  width: "140px"
                }
              },
              [
                h(saleImg, {
                  props: {
                    content: row.pics
                  }
                })
              ]
            );
          }
        },
        {
          title: "审核情况",
          align: "center",
          key: "stat_html"
        }
      ],
      data: [],
      info: null
    };
  },
  mounted() {
    console.log(this.$route.params.mid);
    this.loadData(this.$route.query.mid);
  },
  methods: {
    loadData(id) {
      saleView({
        mid: id
      }).then(res => {
        var stat_html;
        if (res.list) {
          res.list.forEach(item => {
            if (item.status == "0") {
              item.stat_html = "未审";
            } else if (item.status == "1") {
              item.stat_html = "拒绝理由：" + item.jjreason + "";
            } else {
              item.stat_html = "通过";
              if (item.isreturn == "2") {
                item.stat_html += "：此款无需退货";
              }
            }
            let list = item.pics;
            if (list) {
              list.forEach(item => {
                item.image =
                  "http://img.xmvogue.com/shouhou/" +
                  this.$store.state.user.userInfo.hdid +
                  "/" +
                  item.filename +
                  "?x-oss-process=style/300";
              });
            }
          });
          res.info.stat_html = stat_html;
        }

        this.info = res.info;
        this.data = this.$xm.goodsFor(res.list);
      });
    },
    navDetails(code) {
      const { href } = this.$router.resolve({
        name: "details",
        query: {
          code: code
        }
      });
      window.open(href, "_blank");
    }
  }
};
</script>

<style lang="less" scoped>
.info {
  display: flex;
  height: 40px;
  background-color: #ffffff;
  padding: 0 40px;
  align-items: center;
  justify-content: space-between;
  font-family: SourceHanSansCN-Light;
  color: #333333;
}
.routerHeard {
  height: 40px;
  line-height: 40px;
  background-color: #f7f8f9;
  border-bottom: solid 1px #e6e6e6;
  font-family: SourceHanSansCN-Light;
  font-size: 16px;
  color: #333333;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
}
</style>
