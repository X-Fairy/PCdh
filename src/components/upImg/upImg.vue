<template>
  <div class="upImg">
    <div v-if="type">
      <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index" v-if="uploadList" :style="{width:maxwidth,height:maxheight}">
        <img :src="item">
        <div class="demo-upload-list-cover">
          <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="demo-upload-list" v-if="uploadData" :style="{width:maxwidth,height:maxheight}">
        <img :src="uploadData">
        <div class="demo-upload-list-cover">
          <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
        </div>
      </div>
    </div>
    <Upload :action="baseURL+url" :show-upload-list="false" :on-success="handleSuccess" :data="request">
      <Button icon="md-reverse-camera" class="upload" :style="{width:maxwidth,height:maxheight}"></Button>
    </Upload>
  </div>
</template>

<script>
import axios from "@/lib/axios";
import store from "@/store";
export default {
  name: "upImg",
  data() {
    return {
      uploadList: [],
      uploadData:null,
      request: {
        hdid: ""
      },
      baseURL: ""
    };
  },
  props: {
    url: {
      type: String,
      default: "/Home/User/uppic"
    },
    type: {
      type: Boolean,
      default: false
    },
    maxwidth: {
      type: String,
      default: "60px"
    },
    maxheight: {
      type: String,
      default: "60px"
    }
  },
  mounted() {
    this.baseURL = axios.baseURL;
    this.request.hdid = store.state.user.userInfo.hdid;
  },
  methods: {
    handleSuccess(res, file) {
      let url =
        "http://ximiphoto.oss-cn-hangzhou.aliyuncs.com/shouhou/" +
        res +
        "?x-oss-process=style/300";
      if (this.type) {
        this.uploadList.push(url);
        this.$emit("loadImg", this.uploadList);
      } else {
        this.uploadData=url;
        this.$emit("change", this.uploadData);
      }
    },
    handleRemove(index) {
      if (this.type) {
        this.uploadList.splice(index, 1);
        this.$emit("loadImg", this.uploadList);
      } else {
        this.uploadData = "";
        this.$emit("change", this.uploadData);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.upImg {
  display: flex;
  flex-wrap: wrap;
  width: 140px;
}
.upload {
  width: 60px;
  height: 60px;
  margin: 0;
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
