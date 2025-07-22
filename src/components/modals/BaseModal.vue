<script setup lang="ts">
defineProps<{
    show: boolean
}>()
</script>

<template>
    <Teleport to="#modals">
        <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 "
            enter-to-class="opacity-100  " leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0  ">
            <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-black opacity-40"></div>

                <!-- Modal -->
                <div class="relative bg-white text-black shadow-lg rounded-lg p-6 w-full ">
                    <slot></slot>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>