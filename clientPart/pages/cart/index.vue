<template>
  <main class="cart-main">
    <cart-header-section />
    <cart-pizza-section />
    <cart-dish-section />
  </main>
</template>

<script setup lang="ts">
import CartHeaderSection from "~/components/cart/CartHeaderSection.vue";
import CartPizzaSection from "~/components/cart/CartPizzaSection.vue";
import CartDishSection from "~/components/cart/CartDishSection.vue";
</script>

<style lang="scss">
.cart-main {
  background: var(--placeholder);
  padding-top: 1px;
}
</style>
