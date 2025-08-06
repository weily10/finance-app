<script setup lang="ts">
const props = defineProps<{
  label: String;
  type?: "button" | "submit" | "reset";
}>();
</script>

<template>
  <button
    class="w-full md:max-w-30 bg-purple-700 p-2 text-white rounded-md cursor-pointer text-sm hover:bg-purple-900 transition duration-300"
    :type="props.type"
    @click="$emit('onClick')"
  >
    {{ props.label }}
  </button>
</template>
