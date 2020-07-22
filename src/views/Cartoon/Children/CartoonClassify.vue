<template>
  <div>
    <!-- 分类导航 -->
      <div class="classify">
        <div
          class="classify-list"
          v-for="(data,index) in  iClassify"
          :key="index"
          @click="ClassifyList(index,data.id)"
          :class="{'classifycolor':classifycolor == index}"
        >{{data.name}}</div>
      </div>
      <!-- 分类导航 -->
  </div>
</template>

<script>
export default {
   props: {
      Cartoonlist: {
        type: Function,
        default: null
      }
    },
  data () {
    return {
            classifycolor: 0,
      
            iClassify: [
        { name: "少年热血", id: "shaonianrexue" },
        { name: "武侠格斗", id: "wuxiagedou" },
        { name: "恐怖灵异", id: "kongbulingyi" },
        { name: "少女爱情", id: "shaonvaiqing" },
        { name: "恋爱生活", id: "lianaishenghuo" },
        { name: "生活漫画", id: "shenghuomanhua" },
        { name: "科幻魔幻", id: "kehuanmohuan" },
        { name: "竞技体育", id: "jingjitiyu" },
        { name: "爆笑喜剧", id: "baoxiaoxiju" },
        { name: "侦探推理", id: "zhentantuili" },
        { name: "最新更新", id: "new" },
        { name: "热门排行", id: "hot" },
        { name: "已完结", id: "wanjie" },
        { name: "连载中", id: "lianzai" },
        { name: "大陆漫画", id: "dalu" },
        { name: "日本漫画", id: "riben" },
        { name: "台湾漫画", id: "taiwang" },
        { name: "欧美漫画", id: "oumei" },
        { name: "其他漫画", id: "qita" }
      ]
    }
  },
  methods:{
     // 点击切换分类
    ClassifyList(index, id) {
      this.classifycolor = index;
     this.$emit('showbox',id); //触发showbox方法，id为向父组件传递的数据
    },
  }

}

</script>

<style lang="scss" scoped>
.classify {
  width: 100%;
  height: 46.333vw;
  background-color: rgba(30, 30, 30);
  font-size: 3.333vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: #ffffff;
  margin-top: 2.778vw;
  margin-left: 2.778vw;
  .classify-list {
    flex: 1 0 31.22%;
    margin-left: 1.944vw;
  }
  .classifycolor {
    color: pink;
  }
}
</style>