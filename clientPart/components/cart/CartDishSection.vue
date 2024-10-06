<template>
  <section class="cart-dishes">
    <article
      v-for="dish in storeCart.getCartDishes"
      :key="dish.DishId"
      class="dish-item"
    >
      <button
        class="remove-button"
        @click="storeDish.setDishCount(dish.DishId, 0)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path
            fill="#000"
            d="M17.3 5.3a1 1 0 1 1 1.4 1.4L13.42 12l5.3 5.3a1 1 0 1 1-1.42 1.4L12 13.42l-5.3 5.3a1 1 0 0 1-1.4-1.42l5.28-5.3-5.3-5.3A1 1 0 0 1 6.7 5.3l5.3 5.28 5.3-5.3Z"
          ></path>
        </svg>
      </button>

      <div class="dish-item__img">
        <nuxt-picture
          format="avif,webp"
          sizes="90px"
          :src="'/images/dishes/' + dish.UrlImg + '.png'"
        />
      </div>

      <div class="dish-item__content">
        <p class="content-name" v-html="dish.Name"></p>

        <p class="content-description">
          {{ dish.Mass + storeDish.getUnit(dish.DishType) }}
        </p>
      </div>

      <div class="dish-item__bottom">
        <b class="price"> {{ dish.Price * dish.Count }} ₽ </b>

        <count-calculate
          :count="dish.Count"
          @increment="(i) => storeDish.setDishCount(dish.DishId, i)"
          @decrement="(i) => storeDish.setDishCount(dish.DishId, i)"
          @remove="storeDish.setDishCount(dish.DishId, 0)"
        />
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import CountCalculate from "../UI/CountCalculate.vue";

const storeCart = useCartStore();
const storeDish = useDishStore();
</script>

<style lang="scss">
.cart-dishes {
  .dish-item {
    position: relative;
    display: grid;
    grid-template-columns: 110px 1fr;
    align-items: center;
    background: var(--background);
    margin-bottom: 20px;
    padding: 12px 16px;

    &__img {
      aspect-ratio: 1/1;
      max-width: 90px;
      width: 100%;
      margin-right: 20px;
    }

    &__content {
      .content-name {
        font-weight: 500;
        margin-bottom: 5px;
      }

      .content-description {
        opacity: 0.5;

        @media (max-width: 576px) {
          font-size: 14px;
        }
      }
    }

    &__bottom {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid var(--placeholder);
      grid-column: 1/3;

      display: flex;
      align-items: center;
      justify-content: space-between;

      b {
        display: block;
        font-weight: 600;
        font-size: 1.15rem;
      }
    }

    .remove-button {
      margin: 0px;
      padding: 0px;
      background: none;
      border: none;
      font: inherit;
      cursor: pointer;
      position: absolute;
      top: 16px;
      right: 24px;
      width: 16px;
      height: 16px;

      svg path {
        fill: var(--text-color);
      }
    }
  }
}
</style>
