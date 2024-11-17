<template>
  <article class="addish-item" v-if="!!pizza" v-show="pizza.Visible">
    <div
      class="addish-item__img"
      @click="storeModal.openModalPizza(pizza.PizzaId)"
    >
      <NuxtPicture
        format="avif,webp"
        sizes="xl:330px lg:300px md:290px sm:250px xs: 200px"
        :src="'/images/pizzas/' + pizza.UrlImg + '.png'"
        :alt="pizza.PizzaName"
      />
    </div>

    <div class="addish-item__content">
      <div class="content-title">
        <h3 v-html="pizza.PizzaName"></h3>
      </div>

      <div class="content-structure">
        <p v-html="pizza.Structure"></p>
      </div>

      <div class="content-bottom">
        <template v-if="viewport.isGreaterOrEquals('mobileMedium')">
          <p class="price">от {{ pizza.MinPrice }} ₽</p>
          <button
            @click="storeModal.openModalPizza(pizza.PizzaId)"
            class="button"
          >
            Выбрать
          </button>
        </template>
        <template v-else>
          <button
            @click="storeModal.openModalPizza(pizza.PizzaId)"
            class="button"
          >
            от {{ pizza.MinPrice }} ₽
          </button>
        </template>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
const viewport = useViewport();
const storeModal = useModalStore();

const props = defineProps<{
  pizza: IPizza;
}>();
</script>

<style lang="scss">
.test-enter-active,
.test-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.test-enter, .test-leave-to /* .test-leave-active в <2.1.8 */ {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
