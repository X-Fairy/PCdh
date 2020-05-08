<template>
  <div class="player">
    <div class="box">
      <div class="nav">
        周一至周五 下午2点准时开播
      </div>
      <div class="play_ul">
        <div class="play_li_odd">
          <div class="play_li_left" :style="left">
            <div class="img"></div>
            <div class="info">
              <div class="text">
                新品展示
              </div>
              <div class="qr">
                扫码观看
              </div>
            </div>
          </div>
          <div class="play_li_right">
            <div class="img">
              <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"></video-player>
            </div>
          </div>
        </div>
        <div class="play_li_even">
          <div class="play_li_right">
            <div class="img">
            </div>
          </div>
          <div class="play_li_left" :style="left">
            <div class="img"></div>
            <div class="info">
              <div class="text">
                新品展示
              </div>
              <div class="qr">
                扫码观看
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner: "url(" + require("@/assets/images/special/player-b.png") + ")",
      left: {
        backgroundImage:
          "url(" + require("@/assets/images/special/player-t.png") + ")",
        backgroundRepeat: "repeat"
      },
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:11", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src:
              "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm" // url地址
          }
        ],
        poster:
          "http://img.xmvogue.com/thumb/6941595117947.jpg?x-oss-process=style/300", //你的封面地址
        width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  mounted() {
    this.setBodyBackGround();
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    // 改变背景图片
    setBodyBackGround() {
      document.body.style.backgroundSize = "100%";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundImage = this.banner;
    },
    // 清除背景图
    clearBodyBackGround() {
      document.body.style.backgroundImage = "";
    }
  },
  beforeDestroy() {
    this.clearBodyBackGround();
  }
};
</script>

<style lang="less" scoped>
.player {
  .box {
    padding-top: 371px;
    .nav {
      text-align: center;
      line-height: 60px;
      font-family: SourceHanSansCN-Regular;
      font-size: 30px;
      color: white;
      margin: auto;
      background-image: linear-gradient(90deg, #f13b85 0%, #d73fd0 100%),
        linear-gradient(#f13b85, #f13b85);
      background-blend-mode: normal, normal;
      box-shadow: 0px 5px 54px 0px rgba(4, 0, 0, 0.2);
      border-radius: 30px;
      border-top: solid 2px #f39fe1;
      border-left: solid 1px #f39fe1;
      border-right: solid 1px #f39fe1;
      width: 500px;
      height: 60px;
      line-height: 60px;
    }
    .play_ul {
      margin-top: 57px;
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      // border: 1px solid #000;
      .play_li_odd {
        width: 840px;
        height: 385px;
        display: flex;
        justify-content: center;
        align-items: center;
        // border: 1px solid #000;
        .play_li_left {
          background-size: 100% 100%;
          width: 364px;
          height: 175px;
          margin-right: -65px;
          z-index: 1;
          padding: 50px;
          display: flex;
          justify-content: space-around;
          .img {
            width: 100px;
            height: 100px;
            background-color: #ffffff;
          }
          .info {
            color: white;
            .text {
              font-family: SourceHanSansCN-Regular;
              font-size: 30px;
            }
            .qr {
              margin-top: 5px;
              width: 100px;
              height: 34px;
              border-radius: 4px;
              border: solid 1px #ffffff;
              text-align: center;
              line-height: 34px;
              font-family: SourceHanSansCN-Regular;
              font-size: 16px;
            }
          }
        }
        .play_li_right {
          width: 550px;
          height: 385px;
          background-color: #ff97c3;
          border-radius: 10px;
          padding: 10px;
        }
      }
      .play_li_even {
        margin: 107px 0;
        width: 840px;
        height: 385px;
        display: flex;
        justify-content: center;
        align-items: center;
        // border: 1px solid #000;
        .play_li_left {
          background-size: 100% 100%;
          width: 364px;
          height: 175px;
          margin-left: -65px;
          z-index: 1;
          padding: 50px;
          display: flex;
          justify-content: space-around;
          .img {
            width: 100px;
            height: 100px;
            background-color: #ffffff;
          }
          .info {
            color: white;
            .text {
              font-family: SourceHanSansCN-Regular;
              font-size: 30px;
            }
            .qr {
              margin-top: 5px;
              width: 100px;
              height: 34px;
              border-radius: 4px;
              border: solid 1px #ffffff;
              text-align: center;
              line-height: 34px;
              font-family: SourceHanSansCN-Regular;
              font-size: 16px;
            }
          }
        }
        .play_li_right {
          width: 550px;
          height: 385px;
          background-color: #ff97c3;
          border-radius: 10px;
          padding: 10px;
        }
      }
    }
  }
  /deep/ .vjs-control-bar {
    display: flex;
    bottom: -1;
    background-color: #ff97c3;
    opacity: 1 !important;
  }
  /deep/ .player[data-v-f862cab6] .vjs-control-bar{

  }
  /deep/ .vjs-slider {
    background-color: white;
  }
  /deep/ .vjs-mouse-display {
    background-color: white;
  }
  /deep/ .vjs-time-tooltip {
    background-color: white;
    color: #ff97c3;
    width: 40px;
  }
  /deep/ .vjs-tech {
    width: 100%;
    height: 90%;
  }
}
</style>
