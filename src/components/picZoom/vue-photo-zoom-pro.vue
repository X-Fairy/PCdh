<template>
  <div class="pic-img" style="height:100%;">
    <div
      class="img-container" style="height:100%;"
    >
      <img
        ref="img"
        @load="imgLoaded"
        :src="url"
        :style="overlayStyle"
        @error="imgerrorfun"
      />
      <div class="overlay"  @mousemove.stop="!moveEvent && mouseMove($event)"
           @mouseout.stop="!leaveEvent && mouseLeave($event)"  :style="overlayStyle">
      </div>
      <div
        v-if="!hideZoom && imgLoadedFlag &&!hideSelector"
        :class="['img-selector', {'circle': type === 'circle'}]"
        :style="[imgSelectorStyle, imgSelectorSize, imgSelectorPosition, !outShow && imgBg, !outShow && imgBgSize, !outShow && imgBgPosition]"
      >
        <slot></slot>
      </div>
      <div
        v-if="outShow"
        v-show="!hideOutShow"
        :class="['img-out-show', {'base-line': baseline}]"
        :style="[imgOutShowSize, imgOutShowPosition, imgBg, imgBgSize, imgBgPosition]"
      >
        <div
          v-if="pointer"
          class="img-selector-point"
        ></div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "vue-photo-zoom-pro",
    props: {
      url: {
        type: String,
        default:""
      },
      highUrl: String,
      width: {
        type: Number,
        default: 168
      },
      type: {
        type: String,
        default: "square",
        validator: function(value) {
          return ["circle", "square"].indexOf(value) !== -1;
        }
      },
      selectorStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      outShowStyle: {},
      scale: {
        type: Number,
        default: 3
      },
      moveEvent: {
        type: [Object, MouseEvent],
        default: null
      },
      leaveEvent: {
        type: [Object, MouseEvent],
        default: null
      },
      hideZoom: {
        type: Boolean,
        default: false
      },
      outShow: {
        type: Boolean,
        default: false
      },
      pointer: {
        type: Boolean,
        default: false
      },
      baseline: {
        type: Boolean,
        default: false
      },
      overlayStyle:{
        type: String,
        default: 'width:100%;height:100%'
      },
    },
    data() {
      return {
        selector: {
          width: this.width,
          top: 0,
          left: 0,
          bgTop: 0,
          bgLeft: 0,
          rightBound: 0,
          bottomBound: 0,
          absoluteLeft: 0,
          absoluteTop: 0
        },
        imgInfo: {},
        $img: null,
        screenWidth: document.body.clientWidth,
        outShowInitTop: 0,
        outShowTop: 0,
        hideOutShow: true,
        imgLoadedFlag: false,
        hideSelector: false,
        timer: null
      };
    },
    watch: {
      moveEvent(e) {
        this.mouseMove(e);
      },
      leaveEvent(e) {
        this.mouseLeave(e);
      },
      url(n) {
        this.imgLoadedFlag = false;
        // let img = require('@/assets/vehicle_img/blank_vehicle.jpg')
        // if(n == img){
        //  this.outShow = false
        // }
      },
      width(n) {
        this.initSelectorProperty(n);
      },
      screenWidth(val) {
        if (!this.timer) {
          this.screenWidth = val;
          this.timer = setTimeout(() => {
            this.imgLoaded();
            clearTimeout(this.timer);
            this.timer = null;
          }, 400);
        }
      }
    },
    computed: {
      addWidth() {
        return !this.outShow ? (this.width / 2) * (1 - this.scale) : 0;
      },
      imgSelectorPosition() {
        let { top, left } = this.selector;
        return {
          top: `${top}px`,
          left: `${left}px`
        };
      },
      imgSelectorSize() {
        let width = this.selector.width;
        return {
          width: `${width}px`,
          height: `${width}px`
        };
      },
      imgSelectorStyle() {
        return this.selectorStyle;
      },
      imgOutShowSize() {
        let {
          scale,
          selector: { width }
        } = this;
        return {
          width: `${width * scale}px`,
          height: `${width * scale}px`
        };
      },
      imgOutShowPosition() {
        return {
          top: `${this.outShowTop}px`,
          right: `${-8}px`
        };
      },
      imgBg() {
        return {
          backgroundImage: `url(${this.highUrl || this.url})`
        };
      },
      imgBgSize() {
        let {
          scale,
          imgInfo: { height, width }
        } = this;
        return {
          backgroundSize: `${width * scale}px ${height * scale}px`
        };
      },
      imgBgPosition() {
        let { bgLeft, bgTop } = this.selector;
        return {
          backgroundPosition: `${bgLeft}px ${bgTop}px`
        };
      },
    },
    mounted() {
      this.$img = this.$refs["img"];
    },
    methods: {
      imgLoaded() {
        let imgInfo = this.$img.getBoundingClientRect();
        if (JSON.stringify(this.imgInfo) != JSON.stringify(imgInfo)) {
          this.imgInfo = imgInfo;
          this.initSelectorProperty(this.width);
          this.resetOutShowInitPosition();
        }
        if (!this.imgLoadedFlag) {
          this.imgLoadedFlag = true;
          this.$emit("created", imgInfo);
        }
      },
      mouseMove(e) {
        if (!this.hideZoom && this.imgLoadedFlag) {
          this.imgLoaded();
          const { pageX, pageY, clientY } = e;
          const { scale, selector, outShow, addWidth, outShowAutoScroll } = this;
          let { outShowInitTop } = this;
          const scrollTop = pageY - clientY;
          const { absoluteLeft, absoluteTop, rightBound, bottomBound } = selector;
          const x = pageX - absoluteLeft; // 选择器的x坐标 相对于图片
          const y = pageY - absoluteTop; // 选择器的y坐标
          if (outShow) {
            if (!outShowInitTop) {
              outShowInitTop = this.outShowInitTop = scrollTop + this.imgInfo.top;
            }
            this.hideOutShow && (this.hideOutShow = false);
            this.outShowTop =
              scrollTop > outShowInitTop ? scrollTop - outShowInitTop : 0;
          }
          this.hideSelector && (this.hideSelector = false);
          selector.top = y > 0 ? (y < bottomBound ? y : bottomBound) : 0;
          selector.left = x > 0 ? (x < rightBound ? x : rightBound) : 0;
          selector.bgLeft = addWidth - x * scale; // 选择器图片的坐标位置
          selector.bgTop = addWidth - y * scale;
        }
      },
      initSelectorProperty(selectorWidth) {
        const selectorHalfWidth = selectorWidth / 2;
        const selector = this.selector;
        const { width, height, left, top } = this.imgInfo;
        const { scrollLeft, scrollTop } = document.documentElement;
        selector.width = selectorWidth;
        selector.rightBound = width - selectorWidth;
        selector.bottomBound = height - selectorWidth;
        selector.absoluteLeft = left + selectorHalfWidth + scrollLeft;
        selector.absoluteTop = top + selectorHalfWidth + scrollTop;
      },
      mouseLeave() {
        this.hideSelector = true;
        if (this.outShow) {
          this.hideOutShow = true;
        }
      },
      reset() {
        Object.assign(this.selector, {
          top: 0,
          left: 0,
          bgLeft: 0,
          bgTop: 0
        });
        this.resetOutShowInitPosition();
      },
      resetOutShowInitPosition() {
        this.outShowInitTop = 0;
      },
      imgerrorfun(e){
        // let img = require('@/assets/vehicle_img/blank_vehicle.jpg')
        // this.url = img
        // e.target.src = img
        // e.target.onerror= null
      }
    }
  };
</script>

<style scoped>
  .img-container {
    position: relative;
  }
  .overlay{
    cursor: crosshair;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.5;
    z-index: 1;
  }

  .img-selector {
    position: absolute;
    cursor: crosshair;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-color: rgba(64, 64, 64, 0.6);
  }

  .img-selector.circle {
    border-radius: 50%;
  }

  .img-out-show {
    z-index: 5000;
    position: absolute;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    background-color: white;
    transform: translate(100%, 0);
  }

  .img-selector-point {
    position: absolute;
    width: 4px;
    height: 4px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: black;
  }

  .img-out-show.base-line::after {
    position: absolute;
    box-sizing: border-box;
    content: "";
    width: 1px;
    border: 1px dashed rgba(0, 0, 0, 0.36);
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .img-out-show.base-line::before {
    position: absolute;
    box-sizing: border-box;
    content: "";
    height: 1px;
    border: 1px dashed rgba(0, 0, 0, 0.36);
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

</style>
