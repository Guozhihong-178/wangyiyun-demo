<template>
  <div class="musicList">
    <div class="top">
      <div class="title">甄选歌单</div>
      <!-- <van-button type="default">查看更多</van-button> -->
    </div>
    <div class="content">
      <van-swipe
        :loop="false"
        :width="state.swiperWidth"
        class="my-swiper"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in state.musicList" :key="item.id">
          <router-link :to="{ path:'/itemMusic', query: { id: item.id } }">
            <img :src="item.picUrl" alt="" />
            <span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gf-headphones"></use>
              </svg>
              {{ getCount(item.playCount) }}
            </span>
            <div class="tit">{{ item.name }}</div>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from "@/request/api/home";
import { onMounted, reactive } from "vue";

export default {
  // data() {
  //   return {
  //     musicList: [],
  //   };
  // },
  // methods: {
  //   async getList() {
  //     const res = await getMusicList();
  //     console.log(res);
  //     this.musicList = res.data.result;
  //   },
  //   getCount(num){
  //     if(num>=100000000){
  //       return (num / 100000000).toFixed(1) +'亿'
  //     }else if(num>=10000){
  //       return (num / 10000).toFixed(1) +'万'
  //     }else {
  //       return num
  //     }
  //   }
  // },
  // mounted() {
  //   this.getList();
  // }

  // vue3
  setup() {
    const state = reactive({
      musicList: [],
      swiperWidth: 130,
    });
    function getCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      } else {
        return num;
      }
    }
    onMounted(async () => {
      let res = await getMusicList();
      // console.log(res);
      state.musicList = res.data.result;
      state.swiperWidth = window.innerWidth >= 750 ? 280 : 130;
      // console.log(state.swiperWidth);
    });
    return { state, getCount };
  },
};
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.6rem 0.3rem;
  // margin-bottom: .2rem;
  .top {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .title {
      font-size: 0.36rem;
      font-weight: 800;
    }
    .van-button {
      font-size: 0.3rem;
      height: 0.48rem;
      text-align: center;
      line-height: 0.6rem;
      width: 1.83rem;
      border-radius: 0.24rem;
    }
  }
  .content {
    .my-swiper {
      margin-top: 0.2rem;
      width: 100%;
      .van-swipe-item {
        position: relative;
        width: 100%;
        height: 100%;
        padding-right: 0.2rem;
        img {
          width: 100%;
          border-radius: 8%;
        }
        span {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 0.08rem;
          left: 0.12rem;
          color: #fff;
          svg {
            width: 0.3rem;
            height: 0.3rem;
            fill: #fff;
            margin-right: 0.04rem;
          }
        }
        .tit {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          /* 限制在一个块元素显示的文本的行数 */
          -webkit-line-clamp: 2;
          /* 设置或检索伸缩盒对象的子元素的排列方式 */
          -webkit-box-orient: vertical;
        }
      }
    }
  }
  a {
    color: #000;
  }
}
</style>