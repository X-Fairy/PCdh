<template>
  <div id="app" :style="{background:$route.meta.color}">

    <navHeader v-if="$route.meta.header"></navHeader>
    <router-view :key="$route.fullPath"></router-view>
    <navFooter v-if="$route.meta.footer"></navFooter>

  </div>
</template>

<script>
import navHeader from "@/components/header/header.vue";
import navFooter from "@/components/footer/footer.vue";
export default {
  components: {
    navHeader,
    navFooter
  },
  name: "app"
  // data() {
  //   return {
  //     screenWidth: document.body.clientWidth, // 屏幕宽度
  //     timer: false
  //   };
  // },
  // computed: {
  //   isCollapse: {
  //     get() {
  //       return this.screenWidth < 1200;
  //     },
  //     set() {}
  //   }
  // },
  // watch: {
  //   screenWidth(val) {
  //     console.log(val);
  //   }
  // },
  // mounted() {
  //   // 监听窗口大小
  //   window.onresize = () => {
  //     return (() => {
  //       this.screenWidth = document.body.clientWidth;
  //     })();
  //   };
  // },
  // methods: {
  //   changeMenu() {
  //     this.isCollapse = !this.isCollapse;
  //   }
  // }
};
</script>
<style>
.ceshi1 {
  position: relative;
}
.ceshi {
  position: absolute;
  right: 0;
  top: 0;
}
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
@import "assets/css/animate.css";
@import "assets/css/theme.less";
/* @import "assets/css/font.css"; */
body,
html,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  /* background: #f4f4f4; */
  color: black;
  /* position: relative; */
}
.box {
  margin: 0 auto;
}

@media (max-width: 1200px) {
  .box {
    max-width: 98.2vw;
    min-width: 98.2vw;
  }
  div {
    font-size: 1.309vw;
  }
  .comm_box {
    width: 98.2vw;
  }
  .mediaC {
    color: red;
  }
  .x-title {
    font-size: 1.931vw !important;
  }
  .x-span {
    font-size: 0.966vw !important;
  }
  .m_text14 {
    font-size: 12px;
  }
  .m_text16 {
    font-size: 0.966vw;
  }
  .m_text18 {
    font-size: 1.473vw;
  }
  .m_text20 {
    font-size: 18px;
  }
  .m_text22 {
    font-size: 20px;
  }
  .m_text19 {
    font-size: 1.227vw;
  }
  .m_text12 {
    font-size: 10px;
    /* -webkit-transform: scale(0.9); */
  }
  .m_text13 {
    font-size: 11px;
  }
  .m_text15 {
    font-size: 1.064vw;
  }
  .m_text24 {
    font-size: 20px;
  }
  .m_text36 {
    font-size: 32px;
  }
  .m_text30 {
    font-size: 26px;
  }
  .m_text35 {
    font-size: 2.5vw;
  }
   .m_text10 {
    font-size: 12px;
    -webkit-transform: scale(0.9);
  }
}
div {
  font-size: 14px;
}
@media (min-width: 1200px) {
  .box {
    max-width: 1200px;
    min-width: 1200px;
  }
  .comm_box {
    width: 1200px;
  }
  .mediaC {
    color: darkblue;
  }
  .m_text13 {
    font-size: 13px;
  }
  .m_text14 {
    font-size: 14px;
  }
  .m_text16 {
    font-size: 16px;
  }
  .m_text18 {
    font-size: 18px;
  }
  .m_text20 {
    font-size: 20px;
  }
  .m_text22 {
    font-size: 22px;
  }
  .m_text19 {
    font-size: 19px;
  }
  .m_text12 {
    font-size: 12px;
    /* -webkit-transform: scale(0.9); */
  }
  .m_text10 {
    font-size: 10px;
    -webkit-transform: scale(0.8);
  }
  .m_text15 {
    font-size: 15px;
  }
  .m_text24 {
    font-size: 24px;
  }
  .m_text36 {
    font-size: 36px;
  }
  .m_text35 {
    font-size: 35px;
  }
  .m_text30 {
    font-size: 30px;
  }
}

img {
  width: 100%;
  height: 100%;
}
div {
  font-size: 13px;
}
.cursor {
  cursor: pointer;
}
</style>
