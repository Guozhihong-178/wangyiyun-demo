<template>
  <div class="sideBar">
    <div class="top">
      <div class="infoUserTop" v-if="user.profile">
        <img :src="user.profile.avatarUrl" alt="" class="profileimg" />
        <div class="name">{{ user.profile.nickname }}</div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
        <svg class="icon right" aria-hidden="true">
          <use xlink:href="#icon-iconfontscan"></use>
        </svg>
      </div>
      <div v-else @click="$router.push('/login')" class="infoUserTop">
        <img src="https://www.100chui.com/public/pc/common/default_head.png" class="profileimg" />
        <div class="name">立即登录</div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
    </div>
    <div class="middle">
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xinxi2"></use>
        </svg>
        <span>信息中心</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yunbeiguanli"></use>
        </svg>
        <span>云贝中心</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-huizhang"></use>
        </svg>
        <span>徽章中心</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-chuangzuozhezhongxin_52"></use>
        </svg>
        <span>创作者中心</span>
      </div>
    </div>
    <div class="bottom" @click="logout" v-if="user.profile">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-guanbi1"></use>
      </svg>
      <span @click="$router.push('/')">退出登录</span>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["user"]),
  },
  methods:{
    async logout(){
      // this.$router.push('/')
      this.$store.commit("updateIsLogin", false);
      this.$store.commit("updateUser", {});
      await this.$nextTick(); // 确保 Vuex 状态更新后再跳转
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    }
  }
};
</script>

<style lang="less" scoped>
.sideBar {
  height: 100%;
  padding: 0.4rem 0.28rem;
  position: relative;
  background: #f7f7f7ca;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .infoUserTop {
      display: flex;
      align-items: center;
      .profileimg {
        width: 0.64rem;
        height: 0.64rem;
        border-radius: 50%;
      }
      .name {
        font-weight: 600;
        font-size: 0.36rem;
        color: #000;
        margin-left: 0.2rem;
      }
      .icon {
        margin: 6px 0 0 0.04rem;
        width: 0.32rem;
      }
      .right {
        width: 0.4rem;
        margin-left: 120px;
      }
    }
  }
  .middle{
    background-color: #fff;
    border-radius: 8%;
    margin: .36rem 0;
    padding: .2rem;
    div{
      padding: .2rem;
      display: flex;
      .icon{
        margin-right: .1rem;
      }
      span{
        padding-top: 0.02rem;
      }
    }
  }
  .bottom {
    color: red;
    font-size: 0.35rem;
    font-weight: 600;
    display: flex;
    position: absolute;
    bottom: .4rem;
    padding: .2rem .24rem;
    span {
      padding-top: 0.02rem;
    }
    .icon {
      fill: red;
      margin-right: 0.2rem;
      width: 0.4rem;
    }
  }
}
</style>