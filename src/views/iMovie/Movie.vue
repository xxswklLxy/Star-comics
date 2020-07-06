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
      <div class="booklist">

        <div
          class="book"
          v-for="(item,index) in ibooklist"
          :key="index"
        >
          <v-card
            class="mx-letf"
            width="27.778vw"
            height="57.222vw"
          >
            <v-img
              :src="item.cover"
              :aspect-ratio="16/9"
              height="33.333vw"
              @load="MovieLoad"
            >
            </v-img>
            <div class="name">{{item.name}}</div>
            <div class="latest">{{item.latest}}</div>
            <div class="Micon">
              <div
              class="moviebtn"
                @click="ImgClick(item.url)"
                style="    font-size: 3.889vw; position: absolute;bottom: 0; letf: 0;"
              > 详情</div>
            </div>
            <div
             class="moviebtn"
              @click="engClick(item)"
              style="  font-size: 3.889vw;  position: absolute; bottom: 0;right: 0; "
            > 删除</div>
          </v-card>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from "@/scroll/scroll";
export default {
  components: {
    scroll
  },
  data() {
    return {
      ibooklist: null
    };
  },

  created() {
    this.ibooklist = JSON.parse(localStorage.getItem("bookList"));
  },
  mounted() {
    // 监听轮播图图片加载
    this.$bus.$on("MovieLoadIMG", () => {
      setTimeout(() => {
        this.$refs.scroll.refresh();
      }, 300);
    });
  },
  activated() {
    this.ibooklist = JSON.parse(localStorage.getItem("bookList"));
    console.log(this.ibooklist);
  },
  destroyed() {
    console.log("11");
  },
  methods: {
    //点击进入详情路由页面
    ImgClick(iid) {
      this.$router.push({ name: "detail", params: { iid: iid } }); //动态添加url
    },
    engClick(item) {
      this.ibooklist.removeByValue(item);
      localStorage.setItem("bookList", JSON.stringify(this.ibooklist));
    },
    MovieLoad() {
      this.$bus.$emit("MovieLoadIMG");
    }
  }
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
.booklist {
  display: flex;
  flex-wrap: wrap;
  .book {
    position: relative;
    height: 56.333vw;
    margin-top: 2.778vw;
    overflow: hidden;
    margin: 2.778vw 2.778vw;
    v-card {
      flex: 0 0 30.33%;
    }
    .name,
    .latest {
      margin-top: 1.778vw;
      white-space: nowrap; /*一行显示*/
    }
    .name {
      font-size: 3.889vw;
    }
    .latest {
      font-size: 3.333vw;
    }
    .Micon {
      position: absolute;
      bottom: 0;
      width: 100%;
      display: flex;
    }
  }
}
.moviebtn{
  color: orange;
}
</style>