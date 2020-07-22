<template>

  <div
    class="read-comics"
    v-title
    data-title="星漫画"
  >
    <!-- 没有数据则显示 -->
    <!-- 顶部nav -->
    <div :class="{'topcard': iCard == false ,'topcard1': iCard == true}">
      <div class="topnav">
        <v-icon @click="$router.go(-1)">mdi-chevron-left</v-icon>
        <span class="dataName">{{dataName}}</span>
      </div>
    </div>
    <!-- 顶部nav -->
    <div
      v-if="code === 1"
      style="color: #ffffff;
             margin-top: 13.889vw;
             font-size: 6.111vw;
             text-align: center;"
      @click="cardClick"
    >
      暂无数据
      <img
        src="../assets/img/timg.jpg"
        alt="../assets/img/timg.jpg"
      >
    </div>
    <!-- 有数据显示 -->
    <div v-else>
      <!-- 顶部nav -->
      <div :class="{'topcard': iCard == false ,'topcard1': iCard == true}">
        <div class="topnav">
          <v-icon @click="$router.go(-1)">mdi-chevron-left</v-icon>
          <span class="dataName">{{dataName}}</span>

        </div>

      </div>
      <!-- 顶部nav -->
      <v-progress-linear></v-progress-linear>
      <!-- 图片滚动区域 -->
      <scroll
        class="content"
        ref="scroll"
        :probe-type="2"
        @pullingUp="pullingUp"
      >
        <div
          class="read-comics-list"
          @click="cardClick"
        >
          <div
            class="readimh"
            v-for="(item,index) in  Readimg"
            :key="index"
          >
            <!-- 图片 -->
            <v-lazy>
              <img
                :src="item.img"
                alt=""
                @load="Readload"
              >
            </v-lazy>
          </div>
        </div>

      </scroll>
      <!-- 图片滚动区域 -->
      <!-- 底部nav -->
      <div :class="{'card': iCard == false ,'card1': iCard == true}">
        <div class="bottomnav">
          <div class="btn">
            <v-icon @click="bottomnavClick">mdi-text-box-outline</v-icon>
          </div>
          <div class="btn">
            <v-icon @click="PreviousPage">mdi-chevron-left</v-icon>
          </div>
          <div class="btn">
            <v-icon @click="NexPage">mdi-chevron-right</v-icon>
          </div>
          <div class="btn">
            <div>目录</div>
          </div>
          <div class="btn">
            <span>上一话</span>
          </div>
          <div class="btn">
            <span>下一话</span>
          </div>
        </div>
      </div>
      <!-- 底部nav -->

      <!-- 目录区域go -->
      <div :class="{'catalog':catalogclick == true,'catalog1':catalogclick == false}">
        <div
          v-for="(data,index) in list.list"
          :key="index"
          @click="listClick(data.url,data.num,index)"
          :class="{'listclick':listindex == index}"
          class="cataloglist"
        >{{data.num}}</div>
      </div>
      <!-- 目录区域eng -->
    </div>

  </div>
</template>

