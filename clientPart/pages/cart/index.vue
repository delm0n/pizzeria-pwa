<template>
  <main class="cart-main">
    <cart-pizza-section />
    <cart-dish-section />
  </main>
</template>

<script setup lang="ts">
import CartDishSection from "~/components/cart/CartDishSection.vue";
import CartPizzaSection from "~/components/cart/CartPizzaSection.vue";
</script>

<style lang="scss">
.cart-main {
  background: var(--placeholder);
  padding-top: 1px;
}
</style>
