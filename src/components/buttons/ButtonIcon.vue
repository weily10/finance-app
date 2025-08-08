<script setup lang="ts">
const props = defineProps<{
  icon: String;
  iconClass:String

}>();
</script>

<template>
  <button class="w-5  p-1 flex justify-center items-center rounded-md cursor-pointer  hover:text-purple-600 transition duration-300" type="button"
    @click="$emit('onClick')">
    <i :class="props.iconClass">{{ props.icon }}</i>
  </button>
</template>
