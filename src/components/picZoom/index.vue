<template>
 <div style="width: 100%;height: 100%">
   <vue-photo-zoom-pro
     :width="bigWidth"
     :url="url"
     :type="type"
     :scale="scale"
     :out-show="showType"
     :overlayStyle="overlayStyle"
   >
   </vue-photo-zoom-pro>
 </div>

</template>

<script>
 import vuePhotoZoomPro from '@/components/picZoom/vue-photo-zoom-pro'
 export default {
   name: 'PicZoom',
   components: {  vuePhotoZoomPro },
   data() {
     return {
       type: "square",
       showType: true,
     }
   },
   props: {
     url: {
       type: String,
       required: true,
       default:""
     },
     bigWidth:{
       type: Number,
       required: true,
       default:168
     },
     scale:{
       type: Number,
       required: true,
       default:3
     },
     overlayStyle:{
       type: String,
       default: 'width:100%;height:100%'
     }
   },
 }
</script>

<style  lang="less" scoped>

</style>
