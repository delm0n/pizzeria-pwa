<template>
  <div class="constructor-wrapper__components">
    <constructor-sauce />
    <constructor-ingredient
      v-for="(item, index) in ingredients"
      :link="links[index + 1]"
      :key="index"
      :title="item.title"
      :ingredients="item.ingredientArray"
    />
  </div>
</template>

<script setup lang="ts">
import ConstructorSauce from "~/components/constructor/Sauce.vue";
import ConstructorIngredient from "~/components/constructor/Ingredient.vue";

const props = defineProps<{
  ingredients: IIngredientByType[];
  links: INavLink[];
}>();
</script>
