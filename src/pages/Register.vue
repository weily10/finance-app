<script setup lang="ts">
import { ref, reactive } from "vue";
import Button from "../components/buttons/Button.vue";
import Input from "../components/inputs/Input.vue";
 import axios from "axios";
import router from "../router";
import { toastStore } from "../store";

const store = toastStore()
const loading = ref(false)
const credentials = reactive({
  email: "",
  password: "",
});
const error = ref("");


async function register() {
  loading.value = true
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = `${baseUrl}/api/register`;
  axios.post(url, credentials).then(() => {
    store.message = "Sign up success! You will be redirected to login page"
    store.icon = 'check'
    store.iconColor = 'text-green-500'
    store.openToast()
    router.push({ name: 'Login' })
    loading.value = false
  }).catch((e) => {
    console.log(e);
    store.message = e.response.data.error
    store.openToast()
    store.icon = 'warning'
    store.iconColor = 'text-red-500'
    loading.value = false
  })
}


 
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <div>
      <h1 class="text-center font-bold text-xl">
        Register
      </h1>
      <div class="flex justify-center ">
        <div class="p-8 border border-gray-200 mt-3 rounded-md md:w-100">
          <form @submit.prevent="register">
            <Input label="username" v-model:model="credentials.email"
              :placeholder="'enter your username or email'"></Input>
            <Input type="password" label="password" v-model:model="credentials.password" class="mt-3"
              :placeholder="'minimun 8 digits'"></Input>
            <div class="mt-4">
              <Button label="Sign Up" :type="'submit'" :disabled="!credentials.password || !credentials.email" color="bg-purple-700 hover:bg-purple-900 " :loading="loading"></Button>
              <p v-show="error">{{ error }}</p>
            </div>
          </form>
          <p class="mt-3 text-sm text-gray-400 text-center">Already have an account? <span
              class="text-purple-700 font-bold cursor-pointer" @click="router.push({ name: 'Login' })">Sign In</span> </p>
        </div>
      </div>

     </div>
  </div>
</template>
