<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import BaseModal from "../components/modals/BaseModal.vue";
import axios from "axios";
import type { Transaction, NewTransaction } from "../types/transaction";

const items = ref<Transaction[]>([]);
const showModal = ref(false);
const price = ref(0);
const company = ref("");
const stockprice = ref(0);
const stockAmount = ref(0);
const target = ref(0)

async function getData() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const url = `${baseUrl}/api/transactions`;

  await axios.get(url).then((res) => {
    items.value = res.data;
    console.log(res);
  });
}

async function addStock() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = `${baseUrl}/api/transactions`;
  const requestBody: NewTransaction = {
    type: "dividend",
    price: price.value,
    stockprice: stockprice.value,
    company: company.value,
    stockAmount: stockAmount.value,
  };

  await axios.post(url, requestBody).then((res) => {
    console.log(res);
    items.value.push(res.data);
    showModal.value = false;
  });
}

function deleteItem(item: Transaction) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = `${baseUrl}/api/transactions/${item._id}`;
  axios.delete(url).then((res) => {
    items.value.splice(
      items.value.findIndex((i) => i._id === item._id),
      1
    );
    console.log(res);
  });
}

function formatPrice(price: number) {
  if (isNaN(price)) return "0.00";
  return Number(price)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function formatNTD(price: number) {
  return new Intl.NumberFormat("zh-TW", { style: "currency", currency: "TWD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price)
}

function multiplyPrice(price: number, amount: number) {
  return formatPrice(price * 1000 * amount);
}

onMounted(() => {
  getData();
});

function formatToPercent(div: number, stockprice: number) {
  return ((div * 100) / stockprice).toFixed(2) + "%";
}


function addNewCard() {
  init()
  showModal.value = true
}


function init() {
  price.value = 0
  stockprice.value = 0
  company.value = ''
  stockAmount.value = 0
}




const totalDiv = computed(() => {
  return items.value.reduce((sum, item) => sum + item.price * 1000 * item.stockAmount, 0);
});

const totalStockInvested = computed(() => {
  return items.value.reduce((sum, item) => sum + item.stockprice * 1000 * item.stockAmount, 0);
});
</script>

<template>
  <div class="text-start">
    <h1 class="text-2xl">Input you numbers</h1>
    <div class="mt-5 flex gap-3 flex-wrap">
      <template v-for="item in items" :key="item.id">
        <div class="p-3 shadow-sm w-75 grow">
          <div class="relative">
            <div class="absolute right-0">
              <button type="button" class="!rounded-full !px-2 !py-1" @click="deleteItem(item)">
                <span class="material-symbols-outlined !text-sm"> close </span>
              </button>
            </div>
          </div>

          <div>
            <span class="text-gray-500 text-sm"> Company </span>
            <br />
            <span> {{ item.company }}</span>
          </div>

          <div class="mt-2 grid grid-cols-3  gap-3">
            <div class="col-span-2">
              <span class="text-gray-500 text-sm"> Share price </span> <br />
              {{ formatPrice(item.stockprice * 1000) }} x
              {{ item.stockAmount }} shares
            </div>
            <div class="col-span-1">
              <span class="text-gray-500 text-sm"> Total </span> <br />
              {{ multiplyPrice(item.stockprice, item.stockAmount) }}
            </div>
          </div>
          <div class="mt-2 grid grid-cols-3  gap-3">
            <div class="col-span-2">
              <span class="text-gray-500 text-sm"> Dividend </span>
              <br />
              {{ formatPrice(item.price) }}
            </div>
            <div class="col-span-1">
              <span class="text-gray-500 text-sm"> Dividend yield </span>
              <br />
              {{ formatToPercent(item.price, item.stockprice) }}
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="border border-purple-200 mt-5 p-3 grid grid-cols-3">
      <div>
        <span class="text-gray-500 text-sm"> Total invested </span>
        <br />
        <span class="font-bold">{{ formatNTD(totalStockInvested) }} </span>
        <div class="text-xs text-gray-500  mt-1">
           Investment needed for your target
           <br>
           <span class="font-bold">{{formatNTD(target)  }} </span>
        </div>
      </div>
      <div>
        <span class="text-gray-500 text-sm"> Total dividend </span>
        <br />
        <span class="font-bold">{{ formatNTD(totalDiv) }} </span>
      </div>

      <div>
        <span class="text-gray-500 text-sm"> Per month </span>
        <br />
        <span class="font-bold">{{ formatNTD(totalDiv / 12) }} </span>
        <br>
        <div class="text-sm text-gray-500  ">
          <div class="mt-1">
            <span class="">Target</span>
            <div class="max-w-40">
              <input
                class="mt-1 appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:outline"
                id=" " type="number" placeholder="value/month" v-model="target">
            </div>
          </div>
         
        </div>
      </div>
      <div>
        <span class="text-gray-500 text-sm"> Average yield invested </span>
        <br />
        <span class="font-bold">{{  formatPrice(totalDiv*100/totalStockInvested) }}% </span>
        <br>
      </div>
    </div>
    <form>
      <button type="button" class="mt-3 w-full bg-gray-200" @click="addNewCard">
        Add new card
      </button>
      <BaseModal :show="showModal">
        <div class="text-lg">Stock info</div>
        <div class="mt-5">
          <div>
            <div class="mt-2">
              <label for="">Company Name</label>
              <input type="input" v-model="company"
                class="w-full bg-white placeholder:text-slate-400 text-slate-700 border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300"
                placeholder="Type here..." />
            </div>
            <div class="mt-2 flex gap-3 flex-wrap">
              <div class="max-w-[12rem]">
                <label for="">Number of stocks</label>
                <input id="" type="number" v-model="stockAmount"
                  class="w-full bg-white placeholder:text-slate-400 text-slate-700 border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300"
                  placeholder="Type here..." />
              </div>
              <div class="max-w-[12rem]">
                <label for="">Stock Price</label>
                <input id="" type="number" v-model="stockprice"
                  class="w-full bg-white placeholder:text-slate-400 text-slate-700 border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300"
                  placeholder="Type here..." />
              </div>
            </div>
            <div class="mt-2">
              <label for="">Dividend Value</label>
              <input id="" type="number" v-model="price"
                class="w-full bg-white placeholder:text-slate-400 text-slate-700 border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300"
                placeholder="Type here..." />
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
