<template>
  <section class="header-cart">
    <div class="container">
      <h2 v-if="cartStore.getAllCount != 0">
        {{ formTovar(cartStore.getAllCount) }} на {{ cartStore.getAllPrice }} ₽
      </h2>
      <h2 v-else>Ваша корзина пуста <span class="emoji">:(</span></h2>
    </div>
  </section>
</template>

<script setup lang="ts">
const cartStore = useCartStore();

const formTovar = (num: number) => {
  let wordForm;

  // Определяем форму слова на основе числа
  if (num % 10 === 1 && num % 100 !== 11) {
    wordForm = "товар"; // Именительный падеж для 1, 21, 31,
  } else if (
    num % 10 >= 2 &&
    num % 10 <= 4 &&
    (num % 100 < 10 || num % 100 >= 20)
  ) {
    wordForm = "товара"; // Именительный падеж для 2, 3, 4, 22, 23, 24, ...
  } else {
    wordForm = "товаров"; // Именительный падеж для остальных
  }

  return `${num} ${wordForm}`;
};
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
  }
}
</style>
