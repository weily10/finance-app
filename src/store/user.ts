import { defineStore } from 'pinia'
import { ref } from "vue";


export const useUserStore  = defineStore('user', () => {

    const email = ref('')
    const isAuthenticated = ref(false)

    const setUser = (data: { email: string }) => {
        email.value = data.email;
        isAuthenticated.value = true;
    };
    const clearUser = () => {
        email.value = '';
        isAuthenticated.value = false;
    };

    return { email, setUser, clearUser, isAuthenticated }
})