import { defineNuxtPlugin } from '#app';
//@ts-ignore
import VueTheMask from 'vue-the-mask';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueTheMask);
});