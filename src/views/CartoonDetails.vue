<template>
  <div>
    <div v-if="!IFundefined">
      <div class="details-nav">
        <v-icon
          class="icon"
          large
          @click="$router.go(-1)"
        >mdi-chevron-left</v-icon>
        <span>{{name}}</span>
      </div>
      <div class="details">
        <!-- 顶部区域 -->

        <scroll
          class="content"
          ref="scroll"
          :probe-type="3"
        >
          <!-- 图片区域 -->
          <div class="details-img">
            <!-- 图片 -->
            <img
              :src="cover"
              alt=""
              @load="imageDetail"
            >
            <!-- 作者 类型 -->
            <div class="author"><span>{{author}}</span>
              <p>{{tag}}</p>
            </div>
          </div>
          <div :class="{'introduce':!Aintroduce,'introduce2':Aintroduce}">
            {{introduce}}
            <v-icon
              :class="{'icon1':!Aintroduce ,'icon2':Aintroduce}"
              @click="introduceContent"
            >{{mdi}}</v-icon>
          </div>
          <!-- 最新更新 -->
          <div class="latest">

            <div style=" font-size: 3.889vw;">更新时间：{{time}}</div>
          </div>
          <!-- 章节列表 -->
          <div class="details-list">
            <div class="section">全部章节({{list.length}})</div>
            <div class="unfold">
              <div
                class="text-center ma-2"
                @click="collectClick(cover)"
              >
                <v-btn
                  color="orange"
                  text
                > 收藏</v-btn>

                <v-btn
                  color="orange"
                  text
                  @click="unfoldClick"
                  :class="{'unfold1':iUnfold == false}"
                >
                  排序
                </v-btn>
              </div>
            </div>
            <div
              v-for="(item,index) in list"
              :key="index"
              class="list"
              @click="DetailsURL(item.url,item.num,index)"
            >{{item.num}}</div>
          </div>
        </scroll>
        <router-view></router-view>
      </div>
    </div>

    <div v-else>
            <div class="details-nav">
        <v-icon
          class="icon"
          large
          @click="$router.go(-1)"
        >mdi-chevron-left</v-icon>
        <span>{{name}}</span>
      </div>
      暂无数据
      <transition name="delay-display-none">
        <img
          src="../assets/img/timg.jpg"
          alt=""
        >
      </transition>
    </div>
  </div>
</template>

<script>
import { CartoonDetails } from "@/api/cartoon";
import scroll from "@/scroll/scroll";
export default {
  name: "CartoonDetails",
  components: {
    scroll
  },
  data() {
    return {
      iid: null, //ID
      name: null, //漫画名字
      cover: null, //图片
      author: null, //作者
      tag: null, //类型
      latest: null, //最新章节
      time: null, //更新时间
      introduce: null, // 介绍
      code: null, //是否有数据
      list: {}, //章节列表
      Aintroduce: false,
      mdi: "mdi-chevron-down", //iocn图标
      iUnfold: false, //升降顺序
      cartoonDetailsRES: [], //保存目录地址
      boos: [],
      ifname: undefined
    };
  },
  created() {
    //
    // 网络请求
    //
    this.iid = this.$route.params && this.$route.params.iid; //动态获取列表的ID
    this.CartoonDetails(); // 动态获取ID里的数据
    this.$bus.$emit("DetailsActive", this.$route.fullPath); //用事件总线把当前的路由名称发出去
    this.imageDetail(); //监听图片加载

  
  },
  activated() {
    
    this.$bus.$emit("Detailsnone", true);
  },
 

    beforeRouteLeave(to, form, next) {
       next()
       this.$bus.$emit("Detailsnone", false);
  },

  computed: {
    // 获取VUEX里的listiid
    listiid() {
      return this.$store.state.listiid;
    },
    IFundefined() {
      return this.name == this.ifname;
    }
  },
  methods: {
    // 动态获取ID里的数据
    CartoonDetails() {
      CartoonDetails(this.iid).then(res => {
        this.cartoonDetailsRES = res;
        this.name = res.data.name;
        this.cover = res.data.cover;
        this.author = res.data.author;
        this.tag = res.data.tag;
        this.latest = res.data.latest;
        this.time = res.data.time;
        this.introduce = res.data.introduce;
        this.list = res.list.reverse();
        this.code = res.code;
        this.boos = res.data
      });
    },
    // 点击跳转响应的路由
    DetailsURL(iid, num, index) {
      this.$router.push({ name: "readcomics" }); //点击跳转路由
      this.$store.commit("listiid", iid); //把iid赋值给VUEX中的listiid
      localStorage.setItem("list", JSON.stringify(this.cartoonDetailsRES)); //保存this.cartoonDetailsRES并转为字符串
      localStorage.setItem("SdataName", num); //保存点击的漫画名字
      localStorage.setItem("Slistindex", index); //点击保存目录索引值
      localStorage.setItem("Siid", this.$store.state.listiid); //保存目录的URL
    },
    // 点击修改升降排序
    unfoldClick() {
      this.list = this.list.reverse();
      this.iUnfold = !this.iUnfold;
    },
    // 点击切换类，控制介绍和按钮icon2
    introduceContent() {
      this.Aintroduce = !this.Aintroduce;
      if (this.Aintroduce == true) {
        this.mdi = "mdi-chevron-up";
      } else if (this.Aintroduce == false) {
        this.mdi = "mdi-chevron-down";
      }
    },
    //监听图片加载
    imageDetail() {
      setTimeout(() => {
        this.$refs.scroll && this.$refs.scroll.refresh();
      }, 500);
    },
    collectClick() {
      // 2.将漫画添加到书架
      this.boos.url = this.iid
      this.$store.commit("bookR", this.boos);
    }
  }
};
</script>

