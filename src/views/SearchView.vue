<template>
  <div class="searchview">
    <div class="searchTop">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <input
        type="text"
        placeholder="搜索音乐、视频、播客、歌词"
        v-model="searchKey"
        @keydown.enter="enterKey"
      />
      <span>搜索</span>
    </div>
    <div class="searchHistory">
      <div>
        <span class="searchSpan">搜索历史</span>
        <svg class="icon" aria-hidden="true" @click="delHistory">
          <use xlink:href="#icon-trash"></use>
        </svg>
      </div>
      <span
        v-for="item in keyWorldList"
        :key="item"
        class="spanKey"
        @click="searchHistory(item)"
      >
        {{ item }}
      </span>
    </div>
    <div class="itemList">
      <div v-for="(item, index) in searchList" :key="index" class="item">
        <div class="itemleft" @click="updateIndex(item)">
          <!-- <span class="number">{{ index + 1 }}</span> -->
          <div class="songDetail">
            <div class="songName">{{ item.name }}</div>
            <span class="songIntro">
              <span v-for="(item1, index) in item.artists" :key="index">
                {{ item1.name }}
                <span
                  v-if="
                    item.artists.length > 1 && index !== item.artists.length - 1
                  "
                >
                  /
                </span>
              </span>
            </span>
          </div>
        </div>
        <div class="itemright">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mv1" v-if="item.mvid != 0"></use>
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
import { getSearchMusic } from "@/request/api/home.js";
import { getMusicPlay } from "@/request/api/item";
import { mapMutations, mapState } from "vuex";
import { showToast } from 'vant';

export default {
  data() {
    return {
      searchKey: "",
      keyWorldList: [],
      searchList: [],
    };
  },
  mounted() {
    this.keyWorldList = JSON.parse(localStorage.getItem("keyWorldList"))
      ? JSON.parse(localStorage.getItem("keyWorldList"))
      : [];
  },
  methods: {
    async enterKey() {
      if (this.searchKey !== "") {
        this.keyWorldList.unshift(this.searchKey);
        // 去重
        this.keyWorldList = [...new Set(this.keyWorldList)];
        // 固定长度
        if (this.keyWorldList.length > 10) {
          this.keyWorldList.splice(this.keyWorldList.length - 1, 1);
        }
        localStorage.setItem("keyWorldList", JSON.stringify(this.keyWorldList));
        let res = await getSearchMusic(this.searchKey);
        // console.log(res);
        this.searchList = res.data.result.songs;
        this.searchKey = "";
      }
    },
    delHistory() {
      localStorage.removeItem("keyWorldList");
      this.keyWorldList = [];
    },
    async searchHistory(item) {
      this.keyWorldList.unshift(item);
      let res = await getSearchMusic(item);
      //   console.log(res);
      this.searchList = res.data.result.songs;
      console.log(this.searchList);
    },
    async updateIndex(item) {
      item.al = item.album;
      item.al.picUrl = item.album.artist.img1v1Url;
      item.ar = item.artists;
      this.pushPlayList(item);
      try {
        const res = await getMusicPlay(item.al.id);
        if (res.status === 200) {
          this.updatePlayListIndex(this.$store.state.playList.length - 1);
          this.updateMusicListName("搜索");
        } else {
          showToast('播放失败');
        }
      } catch (error) {
        console.error("获取音乐播放信息失败:", error);
        showToast("获取音乐播放信息失败");
      }
    },
    ...mapMutations([
      "pushPlayList",
      "updatePlayListIndex",
      "updateMusicListName",
    ]),
  },
};
</script>

<style lang="less" scoped>
.searchview {
  background: #f5f6fd;
  .searchTop {
    width: 100%;
    height: 1rem;
    padding: 0 0.2rem;
    display: flex;
    align-items: center;
    .icon {
      width: 0.44rem;
      height: 0.48rem;
      fill: #6e6e6e;
    }
    input {
      margin: 0 0.24rem;
      border: none;
      box-shadow: 0 0 0.1rem #e6e6e6;
      // border-bottom: 1px solid #999;
      width: 76%;
      height: 0.72rem;
      border-radius: 0.36rem;
      padding: 0.1rem 0.3rem;
      font-size: 16px;
    }
    input::-webkit-input-placeholder {
      color: #bbbbbb;
      font-size: 15px;
    }
    span {
      font-size: 0.34rem;
    }
  }
  .searchHistory {
    width: 100%;
    padding: 0.2rem;
    padding-top: 0.3rem;
    position: relative;
    .searchSpan {
      font-weight: 700;
    }
    .spanKey {
      padding: 0.1rem 0.24rem;
      background-color: #fff;
      height: 0.56rem;
      border-radius: 0.28rem;
      margin: 0.24rem 0.1rem 0;
      display: inline-block;
      font-size: 14px;
    }
    .icon {
      width: 0.7rem;
      height: 0.44rem;
      position: absolute;
      right: 0.2rem;
    }
  }
  .itemList {
    padding: 0 0.26rem 0.4rem;
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
          margin-left: 0.14rem;
          fill: #767676db;
        }
      }
    }
  }
}
</style>