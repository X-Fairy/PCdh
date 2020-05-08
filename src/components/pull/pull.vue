<template>
    <div class="pull-wrap" @touchstart="start" @touchmove="move" @touchend="end">
    <!--上拉加载组件-->
      <slot ref="pull" class="pull-content"></slot>
      <p v-if="isMoving" style="font-size: 20px;">pulling....</p>
      <div class="is-loading" v-if="isLoading">
        <img class="loading" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587543993483&di=8c50a59dde0f23fbcb3820bf394475fb&imgtype=0&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D1532292727%2C171725191%26fm%3D214%26gp%3D0.jpg" alt="">
      </div>
      <div class="is-done" v-if="isDone">没有数据了</div>
  </div>
</template>

<script>
  export default {
    name: 'pull',
    props: {
      onPull: {  // 上拉的回调
        type: Function,
        require: true
      }

    },
    data() {
      return {
        startY: 0,
        moveY: 0,
        isMoving: false,
        isLoading: false,
        isDone: false,
        num: 1  // history list的页数
      }
    },
    methods: {
      start(e) {
        this.startY = e.touches[0].clientY;
        console.log(this.startY);
      },
      move(e) {
        if (this.isDone) return
        console.log('move', e.touches[0].clientY);
        // 滑动时需要检测是否到底了，如果还没到底，就不要loading
        // if (this.isLoading || this.isDone) return;
        let flag = this.scrollToTheEnd();
        if (flag) {
          this.isMoving = true
        }
        this.moveY = e.touches[0].clientY - this.startY;
      },

      end() {
        // this.isMoving = false
        if (this.isLoading || this.isDone) return;
        console.log('touchend', this.moveY);
        if (this.moveY > -40) {
          console.log('没超过', this.moveY);
          this.isMoving = false;
        } else {
          console.log('达到条件了');
          let flag = this.scrollToTheEnd();
          console.log(flag, '到底了吗');
          if (!flag) return;
          this.isMoving = false
          this.num++;
          this.isLoading = true;
          this.onPull(this.num);
        }
        this.startY = 0;
        this.moveY = 0;
      },

      /**
       * 判断滚动条是否到底
       */
      scrollToTheEnd() {
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop // 滚动的距离
        let viewHeight = document.documentElement.clientHeight;  // 可视区域高度
        let offsetHeight = document.body.scrollHeight;  // 总高度
        console.log(scrollTop, viewHeight, offsetHeight, '----------------');
        // 滚动条到底部的条件
        return (viewHeight + scrollTop) >= offsetHeight
      }
    },

    mounted() {
      this.$on('loadEnd', () => {
        console.log('load完毕了');
        this.isLoading = false
      })

      this.$on('loadOver', () => {
        console.log('没有了');
        this.isDone = true;
        this.isLoading = false;
        this.isMoving = false;
      })

    }
  }
</script>

<style scoped lang="less">
  /*.pull-wrap{
    overflow: hidden;
    &>.pull-content{
     transition: all .4s;
   }
  }*/
  .pull-wrap{
    font-size: 20px;
  }

  .loading{
    width: 50px;
    height: 50px;
  }

</style>
