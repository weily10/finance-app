<script setup lang="ts" >
defineProps({
    label: String,
    type: String
})

</script>

<template>
    <button
        class="w-full bg-purple-700 p-2 text-white rounded-md cursor-pointer text-sm hover:bg-purple-900 transition duration-300"
        :type="type" @click="$emit('onClick')">
        {{ label }}
    </button>
</template>
