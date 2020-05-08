<template>
    <div class="routerHeard">
       <div class="left">
        {{title}}
        </div>
    </div>
</template>

<script>
export default {
    name:'orderNavBar',
    props:{
        title:{
            type:String,
            default:''
        }
    }

}
</script>

<style lang="less" scoped>
.routerHeard {
    height: 40px;
    line-height: 40px;
    background-color: #f7f8f9;
    border-bottom: solid 1px #e6e6e6;
    font-family: SourceHanSansCN-Light;
    font-size: 16px;
    color: #333333;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    .right {
      cursor: pointer;
      font-family: SourceHanSansCN-Light;
      font-size: 14px;
      color: #ff9902;
      .tit {
        margin-right: 40px;
      }
    }
  }
</style>