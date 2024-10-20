<template>
  <div class="ingredients-wrapper">
    <ingredient-item
      v-for="ingredient in storeIngredient.ingredients"
      :key="ingredient.IngredientId"
      :ingredient="ingredient"
    >
    </ingredient-item>
  </div>
</template>

<script lang="ts" setup>
import IngredientItem from "~/components/UI/IngredientItem.vue";

const storeIngredient = useIngredientStore();
</script>

<style lang="scss">
.ingredients-wrapper {
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 2px;
  grid-template-rows: 1fr;
  display: grid;
  gap: 10px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) and (min-width: 577px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 376px) {
    grid-template-columns: repeat(2, 1fr);
  }

  .ingredient-item__img {
    max-width: 56px;
    @media (max-width: 992px) and (min-width: 767px) {
      max-width: 66px;
    }
    @media (max-width: 376px) {
      max-width: 76px;
    }
  }
}
</style>
