<template>
  <div class="slideshow">
    <v-carousel
      class="carousel"
      cycle
      height="65.556vw"
      hide-delimiter-background
      show-arrows-on-hover
      :show-arrows="false"
      hide-delimiters
    >
      <v-carousel-item
        v-for="(item, i) in cartoonResShow"
        :key="i"
      >
        <v-sheet
          class="sheet"
          :color="colors[i]"
          height="65.556vw"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-3">
              <v-img
                @load="ShowLoad"
                class="v-img"
                :src="item.cover"
                aspect-ratio="0.7"
              ></v-img>

            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  props: {
    cartoonResShow: Array,
    redirect: true
  },
  data() {
    return {
      colors: ["black"]
    };
  },
  methods: {
    ShowLoad() {
      this.$bus.$emit("ShowImageLoad");
    }
  }
};
</script>

<style lang="scss" scoped>
.slideshow {
  height: 65.556vw;
  width: 100%;
  .display-3 {
    width: 100%;
    height: 65.556vw;
    .v-img {
      height: 83.333vw;
      width: 100%;
    }
  }
}
</style>