<script>
import { CartoonPicture, CartoonDetails } from "@/api/cartoon";
import scroll from "@/scroll/scroll";
export default {
  name: "ReadComics",
  components: {
    scroll
  },
  data() {
    return {
      iid: null,
      Readimg: {},
      heigth: "",
      width: "100%",
      iCard: false,
      code: null,
      list: null,
      readlist: 0,
      name: null,
      catalogclick: false,
      dataName: null,
      listindex: 0,
      index: null
    };
  },

  created() {
    this.iid = localStorage.getItem("Siid"); //获取列表的ID
    this.list = JSON.parse(localStorage.getItem("list")); //获取漫画全部的地址
    this.CartoonPicture(); // 获取图片列表
    this.dataName = localStorage.getItem("SdataName"); //获取名字
    this.listindex = localStorage.getItem("Slistindex"); //获取目录的索引值
  },
  mounted() {
    //用事件总线把当前的路由名称发出去
    this.$bus.$emit("ReadActive", this.$route.fullPath);
    this.ReadActive();
    // 使用防抖函数
    const refresh = this.debounce(
      this.$refs.scroll && this.$refs.scroll.refresh,
      500
    );
    // 监听图片加载
    this.$bus.$on("iReadload", () => {
      setTimeout(() => {
        refresh();
      }, 300);
    });
  },
  destroyed() {
    localStorage.setItem("Siid", null); //清空目录地址
    localStorage.setItem("Slistindex", null); //清空目录索引号
    localStorage.setItem("SdataName", null); //清空漫画名字
  },
  methods: {
    //
    // 网络请求
    //
    // 获取图片列表
    CartoonPicture() {
      CartoonPicture(this.iid).then(res => {
        this.Readimg = res.list;
        this.code = res.code;
      });
    },
    // 点击目录切换章节
    listClick(url, num, index) {
      CartoonPicture(url, num).then(res => {
        this.Readimg = res.list;
        this.code = res.code;
        this.$refs.scroll.scrollTo(0, 0, 0); //切换章节后跳回顶部
        localStorage.setItem("SdataName", num); //保存漫画名字
        this.dataName = localStorage.getItem("SdataName"); //赋值漫画名字
      });
      localStorage.setItem("Siid", url); //保存目录地址
      this.iid = localStorage.getItem("Siid"); //动态获取列表的ID
      localStorage.setItem("Slistindex", index); //保存目录索引号
      this.listindex = localStorage.getItem("Slistindex"); //赋值目录索引号
    },
    ReadActive() {},
    Readload() {
      this.$bus.$emit("iReadload"); //发出iReadload事件
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
    },
    // 控制nav的显示隐藏
    cardClick() {
      this.iCard = !this.iCard;
      this.catalogclick = false;
    },
    // 控制nav的显示隐藏
    bottomnavClick() {
      this.catalogclick = !this.catalogclick;
    },
    // 点击跳转上一话
    PreviousPage() {
      --this.listindex;
      this.iid = this.list.list[this.listindex].url;
      localStorage.setItem("Siid", this.iid);
      this.dataName = this.list.list[this.listindex].num;
      localStorage.setItem("SdataName", this.dataName);
      localStorage.setItem("Slistindex", this.listindex);
      setTimeout(() => {
        this.$refs.scroll.scrollTo(0, 0, 0); //切换章节后跳回顶部
        this.CartoonPicture();
      }, 100);
    },
    // 点击跳转下一话
    NexPage() {
      ++this.listindex;
      this.iid = this.list.list[this.listindex].url;
      localStorage.setItem("Siid", this.iid);
      this.dataName = this.list.list[this.listindex].num;
      localStorage.setItem("SdataName", this.dataName);
      localStorage.setItem("Slistindex", this.listindex);
      setTimeout(() => {
        this.$refs.scroll.scrollTo(0, 0, 0); //切换章节后跳回顶部
        this.CartoonPicture();
      }, 100);
    },
    // 点击排序目录
    sortClick() {
      this.list.reverse();
    },
    // 上拉刷新
    pullingUp() {}
  }
};
</script>

<style lang="scss" scoped>
.read-comics {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #272727;
  /* 设置局部滚动的 固定高度 */
  .content {
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .card {
    display: none;
    position: absolute;
    bottom: 0;
  }
  .card1 {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }
  .topcard {
    display: none;
    position: absolute;
    top: 0;
  }
  .topcard1 {
    position: absolute;
    top: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }
  .catalog1 {
    display: none;
  }
  .catalog {
    position: absolute;
    height: 100%;
    right: 0;
    bottom: 0;
    width: 70%;
    padding: 17.556vw 0;
    background-color: rgba(0, 0, 0, 0.5);
    overflow-x: hidden; /*x轴禁止滚动*/
    overflow-y: scroll; /*y轴滚动*/
    z-index: 1;
    .cataloglist {
      width: 100%;
      height: 13.889vw;
      color: white;
      margin-left: 2.778vw;
    }
    .listclick {
      color: pink;
    }
  }

  .v-icon.v-icon {
    margin: 0 5.556vw;
    line-height: 8.333vw;
    color: white;
  }
  .readimh {
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      margin-top: -1.944vw;
      position: relative;
    }
    img::after {
      content: "";
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: url(~assets/img/timg.jpg) no-repeat center;
    }
  }

  .topnav {
    height: 13.889vw;
    width: 100%;
    font-size: 5vw;
  }
  .dataName {
    color: white;
    line-height: 13.889vw;
  }
  .bottomnav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    color: white;

    .btn {
      flex: 0 0 33.33%;
    }
  }
}
</style>