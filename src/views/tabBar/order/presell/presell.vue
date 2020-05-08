<template>
  <div class="reverse">
    <orderNavBar title="预售订单"></orderNavBar>
    <div class="technology">
      <Table :columns="columns" :data="data"></Table>
    </div>
    <topPage :content="currentPage" @change="bindPage"   v-if="currentPage&&currentPage.totalPage!=1"></topPage>
  </div>
</template>

<script>
import orderNavBar from "@/components/orderNavBar/orderNavBar.vue";
import { presell_list } from "@/api";
import topPage from "@/components/topPage/topPage.vue";
export default {
  components: {
    orderNavBar,
    topPage
  },
  data() {
    return {
      columns: [
        {
          title: "申请日期",
          key: "oper_date",
          align: "center",
          width: "200"
        },
        {
          title: "订单号",
          align: "center",
          key: "sheet_no",
          width: "200"
        },
        {
          title: "收货仓库",
          align: "center",
          key: "buyer"
        },
        {
          title: "金额",
          align: "center",
          key: "sheet_amt"
        },
        {
          title: "状态",
          align: "center",
          key: "sheet_amt"
        },
        {
          title: "操作",
          align: "center",
          key: "sheet_amt",
          render: (h, { row }) => {
            return h("div", {
              style: {
                cursor: "pointer",
                color: "#1d8c9f"
              },
              domProps: {
                innerHTML: "明细"
              },
              on: {
                click: () => {
                  console.log(row);
                  this.$router.push({
                    name: "orderData",
                    query: {
                      id: row.sheet_no
                    }
                  });
                }
              }
            });
          }
        }
      ],
      data: [],
      currentPage: {
        thispage: 1
      }
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      presell_list({
        p: this.currentPage.thispage
      }).then(res => {
        this.data = res.list;
        res.other.total = Number(res.other.total);
        res.thispage = Number(res.other.thispage);
        this.currentPage = res.other;
      });
    },
    bindPage(e) {
      this.currentPage.thispage = e;
      this.loadData();
    }
  }
};
</script>

<style lang="less" scoped>

</style>
