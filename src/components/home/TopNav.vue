<template>
  <div class="topNav">
    <div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bars"></use>
      </svg>
    </div>
    <div class="middle">
      <span @click="$router.push('/userInfo')">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div>
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-search"></use>
      </svg>
    </div>
  </div>
</template>

<style lang="less">
.topNav {
  width: 100%;
  height: 1.06rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .2rem;
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