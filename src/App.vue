<script setup lang="ts">
import router from "./router";

function logout() {
  sessionStorage.removeItem("token");
  router.push({ name: "Login" });
}
</script>

<template>
  <div>
    <div class="flex justify-end">
      <div>hi!</div>
      <div class="w-10">
        <button type="button" class="p-1" @click="logout">
          <i class="material-symbols-outlined"> logout </i>
        </button>
      </div>
    </div>
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
