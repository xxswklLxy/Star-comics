<template>
  <div id="#cartoon" v-title data-title="星漫画">
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
    >
    <div class="ss">
        <v-text-field
          @blur="fixScroll"
          v-model="Search"
          class="shades----text"
          label="请输入你要搜索的漫画名"
        ></v-text-field>
        <v-btn
          class="icon-input"
          slot="append"
          color="#2196f3"
          @click="SearchClick"
        > 搜索</v-btn>
    </div>
    
      <!-- 漫画模块组件GO -->
      <cartoon-module :cartoonRes="cartoonRes" />
      <!-- 漫画模块组件 -->
    </scroll>
  </div>

</template>

<script>
import { Cartoonlist } from "@/api/cartoon";
import {CartoonSearch} from "@/api/fiction"
import scroll from "@/scroll/scroll";
import CartoonModule from "@/views/Cartoon/Children/CartoonModule";

export default {
  components: {
    scroll,
    CartoonModule
  },
  data() {
    return {
      cartoonRes: {}, //漫画列表数据
      Search: null
    };
  },

  methods: {

    //  搜索请求
    CartoonSearch() {
      CartoonSearch(this.Search).then(res => {
        const cartoonRes = res.list.map(i => {
          //遍历拿到list
          return {
            cover: i.cover,
            name: i.name,
            latest: i.latest,
            time: i.time,
            url: i.url
          };
        });
        cartoonRes.shift(); //删除数组第一个
        this.cartoonRes = cartoonRes; //拿到数据
        const cartoonResID = this.cartoonRes.map(function(item) {
          return item.url;
        });
        this.cartoonResID = cartoonResID;
      });
    },
    // 点击搜索
    SearchClick() {
      this.CartoonSearch();
      this.Search = null;
      // 监听图片加载
      this.$bus.$on("ModuleLoadIMG", () => {
        setTimeout(() => {
          this.$refs.scroll.refresh();
        }, 300);
      });
    },
    //解决收回输入法不回弹
    fixScroll() {
      let u = navigator.userAgent;
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        window.scrollTo(0, 0);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#cartoon {
  position: fixed;
  top: 0vw;
  bottom: 0;
  left: 0;
  width: 100%;
}
/* 设置局部滚动的 固定高度 */
.content {
  overflow: hidden;
  position: absolute;
  top: 25vw;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: black;

}
.ss{

  text-align: center;

.icon-input {
  margin-top: 4.167vw;
  
}
}
.theme--light.v-input,
.theme--light.v-input input,
.theme--light.v-input textarea {
  color: rgba(110, 161, 255, 0.87) !important; 
    background-color: #e8eef3
}
.theme--light.v-input{
  width: 100%;
height: 15.678vw;
}
.v-text-field {
    padding-top: 26px;
    margin-top: -10px;
}

</style>