<style lang="scss" scoped>
.details {
  position: fixed;
  top: 10vw;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 4.444vw;
  /* 设置局部滚动的 固定高度 */
  .content {
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .details-nav {
    width: 100%;
    height: 13.889vw;
    position: relative;
    text-align: center;
    background-color: rgba(255, 255, 255);
    box-shadow: 0 2.778vw 2.5vw -1.944vw rgba(217, 217, 217, 0.5);
    .icon {
      position: absolute;
      left: 0;
      line-height: 13.889vw;
    }
    span {
      line-height: 13.889vw;
      display: inline-block;
      width: 55.556vw;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .details-img {
    position: relative;
    width: 100%;
    height: 58.333vw;
    overflow: hidden;
    img {
      width: 100%;
    }
    .author {
      position: absolute;
      top: 41.833vw;
      left: 4vw;
      width: 55.556vw;
      height: 15.222vw;
      span {
        display: inline-block;
        padding: 1.389vw 0;
        font-size: 5vw;
        color: rgba(255, 255, 255);
      }
      p {
        font-size: 3.889vw;
        color: rgba(238, 241, 248);
      }
    }
  }

  .introduce {
    position: relative;
    width: 97.611vw;
    height: 10.444vw;
    background-color: white;
    font-size: 3.5vw;
    padding: 0 1.389vw 0 1.389vw;
    margin: 5.556vw 1.389vw 5.556vw 1.389vw;
    color: rgba(153, 153, 153);
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    .icon1 {
      position: absolute;
      top: 5.5vw;
      right: -1.278vw;
    }
  }
  .introduce2 {
    position: relative;
    width: 97.611vw;
    height: auto !important;
    height: 27.778vw;
    min-height: 27.778vw;
    background-color: white;
    font-size: 3.5vw;
    padding: 0 1.389vw 0 1.389vw;
    margin: 5.556vw 1.389vw 5.556vw 1.389vw;
    color: rgba(153, 153, 153);
    overflow: hidden;
    .icon2 {
      position: absolute;
      bottom: -1.667vw;
      right: -1.278vw;
    }
  }
  .latest {
    width: 100%;
    height: 20.889vw;
    padding: 0 1.389vw;
    margin: 2.222vw 2.778vw;
    display: flex;
    flex-wrap: wrap;
    div {
      flex: 0 0 47%;
    }
    div:nth-child(1) {
      line-height: 16.111vw;
    }
    .latest-list {
      font-size: 3.889vw;
      line-height: 11.111vw;
      overflow: hidden;
      white-space: nowrap; /*一行显示*/
      overflow: hidden; /*超出部分隐藏*/
      text-overflow: ellipsis; /*用...代替超出部分*/
      margin: 2.222vw 0;
    }
    p {
      font-size: 3.889vw;
    }
  }
  .v-input__slider,
  .v-select {
    width: 100%;
  }

  .details-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 0 1.389vw;
    margin: 2.778vw 0;
    .section,
    .unfold {
      width: 41.667vw;
      height: 11.111vw;
      min-width: 41.667vw;
      margin: 0 2.778vw;
      flex: 1;
    }

    .unfold {
      text-align: right;
    }
    .unfold1 {
      color: yellow;
    }
    .list {
      flex: 0 0 27.3333%;
      width: 22.667vw;
      height: 11.111vw;
      min-width: 22.667vw;
      overflow: hidden;
      text-align: center;
      font-size: 3.889vw;
      line-height: 11.111vw;
      border-radius: 0.25rem;
      border: 0.278vw solid #ccc;
      margin: 2.222vw 2.778vw;
    }
  }
  .delay-display-none-leave-active {
    transition: opacity 0.3s;
  }
  .delay-display-none-leave-to {
    opacity: 1;
  }
}
</style>