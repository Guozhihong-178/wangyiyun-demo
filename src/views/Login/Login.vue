<template>
  <div class="content">
    <div class="head">
      <img src="@/assets/logo1.png" alt="" />
    </div>
    <div class="bottom">
      <div class="top-bottom">
        <!-- <router-link to="/login/phone"> -->
        <input
          type="text"
          name="phone"
          class="phone"
          v-model.trim="number"
          placeholder="请输入手机号码"
          @focus="onFocus"
        />
          <button
            :class="isActive ? 'isButton' : 'btn'"
            @click="handleLogin(isActive)"
          >
            获取验证码
          </button>
      </div>

      <!-- <div class="bottom-icon">
        <div class="icon-radio"><i class="iconfont icon-weixin"></i></div>
        <div class="icon-radio"><i class="iconfont icon-QQ"></i></div>
        <div class="icon-radio"><i class="iconfont icon-xinlangweibo"></i></div>
        <div class="icon-radio">
          <i class="iconfont icon-airudiantubiaohuizhi-zhuanqu_yiwutong"></i>
        </div>
      </div> -->
      <div class="degree">
        <input type="radio" />
        <p>我已阅读并同意《服务条款》、《隐私政策》</p>
      </div>
    </div>
    <van-number-keyboard
      v-model="number"
      :show="showKeyboard"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script>
import { postNumber } from "@/request/api/home.js";
import { isPhoneNumber } from "../../utils/checkPhone";

export default {
  data() {
    return {
      isActive: true,
      number: "",
      showKeyboard: false,
    };
  },
  watch: {
    number(newNumber) {
      if (newNumber.length !== 0) {
        this.isActive = false;
      }
    },
  },
  methods: {
    async handleLogin(value) {
      if (!isPhoneNumber(this.number) && value == false) {
        return alert("手机号不合格！");
      } else if (value == false) {
        let phoneInfo = this.number;
        let res = await postNumber(phoneInfo);
        sessionStorage.setItem("phone", phoneInfo);
        // console.log(res);

        this.$router.push({
          path: "/login/vcode",
        });
      }
    },
    onFocus() {
      this.showKeyboard = true;
    },
  },
};
</script>

<style scoped lang="less">
.content {
  background: linear-gradient(
    rgb(252, 237, 237) 10%,
    rgb(250, 240, 240) 20%,
    rgb(252, 248, 248) 60%,
    rgb(255, 255, 255) 100%
  );
  position: relative;
  height: 13rem;
  .head {
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    top: 22%;
    left: 50%;
    transform: translateX(-50%);
    img {
      width: 100%;
    }
  }
  .bottom {
    position: absolute;
    bottom: 110px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .top-bottom {
      margin-bottom: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      input {
        width: 5.6rem;
        height: 1rem;
        border-radius: 0.3rem;
        border: none;
        background: #e6e6e6ad;
        // box-shadow: 0 0 0.1rem #e6e6e6;
        font-size: 18px;
        font-weight: 600;
        margin-top: 10px;
        padding-left: 15px;
      }
      .btn {
        background: #eb3a3a;
        color: #fff;
        border: none;
        width: 5.6rem;
        height: 0.9rem;
        border-radius: 0.5rem;
        font-size: 17px;
        font-weight: 600;
        margin-top: 15px;
      }
      .isButton {
        background: #eb3a3a;
        color: #fff;
        border: none;
        width: 5.6rem;
        height: 0.9rem;
        border-radius: 0.5rem;
        font-size: 17px;
        font-weight: 600;
        margin-top: 15px;
        opacity: 0.2;
      }
    }
    .degree {
      display: flex;
      align-items: center;
      white-space: nowrap;
      
      p {
        padding-left: 4px;
      }
    }
  }
}
</style>