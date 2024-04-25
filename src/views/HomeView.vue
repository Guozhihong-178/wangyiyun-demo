<template>
  <div class="home">
    <TopNav />
    <SwiperTop />
    <!-- <IconList /> -->
    <MusicList />
    <SongList />
  </div>
</template>

<script>
// @ is an alias to /src
import TopNav from '@/components/home/TopNav.vue'
// import IconList from '@/components/home/IconList.vue'
import SwiperTop from '@/components/home/SwiperTop.vue'
import MusicList from '@/components/home/MusicList.vue'
import SongList from '@/components/home/SongList.vue'
export default {
  name: "HomeView",
  components: {
    TopNav,
    SwiperTop,
    // IconList,
    MusicList,
    SongList
  },
};
</script>
<style lang="less">

</style>