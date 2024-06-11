<template>
  <div class="footerMusic">
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="playList[playListIndex] && playList[playListIndex].al.picUrl ? playList[playListIndex].al.picUrl : 'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'" alt="" />
      <div>
        <p>{{ playList[playListIndex] && playList[playListIndex].name }}</p>
        <span>横滑切换上下首哦</span>
      </div>
    </div>
    <div class="footerRight">
      <svg
        class="icon liebiao"
        aria-hidden="true"
        @click="play"
        v-if="isbtnShow"
      >
        <use xlink:href="#icon-bofang3"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-zanting1"></use>
      </svg>
      <svg
        class="icon liebiao"
        aria-hidden="true"
        @click="showPopupList = true"
      >
        <use xlink:href="#icon-bofangliebiao"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <van-popup
      v-model:show="detailShow"
      position="bottom"
      :style="{ height: '100%', width: '100%' }"
    >
      <MusicDetail
        :musicList="playList[playListIndex]"
        :play="play"
        :isbtnShow="isbtnShow"
      />
    </van-popup>
    <van-popup
      v-model:show="showPopupList"
      round
      position="bottom"
      :style="{ height: '60%', width: '100%' }"
    >
    <currentPlayList />
    </van-popup>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import MusicDetail from "@/components/item/MusicDetail.vue";
import currentPlayList from "@/components/item/currentPlayList.vue";

export default {
  data() {
    return {
      interVal: 0,
      showPopupList: false,
    };
  },
  methods: {
    play: function () {
      // 判断音乐是否播放
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateIsbtnShow(false);
        this.updateTime(); //播放就调用函数进行传值
      } else {
        this.$refs.audio.pause();
        this.updateIsbtnShow(true);
        clearInterval(this.interVal); //暂停清除定时器
      }
    },
    updateTime: function () {
      this.interVal = setInterval(() => {
        // console.log(this.$refs.audio.currentTime);
        this.updateCurrentTime(this.$refs.audio.currentTime);
      }, 1000);
    },
    // addDuration: function () {
    //   this.updateDuration(this.$refs.audio.duration);
    // },
    ...mapMutations([
      "updateIsbtnShow",
      "updateDetailShow",
      "updateCurrentTime",
      "updateDuration",
    ]),
  },
  watch: {
    playListIndex: function () {
      //监听如果下标发生了改变，就自动播放音乐
      this.updateTime();
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        //如果是暂停状态，改变图标
        this.updateIsbtnShow(false);
      }
    },
    playList: function () {
      this.$refs.audio.autoplay = true;
      this.updateIsbtnShow(false);
    },
  },
  computed: {
    ...mapState(["playList", "playListIndex", "isbtnShow", "detailShow"]),
  },
  mounted() {
    // console.log(this.$refs);
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    // this.updateTime()
  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    // this.addDuration()
  },
  components: {
    MusicDetail,
    currentPlayList
  },
};
</script>

<style lang="less" scoped>
.footerMusic {
  width: 100%;
  height: 1.4rem;
  background: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  .footerLeft {
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    padding-left: 0.12rem;
    div {
      width: 85%;
      p {
        width: 100%;
        font-size: 0.3rem;
        padding-bottom: 0.04rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      span {
        font-size: 0.2rem;
        color: #666;
      }
    }
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      margin-right: 0.2rem;
    }
  }
  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.56rem;
      height: 0.56rem;
      fill: #282828;
    }
  }
}
</style>