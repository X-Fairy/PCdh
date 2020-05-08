<template>
  <div class="numbox">
    <div class="left">
      <Button icon="md-remove" class="btn" :disabled="subtract" @click="calcValue('subtract')"></Button>
      <Input type="text" class="n-value" :value="inputValue" @on-blur="onBlur" />
      <Button icon="md-add" class="btn" :disabled="add" @click="calcValue('add')"></Button>
    </div>
    <div class="right" v-if="url!=='cart'">
      <Button class="btn-rad gray" :style="{width:maxwidth}" v-if="issaleout==1 && ispresell=='0'">已售罄</Button>
      <Button class="btn-rad" :style="{width:maxwidth}" @click="addPromotion" v-else-if="issaleout==1 && ispresell=='1'">加入预售({{num}})</Button>
      <Button class="btn-rad" :style="{width:maxwidth}" @click="addCart" v-else>加入购物车({{num}})</Button>
    </div>
  </div>

</template>

<script>
import { cartData,subGood,cartUpdata,cartUpdate,delGoods,addPresell} from '@/api'
export default {
  name: "numberbox",
  props: {
    //数量
    value: {
      type: Number,
      default: 0
    },
    // 最小值
    min: {
      type: Number,
      default: 1
    },
    // 最大值
    max: {
      type: Number,
      default: 999
    },
    // 倍数
    step: {
      type: Number,
      default: 1
    },
    code: {
      type: String,
      default:""
    },
    //宽度
    maxwidth: {
      type: String,
      default: "110px"
    },

    //类型
    type:{
      type: Boolean,
      default: false
    },
    //是否显示按钮
    ButtonShow: {
      type: Boolean,
      default: true
    },

    url: {
      type: String,
      default: ""
    },
    cnum: {
      type: Number,
      default: 0
    },
    issaleout: {
      type: String,
      default: ""
    },
    ispresell: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      inputValue: this.value,
      subtract: false,
      add: false,
      num:this.cnum,
      saleout:this.issaleout,
      presell:this.ispresell
    };
  },
  created(){
    console.log(this.saleout,this.presell)
  },
  watch: {    
    value(val) {
      // console.log(val);
      this.inputValue = val;
    },
    inputValue(val) {
      if (val <= this.min) {
        this.subtract = true;
      } else {
        this.subtract = false;
      }
      if (val >= this.max) {
        this.add = true;
      } else {
        this.add = false;
      }
      // console.log(val)
    }

  },
  methods: {
    calcValue(type) {
      let value = this.inputValue;
      let step = this.step;
      if (type === "subtract") {
        value = value - step;
      } else if (type === "add") {
        value = value + step;
      }
      if (value < this.min || value > this.max) {
        return;
      }

      if(this.type){
        let data={
          code:this.code,
          value:value
        }
        cartUpdate(data).then(res=>{
            if(res.result=="success"){
              this.inputValue = value;
              this.$Message.success("修改成功");
              this.$store.dispatch('update')
              // 当购物车页面请求时
              if(this.url=="cart"){
                this.$emit('cartLoad')
              }
            }else{
              this.$Message.error(res.msg);
            }
        })
      }else{
        this.inputValue = value;
      }
    },
    // 加入购物车
    addCart() {
      let data={
        code:this.code,
        value:this.inputValue
      }
      subGood({max_buy:40},data).then(res=>{
          if(res.result=="success"){
              this.$Message.success("添加成功");
              this.$store.dispatch('update');
              this.num=this.inputValue+this.num
          }else{
              this.$Message.error(res.msg);
          }
      })
    },
    // 加入预售购物车
    addPromotion(){
       let data={
        code:this.code,
        value:this.inputValue
      }
      addPresell({ max_buy: 40 }, data).then(res => {
        if (res.result == "success") {
          this.$Message.success("添加成功");
          this.$store.dispatch("update");
        } else {
          this.$Message.error(res.msg);
        }
      });      
    },
    onBlur(event) {
      let value = Number(event.path[0].value);
      if (value > this.max) {
        value = this.max;
      } else if (value < this.min) {
        value = this.min;
      }
      this.inputValue = value;
    }
  }
};
</script>

<style lang="less" scoped>
.gray{
  background: gray !important;
  border: none !important;
}
@media (min-width: 1200px) {
  @import "index.less";
}
@media (max-width: 1200px) {
  @import "w1200.less";
}
</style>
