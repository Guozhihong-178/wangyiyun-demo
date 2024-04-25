<template>
  <div class="songList">
    <div class="top">
      <div class="title">新歌新碟</div>
    </div>
    <div class="content">
      <van-swipe
        :loop="false"
        :width="convertVWtoPX(86)"
        class="my-swiper"
        :show-indicators="false"
      >
        <van-swipe-item v-for="(item, index) in songList" :key="index">
          <div
            class="box"
            v-for="item1 in item.resources"
            :key="item1.resourceId"
          >
            <img :src="item1.uiElement.image.imageUrl" alt="" />
            <div class="intro">
              <div class="tit">{{ item1.uiElement.mainTitle.title }}</div>
              <div class="artist">
                {{ item1.resourceExtInfo.artists[0].name }}
              </div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
  <div class="albumList">
    <div class="top">
      <div class="title">数字专辑</div>
    </div>
    <div class="content">
      <van-swipe
        :loop="false"
        :width="swiperWidth"
        class="my-swiper"
        :show-indicators="false"
      >
        <van-swipe-item v-for="(item, index) in albumList" :key="index">
          <div
            class="box"
            v-for="item1 in item.resources"
            :key="item1.resourceId"
          >
            <a
              :href="
                'https://music.163.com/store/newalbum/detail?id=' +
                item1.resourceId
              "
            >
              <img :src="item1.uiElement.image.imageUrl" alt="" />
              <div class="tit">{{ item1.uiElement.mainTitle.title }}</div>
              <div class="artist">
                {{ item1.resourceExtInfo.artists[0].name }}
              </div>
              <div class="price">￥{{ item1.price }}</div>
            </a>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getHomeDiscovery } from "@/request/api/home";
import { getAlbumDetail } from "@/request/api/item";

export default {
  data() {
    return {
      songList: [],
      albumList: [],
      swiperWidth: window.innerWidth >= 750 ? 860 : 390,
      swiperWidth2: window.innerWidth >= 750 ? 620 : 330,
    };
  },
  mounted() {
    this.getData();
    // this.swiperWidth = window.innerWidth >= 750 ? 280 : 130
  },
  methods: {
    async getData() {
      let res = await getHomeDiscovery();
      console.log(res);
      //   this.songList = res.data.data.blocks[4].creatives.slice(0, 4);
      //   this.albumList = res.data.data.blocks[4].creatives.slice(4, 8);
      this.songList = res.data.data.blocks[4].creatives.filter(
        (item) => item.creativeType === "NEW_ALBUM_HOMEPAGE"
      );
      this.albumList = res.data.data.blocks[4].creatives.filter(
        (item) => item.creativeType === "DIGITAL_ALBUM_HOMEPAGE"
      );
      for (let i = 0; i < this.albumList.length; i++) {
        let album = this.albumList[i].resources;
        for (let j = 0; j < album.length; j++) {
          let res1 = await getAlbumDetail(album[j].resourceId);
          album[j].price = res1.data.product.price;
          //   console.log(album[j]);
        }
      }
      console.log(this.songList);
    },
    convertVWtoPX(val) {
      // 获取当前视口宽度
      const windowWidth = window.innerWidth;
      // 计算40vw对应的像素值
      const pxValue = (val * windowWidth) / 100;
      // 返回结果
      return pxValue;
    },
    
  },
};
</script>

<style lang="less" scoped>
.songList {
  width: 100%;
  //   height: 10rem;
  padding: 0.1rem 0.3rem;
  margin-bottom: 0.2rem;
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
        .box {
          flex: 1;
          //   padding-right: 0.2rem;
          padding-bottom: 0.2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: flex;
          align-items: center;
          .intro{
            margin-left: 10px;
            overflow: hidden;
            .tit {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-top: 0.1rem;
            font-weight: 700;
          }
          .artist {
            font-size: 0.26rem;
            color: #4e4e4e;
            padding: 5px 0;
          }
          }
          img {
            border-radius: 8%;
            width: 20%;
          }
        }
      }
      .van-swipe-item:last-child {
        margin-left: -6vw;
      }
    }
  }
  a {
    color: #000;
  }
}
.albumList {
  width: 100%;
  height: 5rem;
  padding: 0.1rem 0.3rem;
  margin-bottom: 1.5rem;
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
        display: flex;
        .box {
          flex: 1;
          padding-right: 0.2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          .tit {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-top: 0.1rem;
            font-weight: 700;
          }
          .artist {
            font-size: 0.26rem;
            color: #4e4e4e;
            padding: 5px 0;
          }
          .price {
            font-size: 0.26rem;
            color: red;
            font-weight: 700;
            // padding: 5px 0;
          }
        }
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
      }
    }
  }
  a {
    color: #000;
  }
}
</style>