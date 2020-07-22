<template>
  <div
    id="home-page"
    v-title
    data-title="星漫画"
     >
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @pullingUp="pullingUp"
       >
       <!-- 漫画展示模块 -->
      <home-cartoon ref="homecartoon" />
       <!-- 漫画展示模块 -->
    </scroll>
  </div>
</template>

<script>
import HomeCartoon from "./Children/HomeCartoon";
import scroll from "@/scroll/scroll";
export default {
  components: {
    scroll,
    HomeCartoon
  },
  mounted() {
    // 监听图片加载
    this.$bus.$on("HomeLoadIMG", () => {
      setTimeout(() => {
        this.$refs.scroll.refresh();
      }, 300);
    });
  },

  methods: {
    pullingUp() {
      this.$refs.scroll.finishPullUp();
      // 调用子组件的方法
      this.$refs.homecartoon.HomeCartoonindex();
      this.$refs.homecartoon.HomeCartoom();
    }
  }
};
</script>

<style lang="scss" scoped>
#home-page {
  position: fixed;
  top: 0;
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
}
</style>