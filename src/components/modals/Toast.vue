<script setup lang="ts">
import { watch } from 'vue';



const props = defineProps({

    duration: {
        type: Number,
        default: 8000,
    },

    show: {
        type: Boolean,
        default: false,
    },

    message: {
        type: String,
        default: '',
    }
})


const emit = defineEmits(['autoclose', 'close'])

watch(
    () => props.show,
    (val) => {
        if (val) {
            setTimeout(() => {
                emit('close')
            }, props.duration)
        }
    }
)

</script>


<template>
    <Teleport to="#toast">
        <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 "
            enter-to-class="opacity-100  " leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100  " leave-to-class="opacity-0  ">
            <div v-if="show" class="fixed bottom-0   p-5">
                <div id="toast-default"
                    class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800"
                    role="alert">

                    <div class="ms-3 text-sm font-normal">{{ message }}</div>
                    <button type="button"
                        class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                        data-dismiss-target="#toast-default" aria-label="Close" @click="$emit('close')">
                        <span class="material-symbols-outlined !text-sm"> close </span>

                    </button>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

