<template>
  <div class="infoUserTop">
    <img :src="user.profile.avatarUrl" alt="" class="profileimg" />
    <div class="name">{{ user.profile.nickname }}</div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
  },
  methods:{
    ...mapMutations(["updateUser"])
  },
  created() {
    console.log(this.user);
    if(this.user.profile === ''){
      this.updateUser(JSON.parse(
        sessionStorage.getItem().user
      ))
    }
  },

};
</script>
<style lang="less" scoped>
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
  .name{
      font-weight: 700;
      font-size: .42rem;
      color: #fff;
  }
}
</style>