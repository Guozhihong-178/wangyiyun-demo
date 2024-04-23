<template>
  <div class="main">
    <div class="main-top">
      <svg class="icon" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou1"></use>
      </svg>
      <span>手机号登陆</span>
    </div>
    <div class="main-bottom">
      <h3>请输入验证码</h3>
      <div class="bottom-top">
        <span>已发送至{{ phoneInfo }}</span>
        <p>重新发送</p>
      </div>
      <div class="bottom-content">
        <van-password-input
          :gutter="10"
          :length="4"
          :mask="false"
          :value="verCode"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
        />
      </div>
      <h5>手机号已更换，无法接收到短信？</h5>
    </div>

    <van-number-keyboard
      v-model="verCode"
      :show="showKeyboard"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { phoneNumFilter } from "../../utils/checkPhone";
import { checkVerCode, getLoginUser } from "@/request/api/home.js";
import { useRouter } from "vue-router";
export default {
  data() {
    return {
      showKeyboard: false,
      verCode: "",
      phoneInfo: "",
      phoneNumber: "",
      status: "",
    };
  },
  mounted() {
    this.phoneInfo = phoneNumFilter(sessionStorage.getItem("phone"));
    this.phoneNumber = sessionStorage.getItem("phone");
  },
  watch: {
    async verCode(newCode) {
      if (newCode.length == 4) {
        let res = await checkVerCode(this.phoneNumber, newCode);
        // console.log("checkVerCode");
        // console.log(res.data);
        if (res.status == 200) {
          let result = await getLoginUser();
          this.$store.commit("updateIsLogin", true);
          // this.$store.commit("updateToken", result.data.token);
          console.log(result);
          this.$store.commit("updateUser", result.data);
          sessionStorage.setItem("user", JSON.stringify(result.data));
          this.$router.push("/userInfo");
          // let result = await this.$store.dispatch("getLogin");
          // console.log("登录" + result);
          // if (result.data.code === 200) {
          //   this.$store.commit("updateIsLogin", true);
          //   this.$store.commit("updateToken", result.data.token);
          //   let resuser = await getLoginUser(res.data.account.id);
          //   console.log(resuser);
          //   this.$store.commit("updateUser", resuser);
          //   this.$router.push("/infoUser");
          // }
          // } else {
          //   alert("验证码错误！");
          //   router.push({
          //     path: "/login",
          //   });
          // }
          /* time = setTimeout(async () => {
          //let res = await checkVerCode(phoneNumber, newCode);

        }); */
        } else {
          alert("验证码错误");
          this.verCode = "";
        }
      }
    },
  },
  // setup() {
  //   const router = useRouter();

  //   let showKeyboard = ref(false);
  //   let verCode = ref();

  //   let phoneInfo = ref("");
  //   let phoneNumber = ref("");
  //   let status = ref("");
  //   phoneInfo.value = phoneNumFilter(sessionStorage.getItem("phone"));
  //   phoneNumber.value = sessionStorage.getItem("phone");
  //   //console.log(verCode.length);

  //   let time = "";

  //   watch(verCode, (newCode) => {
  //     clearTimeout(time);
  //     /* time = setTimeout(async () => {
  //         //let res = await checkVerCode(phoneNumber, newCode);

  //       }); */
  //     if (newCode.length == 4 && status.value == '200') {
  //       router.push({
  //         path: "/",
  //         name: "home",
  //       });
  //     }
  //   });

  //   return {
  //     showKeyboard,
  //     verCode,
  //     phoneInfo,
  //     phoneNumber,
  //   };
  // },
};
</script>

<style scoped lang="less">
.main {
  padding: 0.5rem;
  .main-top {
    display: flex;
    justify-content: start;
    align-items: center;
    span {
      width: 90%;
      font-size: 0.48rem;
      text-align: center;
    }
  }
  .main-bottom {
    margin-top: 1.6rem;
    h3 {
      margin-bottom: 0.3rem;
      font-size: 19px;
    }
    .bottom-top {
      display: flex;
      justify-content: space-between;
      font-size: 0.32rem;
      color: #666;
      p {
        color: #0fa1a1;
      }
    }
    .bottom-content {
      margin-top: 1.4rem;
    }
    h5 {
      text-align: center;
      margin-top: 1.2rem;
      color: #ccc;
    }
  }
}
/deep/.van-password-input__item {
  border-bottom: 1px solid #888 !important;
}
</style>