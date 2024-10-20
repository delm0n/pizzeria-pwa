<template>
  <div class="constructor-wrapper__components">
    <constructor-sauce />
    <constructor-ingredient
      v-for="(item, index) in ingredients"
      :key="index"
      :title="item.title"
      :ingredients="item.ingredientArray"
    />
  </div>
</template>

<script setup lang="ts">
import ConstructorSauce from "~/components/constructor/ConstructorSauce.vue";
import ConstructorIngredient from "~/components/constructor/ConstructorIngredient.vue";

const props = defineProps<{
  ingredients: IIngredientByType;
}>();
</script>
