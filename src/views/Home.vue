<template>
  <div class="home">
    <!-- 头部公共组件 -->
    <head-top ref="headtop"></head-top>
    <!-- 切换路由组件 -->
   
      <v-touch
        v-on:swipeleft="swiperleft"
        v-on:swiperight="swiperright"
        class="v-touch"
        style="touch-action:pan-y!important">
        <!-- 过度动画组件 -->
        <transition :name=direction>
          <!-- 路由 -->
         <keep-alive exclude="ReadComics">
            <router-view />
          </keep-alive>
        </transition>
      </v-touch>
  </div>
</template>

<script>
// @ is an alias to /src
import HeadTop from "@/components/common/HeadTop";
export default {
  name: "Home",
  components: {
    HeadTop,
    scroll
  },
  data() {
    return {
      direction: "left", // 滑动的动画方向
      navindex: 0
    };
  },
  created(){

    

  },
  
  methods: {

    swiperleft() {
      //左划切换路由
      if (this.$route.path == "/homepage") {
        this.navindex = 1;
        this.$refs.headtop.navClick(this.navindex); //使用refs调用HeadTop子组件的navClick方法来改变路由
        // this.$router.push({ path: "/cartoon" })
      } else if (this.$route.path == "/cartoon") {
        this.navindex = 2;
        this.$refs.headtop.navClick(this.navindex);
        // this.$router.push({ path: "/movie" })
      } else if (this.$route.path == "/movie") {
        this.navindex = 3;
        this.$refs.headtop.navClick(this.navindex);
        // this.$router.push({ path: "/fiction" })
      }
      this.direction = "left"; // 滑动的动画方向
    },
    swiperright() {
      //右滑切换路由
      if (this.$route.path == "/fiction") {
        this.navindex = 2;
        this.$refs.headtop.navClick(this.navindex); //使用refs调用HeadTop子组件的navClick方法来改变路由
        // this.$router.push({ path: "/movie" });
      } else if (this.$route.path == "/movie") {
        this.navindex = 1;
        this.$refs.headtop.navClick(this.navindex);
        // this.$router.push({ path: "/cartoon" });
      } else if (this.$route.path == "/cartoon") {
        this.navindex = 0;
        this.$refs.headtop.navClick(this.navindex);
        // this.$router.push({ path: "/homepage" });
      }
      this.direction = "right"; // 滑动的动画方向

    }
  }
};
</script>
<style  scoped>
#home {
  position: relative;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
}
/* 设置局部滚动的 固定高度 */
.content {
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.left-enter-active,
.left-leave-active,
.right-enter-active,
.right-leave-active {
  transition: all 1s;
  position: absolute;
  width: 100%;
}
.left-enter,
.right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.left-leave-to,
.right-enter {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
