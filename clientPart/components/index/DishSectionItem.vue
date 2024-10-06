div
<template>
  <article class="addish-item" v-if="!!dish">
    <div class="addish-item__img">
      <nuxt-picture
        format="avif,webp"
        sizes="xl:100vw lg:100vw md:100vw sm:100vw"
        :src="'/images/dishes/' + dish.UrlImg + '.png'"
        loading="lazy"
      />
    </div>

    <div class="addish-item__content">
      <div class="content-title">
        <h3 v-html="dish.Name"></h3>
      </div>

      <div class="content-description">
        <p v-html="dish.Mass + storeDish.getUnit(dish.DishType)"></p>
      </div>

      <div class="content-structure">
        <p v-html="dish.Structure"></p>
      </div>

      <div class="content-bottom">
        <p class="price">{{ dish.Price }} ₽</p>
        <div :class="['button-box', dish.Count > 0 ? 'active' : '']">
          <div class="button-box__wrapper">
            <div class="button-box__front-text">
              <template v-if="viewport.isGreaterOrEquals('mobileMedium')">
                <button
                  @click="storeDish.setDishesById(dish.DishId)"
                  class="button"
                >
                  Выбрать
                </button>
              </template>

              <template v-else>
                <button
                  @click="storeDish.setDishesById(dish.DishId)"
                  class="button"
                >
                  за {{ dish.Price }} ₽
                </button>
              </template>
            </div>

            <div class="button-box__bottom-text">
              <count-calculate
                :count="dish.Count"
                @increment="(i) => storeDish.setDishCount(dish.DishId, i)"
                @decrement="(i) => storeDish.setDishCount(dish.DishId, i)"
                @remove="storeDish.setDishCount(dish.DishId, 0)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import CountCalculate from "../UI/CountCalculate.vue";

const viewport = useViewport();
const storeDish = useDishStore();

const props = defineProps<{
  dish: IDish;
}>();
</script>

<style lang="scss">
.button-box {
  position: relative;
  z-index: 1;
  display: inline-flex;
  line-height: 1;
  text-decoration: none;
  perspective: 1000px;

  @media (max-width: 425px) {
    flex-grow: 1;
  }

  &.active {
    .button-box__wrapper {
      transform: rotateX(90deg);
    }

    .button-box__front-text {
      opacity: 0;
    }

    .button-box__bottom-text {
      opacity: 1;
    }
  }

  &__wrapper {
    width: 100%;
    transform-origin: 50% 50%;
    transform-style: preserve-3d;
    will-change: transform;
    transition: transform 0.35s ease-in-out;
  }

  &__front-text {
    transition: all 0.2s 0.1s;
    width: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  &__bottom-text {
    transition: all 0.2s 0.1s;
    position: absolute;
    z-index: 1;
    top: 100%;
    right: 0;
    opacity: 0;
    transform: rotateX(-90deg);
    width: 100%;
  }
}
</style>
