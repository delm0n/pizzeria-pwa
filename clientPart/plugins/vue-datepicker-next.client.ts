// plugins/vue-datepicker-next.client.ts
// import { defineNuxtPlugin } from '#app';
import VueDatepickerNext from 'vue-datepicker-next';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('VueDatepickerNext', VueDatepickerNext);
});