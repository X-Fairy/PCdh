<template>
  <div class="sale">
    <div class="routerHeard">
      <div class="left">
        明细
      </div>
    </div>
    <div class="info" v-if="info">
      <div>
        寄货时间:{{info.addtime}}
      </div>
      <div>
        物流公司:{{info.express_name}}
      </div>
      <div>
        物流单号:{{info.express_number}}
      </div>
      <div>
        物流单号:{{info.stat_html}}
      </div>
      <div>
        进度:{{info.oper_date}}
      </div>
    </div>
    <Table :columns="columns" :data="data"></Table>

  </div>
</template>

<script>
import { sh_express_view } from "@/api";
export default {
  data() {
    return {
      columns: [
        {
          title: "商品",
          key: "item_name",
          align: "center",
          width: "350px",
          render: (h, { row }) => {
            return (
              <div class="tdBorder goods">
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
          title: "退回数",
          align: "center",
          key: "qdqty"
        },
        {
          title: "清点数",
          align: "center",
          key: "qty"
        },
        {
          title: "上账数",
          align: "center",
          key: "szqty"
        },
        {
          title: "退款额",
          align: "center",
          key: "amt"
        },
        {
          title: "备注",
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
      sh_express_view({
        mid: id
      }).then(res => {
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
    },
    open(img) {
      window.open(href, img);
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
  font-size: 14px;
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
