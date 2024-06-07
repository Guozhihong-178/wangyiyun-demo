<template>
  <div class="itemMusicList">
    <div class="top">
      <div class="topleft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <span>播放全部</span>
        <span class="count">({{ songs.length }})</span>
      </div>
      <div class="topright">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-duoxuan"></use>
        </svg>
      </div>
    </div>
    <div class="itemList">
      <div v-for="(item, index) in songs" :key="item.id" class="item">
        <div class="itemleft" @click="playMusic(item, index)">
          <span class="number">{{ index + 1 }}</span>
          <div class="songDetail">
            <div class="songName">{{ item.name }}</div>
            <span class="songIntro">
              <span v-for="(item1, index) in item.ar" :key="index">
                {{ item1.name }}
                <span v-if="item.ar.length > 1 && index !== item.ar.length - 1">
                  /
                </span>
              </span>
            </span>
          </div>
        </div>
        <div class="itemright">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mv1" v-if="item.mv != 0"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gengduo1"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { showToast } from "vant";

export default {
  setup(props) {
    // console.log(props);
  },
  props: ["songs"],
  methods: {
    playMusic: async function (item, index) {
      this.updateDuration(item.dt);
      try {
        this.updatePlayList(this.songs);
        this.updatePlayListIndex(index);
      } catch (error) {
        console.error("获取音乐播放信息失败:", error);
        showToast("获取音乐播放信息失败");
        this.updatePlayListIndex(index + 1);
      }
    },
    ...mapMutations(["updatePlayList", "updatePlayListIndex", "updateDuration"]),
  },
};
</script>
<style lang="less" scoped>
.itemMusicList {
  width: 100%;
  background: #fff;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  padding: 0 0.2rem;
  margin-top: 0.2rem;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem 0;
    .topleft {
      display: flex;
      align-items: center;
      position: relative;
      .icon {
        fill: red;
        width: 0.5rem;
        height: 0.5rem;
      }
      span {
        margin-left: 0.2rem;
        font-size: 0.32rem;
      }
      .count {
        font-size: 0.2rem;
        position: absolute;
        bottom: 0.06rem;
        right: -0.56rem;
      }
    }
    .topright {
      display: flex;
      align-items: center;
      .icon {
        fill: #282828;
        margin-left: 0.24rem;
        width: 0.4rem;
      }
    }
  }
  .itemList {
    padding-bottom: 0.4rem;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 1rem;
      .itemleft {
        width: 85%;
        height: 100%;
        display: flex;
        align-items: center;
        .number {
          width: 0.5rem;
          text-align: center;
          font-size: 0.36rem;
          color: #767676;
        }
        .songDetail {
          width: 90%;
          display: flex;
          flex-direction: column;
          align-items: start;
          justify-content: start;
          padding-left: 0.2rem;
          .songName {
            width: 100%;
            font-size: 0.32rem;
            padding-bottom: 0.04rem;
            // text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .songIntro {
            font-size: 0.24rem;
            color: #666666;
          }
        }
      }
      .itemright {
        width: 16%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .icon {
          width: 0.4rem;
          margin-left: 0.1rem;
          fill: #767676db;
        }
      }
    }
  }
}
</style>
