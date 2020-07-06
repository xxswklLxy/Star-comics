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
      <v-card
        :loading="loading"
        class="mx-auto"
        max-width="500"
        v-for="(item,index) in cartoonRes"
        :key="index"
      >
        <v-img
          class="white--text align-end"
          height="55.556vw"
          :src="item.cover"
          alt=""
          align="center"
          @click="ImgClick(item.url)"
          @load="HomeLoad"
        >
          <v-card-title v-model="selection">{{item.name}}</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">{{item.latest}}</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>{{item.tag}}</div>

          <div>{{item.status}}</div>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="orange"
            text
            @click="ImgClick(item.url)"
          >
            详情
          </v-btn>

          <div
            class="text-center ma-2"
            @click=" bookrack(index)"
          >
            <v-btn
              color="orange"
              text
            > 收藏</v-btn>

          </div>
        </v-card-actions>
      </v-card>
    </scroll>
  </div>
</template>

<script>
import { HomeCartoom } from "@/api/fiction";
import scroll from "@/scroll/scroll";
export default {
  components: {
    scroll
  },
  data() {
    return {
      cartoonRes: {}, //漫画列表数据,
      iid: '都',
      loading: false,
      selection: 1,
      Homeindex: 1
    };
  },

  created() {
    this.HomeCartoom();
  },
  mounted() {
    // 监听轮播图图片加载
    this.$bus.$on("HomeLoadIMG", () => {
      setTimeout(() => {
        this.$refs.scroll.refresh();
      }, 300);
    });
  },
  methods: {
    //点击进入详情路由页面
    ImgClick(iid) {
      this.$router.push({ name: "detail", params: { iid: iid } }); //动态添加url
    },
    HomeLoad() {
      this.$bus.$emit("HomeLoadIMG");
    },
    //  请求
    HomeCartoom() {
      HomeCartoom(this.iid).then(res => {
        this.cartoonRes = res.list.slice(1, 10 * this.Homeindex); //拿到数据
        const cartoonResID = this.cartoonRes.map(function(item) {
          return item.url;
        });
        this.cartoonResID = cartoonResID;
      });
    },
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
    // 上拉刷新
    pullingUp() {
      this.$refs.scroll.finishPullUp();
      ++this.Homeindex;
      this.HomeCartoom();
    },
    bookrack(index) {
      // 1.获取书架需要收藏的信息
      let book = {};
      book = this.cartoonRes[index];
      console.log(book);

      // 2.将漫画添加到书架里
      this.$store.commit("bookR", book);
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