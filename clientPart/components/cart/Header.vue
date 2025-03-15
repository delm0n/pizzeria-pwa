<template>
  <section class="header-cart">
    <div class="container-small">
      <h2 v-if="cartStore.getAllCount != 0">
        {{ formTovar(cartStore.getAllCount) }} на
        {{ cartStore.getLastPrice }}&nbsp;₽
      </h2>

      <div v-else class="empty-cart">
        <h2>
          Ваша корзина пуста
          <span class="emoji">:(</span>
        </h2>

        <NuxtLink to="/" class="button">Вернуться в меню</NuxtLink>
      </div>
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

  .empty-cart {
    padding: 50px 0 100px;

    @media (max-width: 568px) {
      padding: 30px 0 60px;
    }
    h2 {
      text-align: center;
      padding-bottom: 30px;

      @media (max-width: 568px) {
        padding-bottom: 20px;
      }
    }

    .button {
      width: 200px;
      margin: 0 auto;
    }
  }
}
</style>
