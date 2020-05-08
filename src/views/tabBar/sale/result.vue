<template>
  <div class="sale">
    <div class="routerHeard">
      <div class="left">寄回产品</div>
    </div>
    <Table :columns="columns" :data="data" no-data-text="请先申报售后产品"></Table>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" label-position="right">
      <FormItem label="物流公司" prop="name">
        <Input v-model="formValidate.name" placeholder="请输入物流公司" style="width:220px;"></Input>
      </FormItem>
      <FormItem label="物流单号" prop="number">
        <Input v-model="formValidate.number" placeholder="请输入物流单号" style="width:220px;"></Input>
      </FormItem>
      <FormItem label="运费" prop="fee">
        <Input v-model="formValidate.fee" placeholder="请输入运费" style="width:220px;"></Input>
      </FormItem>
      <FormItem label="上传面单">
        <upImg @change="bindUp"></upImg>
      </FormItem>
      <Button class="submit" @click="handleSubmit('formValidate')">提交</Button>
    </Form>

  </div>
</template>

<script>
import iView from "view-design";
import { sh_express, sh_express_add } from "@/api";
import upImg from "@/components/upImg/upImg.vue";
export default {
  components: {
    upImg
  },
  data() {
    return {
      columns: [
        {
          title: "商品名称",
          align: "center",
          key: "sqrq",
          render: (h, { row }) => {
            return (
              <div class="tdBorder">
                <img
                  v-lazy={row.image}
                  alt=""
                  srcset=""
                  class="tdImg cursor"
                  onClick={() => this.navDetails(row.item_no)}
                />
                <div class="card">
                  <div class="m_text14 text-hide2">{row.item_name}</div>
                </div>
              </div>
            );
          }
        },
        {
          title: "商品编码",
          align: "center",
          key: "item_no"
        },
        {
          title: "申报数",
          align: "center",
          key: "tqty"
        },
        {
          title: "退回数",
          align: "center",
          key: "num",
          render: (h, { row, index }) => {
            return (
              <div class="tdBorder">
                <input
                  v-model={row.num}
                  onBlur={() => this.changeNum(index, row.num)}
                  class="input"
                />
              </div>
            );
          }
        }
      ],
      data: [],

      formValidate: {
        name: "",
        number: "",
        fee: "",
        img: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入物流公司",
            trigger: "blur"
          }
        ],
        number: [
          {
            required: true,
            message: "请输入物流单号",
            trigger: "blur"
          }
        ],
        fee: [
          {
            required: true,
            message: "请输入运费",
            trigger: "blur"
          }
        ]
      },
      express_img: null
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      sh_express().then(res => {
        if (res.list) {
          res.list.forEach(item => {
            item.num = "";
          });
          this.data = this.$xm.goodsFor(res.list, 300);
        }
      });
    },
    navSole(id) {
      this.saleId = id;
      switch (id) {
        case "add":
          this.$router.push({ name: "add" });
          break;
        case "declare":
          this.$router.push({ name: "declare" });
          break;
        case "result":
          this.$router.push({ name: "result" });
          break;
      }
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

    handleSubmit(name) {
      let status = false;
      let params = {
        item_no: [],
        num: [],
        express_img: this.formValidate.img,
        express_name: this.formValidate.name,
        express_number: this.formValidate.number,
        express_fee: this.formValidate.ee
      };

      this.data.forEach((item, index) => {
        params.item_no.push(item.item_no);
        params.num.push(item.num);
        if (!item.num) {
          status = true;
        }
      });
      if (status) {
        this.$Message.error("请填写退回产品的数量!");
        return false;
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          sh_express_add(params).then(res => {
            this.$Message.success("提交成功");
            this.$router.push({
              name: "declare"
            });
            this.$store.dispatch("upIndex", "declare");
          });
        } else {
          this.$Message.error("请继续填写");
        }
      });
    },
    changeNum(index, num) {
      this.data[index].num = num;
    },
    bindUp(data) {
      this.formValidate.img = data;
    }
  }
};
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
/deep/.ivu-table-header {
  border-bottom: solid 1px #e6e6e6;
}
/deep/.ivu-table-header th {
  height: 50px;
  background-color: white;
  border: none;
  margin-bottom: 120px;
}
/deep/.ivu-table td,
.ivu-table th {
  border-bottom: 1px dashed #e8eaec;
}
/deep/.ivu-table .ivu-table-body table {
  border-collapse: collapse;
  padding: 20px;
}
/deep/.submit {
  width: 130px;
  height: 40px;
  background-color: #1d8c9f;
  border-radius: 5px;
  color: white;
  margin-left: 20px;
}
form {
  margin: 20px;
}
</style>
