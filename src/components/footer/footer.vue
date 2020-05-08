<template>
  <div class="footer">
    <div class="fo_top">
      <div class="box" style="display:flex">
        <div class="ximi ">
          <div class="t1 m_text16">何为熙美</div>
          <div class="t2 m_text16">熙美诚品原创生活类电商品牌，秉承熙美一贯的严谨态度，我们深入世界各地，从源头全程严格把控商品生产环节，力求帮消费者甄选到优质的商品</div>
          <div class="t3 m_text16">
            <span class="m_text16">关注我们 ：</span>
            <div class="t3_img" style="margin:0 20px">
              <img src="@/assets/images/wx.png" alt="" srcset="">
            </div>
            <div class="t3_img">
              <img src="@/assets/images/wb.png" alt="" srcset="">
            </div>
          </div>
        </div>
        <div class="wx">
          <div class="m_text16">扫码进入微信小程序</div>
          <div class="wxIcon">
            <img src="http://dh.xmcpcn.com/Public/new/images/miniprogram.png" alt="" srcset="">
          </div>
        </div>
        <div class="wx">
          <div class="m_text16">扫码下载手机APP</div>
          <div class="wxIcon">
            <img src="http://img.xmvogue.com/ggao/app.png?x-oss-process=style/204" alt="" srcset="">
          </div>
        </div>
      </div>
    </div>
    <div class="fo_bottom">
      <div class="box">
        <div class="f_top">
          <div class="logo">
            <img src="@/assets/images/LOGO.png" alt="" srcset="">
          </div>
          <div class="photo">
            <div class="icon">
              <img src="@/assets/images/photo.png" alt="" srcset="">
            </div>
            <div class="text m_text24">投诉电话：0579-85170679</div>
          </div>
          <div class="location">
            <div class="m_text16">Select Station：杭州（中国）</div>
            <div class="icon">
              <img src="@/assets/images/location.png" alt="">
            </div>
          </div>
        </div>
        <div class="f_conter m_text16">
          新品上架<span class="hr"> | </span>全站畅销 <span class="hr"> | </span> 熙美推荐 <span class="hr"> | </span> 最新补货 <span class="hr"> | </span> 地区畅销 <span
            class="hr"> | </span> 店铺畅销 <span class="hr"> | </span> 限时秒杀 <span class="hr"> | </span> 物耗材料
        </div>
        <div class="f_bot">
          <div class="text" style="margin-bottom:10px">
            <div class="m_text16">公司地址：浙江义乌市北苑街道丹溪北路728号熙美诚品大楼</div>
            <div class="m_text16">联系电话：0579-85170628</div>
            <div class="m_text16">电子邮件：info@xmcpcn.com</div>
          </div>
          <div class="text">
            <div class="m_text16">Copyright 2015 dh.xmcpcn.com 熙美诚品（浙江熙彬进出口有限公司） 版权所有 All Rights Reserved </div>
            <div class="m_text16">Built By 熙美诚品.诚品 XIMI 技术支持</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "navFooter"
};
</script>

<style lang="less" scoped>
.footer {
  margin-top: 50px;
  .fo_top {
    height: 300px;
    background-color: #ffffff;
    padding: 61px 0 39px 0;
    font-family: SourceHanSansCN-Light;
    color: #333333;
    .ximi {
      width: 30vw;
      padding-right: 44px;
      .t1 {
        text-align: center;
      }
      .t2 {
        margin: 39px 0 25px 0;
      }
      .t3 {
        display: flex;
        align-items: center;
        .t3_img {
          width: 32px;
          height: 32px;
        }
      }
    }
    .wx {
      width: 30vw;
      border-right: 1px solid #e6e6e6;
      border-left: 1px solid #e6e6e6;
      text-align: center;
      .wxIcon {
        width: 105px;
        height: 105px;
        background-color: white;
        margin: 40px auto 0 auto;
      }
    }
  }
  .fo_bottom {
    color: #ffffff;
    height: 270px;
    background-color: #404040;
    .f_top {
      display: flex;
      justify-content: space-between;
      height: 93px;
      align-items: center;
      .logo {
        width: 140px;
        height: 33px;
      }
      .photo {
        font-family: SourceHanSansCN-Regular;

        display: flex;
        .icon {
          width: 32px;
          height: 32px;
          margin-right: 10px;
        }

      }
      .location {
        font-family: SourceHanSansCN-Light;
        display: flex;
        .icon {
          margin-left: 10px;
          width: 12px;
          height: 8px;
        }
      }
    }
    .f_conter {
      border-top: 1px solid white;
      border-bottom: 1px solid white;
      height: 76px;
      line-height: 76px;
      opacity: 0.5;
      text-align: center;
      .hr {
        margin: 0 25px;
      }
    }
    .f_bot {
      opacity: 0.5;
      padding: 31px 0 29px 0;
      .text {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
