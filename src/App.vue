<script setup lang="ts">
import router from "./router";
import { useRoute } from 'vue-router'
import ButtonIcon from "./components/buttons/ButtonIcon.vue";
import { useUserStore } from './store/index'

const store = useUserStore()
const route = useRoute()

function logout() {
  sessionStorage.removeItem("token");
  router.push({ name: "Login" });
}

</script>

<template>
  <div class="w-full fixed bg-white   border-b-1 border-gray-200 z-6"
    v-show="route.name != 'Login' && route.name != 'Register'">
    <div class="flex justify-between p-3">
      <div class="text-2xl font-bold text-purple-700">
        FFS
      </div>
      <div class="flex gap-3 items-center">
        <div class="text-gray-500"> {{ store.email }} </div>
        <div class="w-10">
          <button-icon icon-class="material-symbols-outlined" icon="logout" @onClick="logout"></button-icon>
        </div>
      </div>

    </div>
  </div>
  <div class="h-100 px-3 pt-[4.5rem] lg:mx-[15%]  "  >
    <router-view></router-view>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
