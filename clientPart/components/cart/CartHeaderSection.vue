<template>
  <section class="header-cart">
    <div class="container">
      <h2 v-if="cartStore.getAllCount != 0">
        {{ formTovar(cartStore.getAllCount) }} на
        {{ cartStore.getLastPrice }}&nbsp;₽
      </h2>
      <h2 v-else>Ваша корзина пуста <span class="emoji">:(</span></h2>
    </div>
  </section>
</template>

<script setup lang="ts">
import { formTovar } from "@/utils/formTovar";
const cartStore = useCartStore();
</script>

<style lang="scss">
.header-cart {
  background: var(--background);

  h2 {
    margin-bottom: 0;
    padding: 40px 0;

    @media (max-width: 768px) {
      padding: 30px 0;
    }

    @media (max-width: 576px) {
      padding: 20px 0;
    }

    @media (max-width: 426px) {
      font-size: 24px;
    }
  }
}
</style>
