<template>
<div>
  <orderNavBar title="门店资料"></orderNavBar>
  <div class="technology">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <Row :gutter="32" v-if="user">
        <i-Col span="24">
          <FormItem label="用户会员" label-position="top">
            {{user.isvip==0?'普通会员':'VIP会员'}}
          </FormItem>
        </i-Col>
        <i-Col span="24">
          <FormItem label="门店编码" label-position="top">
            {{user.hdid}}
          </FormItem>
        </i-Col>
        <i-Col span="24">
          <FormItem label="账户积分" label-position="top">
            0
          </FormItem>
        </i-Col>
        <i-Col span="24">
          <FormItem label="收货地址" label-position="top">

          </FormItem>
        </i-Col>
        <i-Col span="12">
          <div class="btn">
            <Button class="submit" @click="handleSubmit('formValidate')">保存</Button>
          </div>
        </i-Col>
      </Row>

    </Form>
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
      formValidate: {
        id: "",
        pass: "",
        qq: "",
        phone: "",
        desc: ""
      },
      ruleValidate: {
        id: [
          {
            required: true,
            message: "请输入您的远程ID",
            trigger: "blur"
          }
        ],
        pass: [
          {
            required: true,
            message: "请输入您的远程密码",
            trigger: "blur"
          }
        ]
      },
      user:null,
    };
  },
  mounted() {
    let info=localStorage.getItem('userInfo');
    this.user=JSON.parse(info)
    iView.LoadingBar.finish()
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.technology {
  padding: 20px 40px;
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
