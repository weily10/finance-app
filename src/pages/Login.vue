<script setup lang="ts">
import { ref, reactive } from "vue";
import Button from "../components/buttons/Button.vue";
import Input from "../components/inputs/Input.vue";
import axios from "axios";
import router from "../router";
import Toast from "../components/modals/Toast.vue";

const credentials = reactive({
  email: "",
  password: "",
});
const message = ref("")
const showModal = ref(false)
const error = ref("");

async function login() {

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = `${baseUrl}/api/login`;
  axios.post(url, credentials).then((res) => {
    sessionStorage.setItem("token", res.data.token);
    router.push({ name: "Home" });
    message.value = "Sign in successful"
    showModal.value = true
  }).catch((e) => {
    console.log(e);
    message.value = "There was an error when signing in!"
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
  <h1 class="text-center font-bold text-xl">Login</h1>
  <div class="flex justify-center">
    <div class="p-8 border border-gray-200 mt-3 rounded-md md:w-100">
      <form @submit.prevent="login">
        <Input label="username" v-model:model="credentials.email" :placeholder="'enter your username or email'"></Input>
        <Input type="password" label="password" v-model:model="credentials.password" class="mt-3"
          :placeholder="'minimun 8 digits'"></Input>
        <div class="mt-4">
          <Button label="login" :type="'submit'"></Button>
          <p v-show="error">{{ error }}</p>
        </div>
      </form>
      <div class="flex justify-center">
        <button type="button" class="btn btn-link text-purple-700" @click="router.push({ name: 'Register' })">Sign
          up</button>
      </div>

    </div>
  </div>
  <Toast :message="message" :show="showModal" @close="closeToast" @autoclose="onToastClosed"></Toast>
</template>

<style scoped></style>
