<template>
  <main class="cart-main">
    <cart-header-section />

    <component v-if="CartConstructorSection" :is="CartConstructorSection" />
    <component v-if="CartPizzaSection" :is="CartPizzaSection" />
    <component v-if="CartDishSection" :is="CartDishSection" />

    <always-section />

    <component v-if="CartOfferSection" :is="CartOfferSection" />
  </main>
</template>

<script setup lang="ts">
import CartHeaderSection from "~/components/cart/Header.vue";
import { ref, defineAsyncComponent } from "vue";
import AlwaysSection from "~/components/index/AlwaysSection.vue";

const CartConstructorSection = ref<null | any>(null);
CartConstructorSection.value = defineAsyncComponent({
  loader: () => import("~/components/cart/Constructor.vue"),
  delay: 500,
  timeout: 3000,
});

const CartPizzaSection = ref<null | any>(null);
CartPizzaSection.value = defineAsyncComponent({
  loader: () => import("~/components/cart/Pizza.vue"),
  delay: 500,
  timeout: 3000,
});

const CartDishSection = ref<null | any>(null);
CartDishSection.value = defineAsyncComponent({
  loader: () => import("~/components/cart/Dish.vue"),
  delay: 500,
  timeout: 3000,
});

const CartOfferSection = ref<null | any>(null);
CartOfferSection.value = defineAsyncComponent({
  loader: () => import("~/components/cart/Offer.vue"),
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
