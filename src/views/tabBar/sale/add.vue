<template>
  <div class="sale">
    <div class="routerHeard">
      <div class="left">申请售后</div>
    </div>
    <div class="form">
      <span class="typeLabel">选择售后类型：</span>
      <Select v-model="type" style="width: 130px;height: 40px;">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" inline style="margin-top:20px">
        <FormItem prop="code">
          <Input v-model="formValidate.code" placeholder="货号" class="inputMin" @on-focus="bindInput" @on-blur="changCode()"></Input>
        </FormItem>
        <FormItem prop="num">
          <Input type="number" v-model="formValidate.num" placeholder="数量" class="inputMin" @on-focus="bindInput()"></Input>
        </FormItem>
        <FormItem prop="desc">
          <Input v-model="formValidate.desc" placeholder="退换原因" class="inputMin" @on-focus="bindInput()"></Input>
        </FormItem>
        <FormItem>
          <div class="btn">
            <span class="goodsName">{{formValidate.name}}</span>
            <Button class="submit" @click="handleSubmit('formValidate')">添加</Button>
          </div>
        </FormItem>
      </Form>
    </div>
    <Table :columns="columns" :data="goods" v-show="goods.length!=0"></Table>
    <div class="btn" style="padding:20px" v-if="goods.length!=0">
      <Button class="submit" @click="saleSubmit">提交</Button>
    </div>
  </div>
</template>

<script>
import iView from "view-design";
import { getItemInfo, saleAdd } from "@/api";
import upImg from "@/components/upImg/upImg.vue";
export default {
  components: {
    upImg
  },
  data() {
    return {
      formValidate: {
        code: "",
        num: "",
        desc: "",
        name: "",
        image: ""
      },
      ruleValidate: {
        code: [
          {
            required: true,
            message: "请输入货号",
            trigger: "blur"
          }
        ],
        num: [
          {
            required: true,
            message: "请输入商品数量",
            trigger: "blur"
          }
        ]
      },
      type: "",
      cityList: [
        {
          value: 1,
          label: "调换货物"
        },
        {
          value: 2,
          label: "质量问题"
        },
        {
          value: 3,
          label: "物流破损"
        }
      ],
      columns: [
        {
          title: "商品",
          key: "item_name",
          align: "center",
          width: "300px",
          render: (h, { row }) => {
            return (
              <div class="tdBorder goods">
                <img
                  src={row.image}
                  alt=""
                  srcset=""
                  class="tdImg cursor"
                  onClick={() => this.navDetails(row.code)}
                />
                <div class="card">
                  <div class="m_text14 text-hide2">{row.name}</div>
                  <div class="m_text14 code">{row.code}</div>
                </div>
              </div>
            );
          }
        },

        {
          title: "数量",
          align: "center",
          key: "num"
        },
        {
          title: "原因",
          align: "center",
          key: "desc"
        },
        {
          title: "上传图片",
          align: "center",
          key: "name",
          render: (h, { row, indx }) => {
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  "align-items": "center",
                  "text-align": "center",
                  width:"140px"
                }
              },
              [
                h(upImg, {
                  props: {
                    type: true,
                    maxwidth: "60px",
                    maxheight: "60px",
                    url: "/Home/User/uppic?item_no=" + row.code
                  },
                  on: {
                    loadImg(data) {
                      // console.log(data)
                    }
                  }
                })
              ]
            );
          }
        },

        {
          title: "操作",
          align: "center",
          render: (h, { row, index }) => {
            return h(
              "div",
              {
                style: {}
              },
              [
                h("span", [
                  h(
                    "Poptip",
                    {
                      class: "handle",
                      props: {
                        confirm: true,
                        transfer: true,
                        placement: "top",
                        title: "确定要删除该商品吗 ?",
                        type: "error",
                        size: "small",
                        width: "150",
                        vModel: true
                      },
                      domProps: {
                        title: "删除商品"
                      },
                      style: {
                        cursor: "pointer"
                      },
                      on: {
                        "on-ok": () => {
                          // 确定删除
                          this.deleteOrder(index);
                        }
                      }
                    },
                    [
                      h("Icon", {
                        props: {
                          type: "ios-trash",
                          size: "26",
                          color: "#333"
                        },
                        class: "delete"
                      })
                    ]
                  )
                ])
              ]
            );
          }
        }
      ],
      goods: []
    };
  },
  mounted() {
    iView.LoadingBar.finish();
  },
  methods: {
    // 提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          var list = this.formValidate;
          let status = true;
          this.goods.forEach(row => {
            if (row.code == list.code) {
              status = false;
            }
          });
          if (status) {
            this.goods.push(list);
            console.log(this.goods)
            this.formValidate = {
              code: "",
              num: "",
              desc: "",
              name: "",
              image: ""
            };
            this.$Message.success("添加成功");
          } else {
            this.$Message.error("该货号已存在，不能重复添加");
          }
        } else {
          this.$Message.error("请继续填写");
        }
      });
    },
    // 判断是否选择类型
    bindInput() {
      if (!this.type) {
        this.$Message.error("请选择售后类型");
      }
    },
    // 获取商品信息
    changCode() {
      getItemInfo({
        sn: this.formValidate.code
      }).then(res => {
        if (this.type == 3) {
          this.formValidate.num = "1";
        } else {
          this.formValidate.num = res.purchase_spec;
        }
        this.formValidate.name = res.item_name;
        this.formValidate.image = res.image =
          "https://ximiphoto.oss-cn-hangzhou.aliyuncs.com/thumb/" +
          this.formValidate.code +
          ".jpg?x-oss-process=style/300";
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
    // 删除
    deleteOrder(index) {
      let list = this.goods;
      list.splice(index, this.goods.length);
    },
    saleSubmit() {
      let params = {
        item_no: [],
        reason: [],
        type: this.type,
        aqty: []
      };
      this.goods.forEach(function(item, index) {
        params.item_no.push(item.code);
        params.reason.push(item.desc);
        params.aqty.push(item.num);
      });
      saleAdd(params).then(res => {
        if (res == 1) {
          this.$router.push({
            name: "sale"
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.sale {
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
  }
  .form {
    padding: 20px 39px 0 39px;
    border-bottom: solid 1px #e6e6e6;
  }

  .typeLabel {
    font-family: SourceHanSansCN-Light;
    font-size: 14px;
    color: #333333;
  }
}

/deep/ .inputMin .ivu-input {
  width: 8vw;
  height: 40px;
  border-radius: 5px;
  border: solid 1px #e6e6e6;
}

/deep/.submit {
  width: 130px;
  height: 40px;
  background-color: #1d8c9f;
  border-radius: 5px;
  color: white;
}
/deep/.upImg {
  width: 100%;
  display: flex;
}
.btn {
  display: flex;
}
.goodsName {
  font-family: SourceHanSansCN-Light;
  margin: 0 10px;
}

</style>
