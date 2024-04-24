<template>
  <div class="top">
    <svg class="icon" aria-hidden="true" @click="setValue">
      <use xlink:href="#icon-zuojiantou1"></use>
    </svg>
    <span>评论</span>
    <svg class="icon jiantou" aria-hidden="true">
      <use xlink:href="#icon-gengduo1"></use>
    </svg>
  </div>
  <div class="song">
    <img src="@/assets/cd.png" alt="" class="img_cd" />
    <img :src="musicList.al.picUrl" alt="" class="img_ar" />
    <div class="songDetail">
      <span class="name"> {{ musicList.name }} </span>
      <span class="songer" style="margin: 0 6px"> - </span>
      <span v-for="(item, index) in musicList.ar" :key="item" class="songer">
        {{ item.name }}
        <span
          v-if="musicList.ar.length > 1 && index !== musicList.ar.length - 1"
          style="font-size: 0.28rem; padding: 0.04rem 0.05rem 0"
        >
          /
        </span>
      </span>
    </div>
  </div>
  <div
    class="div"
    style="background-color: #eee; height: 0.15rem; margin-top: 0.1rem"
  ></div>
  <div class="list-body">
    <div class="body-header">
      <span class="title">评论({{ total }})</span>
      <div class="list-switch">
        <span
          :class="currentListName === 'hot' ? 'active' : ''"
          @click="currentListName = 'hot'"
          >最热</span
        >
        <span style="font-size: 0.36rem; padding-bottom: 0.04rem; color: #666">
          |
        </span>
        <span
          :class="currentListName === 'new' ? 'active' : ''"
          @click="currentListName = 'new'"
          >最新</span
        >
      </div>
    </div>
  </div>
  <div class="body-items">
      <div class="item" v-for="item in currentList" :key="item.commentId">
        <div class="item-header">
          <div class="header-left">
            <img :src="item.user.avatarUrl" alt="" class="avatar" />
            <div class="username-time">
              <span class="name">{{ item.user.nickname }}</span>
              <span class="time"
                >{{ item.timeStr }} {{ item.ipLocation.location }}</span
              >
            </div>
          </div>
          <div class="header-right">
            {{ item.likedCount }}
            <svg class="icon jiantou" aria-hidden="true">
              <use xlink:href="#icon-dianzan"></use>
            </svg>
            <van-icon name="good-job-o" />
          </div>
        </div>
        <div class="item-context">{{ item.content }}</div>
      </div>
    </div>
</template>
<script>
import { getSongComments } from "@/request/api/item";

export default {
  data() {
    return {
      currentListName: "hot",
      hotCommentList: [],
      newCommentList: [],
      total: 0,
    };
  },
  props: ["musicList"],
  mounted() {
    this.getComment();
  },
  methods: {
    async getComment() {
      let res = await getSongComments(this.musicList.id);
      console.log(res);
      this.hotCommentList = res.data.hotComments;
      this.newCommentList = res.data.comments;
      this.total = res.data.total;
    },
    setValue(){
       this.$emit('close',false)//触发transfer方法，this.value为向父组件传递的数据
     }
  },
  computed: {
    currentList() {
      return this.currentListName === "hot"
        ? this.hotCommentList
        : this.newCommentList;
    },
  },
};
</script>
<style lang="less" scoped>
.top {
  padding: 10px;
  display: flex;
  font-size: 20px;
  justify-content: space-between;
  align-items: center;
  span {
    flex: 1;
    text-align: center;
  }
  .icon {
    width: 22px;
    height: 22px;
  }
  .jiantou {
    margin: 5px;
    width: 25px;
    height: 25px;
  }
}
.song {
  position: relative;
  height: 1.2rem;
  .img_cd {
    width: 1rem;
    height: 1rem;
    position: absolute;
    left: 0.2rem;
    bottom: 0.1rem;
    z-index: -1;
  }
  .img_ar {
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    position: absolute;
    bottom: 0.24rem;
    left: 0.352rem;
  }
  .songDetail {
    width: 80%;
    position: absolute;
    left: 1.3rem;
    bottom: 0.4rem;
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .name {
      font-size: 0.32rem;
    }
    .songer {
      font-size: 0.24rem;
      color: #888;
    }
  }
}
.grey {
  color: #666;
}
.list-body {
  flex: 1;
  margin-top: 0.1rem;
  padding: 0 0.3rem;
  background-color: #fff;
  .body-header {
    display: flex;
    width: 100%;
    height: 1rem;
    justify-content: space-between;
    align-items: center;
    .title {
      font-weight: 600;
      font-size: 0.3rem;
    }
    .list-switch {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 1.5rem;
      font-size: 0.26rem;
      color: #6a6a6a;
      span {
        line-height: 0.26rem;
      }
      .active {
        font-weight: 700;
        color: #000;
      }
    }
  }
}
.body-items {
  width: 100%;
  overflow: scroll;
  .item {
    width: 100%;
    padding: 10px 0.3rem;
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 0.8rem;
      .header-left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        .avatar {
          width: 0.7rem;
          height: 0.7rem;
          border-radius: 50%;
        }
        .username-time {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          margin-left: 0.2rem;
          .name {
            font-size: 0.28rem;
            // font-weight: 700;
            color: #4e4e4e;
            margin-bottom: 0.1rem;
          }
          .time {
            font-size: 0.2rem;
            color: #4e4e4e;
            // color: #bbb;
          }
        }
      }
      .header-right {
        font-size: 0.26rem;
        color: #4e4e4e;
        .icon {
          width: 20px;
          height: 28px;
          padding-top: 12px;
          fill: #4e4e4e;
        }
      }
    }
    .item-context {
      font-size: 0.3rem;
    //   font-weight: 700;
      margin-left: 0.9rem;
      padding: 0.2rem 0rem 0.3rem 0rem;
      color: #000000;
      border-bottom: 1px solid #eeeeee;
    }
  }
}
</style>