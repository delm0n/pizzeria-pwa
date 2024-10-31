<template>
  <article :id="link.id" class="constructor-ingredient">
    <h2 v-if="!!link.title" v-html="link.title"></h2>

    <div class="constructor-ingredient__content">
      <ingredient-item
        v-for="ingredient in ingredients"
        :key="ingredient.IngredientId"
        :ingredient="ingredient"
        @click="checkLimitOfCount()"
      >
      </ingredient-item>
    </div>
  </article>
</template>

<script setup lang="ts">
import IngredientItem from "~/components/UI/IngredientItem.vue";
import { defineEmits } from "vue";

const emit = defineEmits();
const storeNotification = useNotificationStore();
const storeIngredient = useIngredientStore();

const props = defineProps<{
  ingredients: IIngredient[];
  link: INavLink;
  visibleTimeout: boolean;
}>();

const checkLimitOfCount = () => {
  if (window.innerWidth > 767) {
    !storeIngredient.checkCount
      ? storeNotification.addNotification(
          "Внимание!",
          "Выбрано максимальное количество допов"
        )
      : "";
  } else {
    if (!props.visibleTimeout) {
      emit("setVisibleTimeout", true);
      // visibleTimeout.value = true;

      setTimeout(() => {
        emit("setVisibleTimeout", false);

        // visibleTimeout.value = false;
      }, 3000);
    }
  }
};
</script>

<style lang="scss">
.constructor-ingredient {
  padding-top: 50px;

  @media (max-width: 768px) {
    width: 90%;
    max-width: 520px;
    margin: 0 auto;
  }

  @media (max-width: 576px) {
    padding: 0 16px;
    width: 100%;
  }

  h2 {
    @media (max-width: 768px) {
      display: none;
    }
  }

  &__content {
    display: flex;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      gap: 15px;
      padding: 2px 0;
      display: grid;
      grid-template-columns: repeat(4, 1fr);

      @media (max-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
      }
      @media (max-width: 376px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .ingredient-item {
      width: 180px;
      margin: 0 15px 15px 0;

      @media (max-width: 1440px) {
        width: 160px;
      }

      @media (max-width: 1024px) {
        width: 140px;
      }

      @media (max-width: 768px) {
        margin: 0;
        width: 100%;
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
