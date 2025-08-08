<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import BaseModal from "../components/modals/BaseModal.vue";
import Button from "../components/buttons/Button.vue";
import ButtonIcon from "../components/buttons/ButtonIcon.vue";
import axios from "axios";
import type { Transaction, NewTransaction } from "../types/transaction";

interface ResultRow {
  period: number;
  investment: number;
  accumulated: number;
  yieldValue: number;
  totalYield: number;
}

const items = ref<Transaction[]>([]);
const showModal = ref(false);
const price = ref(0);
const company = ref("");
const stockprice = ref(0);
const stockAmount = ref(0);
const target = ref(0);
const targetYield = ref(0);
const initInv = ref(0);
const investment = ref(0);
const period = ref(0);
const invYield = ref(0);
const targetResult = ref([] as ResultRow[]);

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
  if (!price) {
    return "$" + 0;
  } else {
    return new Intl.NumberFormat("zh-TW", {
      style: "currency",
      currency: "TWD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }
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
  init();
  showModal.value = true;
}

function init() {
  price.value = 0;
  stockprice.value = 0;
  company.value = "";
  stockAmount.value = 0;
}

const totalDiv = computed(() => {
  return items.value.reduce(
    (sum, item) => sum + item.price * 1000 * item.stockAmount,
    0
  );
});

const totalStockInvested = computed(() => {
  return items.value.reduce(
    (sum, item) => sum + item.stockprice * 1000 * item.stockAmount,
    0
  );
});

function calculate() {
  targetResult.value = [];
  let accumulated = initInv.value;
  let totalYield = 0;
  let totalinvested = initInv.value;

  for (let i = 0; i <= period.value; i++) {
    const yieldValue =
      (Math.pow(1 + invYield.value / 100, 1) - 1) * accumulated;
    console.log(yieldValue);

    totalYield += yieldValue;
    accumulated += yieldValue;
    totalinvested += investment.value;

    if (i !== 0) {
      accumulated += investment.value;
    }

    targetResult.value.push({
      period: i,
      investment: totalinvested,
      accumulated: accumulated,
      yieldValue: yieldValue,
      totalYield: totalYield,
    });
  }

  console.log(targetResult);
}

function onInput() { }
</script>

<template>
  <div>
    <div class="flex justify-between items-end">
      <h1 class="text-2xl">Finance Dashboard</h1>
      <div>
        <Button type="button" @onClick="addNewCard" label="Add new info">
        </Button>
      </div>
    </div>
    <div class="mt-3 flex gap-3 flex-wrap border border-dashed border-gray-300 rounded-lg p-3 min-h-50">
      <div class="flex items-center justify-center w-full flex-col" v-show="items.length <= 0">
        <span class="text-gray-500 text-sm">No items here, start adding!</span>
         
      </div>
      <template v-for="item in items" :key="item.id">
        <div class="p-3 border rounded-md border-gray-200 w-75 grow bg-white">
          <div class="relative">
            <div class="absolute right-0 z-1">
              <ButtonIcon iconClass="material-symbols-outlined !text-sm" icon="close" @onClick="deleteItem(item)"></ButtonIcon>
            </div>
          </div>

          <div>
            <span class="text-gray-500 text-sm"> Company </span>
            <br />
            <span> {{ item.company }}</span>
          </div>

          <div class="mt-2 grid grid-cols-3 gap-3">
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
          <div class="mt-2 grid grid-cols-3 gap-3">
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
    <div class="flex gap-3  flex-wrap mt-3">
      <div class="border border-gray-200 p-3 grow rounded-md">
        <div class="mb-3">
          <p class="text-lg font-semibold text-purple-700">Your investment</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="">
            <span class="text-gray-500 text-sm"> Total invested </span>
            <br />
            <span class="font-bold">{{ formatNTD(totalStockInvested) }} </span>
          </div>
          <div class="">
            <span class="text-gray-500 text-sm"> Total dividend </span>
            <br />
            <span class="font-bold">{{ formatNTD(totalDiv) }} </span>
          </div>

          <div class="">
            <span class="text-gray-500 text-sm"> Per month </span>
            <br />
            <span class="font-bold">{{ formatNTD(totalDiv / 12) }} </span>
            <br />
          </div>
          <div class="">
            <span class="text-gray-500 text-sm"> Average yield invested </span>
            <br />
            <span class="font-bold">{{ formatPrice((totalDiv * 100) / totalStockInvested) }}%
            </span>
          </div>
        </div>
      </div>
      <div class="border border-gray-200 p-3 rounded-md grid grid-cols-2 gap-x-3   grow">
        <div class="text-purple-700 col-span-2 mb-3">
          <p class="text-lg font-semibold">Your target</p>
        </div>

        <div class="text-sm text-gray-500 col-span-2 md:col-span-1  ">
          <div>
            <label class="text-gray-500 text-sm">Target per month</label>
            <div class=" ">
              <input
                class="mt-1 appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:outline"
                id=" " type="number" placeholder="value/month" v-model="target" @input="onInput" />
            </div>
          </div>
        </div>
        <div class="text-sm col-span-2 md:col-span-1 ">
          <label class="text-gray-500 text-sm">Target yield (%)</label>
          <div>
            <input
              class="mt-1 appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:outline"
              id=" " type="number" placeholder="%" v-model="targetYield" />
          </div>
        </div>
        <div class="md:mb-0">
          <label class="text-gray-500 text-sm">Investment needed</label>

          <div class="font-bold">
            {{ formatNTD(((target * 12) / targetYield) * 100) }}
          </div>
        </div>
      </div>
    </div>

    <div class="border border-gray-200 mt-3 p-3 grid grid-cols-2 md:grid-cols-5 gap-x-3 rounded-md  ">
      <div class="col-span-5 text-purple-700 mb-3">
        <p class="text-lg font-semibold">Simulate Your target</p>
      </div>
      <div class="text-sm col-span-5 sm:col-span-2 lg:col-span-1  ">
        <label class="text-gray-500 text-sm">Initial Investment</label>
        <div class="md:max-w-40">
          <input
            class="mt-1 appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:outline"
            id=" " type="number" placeholder="" v-model="initInv" />
        </div>
      </div>
      <div class="text-sm col-span-5 sm:col-span-2 lg:col-span-1">
        <label class="text-gray-500 text-sm">Target investment/year</label>
        <div class="md:max-w-40">
          <input
            class="mt-1 appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:outline"
            id=" " type="number" placeholder="" v-model="investment" />
        </div>
      </div>
      <div class="text-sm col-span-5 sm:col-span-2 lg:col-span-1">
        <label class="text-gray-500 text-sm">Yield</label>
        <div class="md:max-w-40">
          <input
            class="mt-1 appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:outline"
            id=" " type="number" placeholder="%" v-model="invYield" />
        </div>
      </div>
      <div class="text-sm col-span-5 sm:col-span-2 lg:col-span-1">
        <label class="text-gray-500 text-sm">Period</label>
        <div class="md:max-w-40">
          <input
            class="mt-1 appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:outline"
            id=" " type="number" placeholder="years" v-model="period" />
        </div>
      </div>
      <div class="mt-5 col-span-5 lg:col-span-1 mb-3">
        <Button :type="'button'" @onClick="calculate" :label="'Calculate now'">
        </Button>
      </div>

      <div class="col-span-5">
        <hr class="border-gray-300" />
        <div class="relative overflow-x-auto mt-3">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th class="p-2">Year</th>

                <th class="p-2 text-end">Dividend received</th>
                <th class="p-2 text-end">Total Dividend received</th>
                <th class="p-2 text-end">Total invested</th>
                <th class="p-2 text-end">Total accumulated</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in targetResult">
                <td class="   ">
                  {{ item.period }}
                </td>

                <td class="text-end">
                  {{ formatPrice(item.yieldValue) }}
                </td>
                <td class="text-end">
                  {{ formatPrice(item.totalYield) }}
                </td>
                <td class="text-end">
                  {{ formatPrice(item.investment) }}
                </td>
                <td class="text-end">
                  {{ formatPrice(item.accumulated) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <form>

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
            <Button type="button" @click="showModal = false" label="cancel">
            </Button>
            <Button type="button" @click="addStock" label="add"> </Button>
          </div>
        </div>
      </BaseModal>
    </form>
  </div>
</template>

<style scoped></style>
