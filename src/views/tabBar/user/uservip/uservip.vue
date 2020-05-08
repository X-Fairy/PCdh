<template>
<div>
  <!-- <orderNavBar title="VIP权益"></orderNavBar> -->
  <div class="technology animated fadeIn">
    <img src="http://dh.xmcpcn.com/Public/images/vip_benefit.jpg" alt="">
  </div>
</div>
</template>
<script>
import orderNavBar from "@/components/orderNavBar/orderNavBar.vue";
import iView from 'view-design';
export default {
  components:{
      orderNavBar
  },
  data() {
    return {
      user:null,
    };
  },
  mounted() {
    let info=localStorage.getItem('userInfo');
    this.user=JSON.parse(info)
    iView.LoadingBar.finish()
  },
  methods: {
    
  }
};
</script>
<style lang="less" scoped>
.card{
  border:none;
}
.technology {
  // padding: 0 40px;
  /deep/ .inputMin .ivu-input {
    width: 200px;
    height: 40px;
    border-radius: 5px;
    border: solid 1px #e6e6e6;
  }
  /deep/.upload {
    width: 130px;
    height: 40px;
    background-color: #ffffff;
    border-radius: 5px;
    border: solid 1px #e6e6e6;
    margin-right: 20px;
  }
  /deep/.submit {
    width: 130px;
    height: 40px;
    background-color: #1d8c9f;
    border-radius: 5px;
    color: white;
    margin-left: 10px;
  }
}
</style>
