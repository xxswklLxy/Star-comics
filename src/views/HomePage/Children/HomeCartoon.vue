<template>
  <div>
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
  </div>
</template>

<script>
import { HomeCartoom } from "@/api/fiction";
export default {
  data() {
    return {
      cartoonRes: {}, //漫画列表数据,
      iid: "都",
      loading: false,
      selection: 1,
      Homeindex: 1
    };
  },
  created() {
    this.HomeCartoom();
  },

  methods: {
    //点击进入详情路由页面
    ImgClick(url) {
      this.$router.push({ name: "detail", params: { iid: url } }); //动态添加url
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
    HomeCartoonindex() {
      ++this.Homeindex;
    },
    bookrack(index) {
      // 1.获取书架需要收藏的信息
      let book = {};
      book = this.cartoonRes[index];
      // 2.将漫画添加到书架里
      this.$store.commit("bookR", book);
    }
  }
};
</script>

<style>
</style>