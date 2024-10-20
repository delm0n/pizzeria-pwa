<template>
  <article class="constructor-ingredient">
    <h2 v-if="!!title" v-html="title"></h2>

    <div class="constructor-ingredient__content">
      <ingredient-item
        v-for="ingredient in ingredients"
        :key="ingredient.IngredientId"
        :ingredient="ingredient"
      >
      </ingredient-item>
    </div>
  </article>
</template>

<script setup lang="ts">
import IngredientItem from "~/components/UI/IngredientItem.vue";

const props = defineProps<{
  ingredients: IIngredient[];
  title: string;
}>();
</script>

<style lang="scss">
.constructor-ingredient {
  &:not(:last-child) {
    margin-bottom: 50px;
  }

  h2 {
    @media (max-width: 768px) {
      display: none;
    }
  }

  &__content {
    display: flex;
    flex-wrap: wrap;

    .ingredient-item {
      width: 180px;
      margin: 0 15px 15px 0;

      @media (max-width: 1440px) {
        width: 160px;
      }

      @media (max-width: 1024px) {
        width: 140px;
      }

      &__img {
        max-width: 100px;

        @media (max-width: 1024px) {
          max-width: 80px;
        }
      }

      .content-title,
      .content-price {
        h5,
        p {
          font-size: 16px;

          @media (max-width: 992px) {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
