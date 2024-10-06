<template>
  <section id="pizza">
    <div class="container">
      <h2>Пиццы</h2>

      <div class="addish-wrapper">
        <pizza-section-item
          v-for="(item, index) in storePizza.pizzas"
          :key="index"
          :pizza="item"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import PizzaSectionItem from "./PizzaSectionItem.vue";

const storePizza = usePizzaStore();
const storeIngredient = useIngredientStore();

await callOnce(storePizza.fetch);
await callOnce(storeIngredient.fetch);
</script>

<style lang="scss">
#pizza {
  .addish-item {
    &__img {
      cursor: pointer;
      img {
        transition: all 0.3s;
      }

      &:hover {
        img {
          transform: translateY(6px);
        }
      }
    }
  }
}
</style>
