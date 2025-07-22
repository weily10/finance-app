<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseModal from '../components/modals/BaseModal.vue'

const items = ref([])

const showModal = ref(false)


onMounted(() => {
    items.value = [{ div: 123, name: 'ddsaddd' }, { div: 123, name: 'ddsaddd' }, { div: 123, name: 'ddsaddd' }, { div: 123, name: 'ddsaddd' }]
})

</script>

<template>
    <div class="text-start">
        <h1 class="text-2xl">
            Input you numbers
        </h1>
        <div class=" mt-5 flex  gap-3 flex-wrap">
            <template v-for="item in items ">
                <div class="p-3 shadow-sm w-75 grow ">
                    <div>
                        {{ item.name }}
                    </div>
                    <div>
                        {{ item.div }}
                    </div>
                </div>
            </template>

        </div>
        <form>
            <button type="button" class="mt-3 w-full bg-gray-200" @click="showModal = true"> Add new card</button>
            <BaseModal :show="showModal">
                <div class="text-lg">Stock info</div>
                <div class="mt-5">
                    <div>
                        <div>
                            <label for="">divdend</label>
                            <input id="" type="input"
                                class="w-full bg-white  placeholder:text-slate-400 text-slate-700   border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300   "
                                placeholder="Type here...">
                        </div>
                        <div class="mt-2">
                            <label for="">info2</label>
                            <input type="input"
                                class="w-full bg-white  placeholder:text-slate-400 text-slate-700  border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300   "
                                placeholder="Type here...">
                        </div>

                    </div>
                    <div class="flex gap-3 mt-5 justify-end">
                        <button type="button" class="bg-gray-200 px-3 py-1 font-medium" @click="showModal = false">
                            cancel
                        </button>
                        <button type="button" class="bg-gray-200 px-3 py-1 font-medium" @click="showModal = false">
                            add
                        </button>
                    </div>
                </div>
            </BaseModal>
        </form>
    </div>
</template>


<style scoped></style>