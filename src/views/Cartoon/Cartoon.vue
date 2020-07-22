<template>
  <div
    id="cartoon"
    v-title
    data-title="星漫画"
  >
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
    >
      <!--轮播图组件 GO-->
      <slideshow :cartoonResShow="cartoonResShow" />
      <!--轮播图组件 end-->
      <!-- 分类组件 GO-->
      <cartoon-classify
        @showbox="toshow"
        :Cartoonlist="Cartoonlist"
      />
      <!-- 分类组件 eng-->
      <!-- 漫画模块组件GO -->
      <cartoon-module :cartoonRes="cartoonRes" />
      <!-- 漫画模块组件 end-->
    </scroll>
  </div>
</template>

<script>
import { Cartoonlist} from "@/api/cartoon";
import scroll from "@/scroll/scroll";
import slideshow from "@/Vuetify/slideshow";
import CartoonClassify from "@/views/Cartoon/Children/CartoonClassify";
import CartoonModule from "@/views/Cartoon/Children/CartoonModule";

export default {
  components: {
    scroll,
    slideshow,
    CartoonClassify,
    CartoonModule
  },
  data() {
    return {
      cartoonRes: {}, //漫画列表数据
      cartoonResShow: [], //轮播图数据

      list: "shaonianrexue",
      Search: null
    };
  },
  created() {
    // 调用获取漫画列表
    this.Cartoonlist();
  },
  mounted() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0); // 每次回到 home 页面时 都会滚动到离开时的位置，相当于保持位置
    // 使用防抖函数
    const refresh = this.debounce(
      this.$refs.scroll && this.$refs.scroll.refresh,
      500
    );
    // 监听轮播图图片加载
    this.$bus.$on("ShowImageLoad", () => {
      setTimeout(() => {
        refresh();
      }, 300);
    });
  },
  deactivated() {
    // 1. 离开 home 时 保存滚动位置
    this.saveY = this.$refs.scroll.getScrollY();
    // 2. 取消全局事件的监听 (这里取消 在 home 页面的重刷新 函数)
    this.$bus.$off("itemImgLoad", this.itemImgListener); // 参数（取消的事件，mounted中的重刷新函数）
  },
  methods: {
    // 获取漫画列表
    Cartoonlist() {
      Cartoonlist(this.list).then(res => {
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
        this.cartoonResShow = this.cartoonRes.splice(5, 9); //轮播图的数据
      });
    },
    // 修改list
    toshow(id) {
      this.list = id;
      this.Cartoonlist();
    },
    // 防抖函数
    debounce(func, delay) {
      let timer = null;
      return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func(this, args);
        }, delay);
      };
    }
  }
};
</script >

<style lang="scss" scoped>
#cartoon {
  position: fixed;
  top: 25vw;
  bottom: 0;
  left: 0;
  width: 100%;
}
/* 设置局部滚动的 固定高度 */
.content {
  overflow: hidden;
  position: absolute;
  top: 0vw;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: rgba(30, 30, 30);
}
</style>