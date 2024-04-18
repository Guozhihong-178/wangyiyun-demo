<template>
  <div class="iconList">
    <div class="iconItem">
      <svg class="icon" aria-hidden="true" >
        <use xlink:href="#icon-meirituijian"></use>
      </svg>
      <span>每日推荐</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zhibo"></use>
      </svg>
      <span>私人FM</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan"></use>
      </svg>

      <span>歌单</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang-"></use>
      </svg>
      <span>排行榜</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.iconList {
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  .iconItem {
    width: 25%;
    height: 100%;
    padding: 0 0.2rem;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    .icon{
        width: .7rem;
        height: .7rem;
    }
  }
}
</style>