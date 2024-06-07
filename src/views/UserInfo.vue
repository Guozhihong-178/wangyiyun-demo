<template>
  <div class="topNav">
    <div>
      <svg class="icon" aria-hidden="true" @click="show = true">
        <use xlink:href="#icon-bars"></use>
      </svg>
    </div>
    <div class="middle">
      <span class="active">我的</span>
      <span @click="$router.push('/')">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div>
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-search"></use>
      </svg>
    </div>
  </div>
  <div class="infoUserTop">
    <img :src="user ? user.profile.avatarUrl : 'https://www.100chui.com/public/pc/common/default_head.png'" alt="" class="profileimg" />
    <div class="name">{{ user.profile.nickname }}</div>
  </div>
  <van-popup
    v-model:show="show"
    position="left"
    :style="{ height: '100%', width: '80%' }"
  >
    <SideBar />
  </van-popup>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import SideBar from "@/components/home/SideBar.vue";

export default {
  data() {
    return {
      show: false,
    };
  },
  // created(){
  //   if(!this.user){
  //     this.$router.push('/login')
  //   }
  // },
  components: {
    SideBar,
  },
  computed: {
    ...mapState(["user","isLogin"]),
  },
  // methods: {
  //   ...mapMutations(["updateUser"]),
  // },
  // created() {
  //   console.log(this.user);
  //   if (this.user.profile === "") {
  //     this.updateUser(JSON.parse(sessionStorage.getItem().user));
  //   }
  // },
};
</script>
<style lang="less" scoped>
.topNav {
  width: 100%;
  height: 1.06rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem;
  text-align: center;
  .middle {
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    .active {
      font-weight: 800;
    }
  }
}
.infoUserTop {
  background: #850303a3;
  width: 100%;
  height: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 50px 0;
  .profileimg {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
  }
  .name {
    font-weight: 700;
    font-size: 0.42rem;
    color: #fff;
  }
}
</style>