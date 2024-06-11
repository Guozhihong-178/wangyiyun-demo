<template>
  <div class="itemList">
    <div v-for="(item, index) in playList" :key="item.id" class="item">
      <div class="itemleft" @click="playMusic(item,index)">
        <!-- <span class="number">{{ index + 1 }}</span> -->
        <div class="songDetail">
          <div class="songName">{{ item.name }}</div>
          <span style="padding: 0 5px; font-size: 20px; color: #666">·</span>
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
        <svg class="icon" aria-hidden="true" @click="delMusic(index)">
          <use xlink:href="#icon-guanbi"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { showToast } from "vant";

export default {
  computed: {
    ...mapState(["playList"]),
  },
  mounted() {
    console.log(this.playList);
  },
  methods: {
    playMusic: async function (item,index) {
      try {
        this.updatePlayListIndex(index);
        this.updateDuration(item.duration);
      } catch (error) {
        console.error("获取音乐播放信息失败:", error);
        showToast("获取音乐播放信息失败");
        this.updatePlayListIndex(index + 1);
      }
    },
    delMusic(index) {
      this.playList.splice(index, 1);
    },
    ...mapMutations(["updatePlayList", "updatePlayListIndex","updateDuration"]),
  },
};
</script>

<style lang="less" scoped>
.itemList {
  padding: 0.2rem 0;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 1rem;
    padding: 0.28rem 0.2rem;
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
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
        padding-left: 0.2rem;
        overflow: hidden;

        .songName {
          //   width: 100%;
          font-size: 0.32rem;
          padding-bottom: 0.04rem;
          // text-align: center;
          //   overflow: hidden;
          //   text-overflow: ellipsis;
          white-space: nowrap;
        }
        .songIntro {
          font-size: 0.24rem;
          color: #666666;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
    .itemright {
      width: 10%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      .icon {
        width: 0.4rem;
        fill: #767676db;
      }
    }
    .itemright::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: -70px; /* 让渐变从右侧开始 */
      width: 180%; /* 渐变宽度 */
      background: linear-gradient(to right, transparent, white); /* 渐变效果 */
    }
  }
}
</style>