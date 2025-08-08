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
const icon = ref('')
const iconColor = ref('')

async function login() {

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = `${baseUrl}/api/login`;
  await axios.post(url, credentials).then((res) => {
    sessionStorage.setItem("token", res.data.token);
    router.push({ name: "Home" });
    message.value = "Sign in successful"
    showModal.value = true
    icon.value = 'check'
    iconColor.value = 'text-green-500'
  }).catch((e) => {
    console.log(e);
    message.value = e.response.data.error
    showModal.value = true
    icon.value = 'warning'
    iconColor.value = 'text-red-500'
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
  <div class="h-full flex items-center justify-center">
    <div>
      <h1 class="text-center font-bold text-xl">Login</h1>
      <div class="flex justify-center">
        <div class="p-8 border border-gray-200 mt-3 rounded-md md:w-100">
          <form>
            <Input label="username" v-model:model="credentials.email"
              :placeholder="'enter your username or email'"></Input>
            <Input type="password" label="password" v-model:model="credentials.password" class="mt-3"
              :placeholder="'minimun 8 digits'"></Input>
            <div class="mt-4">
              <Button label="Login" :type="'button'" :disabled="!credentials.password || !credentials.email"
                @onClick="login"></Button>
              <p v-show="error">{{ error }}</p>
            </div>
          </form>
          <div class="flex justify-center  ">
            <p class="mt-3 text-sm text-gray-400 text-center">New user? <span
                class="text-purple-700 font-bold cursor-pointer" @click="router.push({ name: 'Register' })">Sign Up</span>
            </p>

          </div>

        </div>
      </div>
      <Toast :message="message" :show="showModal" @close="closeToast" @autoclose="onToastClosed" :icon="icon"
        :iconColor="iconColor"></Toast>
    </div>
  </div>
</template>

<style scoped></style>
