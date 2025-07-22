<script setup lang="ts">
import { ref } from 'vue'

import BaseModal from '../components/modals/BaseModal.vue'

const showModal = ref(false)

</script>

<template>
    <div class="text-start">
        <h1 class="text-2xl">
            Input you numbers
        </h1>

        <form class="mt-5">
            <div class="w-full max-w-sm min-w-[200px]">
                <label for="">dividend</label>
                <input type="input"
                    class="w-full bg-white  placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300    "
                    placeholder="Type here...">
            </div>
            <div class=" mt-3">
                <label for="">dividend</label>
                <div class="w-full max-w-sm min-w-[200px]">
                    <input type="input"
                        class="w-full bg-white  placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300   "
                        placeholder="Type here...">
                </div>
            </div>
            <button type="button" class="mt-3 w-full" @click="showModal = true"> Add new card</button>
            <BaseModal :show="showModal">
                <div class="text-lg">Stock info</div>
                <div class="mt-5">

                    <div>
                        <div>
                            <label for="">divdend</label>
                            <input id="" type="input"
                                class="w-full bg-white  placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300   "
                                placeholder="Type here...">
                        </div>
                        <div class="mt-2">
                            <label for="">info2</label>
                            <input type="input"
                                class="w-full bg-white  placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300   "
                                placeholder="Type here...">
                        </div>

                    </div>
                    <div class="flex gap-3 mt-5 justify-end">
                        <button type="button" class="bg-indigo-200 px-3 py-1 font-medium" @click="showModal = false">
                            cancel
                        </button>
                        <button type="button" class="bg-indigo-200 px-3 py-1 font-medium" @click="showModal = false">
                            add
                        </button>
                    </div>
                </div>
            </BaseModal>
        </form>
    </div>
</template>


<style scoped></style>