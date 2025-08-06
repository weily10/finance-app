<script setup lang="ts">
import { ref, reactive } from "vue";
import Button from "../components/buttons/Button.vue";
import Input from "../components/inputs/Input.vue";
import Toast from "../components/modals/Toast.vue";
import axios from "axios";
import router from "../router";

const credentials = reactive({
  email: "",
  password: "",
});
const error = ref("");
const message = ref("")
const showModal = ref(false)

async function register() {
  console.log("adsasd", credentials);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = `${baseUrl}/api/register`;
  axios.post(url, credentials).then(() => {
    message.value = "Sign up success! You will be redirected to login page"
    showModal.value = true
    router.push({ name: 'Login' })

  }).catch((e) => {
    console.log(e);
    message.value = "There was an error when signing up!"
    showModal.value = true
  })
}


function closeToast() {
  showModal.value = false
}

function onToastClosed() {
  showModal.value = false
}

</script>

<template>
  <h1 class="text-center font-bold text-xl">Register</h1>
  <div class="flex justify-center">
    <div class="p-8 border border-gray-200 mt-3 rounded-md md:w-100">
      <form @submit.prevent="register">
        <Input label="username" v-model:model="credentials.email" :placeholder="'enter your username or email'"></Input>
        <Input type="password" label="password" v-model:model="credentials.password" class="mt-3"
          :placeholder="'minimun 8 digits'"></Input>
        <div class="mt-4">
          <Button label="Sign Up" :type="'submit'"></Button>
          <p v-show="error">{{ error }}</p>
        </div>
      </form>
      <p class="mt-3 text-sm text-gray-400"></p>
    </div>
  </div>
 
    <Toast :message="message" :show="showModal" @close="closeToast" @autoclose="onToastClosed"></Toast>
  
</template>
