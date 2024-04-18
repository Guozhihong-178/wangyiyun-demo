<template>
  <div class="swiperTop">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in state.images" :key="index">
        <img v-lazy="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getBanner } from "@/request/api/home";
import { reactive, onMounted } from "vue";
export default {
  setup() {
    const state = reactive({
      images: [],
    });
    onMounted(async () => {
      let res = await getBanner();
      // console.log(res);
      state.images = res.data.banners;
    });
    return { state };
  },
};
</script>


<style lang="less">
.swiperTop {
  .van-swipe {
    width: 100%;
    height: 3.2rem;
    // padding: 0.2rem;
    .van-swipe-item {
      padding: 0 0.2rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
    }
    .van-swipe__indicator--active {
      background-color: #c20c0c;
    }
  }
}
</style>