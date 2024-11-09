<template>
  <main class="cart-main">
    <cart-header-section />

    <component v-if="CartConstructorSection" :is="CartConstructorSection" />
    <component v-if="CartPizzaSection" :is="CartPizzaSection" />
    <component v-if="CartDishSection" :is="CartDishSection" />

    <component v-if="CartOfferSection" :is="CartOfferSection" />
  </main>
</template>

<script setup lang="ts">
import CartHeaderSection from "~/components/cart/CartHeaderSection.vue";
import { ref, defineAsyncComponent } from "vue";

const CartConstructorSection = ref<null | any>(null);
CartConstructorSection.value = defineAsyncComponent({
  loader: () => import("~/components/cart/CartConstructorSection.vue"),
  delay: 500,
  timeout: 3000,
});

const CartPizzaSection = ref<null | any>(null);
CartPizzaSection.value = defineAsyncComponent({
  loader: () => import("~/components/cart/CartPizzaSection.vue"),
  delay: 500,
  timeout: 3000,
});

const CartDishSection = ref<null | any>(null);
CartDishSection.value = defineAsyncComponent({
  loader: () => import("~/components/cart/CartDishSection.vue"),
  delay: 500,
  timeout: 3000,
});

const CartOfferSection = ref<null | any>(null);
CartOfferSection.value = defineAsyncComponent({
  loader: () => import("~/components/cart/CartOfferSection.vue"),
  delay: 500,
  timeout: 3000,
});
</script>

<style lang="scss">
.cart-main {
  background: var(--placeholder);
  padding-top: 1px;
  display: flex;
  flex-direction: column;

  section .container {
    @media (min-width: 993px) {
      max-width: 1120px;
    }
  }
}
</style>
