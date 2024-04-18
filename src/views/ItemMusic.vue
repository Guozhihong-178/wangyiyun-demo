<template>
  <div class="itemMusic">
    <ItemMusicTop :playList="state.playList" />
    <ItemMusicList :songs="state.songs" />
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import { onMounted, reactive, getCurrentInstance } from "vue";
import { getMusicItemList, getItemList } from "@/request/api/item";
import ItemMusicTop from "@/components/item/ItemMusicTop";
import ItemMusicList from "@/components/item/ItemMusicList";

export default {
  setup() {
    const state = reactive({
      playList: {}, //歌单的详情页的数据
      songs: [], //歌单的歌曲
    });
    const app = getCurrentInstance().appContext.config.globalProperties;
    onMounted(async () => {
      let id = useRoute().query.id;
      let res = await getMusicItemList(id);
      state.playList = res.data.playlist;
      // console.log(state.playList);
      let res2 = await getItemList(id);
      // console.log(res2);
      state.songs = res2.data.songs;
      sessionStorage.setItem("itemDetail", JSON.stringify(state));
      app.$store.commit("updateMusicListName", state.playList.name);
    });
    return { state };
  },
  components: {
    ItemMusicTop,
    ItemMusicList,
  },
};
</script>