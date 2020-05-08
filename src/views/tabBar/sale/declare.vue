<template>
  <div class="sale">
    <div class="routerHeard">
      <div class="left">
        寄回产品
      </div>
    </div>
    <Table :columns="columns" :data="data"></Table>
    <topPage :content="currentPage" @change="bindPage" v-if="currentPage&&currentPage.totalPage!=1"></topPage>
  </div>
</template>

<script>
import { sh_express_list } from "@/api";
import topPage from "@/components/topPage/topPage.vue";
export default {
  components: {
    topPage
  },
  data() {
    return {
      columns: [
        {
          title: "寄回日期",
          align: "center",
          key: "addtime"
        },
        {
          title: "物流公司",
          align: "center",
          key: "express_name"
        },
        {
          title: "物流单号",
          align: "center",
          key: "express_number",
          width: "200"
        },
        {
          title: "进度",
          align: "center",
          key: "status",
          render: (h, { row }) => {
            var t_html, color;
            if (row.status == "0") {
              t_html = "未处理";
              color = "#ff0000";
            } else if (row.status == "1") {
              t_html = "已清点";
              color = "#093";
            } else if (row.status == "2") {
              t_html = "完成";
              color = "#093";
            } else {
              t_html = "未知";
            }
            return h("div", [
              h(
                "span",
                {
                  style: {
                    cursor: "pointer",
                    color: color
                  },
                  class: "refuse_icon",
                  domProps: {
                    title: t_html
                  }
                },
                t_html
              )
            ]);
          }
        },
        {
          title: "操作时间",
          align: "center",
          key: "oper_date",
          render: (h, { row }) => {
            return (
              <div>
                {!row.oper_date && <div></div>}
                {row.oper_date && <div>{row.oper_date}</div>}
              </div>
            );
          }
        },
        {
          title: "操作",
          align: "center",
          render: (h, { row }) => {
            return h(
              "div",
              {
                style: {
                  color: "#1d8c9f"
                }
              },
              [
                h("span", {
                  style: {
                    cursor: "pointer"
                  },
                  class: "refuse_icon",
                  domProps: {
                    innerHTML: "明细"
                  },
                  on: {
                    click: () => {
                      console.log(row);
                      this.$router.push({
                        name: "devData",
                        query: {
                          mid: row.id
                        }
                      });
                    }
                  }
                })
              ]
            );
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
      sh_express_list({
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
  .right {
    cursor: pointer;
    font-family: SourceHanSansCN-Light;
    font-size: 14px;
    color: #ff9902;
  }
}
/deep/.ivu-table-header {
  border-bottom: solid 1px #e6e6e6;
}
/deep/.ivu-table-header th {
  height: 50px;
  background-color: white;
  border: none;
  margin-bottom: 120px;
}
/deep/.ivu-table td,
.ivu-table th {
  border-bottom: 1px dashed #e8eaec;
}
/deep/.ivu-table .ivu-table-body table {
  border-collapse: collapse;
  padding: 20px;
}
</style>
