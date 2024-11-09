<template>
  <section class="addish-cart">
    <transition-group name="expand" @after-enter="afterEnter" @leave="leave">
      <div
        v-for="dish in storeCart.getCartDishes"
        :key="dish.DishId"
        class="addish-cart__container"
      >
        <article class="container addish-item">
          <button
            aria-label="Удалить"
            class="remove-button"
            @click="storeDish.setDishCount(dish.DishId, 0)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#000"
                d="M17.3 5.3a1 1 0 1 1 1.4 1.4L13.42 12l5.3 5.3a1 1 0 1 1-1.42 1.4L12 13.42l-5.3 5.3a1 1 0 0 1-1.4-1.42l5.28-5.3-5.3-5.3A1 1 0 0 1 6.7 5.3l5.3 5.28 5.3-5.3Z"
              ></path>
            </svg>
          </button>

          <div class="addish-item__img">
            <NuxtPicture
              format="avif,webp"
              sizes="90px"
              :src="'/images/dishes/' + dish.UrlImg + '.png'"
            />
          </div>

          <div class="addish-item__content">
            <p class="content-name" v-html="dish.Name"></p>

            <p class="content-description">
              {{ dish.Mass + storeDish.getUnit(dish.DishType) }}
            </p>
          </div>

          <div class="addish-item__bottom">
            <b class="price"> {{ dish.Price * dish.Count }} ₽ </b>

            <count-calculate
              :count="dish.Count"
              @increment="(i) => storeDish.setDishCount(dish.DishId, i)"
              @decrement="(i) => storeDish.setDishCount(dish.DishId, i)"
              @remove="storeDish.setDishCount(dish.DishId, 0)"
            />
          </div>
        </article>
      </div>
    </transition-group>
  </section>
</template>

<script setup lang="ts">
import CountCalculate from "../UI/CountCalculate.vue";
import { afterEnter, leave } from "@/utils/animationCart";

const storeCart = useCartStore();
const storeDish = useDishStore();
</script>
