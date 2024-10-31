<template>
  <div class="ingredients-wrapper">
    <ingredient-item
      v-for="ingredient in storeIngredient.ingredients"
      :key="ingredient.IngredientId"
      :ingredient="ingredient"
      @click="checkLimitOfCount"
    >
    </ingredient-item>

    <warning-ingredient
      :visible="!storeIngredient.checkCount && visibleTimeout"
    />
  </div>
</template>

<script lang="ts" setup>
import IngredientItem from "~/components/UI/IngredientItem.vue";
import WarningIngredient from "~/components/UI/WarningIngredient.vue";

import { ref } from "vue";

const visibleTimeout = ref(false);
const storeIngredient = useIngredientStore();

const checkLimitOfCount = () => {
  if (!visibleTimeout.value) {
    visibleTimeout.value = true;

    setTimeout(() => {
      visibleTimeout.value = false;
    }, 3000);
  }
};
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
