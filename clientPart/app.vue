<template>
  <div>
    <VitePwaManifest />
    <NuxtLayout>
      <Transition name="page" mode="out-in">
        <NuxtPage class="page-content" />
      </Transition>

      <pizza-modal />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import PizzaModal from "~/components/index/PizzaModal.vue";

useSeoMeta({
  title: "Pizzeria",
  ogTitle: "Pizzeria",
  description: "Pizzeria nuxt pwa application",
  ogDescription: "Pizzeria nuxt pwa application",
});
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
