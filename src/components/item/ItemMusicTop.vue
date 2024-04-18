<template>
  <div class="itemMusicTop">
    <img :src="playList.coverImgUrl" alt="" class="bgImg" />
    <div class="navTop">
      <div class="left">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span>歌单</span>
      </div>
      <div class="right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gengduo1"></use>
        </svg>
      </div>
    </div>
    <div class="navMiddle">
      <div class="contentLeft">
        <img :src="playList.coverImgUrl" alt="" />
        <div class="palyCount">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang2"></use>
          </svg>
          <span>{{ changeCount(playList.playCount) }}</span>
        </div>
      </div>
      <div class="contentRight">
        <div class="title">{{ playList.name }}</div>
        <div class="message">
          <img :src="playList.creator.avatarUrl" alt="" class="avatar" />
          <span class="nickname">{{ playList.creator.nickname }}</span>
        </div>
        <div class="tags">
          <span
            v-for="(value, index) in playList.tags"
            :key="index"
            class="box"
          >
            <span>{{ value }}</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-arrowright"></use>
            </svg>
          </span>
        </div>
      </div>
    </div>
    <div class="description">
      <span>{{ playList.description }}</span>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-youjiantou"></use>
      </svg>
    </div>
    <div class="navBottom">
      <div class="item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhuanfa"></use>
        </svg>
        <span>{{ changeCount(playList.shareCount) }}</span>
      </div>
      <div class="item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xinxi"></use>
        </svg>
        <span>{{ changeCount(playList.commentCount) }}</span>
      </div>
      <div class="item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-folder-add"></use>
        </svg>
        <span>{{ changeCount(playList.subscribedCount) }}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ["playList"],
  // data() {
  //   return {
  //     name: "",
  //   };
  // },
  // created() {
  //   if ((this.playList.creator = "")) {
  //     this.playList.creator = JSON.parse(
  //       sessionStorage.getItem().playList
  //     ).creator;
  //   }
  // },
  // methods: {
  //   changeCount(num) {
  //     if (num >= 100000000) {
  //       return (num / 100000000).toFixed(1) + "亿";
  //     } else if (num >= 10000) {
  //       return (num / 10000).toFixed(1) + "万";
  //     } else {
  //       return num;
  //     }
  //   },
  //   ...mapMutations(["updateMusicListName"]),
  // },
  setup(props) {
    if ((props.playList.creator = "")) {
      props.playList.creator = JSON.parse(
        sessionStorage.getItem().playList
      ).creator;
    }
    // 对播放量的处理
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      } else {
        return num;
      }
    }
    return { changeCount };
  },
};
</script>


<style lang="less" scoped>
.itemMusicTop {
  .bgImg {
    position: fixed;
    z-index: -1;
    width: 100%;
    height: 5.3rem;
    filter: blur(20px);
  }
  .navTop {
    font-size: 0.36rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 10px;
    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 52%;
      span {
        // margin-left: 80px;
        color: #fff;
      }
    }
    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 2px;
      .icon {
        margin-left: 18px;
      }
    }
    .icon {
      width: 0.52rem;
      height: 0.52rem;
      fill: #fff;
    }
  }
  .navMiddle {
    display: flex;
    justify-content: space-between;
    align-items: start;
    padding: 10px 20px 0;
    .contentLeft {
      width: 35%;
      height: 2.6rem;
      position: relative;
      img {
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 0.2rem;
        position: absolute;
        z-index: -1;
      }
      .palyCount {
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
        display: flex;
        align-items: center;
        // margin-top: 0.1rem;
        .icon {
          width: 0.24rem;
          height: 0.24rem;
          // margin-top: -0.02rem;
          vertical-align: middle;
          fill: #fff;
        }
        span {
          font-size: 0.26rem;
          color: #fff;
          margin-left: 0.04rem;
        }
      }
    }
    .contentRight {
      width: 60%;
      height: 2.4rem;
      // height: 100px;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: start;
      .title {
        font-size: 0.3rem;
      }
      .message {
        margin-top: 5px;
        display: flex;
        align-items: center;
        .nickname {
          font-size: 14px;
          margin-left: 5px;
        }
        .avatar {
          display: inline-block;
          width: 0.52rem;
          height: 0.52rem;
          border-radius: 50%;
          overflow: hidden;
        }
      }
      .tags {
        display: flex;
        margin-top: 8px;
        .box {
          font-size: 12px;
          vertical-align: center;
          display: flex;
          justify-content: start;
          align-items: center;
          margin-right: 5px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 0.1rem;
          padding: 1px 0 2px 6px;
          .icon {
            width: 16px;
            height: 16px;
            fill: #fff;
          }
        }
      }
    }
  }
  .description {
    width: 100%;
    height: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;
    span {
      display: inline-block;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      white-space: nowrap;
      -webkit-box-orient: vertical;
      font-size: 0.24rem;
      color: #767676;
      // background: linear-gradient(
      //   to right,
      //   rgba(204, 204, 204, 1),
      //   rgba(204, 204, 204, 0)
      // ); /* 文字透明度渐变 */
      // -webkit-background-clip: text; /* Webkit浏览器 */
      // background-clip: text; /* 其他浏览器 */
    }
    .icon {
      // width: 0.24rem;
      height: 0.24rem;
      fill: #767676;
    }
  }
  .navBottom {
    display: flex;
    justify-content: space-around;
    padding: 5px 10px;
    .item {
      width: 96px;
      height: 30px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        fill: #fff;
        width: 0.36rem;
      }
      span {
        font-size: 0.24rem;
        color: #fff;
        margin-left: 0.08rem;
      }
    }
  }
}
</style>
