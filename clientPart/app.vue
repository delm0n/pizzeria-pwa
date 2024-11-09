<template>
  <div>
    <VitePwaManifest />
    <NuxtLayout>
      <transition name="page" mode="out-in">
        <NuxtPage keepalive class="page-content" />
      </transition>

      <pizza-modal />
      <enter-modal />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import PizzaModal from "~/components/index/PizzaModal.vue";
import EnterModal from "~/components/login/EnterModal.vue";

useSeoMeta({
  title: "Pizzeria",
  ogTitle: "Пиццерия",
  description: "Pizzeria nuxt pwa application",
  ogDescription: "Пиццерия nuxt pwa application",
});

useHead({
  htmlAttrs: {
    lang: "ru",
  },
});

const storeIngredient = useIngredientStore();
const storeDish = useDishStore();
const storePizza = usePizzaStore();
const storeonstructor = useConstructorStore();

await callOnce(storePizza.fetch);
await callOnce(storeIngredient.fetch);
await callOnce(storeDish.fetch);
await callOnce(storeonstructor.fetch);
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}

.page-enter, .page-leave-to /* .page-leave-active в <2.1.8 */ {
  opacity: 0;
}

.page-content {
  min-height: 100vh;
}
</style>
