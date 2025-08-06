<script setup lang="ts">
import { ref, reactive } from "vue";
import Button from "../components/buttons/Button.vue";
import Input from "../components/inputs/Input.vue";
import axios from "axios";
import router from "../router";

const credentials = reactive({
  email: "",
  password: "",
});
const error = ref("");

async function login() {
  console.log("adsasd", credentials);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = `${baseUrl}/api/login`;
  axios.post(url, credentials).then((res) => {
    localStorage.setItem("token", res.data.token);
    router.push({ name: "Home" });
  });
}
</script>

<template>
  <h1 class="text-center font-bold text-xl">Login</h1>
  <div class="flex justify-center">
    <div class="p-8 border border-gray-200 mt-3 rounded-md md:w-100">
      <form @submit.prevent="login">
        <Input
          label="username"
          v-model:model="credentials.email"
          :placeholder="'enter your username or email'"
        ></Input>
        <Input
          type="password"
          label="password"
          v-model:model="credentials.password"
          class="mt-3"
          :placeholder="'minimun 8 digits'"
        ></Input>
        <div class="mt-4">
          <Button label="login" :type="'submit'"></Button>
          <p v-show="error">{{ error }}</p>
        </div>
      </form>
      <p class="mt-3 text-sm text-gray-400"></p>
    </div>
  </div>
</template>
