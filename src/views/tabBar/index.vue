<template>
  <div class="order">
    <div class="box">
      <!-- 导航 -->
      <div class="menu">
        <div v-for="(item, index) in navList" :key="index" class="left_n">
          <div class="title m_text19 ">{{item.name}}</div>
          <div v-for="(eve, k) in item.items" :key="k" class="items m_text15" @click="bindNav(eve.id)" :class="{
            required: item.id == 'technology',
            active: current == eve.id
          }">{{ eve.name }}</div>
        </div>
      </div>
      <!-- 子页面 -->
      <div class="child">
        <div class="card">
          <router-view></router-view>
        </div>
        <!-- 优惠券规则 -->
        <div v-if="current=='discount'" class="dis_rule">
          <div class="ruleLeft">
            <div class="m_text16 cc1">优惠券领取使用规则：</div>
            <div class="m_text14">1.每日签到，累计签到3天可领取<打卡达人优惠券>5元券，6天可领取<打卡达人优惠券>15元券；</div>
            <div class="m_text14">2.每日关注首页-优惠券板块，定期活动主题优惠券限时领取；</div>
          </div>
          <div class="ruleRight">
            <div class="ruleBtn cursor" @click="bindSign">签到领券</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { user_sign } from "@/api";
export default {
  data() {
    return {
      navList: [
        {
          name: "个人中心",
          items: [
            {
              id: "uservip",
              name: "VIP权益"
            },
            {
              id: "userInfo",
              name: "门店资料"
            },
            {
              id: "technology",
              name: "极速找网管"
            },
            {
              id: "discount",
              name: "我的优惠券"
            }
          ]
        },
        {
          name: "订单管理",
          items: [
            {
              id: "reverse",
              name: "待确定订单"
            },
            {
              id: "presell",
              name: "预售订单"
            },
            {
              id: "confirmed",
              name: "已确定订单"
            }
          ]
        },

        {
          name: "售后服务",
          items: [
            {
              id: "add",
              name: "申请售后"
            },
            {
              id: "sale",
              name: "售后记录"
            },
            {
              id: "result",
              name: "寄回产品"
            },
            {
              id: "declare",
              name: "寄回产品记录"
            }
          ]
        }
      ]
    };
  },
  mounted() {
    this.$store.dispatch("upIndex", this.$route.name);
  },
  computed: {
    ...mapState({
      current: state => state.order.current
    })
  },
  methods: {
    // 跳转路由
    bindNav(id) {
      this.$router.push({
        name: id
      });
      this.$store.dispatch("upIndex", id);
    },
    /**
     *功能：签到
     *时间：2020年05月02日 13:39:35
     *作者：钟婉婷
     */
    bindSign() {
      user_sign({
        src: "PC"
      }).then(res => {
        if (res.res == "success") {
          this.$Message.success("签到成功");
        } else {
          this.$Message.success("今日已签到");
        }
      });
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
.dis_rule {
  width: 100%;
  height: 150px;
  background-color: #f7f8f9;
  border: solid 1px #e6e6e6;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  .ruleLeft {
    .m_text14 {
      margin-top: 10px;
    }
  }
  .ruleRight {
    display: flex;
    align-items: center;
    .ruleBtn {
      width: 130px;
      height: 40px;
      background-color: #1d8c9f;
      border-radius: 5px;
      color: white;
      line-height: 40px;
      text-align: center;
    }
  }
}
/deep/.ivu-table-header {
  border-top: solid 1px #e6e6e6;
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
/deep/ .ivu-table-cell {
  span,
  div {
    font-size: 14px;
  }
}

/deep/ .tdBorder {
  display: flex;
  align-items: center;
  justify-content: center;
  .ling {
    color: #999999;
  }
  .input {
    width: 80px;
  }
  .time {
    display: flex;
    align-items: center;
    height: 26px;
  }

  .card {
    text-align: left;
  }

  .code {
    margin: 1px 0;
  }

  .org {
    color: #e31931;
  }

  .tdImg {
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }
}
</style>
