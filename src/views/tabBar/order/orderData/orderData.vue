<template>
  <div class="order">
    <orderNavBar title="订单详情"></orderNavBar>
    <div class="orderData">
      <div class="time m_text16" v-if="data.info">
        {{data.info.oper_date}} 订单已提交，订单总金额：￥{{data.info.yhh_amt}}，等待客服确认
      </div>
      <Table :columns="columns" :data="data.list" ></Table>
    </div>
  </div>
</template>

<script>
import orderNavBar from "@/components/orderNavBar/orderNavBar.vue";
import { orderView } from "@/api";
export default {
  components: {
    orderNavBar
  },
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
              <div class="tdBorder goods" style="display:flex;align:center;" onClick={() => this.rowClick(row)} >
                <img
                  src={row.image}
                  alt=""
                  srcset=""
                  class="tdImg" 
                  style="width: 80px; height: 80px; margin: 0 10px;  padding: 10px"                                 
                />
                <div class="card">
                  <div class="m_text14 text-hide2">{row.item_name}</div>
                  <div class="m_text14 code">{row.item_no}</div>                  
                </div>
              </div>
            );
            // return h(
            //   "div",
            //   {
            //     style: {
            //       display: "flex",
            //       "align-items": "center",
            //       "text-align": "center"
            //       // "border-left": "1px solid #e6e6e6"
            //     },
            //   },
              
            //   [
            //     h("img", {
            //       style: {
            //         cursor: "pointer",
                    // width: "80px",
                    // height: "80px",
                    // margin: "0 20px",
                    // padding: "10px"
            //       },
            //       attrs: {
            //         //设置属性
            //         src: row.image ? row.image : ""
            //       },
            //       domProps: {
            //         title: row.image ? this.image : ""
            //       },
            //       on: {
            //         click: () => {
            //           const { href } = this.$router.resolve({
            //             name: "details",
            //             query: {
            //               code: row.item_no
            //             }
            //           });
            //           window.open(href, "_blank");
            //           // window.open(row.image);

            //         }
            //       }
            //     }),
            //     h("div", {
            //       domProps: {
            //         innerHTML: row.item_name
            //       },
                  
            //     }),
                
            //   ]
            // );
          }
        },
        // {
        //   title: "条码",
        //   key: "item_no",
        //   align: "center"
        // },

        {
          title: "单价",
          key: "base_price",
          align: "center",
          render: (h, { row }) => {
            return (
              <div>
                <div title="批发价" class="m_text14">
                  ￥{row.base_price}
                </div>
                {row.base_price != row.price && (
                  <em class="x-ling ling m_text14" title="销售价">
                    ￥{row.price}
                  </em>
                )}
              </div>
            );
          }
        },
        {
          title: "购买数量",
          key: "real_qty",
          align: "center"
        },
        {
          title: "小计",
          key: "sub_amt",
          align: "center",
          render: (h, { row }) => {
            return (
              <div>
                <div  class="m_text14">
                  ￥{row.sub_amt}
                </div>
                {row.sub_amt != row.yh_sub && (
                  <em class="x-ling ling m_text14">
                    ￥{row.yh_sub}
                  </em>
                )}
              </div>
            );
          }
        },
         {
          title: "备注",
          key: "memo",
          align: "center"
        },

      ],
      data: []
    };
  },
  mounted() {
    // localStorage.setItem("order", null);
    this.loadData(this.$route.query.id);
  },
  methods: {
    loadData(id) {
      orderView({
        sn: id
      }).then(res => {
        if (res.list) {
          let list = res.list;
          list.forEach(function(item, index) {
            item.image =
              "https://ximiphoto.oss-cn-hangzhou.aliyuncs.com/thumb/" +
              item.item_no +
              ".jpg?x-oss-process=style/300";
          });
          this.data = res;
        }
      });
    },
    rowClick(data){
      console.log(data);
      const { href } = this.$router.resolve({
        name: "details",
        query: {
          code: data.item_no
        }
      });
      window.open(href, "_blank");
    }
  }
};
</script>

<style lang="less" scoped>
.orderData {
  .time {
    padding: 20px;
  }
}
</style>
