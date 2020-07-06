<template>
  <div class="box">
    <div
      class="cartoon-box"
      v-for="(item,index) in cartoonRes"
      :key="index"
    >
      <v-lazy>
        <!-- 漫画图片 -->
        <div class="cartoon-img">
          <img
            class="vimg"
            :src="item.cover"
            alt=""
            align="center"
            @click="ImgClick(item.url)"
            @load="ModuleLoad"
          >
          <!-- 漫画名字，时间，更新状况 -->
          <div
            style="color:#ffffff; font-size: 3.333vw;  white-space: nowrap; text-overflow: ellipsis;"
            @click="ImgClick(item.url)"
          >{{item.name}}</div>
          <div style="color:#bdbdbd; font-size: 2.333vw;white-space: nowrap;">{{item.latest}}</div>
          <div style="color:#bdbdbd; font-size: 2.333vw;white-space: nowrap;">{{item.time}}</div>
        </div>
      </v-lazy>
    </div>
  </div>
</template>
<script>
export default {
  props: ["cartoonRes"],
  methods: {
    //点击进入详情路由页面
    ImgClick(iid) {
      this.$router.push({ name: "detail", params: { iid: iid } }); //动态添加url
    },
    ModuleLoad() {
      this.$bus.$emit("ModuleLoadIMG");
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-wrap: wrap;
}
.cartoon-box {
  width: 27.778vw;
  height: 55.556vw;
  flex: 0 0 33.33%;
  white-space: nowrap; /*一行显示*/
  overflow: hidden; /*超出部分隐藏*/
  text-overflow: ellipsis; /*用...代替超出部分*/
  .cartoon-img {
    text-align: center;
    padding-top: 2.778vw;
  }
  .vimg {
    width: 27.778vw;
    height: 37.5vw;
    border-radius: 2.778vw;
    position: relative;
    margin: auto;
  }
  .vimg::after {
    content: "";
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: url(~assets/img/timg.jpg) no-repeat center;
  }
}
</style>