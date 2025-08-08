<script setup lang="ts">
const props = defineProps<{
  label: String;
  type?: "button" | "submit" | "reset";
}>();
</script>

<template>
  <button
    class="w-full   bg-purple-700 p-2 text-white rounded-md cursor-pointer  hover:bg-purple-900 transition duration-300 disabled:bg-gray-300 disabled:cursor-default"
    :type="props.type" @click="$emit('onClick')">
    {{ props.label }}
  </button>
</template>
