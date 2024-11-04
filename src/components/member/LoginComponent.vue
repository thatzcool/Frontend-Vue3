<script setup>

import {ref} from "vue";

import {makeTokes} from "../../api/tokenAPI.jsx";
import {useTokenStore} from "../../stores/tokenStore.jsx";
import {useRouter} from "vue-router";
import {useCookies} from "vue3-cookies";


const router = useRouter();
const tokenStore = useTokenStore()

const loginParam = ref({
  mid:'',
  mpw:''
})



const handleClick = () => {
  console.log(loginParam.value)

  const {mid, mpw} = loginParam.value

  makeTokes(mid, mpw).then((tokens) => {
    console.log(tokens)
    tokenStore.setToken(tokens, loginParam.value.mid)
    router.push("/member/mypage")
  })

}

</script>

<template>

  <div>
    <input type="text" name="mid" class="border-2 bg-blue-300" v-model="loginParam.mid">
  </div>

  <div>
    <input type="text" name="mpw" class="border-2 bg-blue-300" v-model="loginParam.mpw">
  </div>

  <div>
    <button @click="handleClick" class="loginBtn">Login</button>
  </div>

</template>

<style scoped>

.loginBtn {
  background-color: blue;
  color: white;
  font-size: 1.5rem;
}

</style>