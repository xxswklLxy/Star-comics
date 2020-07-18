<template>
  <!-- 头部公共组件 -->
  <div
    id="head-top"
    :class="{'heead':isActive }"
  >
    <div class="head-logo">
      星漫画
    </div>
    <!-- 路由导航 -->
    <div class="head-nav">
      <ul>
        <li
          v-for="(item,index) in nav"
          :key="index"
          @click="navClick(index)"
        ><span
            ref="spanindex"
            :class="{navpink: index == navindex}"
          >{{item}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: ["首页", "分类", "书架", "搜索"],
      navindex: 0,
      isActive: false,
      Sname: null
    };
  },
  created(){

   
    this.vanindex();
    this.navClick(this.navindex);
  },
  mounted() {
    this.Sname = this.$route.name;

    //退出详情页面时显示HeadTOP
    this.$bus.$on("Detailsnone", data => {
      this.SActive(data);
    });
    // 进入详情页面的路由时隐藏HeadTOP
    this.$bus.$on("DetailsActive", data => {
      this.iActive(data);
    });

    this.$bus.$on("ReadActive", data => {
      this.rActive(data);
    });
    // console.log(this.isActive);
  },
  methods: {
    iActive(data) {
      if ((data = "/detail")) {
        this.isActive = true;
      }
    },
    rActive(data) {
      if ((data = "/readcomics")) {
        this.isActive = true;
      }
    },
    SActive(data) {
      if (this.$route.path == "/cartoon" || "/fiction") {
        this.isActive = data;
      }
    },
    //  将存入浏览器的index的值拿出来重新赋值给navindex 保证刷新后路由和导航下标不会跳回首页
    vanindex() {
    
      this.navindex = localStorage.getItem("educatList");
    },
    navClick(index) {
      //  判断进行路由跳转
      if (index === 0) {
        this.isActive = false;
        this.$router.push({ path: "/homepage" }).catch(error => error); //解决双击跳转到同一个路由的错误
      } else if (index === 1) {
        this.isActive = false;
        this.$router.push({ path: "/cartoon" }).catch(error => error);
      } else if (index === 2) {
        this.isActive = false;
        this.$router.push({ path: "/movie" }).catch(error => error);
      } else if (index === 3) {
        this.isActive = false;
        this.$router.push({ path: "/fiction" }).catch(error => error);
      }
      this.navindex = index;
      localStorage.setItem("educatList", index); //将index存入浏览器
    }
  }
};
</script>

<style lang="scss" scoped>
.heead {
  display: none;
}

#head-top {
  width: 100%;
  height: 25vw;
  margin-bottom: 1.389vw;
  border-bottom: 0.556vw solid #f4f4f4;
  background-color: #ffffff;
  position: relative;
  z-index: 99;
  .head-logo {
    text-align: center;
    line-height: 13.889vw;
    height: 13.889vw;
    background-color: #2196f3;
  }
  .head-nav {
    line-height: 9.722vw;
    ul {
      text-align: center;
      display: flex;
      padding-right: 6.667vw;
      li {
        font-size: 3.889vw;
        flex: 1;
        list-style-type: none;
        float: left;
      }
    }
  }
}
.navpink {
  border-bottom: 0.556vw solid pink;
  padding-bottom: 1.833vw;
}
</style>