<template>
  <div>
    <orderNavBar title="极速找网管"></orderNavBar>
    <div class="technology">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="远程ID" prop="id">
          <Input v-model="formValidate.id" placeholder="请输入您的远程ID" class="inputMin"></Input>
        </FormItem>
        <FormItem label="远程密码" prop="pass">
          <Input v-model="formValidate.pass" placeholder="请输入您的远程密码" class="inputMin"></Input>
        </FormItem>
        <FormItem label="联系QQ" prop="qq">
          <Input v-model="formValidate.qq" placeholder="请输入您的QQ号码" class="inputMin"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="phone">
          <Input v-model="formValidate.phone" placeholder="请输入您的号码" class="inputMin"></Input>
        </FormItem>
        <FormItem label="问题描述" prop="desc">
          <Input
            v-model="formValidate.desc"
            type="textarea"
            :autosize="{minRows: 3,maxRows: 5}"
            placeholder="请输入您的问题..."
          ></Input>
        </FormItem>
        <FormItem label="上传图片" label-position="top">
          <Upload action="//jsonplaceholder.typicode.com/posts/">
            <Button icon="md-reverse-camera" class="upload"></Button>
          </Upload>
        </FormItem>
        <FormItem>
          <div class="btn">
            <Button class="submit" @click="handleSubmit('formValidate')">提交</Button>
          </div>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import orderNavBar from "@/components/orderNavBar/orderNavBar.vue";
import iView from 'view-design';
export default {
  components: {
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
      }
    };
  },
  mounted() {
    iView.LoadingBar.finish()
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
        } else {
          this.$Message.error("请继续填写!");
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
  }
  .upload {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn {
    display: flex;
  }
}
</style>
