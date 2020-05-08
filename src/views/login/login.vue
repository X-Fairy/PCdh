<template>
  <div class="login" :style="{backgroundImage:`url(${img})`}">
    <div class="card">
      <div class="left">
        <div class="t1 m_text36">
          Welcome!
        </div>
        <div class="t2 m_text30">
          熙美诚品订货系统
        </div>
        <Form :model="formItem" :rules="validate" ref="formItem" style="margin-top:60px">
          <FormItem prop="user">
            <Input v-model="formItem.user" placeholder="用户名" class="inputMin" name="user"></Input>
            <!-- <input type="text" @keyup.enter="submit"> -->
          </FormItem>
          <FormItem prop="pass">
            <Input v-model="formItem.pass" placeholder="密码" class="inputMin" type="password" name="pass"></Input>
          </FormItem>
          <!-- <FormItem prop="verify" class="yz">
            <Input v-model="formItem.verify" placeholder="验证码" class="inputMax"></Input>
            <img :src="codeImg" @click="editCaptcha">
          </FormItem> -->
          <FormItem>
            <Button type="primary" class="submit m_text18" @click="handleSubmit('formItem')">登录</Button>
          </FormItem>
        </Form>
        <div class="t3 m_text16">Select Station</div>
        <div class="t4 m_text16">Dubai(UAE)</div>
      </div>
      <div class="right">
        <div class="logo">
          <img src="@/assets/images/logoOn.png" alt="" srcset="">
        </div>
        <div class="tit">
          <img src="@/assets/images/text.png" alt="" srcset="">
        </div>
        <div class="hr">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/lib/axios";
import { mapActions } from "vuex";
import { login, code } from "@/api";
import iView from "view-design";
import Cookies from "js-cookie";
import md5 from "md5";
export default {
  data() {
    return {
      img: require("@/assets/images/login.png"),
      formItem: {
        user: "",
        pass: ""
        // verify: ""
      },
      codeImg: "",
      validate: {
        user: [
          {
            required: true,
            message: "请输入您的用户名",
            trigger: "blur"
          }
        ],
        pass: [
          {
            required: true,
            message: "请输入您的密码",
            trigger: "blur"
          }
        ]
        // verify: [
        //   {
        //     required: true,
        //     message: "请输入您的验证码",
        //     trigger: "blur"
        //   }
        // ]
      }
    };
  },
  mounted() {
    localStorage.getItem("userInfo", "");
    this.$store.dispatch("addUser", "");
    this.$store.dispatch("update", "0");
    iView.LoadingBar.finish();
    // this.editCaptcha();
  },
  created() {
    let that = this;
    document.onkeydown = function(e) {
      e = window.event || e;
      if (
        that.$route.path == "/login" &&
        (e.code == "Enter" || e.code == "enter")
      ) {
        //验证在登录界面和按得键是回车键enter
        that.handleSubmit("formItem");
      }
    };
  },
  methods: {
    ...mapActions(["handleLogin"]),
    /**
     *功能：验证码
     *时间：2020年04月19日 17:20:18
     *作者：钟婉婷
     */
    editCaptcha() {
      axios.code(res => {
        this.codeImg =
          "data:image/png;base64," +
          btoa(
            new Uint8Array(res).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
      });
    },
    // 登录
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          login({
            user: this.formItem.user,
            pass: this.formItem.pass
          }).then(res => {
            if (res.res == "error") {
              this.$Message.error(res.msg);
            } else {
              localStorage.setItem("userInfo", JSON.stringify(res.data));
              this.$Message.success("登录成功");
              this.$store.dispatch("addUser", res.data);
              this.$router.push({ path: "/" });
              // var inFifteenMinutes = new Date(new Date().getTime() + 1 * 60 * 60 * 1000);
              // Cookies.set("cookie", md5(res.data.uid + res.data.hdid + "ximi"),{ expires: inFifteenMinutes });
              Cookies.set("cookie", md5(res.data.uid + res.data.hdid + "ximi"),{ expires: 1 });
            }
          });
        } else {
          this.$Message.error("请继续填写");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
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
</style>
