<template>
  <img :src="musicList.al.picUrl" alt="" class="bgimg" />
  <div class="detailTop">
    <div class="detailTopLeft">
      <svg class="icon liebiao" aria-hidden="true" @click="backHome">
        <use xlink:href="#icon-arrowdown"></use>
      </svg>
    </div>
    <div class="detailTopMiddle">{{ musiclistName }}</div>
    <div class="detailTopRight">
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-fenxiang2"></use>
      </svg>
    </div>
  </div>
  <div
    class="detailContent"
    @click="isLyricShow = !isLyricShow"
    v-show="!isLyricShow"
  >
    <img
      src="@/assets/needle-ab.png"
      alt=""
      class="img_needle"
      :class="{ img_needle_active: !isbtnShow }"
    />
    <img src="@/assets/cd.png" alt="" class="img_cd" />
    <img
      :src="musicList.al.picUrl"
      alt=""
      class="img_ar"
      :class="{ img_ar_active: !isbtnShow, img_ar_pauesd: isbtnShow }"
    />
  </div>
  <div
    class="musicLyric"
    ref="musicLyric"
    @click="isLyricShow = !isLyricShow"
    v-show="isLyricShow"
  >
    <p
      v-for="item in lyric"
      :key="item"
      :class="{
        active:
          currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,
      }"
    >
      {{ item.lrc }}
    </p>
  </div>
  <div class="detilBottom">
    <div class="bottomTop">
      <div class="left">
        <Vue3Marquee style="color: #fff; font-weight: 600" duration="8">{{
          musicList.name
        }}</Vue3Marquee>
        <div class="name">
          <span
            v-for="(item, index) in musicList.ar"
            :key="item"
            class="namebox"
          >
            {{ item.name }}
            <span
              v-if="
                musicList.ar.length > 1 && index !== musicList.ar.length - 1
              "
              style="font-size: 0.36rem; padding: 0.04rem 0.05rem 0"
            >
              /
            </span>
          </span>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </div>
      </div>
      <div class="right">
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-xihuan1"></use>
        </svg>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-pinglun-"></use>
        </svg>
      </div>
    </div>
    <div class="bottomContent">
      <input
        type="range"
        class="range"
        min="0"
        :max="duration"
        v-model="currentTime"
        step="0.05"
      />
    </div>
    <div class="bigIcon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shuaxin"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishou"></use>
      </svg>
      <svg
        class="icon bofang"
        aria-hidden="true"
        v-if="isbtnShow"
        @click="play"
      >
        <use xlink:href="#icon-bofang2"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-zanting4"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofangliebiao1"></use>
      </svg>
    </div>
    <div class="smallIcon"></div>
  </div>
</template>
<script>
import { Vue3Marquee } from "vue3-marquee";
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      isLyricShow: false,
    };
  },
  mounted() {
    // console.log(this.musicList);
    this.addDuration();
  },
  props: ["musicList", "isbtnShow", "play", "addDuration"],
  methods: {
    backHome: function () {
      this.updateDetailShow();
      setTimeout(() => (this.isLyricShow = false), "1000");
    },
    goPlay: function (num) {
      let index = this.playListIndex + num;
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index == this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
    ...mapMutations(["updateDetailShow", "updatePlayListIndex"]),
  },
  computed: {
    ...mapState([
      "musiclistName",
      "lyricList",
      "currentTime",
      "playListIndex",
      "playList",
      "duration",
    ]),
    lyric: function () {
      let arr;
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lrc = item.slice(11, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          // console.log(min,sec,Number(mill),lrc);
          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 100000;
          } else {
            item.pre = arr[i + 1].time;
          }
        });
      }
      console.log(arr);
      return arr;
    },
  },
  watch: {
    currentTime: function (newValue) {
      let p = document.querySelector("p.active");
      // console.log([p]);
      if (p) {
        if (p.offsetTop > 250) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 250;
        }
      }
      if (newValue === this.duration) {
        if (this.playListIndex === this.playList.length - 1) {
          this.updatePlayListIndex(0);
          this.play();
        } else {
          this.updatePlayListIndex(this.playListIndex + 1);
        }
      }
      // console.log([this.$refs.musicLyric])
    },
  },
  components: {
    Vue3Marquee,
  },
};
</script>

<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(90px);
}
.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.28rem .2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;
  color: #fff;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .leftMarquee {
      width: 3rem;
      height: 100%;
      margin-left: 0.4rem;
    }
  }
  // .detailTopRight{
    // .icon{
    //   fill: #777777;
    // }
  // }
  .icon {
        width: 0.54rem;
        height: 0.54rem;
        fill:#fff
        // fill: #999;
      }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 45%;
    top: 0.3rem;
    transform-origin: 0 0;
    transform: rotate(-25deg);
    transition: all 2s;
  }
  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 45%;
    top: 0.3rem;
    transform-origin: 0 0;
    transform: rotate(-5deg);
    transition: all 2s;
  }

  .img_cd {
    width: 6rem;
    height: 6rem;
    position: absolute;
    bottom: 1.3rem;
    z-index: -1;
  }
  .img_ar {
    width: 4.2rem;
    height: 4.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 2.14rem;
    animation: rotate_ar 25s linear infinite;
  }
  .img_ar_active {
    animation-play-state: running;
  }
  .img_ar_pauesd {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.musicLyric {
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;
  overflow: scroll;
  p {
    color: rgb(190, 181, 181);
    margin-bottom: 0.34rem;
  }
  .active {
    color: #fff;
    font-size: 0.46rem;
  }
}
.detilBottom {
  width: 100%;
  position: absolute;
  bottom: 1rem;
  .bottomTop {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .2rem .4rem;
    .left {
      width: 60%;
      font-size: .38rem;
      .name {
        display: flex;
        justify-content: start;
        align-items: center;
        color: #fff;
        .namebox {
          font-size: .3rem;
          display: flex;
          align-items: center;
          white-space: nowrap;
        }
        .icon {
          width: 0.32rem;
          padding-top: .04rem;
        }
      }
    }
    .right {
      width: 35%;
      display: flex;
      justify-content: end;
      .icon {
        margin-left: .4rem;
      }
    }
    .liebiao {
      width: 0.64rem;
      height: 0.64rem;
      fill: #fff;
    }
  }
  .bottomContent{
    height: 30px;
    margin-bottom: 10px;
    .range {
      width: 100%;
      height: 0.06rem;
    }
  }
  .bigIcon {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: rgb(245, 234, 234);
      width: .64rem;
      height: .64rem;
    }
    .bofang {
      width: .76rem;
      height: .76rem;
    }
  }
}
</style>