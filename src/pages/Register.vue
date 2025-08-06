
<script setup lang="ts" >
import { ref, reactive } from 'vue'
import Button from '../components/buttons/Button.vue'
import Input from '../components/inputs/Input.vue'
import axios from "axios";

const credentials = reactive({
    email: '',
    password: '',
})
const error = ref('')

async function register() {
    console.log('adsasd', credentials);

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    console.log(baseUrl);
    
    const url = `${baseUrl}/api/register`
    axios.post(url, credentials).then((res) => {
        console.log(res);
    });
}


</script>

<template>
    <h1 class="text-center font-bold text-xl">Register</h1>
    <div class="flex justify-center">
        <div class="p-8 border border-gray-200 mt-3 rounded-md md:w-100 ">

            <form @submit.prevent="register">
                <Input label="username" v-model:model="credentials.email"
                    :placeholder="'enter your username or email'"></Input>
                <Input type="password" label="password" v-model:model="credentials.password" class="mt-3"
                    :placeholder="'minimun 8 digits'"></Input>
                <div class="mt-4">
                    <Button label="Sign up" :type="'submit'"></Button>
                    <p v-show="error">{{ error }}</p>
                </div>
            </form>
            <p class="mt-3 text-sm text-gray-400">
            </p>
        </div>
    </div>
</template>

