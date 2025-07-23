<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseModal from '../components/modals/BaseModal.vue'
import axios from 'axios';


const items = ref([])
const showModal = ref(false)
const amount = ref(0)
const company = ref('')
const stockprice = ref(0)


async function getData() {
    const url = 'http://localhost:3000/api/transactions'
    // .post(url, requestBody).then(res => {
    await axios.get(url).then(res => {
        items.value = res.data
        console.log(res);
    })
}


async function addStock() {
    const url = 'http://localhost:3000/api/transactions'
    const requestBody = {
        type: 'dividend',
        amount: amount.value,
        stockprice: stockprice.value,
        company: company.value
    }

    await axios.post(url, requestBody).then(res => {
        console.log(res);
        showModal.value = false
    })

}

onMounted(() => {
    getData()
})

</script>

<template>
    <div class="text-start">
        <h1 class="text-2xl">
            Input you numbers
        </h1>
        <div class=" mt-5 flex  gap-3 flex-wrap">
            <template v-for="(item, index) in items " :key="item.id">
                <div class="p-3 shadow-sm w-75 grow ">
                    <div>
                        {{ item.company }}
                    </div>
                    <div>
                        {{ item.stockprice }}
                    </div>
                    <div>
                        {{ item.amount }}
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
                        <div class="mt-2">
                            <label for="">Company Name</label>
                            <input type="input" v-model="company"
                                class="w-full bg-white  placeholder:text-slate-400 text-slate-700  border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300   "
                                placeholder="Type here...">
                        </div>
                        <div class="mt-2">
                            <label for="">Stock Price</label>
                            <input id="" type="number" v-model="stockprice"
                                class="w-full bg-white  placeholder:text-slate-400 text-slate-700   border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300   "
                                placeholder="Type here...">
                        </div>
                        <div class="mt-2">
                            <label for="">Dividend Value</label>
                            <input id="" type="number" v-model="amount"
                                class="w-full bg-white  placeholder:text-slate-400 text-slate-700   border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300   "
                                placeholder="Type here...">
                        </div>
                    </div>
                    <div class="flex gap-3 mt-5 justify-end">
                        <button type="button" class="bg-gray-200 px-3 py-1 font-medium" @click="showModal = false">
                            cancel
                        </button>
                        <button type="button" class="bg-gray-200 px-3 py-1 font-medium" @click="addStock">
                            add
                        </button>
                    </div>
                </div>
            </BaseModal>
        </form>
    </div>
</template>


<style scoped></style>