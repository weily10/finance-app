<script setup lang="ts">
const props = defineProps<{
  label: String;
  type?: "button" | "submit" | "reset";
  color: String
}>();
</script>

<template>
  <button
    class="w-full   p-2 text-white rounded-md cursor-pointer  transition duration-300 disabled:bg-gray-300 disabled:cursor-default"
    :class="color"
    :type="props.type" @click="$emit('onClick')">
    {{ props.label }}
  </button>
</template>
