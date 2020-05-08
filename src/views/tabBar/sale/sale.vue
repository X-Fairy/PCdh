<template>
  <div class="sale">
    <div class="routerHeard">
      <div class="left">售后服务</div>
      <div class="right">
        <span class="tit" @click="bindNav('add')">申报产品</span>
        <span @click="bindNav('declare')">寄回产品</span>
      </div>
    </div>
    <Table :columns="columns" :data="data"></Table>
    <topPage :content="currentPage" @change="bindPage"  v-if="currentPage&&currentPage.totalPage!=1"></topPage>
  </div>
</template>

<script>
import { saleList,saleDel } from "@/api";
import topPage from "@/components/topPage/topPage.vue";
export default {
  components:{
    topPage
  },
  data() {
    return {
      columns: [
        {
          title: "申请日期",
          align: "center",
          key: "sqrq"
        },
        {
          title: "售后类型",
          align: "center",
          key: "lx"
        },
        {
          title: "数量",
          align: "center",
          key: "qty"
        },
        {
          title: "审核状态",
          align: "center",
          key: "type",
          render: (h, { row }) => {
            let text1 = "";
            let text2 = "";
            let color = "#333";
            if (row.wt == "1" && row.yt == "2") {
              text1 = "部分通过";
            } else if (row.shsj != "" && row.yt && row.wt != "1") {
              text1 = "通过";
              color = "#093";
            } else if (row.wt == "1" && row.yt != "2") {
              text1 = "全部拒绝";
              color = "#ff0000";
            } else if (!row.wt && !row.yt) {
              text1 = "待审核";
            } else {
              text1 = "未知";
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
                    title: text1
                  },
                  on: {
                    click: () => {
                      this.handleId = row.id;
                      switch (text1) {
                        case "通过":
                          this.handle(2); // 通过
                          break;
                        case "需退货":
                          this.returnGoods(1); // 需退货
                          break;
                        case "撤销":
                          this.revoke(1); // 撤销
                          break;
                      }
                    }
                  }
                },
                text1
              ),
              h(
                "span",
                {
                  style: {
                    cursor: "pointer"
                  },
                  class: "refuse_icon",
                  domProps: {
                    title: text2
                  },
                  on: {
                    click: () => {
                      this.handleId = row.id;
                      switch (text2) {
                        case "拒绝":
                          this.modal1 = true; // 拒绝
                          break;
                        case "不退货":
                          this.returnGoods(2); // 不退货
                          break;
                        case "撤销":
                          this.revoke(); // 撤销
                          break;
                      }
                    }
                  }
                },
                text2
              )
            ]);
          }
        },
        {
          title: "进度",
          align: "center",
          key: "zt"
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
                    innerHTML: "明细和进度 |"
                  },
                  on: {
                    click: () => {
                      this.navDetails(row);
                    }
                  }
                }),
                h("span", [
                  h(
                    "Poptip",
                    {
                      class: "handle",
                      props: {
                        confirm: true,
                        transfer: true,
                        placement: "top",
                        title: "确定要撤销该订单吗 ?",
                        type: "error",
                        size: "small",
                        width: "150",
                        vModel: true
                      },
                      domProps: {
                        title: "撤销订单"
                      },
                      style: {
                        cursor: "pointer"
                      },
                      on: {
                        "on-ok": () => {
                          // 确定删除
                          this.deleteOrder(row);
                        }
                      }
                    },
                    [
                      h("span", {
                        domProps: {
                          innerHTML: "撤销"
                        }
                      })
                    ]
                  )
                ])
              ]
            );
          }
        }
      ],
      data: [],
      currentPage:{
        thispage:1
      }
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    /**
     *功能：获取列表
     *时间：2020年01月04日 13:39:08
     *作者：钟婉婷
     */
    loadData() {
      saleList({
        p: this.currentPage.thispage
      }).then(res => {
        this.data = res.list;
        res.other.total=Number(res.other.total)
        res.thispage=Number(res.other.thispage)
        this.currentPage=res.other
      });
    },
    /**
     *功能：跳转页面
     *时间：2020年01月04日 13:39:23
     *作者：钟婉婷
     */
    bindNav(id) {
      this.$router.push({
        name: id
      });
      this.$store.dispatch("upIndex", id);
    },
    /**
     *功能：跳转详情
     *时间：2020年01月04日 13:42:01
     *作者：钟婉婷
     */
    navDetails(row) {
      this.$router.push({ name: "saleData", query: { mid: row.id } });
    },
    deleteOrder(row){
      saleDel({
        mid:row.id
      }).then(res=>{
        if(res==1){
           this.$Message.success("撤销成功");
           this.currentPage.thispage=1
           this.loadData()
        }else{
          this.$Message.error(res);
        }
      })
    },
    bindPage(e){
      this.currentPage.thispage=e;
      this.loadData()
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
    .tit {
      margin-right: 40px;
    }
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
