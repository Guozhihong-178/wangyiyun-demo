<template>
  <div class="topNav">
    <div>
      <svg class="icon" aria-hidden="true" @click="show=true">
        <use xlink:href="#icon-bars"></use>
      </svg>
    </div>
    <div class="middle">
      <span class="hand" @click="$router.push('/userInfo')">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="hand">
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-search"></use>
      </svg>
    </div>
    <van-popup
      v-model:show="show"
      position="left"
      :style="{ height: '100%', width: '80%' }"
    >
      <SideBar />
    </van-popup>
  </div>
</template>

<script>
import SideBar from "@/components/home/SideBar.vue";

export default {
  data(){
    return{
      show:false
    }
  },
  components:{
    SideBar,
  }
}
</script>

<style lang="less" scoped>
.topNav {
  width: 100%;
  height: 1.06rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .2rem;
  .hand{
    cursor: pointer;
  }
  .middle {
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    .active{
      font-weight: 800;
    }
  }
}
</style>