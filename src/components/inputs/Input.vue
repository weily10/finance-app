<script setup lang="ts">
defineProps({
    label: String,
    isRequired: Boolean,
    placeholder: String,
    type: {
        type: String,
        default: 'text'
    }
})

const model = defineModel('model')

</script>

<template>
    <div class="  grow-1">
        <label class="text-sm text-gray-600">
            {{ label }}<span v-if="isRequired" class="text-red-800"> *</span>
        </label>
        <input :type="type"
            class="mt-1 w-full  grow py-1.5 p-3  text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border border-gray-200 rounded-sm "
            :placeholder="placeholder" v-model="model" min="0">
    </div>
</template>

<style scoped>
input:not(:placeholder-shown) {
    border: 2px solid #9060ff;
}
</style>
