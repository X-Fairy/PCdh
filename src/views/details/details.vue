<template>
  <div class="details">
    <div class="box" v-if="info">
      <menus :list="menuList" :url="menuURL" v-if="menuList"></menus>
      <div class="content">
        <div class="info">
          <div class="img">
            <!-- <pic-zoom :url="info.image" :bigWidth="150" :scale="3" ></pic-zoom> -->
            <div class="video_left" v-if="isvideo" >                   
              <video :src="info.video" muted autoplay="autoplay" loop="loop" :poster="info.image"  controls="controls"  style="width:100%;height:100%;"></video>
            </div>
            <pic-zoom :url="info.image" :bigWidth="150" :scale="3" v-else></pic-zoom>
            <div class="imgNav" v-if="imglist.length>0">
                <div v-for="(item,index) in imglist" :key="index" class="item">
                    <video :src="item" v-if="item.includes('mp4')" ref="video" @click="isvideo=true"  style="width:100%;height:100%;object-fit:fill;"></video>
                    <img :src="item" alt="" v-else style="margin-left:15px;" @click="isvideo=false">
                </div>
            </div>
          </div>
          <div class="card">
            <div class="name">
              {{info.item_name}}
            </div>
            <div class="text" style="margin-top: 30px;background-color: #e9e9e9;" v-if="info.base_price">
              <div class="tit">配送价:</div>
              <div class="num">￥{{info.base_price}} <span class="m_price" v-if="info.base_price!=info.org_price">￥{{info.org_price}}</span>
              </div>
            </div>
            <div class="text" style="margin-top: 30px;background-color: #e9e9e9;" v-else>
              <div class="tit">配送价:</div>
              <div class="num">￥{{info.org_price}}</div>
            </div>
            <div class="text">
              <div class="tit">销售价:</div>
              <div>￥{{info.sale_price}}</div>
            </div>
            <div class="text">
              <div class="tit">商品货号:</div>
              <div class="tit">{{info.item_no}}</div>
            </div>
            <div class="text">
              <div class="tit">商品规格:</div>
              <div class="tit">{{info.spec}}</div>
            </div>
            <div class="text">
              <div class="tit">箱规数量:</div>
              <div class="tit">{{info.spec}}</div>
            </div>
            <div class="text" v-if="clsList">
              <div class="tit">选择:</div>
              <div class="cls">                
                <Button class="btn1" :class="{'btnActive':isActive==index}" v-for="(item,index) in clsList" :key="index"
                  @click="bindCls(index)">{{item}}</Button>
              </div>
            </div>
            <div class="text" v-if="clsList2">
              <div class="tit">选择:</div>
              <div class="cls">
                <Button class="btn1" :class="{'btnActive':isActive2==index}" v-for="(item,index) in clsList2" :key="index"
                  @click="bindCls2(index)">{{item}}</Button>
              </div>
            </div>
            <div class="text">
              <!-- <div class="tit">选择数量:</div> -->
              <div class="tit">
                <numberbox :value='info.spec' :step='info.spec' :code="info.item_no" :min="info.spec" Button="show" :cnum="info.yixuan" :issaleout="info.saleout" :ispresell="info.presell"></numberbox>
                <!-- <div class="cart">
                  <Button class="submit" @click="handleSubmit('formValidate')">加入购物车</Button>
                </div> -->
              </div>
            </div>
           
          </div>
        </div>
        <div class="recommend" v-if="relationData">
          <div>同类推荐</div>
          <div class="items cursor" v-for="(item,index) in relationData" :key="index">
            <img v-lazy="item.image" alt="" srcset="" @click="navDetails(item.item_no)">
          </div>

        </div>

      </div>
      <div class="introduce">
        <div class="did">尺寸：{{info.lwh}}</div>
        <div class="did">重量：{{info.weight}}</div>
        <div class="did">产品特点：{{info.features}}</div>
        <div class="did">使用方法：{{info.usage}}</div>
        <div class="did">注意事项：{{info.notes}}</div>
      </div>
      <div class="img">
        <img v-lazy="info.data" alt="" srcset="" @>
      </div>
    </div>
  </div>
</template>

<script>
import numberbox from "@/components/number-box/number-box.vue";
import { goodData } from "@/api";
import PicZoom from "@/components/picZoom/index.vue";
import menus from "@/components/menu/menu.vue";
export default {
  components: {
    numberbox,
    PicZoom,
    menus
  },
  data() {
    return {
      info: null,
      imglist:[],
      isvideo:false,
      relationData: null,
      menuURL: "/cateGory",
      menuList: null,
      clsList: null,
      clsList2: null,
      isActive: null,
      isActive2: null,
      goodsList: null
    };
  },
  mounted() {
    this.loadData(this.$route.query.code);
  },
  methods: {
    loadData(id) {
      goodData({
        id: id
      }).then(res => {
        let goods = res.info;        
        goods.image =
          "https://ximiphoto.oss-cn-hangzhou.aliyuncs.com/thumb/" +
          goods.item_no +
          ".jpg?x-oss-process=style/800";
        goods.data =
          "http://img.xmvogue.com/detail/" +
          goods.item_no +
          "-.jpg?x-oss-process=style/yuan";
        goods.spec = Number(goods.spec);
        goods.salenum = Number(goods.salenum);
        this.info = goods;        
        if(this.info.video){
          this.isvideo=true;
          this.imglist=[this.info.video,this.info.image]
        }else{
          this.isvideo=false;
          this.imglist=[];
        }
        this.relationData = this.$xm.goodsFor(res.relation);
        this.menuList = res.nav;
        this.goodsList = res.list;
        if (res.attr1_list) {
          res.attr1_list.forEach((item, index) => {
            if (item == res.info.attr1) {
              this.isActive = index;
             
            }
          });
        }
        if (res.attr2_list) {
          res.attr2_list.forEach((item, index) => {
            if (item == res.info.attr2) {
              this.isActive2 = index;
            }
          });
        }
        this.clsList = res.attr1_list;
        this.clsList2 = res.attr2_list;
      });
    },
    navDetails(code) {
      const { href } = this.$router.resolve({
        name: "details",
        query: {
          code: code
        }
      });
      window.open(href, "_blank");
    },
    /**
     *功能：切换商品
     *时间：2020年04月28日 14:53:17
     *作者：钟婉婷
     */
    bindCls(index) {  
      let row = this.clsList[index];
      let toast=0;
      for(let i in this.goodsList){
        if(this.goodsList[i].attr2){
          if(this.goodsList[i].attr1 == row &&  this.goodsList[i].attr2==this.clsList2[this.isActive2]){              
            this.loadData(this.goodsList[i].item_no);
          }else{            
            toast++;
          }
        }else{
           if(this.goodsList[i].attr1 == row){              
            this.loadData(this.goodsList[i].item_no);
          }
        }
      }
      if(this.goodsList.length==toast){
         this.$Message.error("库存不足");
      }
      console.log(toast);
    },
    bindCls2(index) {  
      let row2 = this.clsList2[index];
      let toast=0;
      for(let i in this.goodsList){
        if(this.goodsList[i].attr2 == row2 && this.goodsList[i].attr1==this.clsList[this.isActive]){
          this.loadData(this.goodsList[i].item_no); 
        }else{
          toast++;
        }
      }
      if(this.goodsList.length==toast){
         this.$Message.error("库存不足");
      }
      console.log(toast);
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
