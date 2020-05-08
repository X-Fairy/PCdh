<template>
  <!-- 右侧图标 -->
  <div class="fixationRights" :class="navBarFixed? 'navBarLeftWraps' :'fixationLeftWraps'">
    <div class="list">
      <div class="icon" v-for="(item, index) in iconList" :key="index" :class="[item.status?'min':'max']">
        <img v-if="index==5" v-lazy="item.url" alt srcset @click="backTop" />
        <img v-else v-lazy="item.url" alt srcset @click="avtiveTo(item.src,item.id)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "navRight",
  data() {
    return {
      iconList: [
        {
          url: require("@/assets/images/r1.png")
        },
        {
          status: true,
          id: "3",
          src: "/special/hot",
          url: require("@/assets/images/r2.png")
        },
        {
          id: "7",
          src: "/special/hot",
          status: true,
          url: require("@/assets/images/r3.png")
        },
        {
          id: "5",
          src: "/special/hot",
          url: require("@/assets/images/r4.png")
        },
        {
          url: require("@/assets/images/r5.png")
        },
        {
          url: require("@/assets/images/r6.png")
        }
      ],
      navBarFixed: false,
    };
  },
  mounted(){
     window.addEventListener("scroll", this.watchScroll);
  },
  methods: {
     watchScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 217) {
        this.navBarFixed = true;
      } else {
        this.navBarFixed = false;
      }
    },
    /**
     *功能：回到顶部
     *时间：2020年01月11日 14:46:15
     *作者：钟婉婷
     */
    backTop() {
      let nowTop =
        document.body.scrollTop || document.documentElement.scrollTop; // 获取当前滚动条位置
      if (nowTop > 0) {
        window.requestAnimationFrame(this.backTop);
        window.scrollTo(0, nowTop - nowTop / 5);
      }
    },
    /**
     *功能：跳转页面
     *时间：2020年01月11日 14:46:15
     *作者：钟婉婷
     */
    avtiveTo(url, id) {
      if (id) {
        this.$router.push({
          path: url,
          query: {
            id: id
          }
        });
      } else {
        this.$router.push({ path: url });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.navBarLeftWraps {
  position: fixed;
  right: 0;
  top: 5%;
}
.fixationLeftWraps {
  position: absolute;
  right: 0;
  top: 30%;
}
.fixationRights {
  z-index: 2;
  .list {
    .min {
      width: 120px;
    }
    .max {
      width: 70px;
    }
    .icon {
      margin: 0 auto;
      height: 75px;
    }
  }
}
</style>
