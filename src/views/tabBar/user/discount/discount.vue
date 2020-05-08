<template>
  <div>
    <!-- <orderNavBar title="我的优惠券"></orderNavBar> -->
    <div class="discount">
      <div class="header">
        <div class="header_item cursor m_text16" @click="bindNav(index)" v-for="(item,index) in navBar" :key="index"
          :class='[nIndex==index?"h_active":"h_lose"]'>
          {{item}}
        </div>
      </div>
      <div class="info m_text14" v-if="other">
        <span>{{navBar[nIndex]}}优惠券<em class="cc1">&nbsp;{{other.total}}&nbsp;</em>张；</span>
        <span class="info_m">最多可优惠金额<span class="cc1">&nbsp;￥{{other.amt}}&nbsp;</span>元</span>
      </div>
      <ul class="content">
        <li class="dis animated fadeIn" v-for="(item, index) in list" :key="index">
          <div class="dis-left">
            <div class="dis-left-price">
              <div class="m_text16 num" :class="[nIndex=='2'?'cc3':'cc1']">
                ￥
                <div class="m_text35 ling">{{item.money}}</div>

              </div>
              <div class="m_text12 cc3 text-hide ">
                满{{parseInt(item.min_amt)}}使用
              </div>

            </div>
            <div class="dis-left-info">
              <div class="name m_text14 ">{{item.title}}</div>
              <div class="action_1 ">
                <div class="m_text10">节日专用</div>
              </div>
              <div class="dis-time cc1 m_text12">有效期至:{{item.expire_date}}</div>
            </div>
          </div>
          <div class="dis-righta cc2 m_text14 cursor" v-if="nIndex==1" title="点击领取" @click="bindCoupon(item)"> </div>
          <div class="dis-rightb cc2 m_text14 cursor" v-if="nIndex==0" title="点击领取" @click="bindCoupon(item.money)"> </div>
          <div class="dis-rightc cc2 m_text14 cursor" v-if="nIndex==2" title="点击领取" @click="bindCoupon(item.money)"> </div>
          <div class="hint1"></div>
          <div class="hint2"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import orderNavBar from "@/components/orderNavBar/orderNavBar.vue";
import iView from "view-design";
import { user_Coupon } from "@/api";
export default {
  components: {
    orderNavBar
  },
  data() {
    return {
      navBar: ["未使用", "已使用", "已失效"],
      nIndex: 0,
      list: null,
      other: null
    };
  },
  mounted() {
    let info = localStorage.getItem("userInfo");
    this.user = JSON.parse(info);
    iView.LoadingBar.finish();
    this.loadData();
  },
  methods: {
    /**
     *功能：加载数据
     *时间：2020年05月02日 11:01:59
     *作者：钟婉婷
     */
    loadData() {
      user_Coupon({
        status: this.nIndex
      }).then(res => {
        res.list.forEach(item => {
          item.money = Number(item.money);
        });
        this.list = res.list;
        this.other = res.other;
      });
    },
    /**
     *功能：切换状态
     *时间：2020年05月02日 11:01:31
     *作者：钟婉婷
     */
    bindNav(index) {
      this.nIndex = index;
      this.loadData();
    },
    /**
     *功能：点击优惠券
     *时间：2020年05月02日 11:01:46
     *作者：钟婉婷
     */
    bindCoupon(item) {
      console.log(this.nIndex,item);
      if(this.nIndex==0){
        this.$router.push({
          name: "cart"
        });
      }else if(this.nIndex==1){
        this.$router.push({
          name: "orderData",
          query: {
            id: item.sheet_no
          }
        });        
      }
     
    }
  }
};
</script>
<style lang="less" scoped>
@dis_h: 40px;
.discount {
  .header {
    display: flex;
    .header_item {
      width: 334px;
      height: @dis_h;
      line-height: @dis_h;
      background-color: #f7f8f9;
      border-bottom: solid 1px #e6e6e6;
      padding-left: @dis_h;
      &:nth-child(1) {
        border-right: solid 1px #e6e6e6;
      }
      &:nth-child(2) {
        border-right: solid 1px #e6e6e6;
      }
    }
    .h_active {
      background-color: white;
    }
    .h_lose {
      background-color: #f7f8f9;
    }
  }
  .info {
    height: @dis_h;
    line-height: @dis_h;
    padding-left: @dis_h;
    border-bottom: solid 1px #e6e6e6;
    .info_m {
      margin-left: 27px;
    }
  }
  .content {
    padding: 10px 40px 40px 40px;
    width: 100%;
    overflow: hidden;
    li {
      float: left;
    }
    .dis {
      margin-right: 50px;
      // width: 234px;
      height: 70px;
      display: flex;
      margin-top: 30px;
      position: relative;
      .dis-left {
        width: 200px;
        height: 100%;
        background: radial-gradient(
            circle at 0px 50%,
            transparent 8px,
            #f4f4f4 0
          )
          top;
        padding: 10px 0 10px 10px;
        display: flex;
        .dis-left-price {
          width: 75px;
          .num {
            display: flex;
            align-items: flex-start;

            .ling {
              display: flex;
              align-items: flex-end;
              font-family: CenturyGothic-Bold;
              height: 40px;
            }
          }
        }
        .dis-left-info {
          width: 113px;
          .name {
            font-weight: bold;
            color: #333333;
          }
          .dis-time {
            text-align: left;
            margin-top: 6px;
          }
          .action_1 {
            width: 50px;
            line-height: 12px;
            height: 12px;
            background-color: #facf2c;
            color: #e1252f;
          }
          .action_2 {
            width: 50px;
            height: 12px;
            line-height: 12px;
            color: #ffffff;
            background-color: #1d8c9f;
            color: #e1252f;
          }
        }
      }
      .hint1 {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: white;
        position: absolute;
        top: -7px;
        right: 48px;
        z-index: 1;
      }
      .hint2 {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: white;
        position: absolute;
        bottom: -7px;
        right: 48px;
        z-index: 1;
      }
      .dis-righta {
        position: relative;
        width: 55px;
        display: flex;
        align-items: center;
        height: 100%;
        z-index: 1;
        justify-content: center;
        padding-right: 5px;
        background-image: radial-gradient(
          circle at 56px 8px,
          transparent 6px,
          #3fadc0 0px,
          #1d8c9f 100%
        );
        background-size: 100px 18px;
        background-position: 0 0, 100px 0;
        background-repeat-x: no-repeat;
        &:after {
          content: "已使用";
        }
      }

      .dis-rightb {
        position: relative;
        width: 55px;
        display: flex;
        align-items: center;
        height: 100%;
        z-index: 1;
        justify-content: center;
        padding: 10px;
        background-image: radial-gradient(
          circle at 56px 8px,
          transparent 6px,
          #fc5555 0%,
          #e1252f 100%
        );
        background-size: 100px 18px;
        background-position: 0 0, 100px 0;
        background-repeat-x: no-repeat;

        &:after {
          content: "立即使用";
        }
      }

      .dis-rightc {
        position: relative;
        width: 55px;
        display: flex;
        align-items: center;
        height: 100%;
        z-index: 1;
        justify-content: center;
        padding-right: 5px;

        background-image: radial-gradient(
          circle at 56px 8px,
          transparent 6px,
          #999999 6px,
          #999999 0px
        );
        background-size: 100px 18px;
        background-position: 0 0, 100px 0;
        background-repeat-x: no-repeat;

        &:after {
          content: "已失效";
        }
      }
    }
  }
}
/deep/ .child {
  padding: 0 !important;
}
</style>
