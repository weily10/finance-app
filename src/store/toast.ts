
import { defineStore } from 'pinia'
import { ref } from "vue";


export const toastStore = defineStore('toast', () => {
    const showModal = ref(false)
    const message = ref("")
    const icon = ref('')
    const iconColor = ref('')


    function closeToast() {
        showModal.value = false
    }

    function openToast() {
        showModal.value = true
    }


    return { showModal, closeToast , openToast, message, icon, iconColor }
})