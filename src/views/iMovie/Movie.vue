<template>
  <div
    v-title
    data-title="星漫画"
    id="Movie"
  >
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
    >
    <!-- 书架展示组件GO -->
      <bookrack/>
    <!-- 书架展示组件eng -->
    </scroll>
  </div>
</template>

<script>
import Bookrack from "./Children/Bookrack"
import scroll from "@/scroll/scroll";
export default {
  name:'Movie',
  components: {
    scroll,
    Bookrack
  },
  mounted() {
    // 监听轮播图图片加载
    this.$bus.$on("MovieLoadIMG", () => {
      setTimeout(() => {
        this.$refs.scroll.refresh();
      }, 300);
    });
  },

};
</script>

<style lang="scss" scoped>
#Movie {
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