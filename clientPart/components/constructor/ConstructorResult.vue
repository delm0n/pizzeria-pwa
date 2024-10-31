<template>
  <div class="constructor-result">
    <div class="constructor-result__container">
      <button @click="reset()" class="result-reset">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="41"
          height="41"
          viewBox="0 0 41 41"
          fill="none"
        >
          <path
            d="M4.49304 11.2188C7.69619 5.70636 13.6653 2 20.5 2C30.7173 2 39 10.2827 39 20.5C39 30.7173 30.7173 39 20.5 39C10.2827 39 2 30.7173 2 20.5"
            stroke="black"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.5625 11.25H4.3125V2"
            stroke="black"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <NuxtPicture
        format="avif,webp"
        sizes="xl:500px lg:500px md:420px sm:400px"
        :src="'/images/constructor/testo.png'"
        alt="Пицца"
      />

      <transition-group>
        <div
          v-for="item in storeConstructor.sauceArray"
          :key="item.DishId"
          v-show="item.Count"
          class="constructor-result__component sauce-img"
        >
          <NuxtPicture
            format="avif,webp"
            sizes="xl:500px lg:500px md:420px sm:400px"
            :src="'/images/constructor/' + item.UrlImg + '.png'"
            :alt="'соус' + item.Name"
          />
        </div>
      </transition-group>

      <transition-group>
        <div
          v-for="item in storeIngredient.ingredients"
          :key="item.IngredientId"
          v-show="item.Active"
          class="constructor-result__component"
        >
          <NuxtPicture
            format="avif,webp"
            sizes="xl:500px lg:500px md:500px sm:500px"
            :src="'/images/constructor/' + item.UrlImg + '.png'"
            :alt="item.Name"
          />
        </div>
      </transition-group>
    </div>

    <size-toggle
      :activeIndex="storeConstructor.getActiveIndex"
      :arrayToggle="storeConstructor.pizzas"
      @click-toggle="(i) => storeConstructor.setPizzaSize(i)"
    />

    <div class="result-description">
      Реальная пицца может отличаться от изображения на экране.
    </div>

    <div class="result-row">
      <p
        class="result-mass"
        v-html="storeConstructor.getConstructorMass + ' г'"
      ></p>

      <count-calculate
        :count="storeConstructor.count"
        :isRemove="false"
        @increment="(i) => storeConstructor.setConstructorCount(i)"
        @decrement="(i) => storeConstructor.setConstructorCount(i)"
      />
    </div>
    <button @click="addToCart" class="main-button">
      В корзину за {{ storeConstructor.getConstructorPrice }} ₽
    </button>
  </div>
</template>

<script setup lang="ts">
import SizeToggle from "../UI/SizeToggle.vue";
import CountCalculate from "../UI/CountCalculate.vue";

const storeIngredient = useIngredientStore();
const storeConstructor = useConstructorStore();
const storeCart = useCartStore();

const reset = () => {
  storeIngredient.setIngredientsFalse();
  storeConstructor.setSauceById(storeConstructor.sauceArray[0].DishId);
  storeConstructor.setConstructorCount(1);
};

const addToCart = () => {
  let newPizza: IPizzaConstructorCart = {
    PizzaId: storeConstructor.getActiveId,
    IngredientsId: storeIngredient.getActiveIndexArray,
    Count: storeConstructor.count,
    SauceId: storeConstructor.sauceArray.find((el) => el.Count == 1)!.DishId,
  };

  if (storeConstructor.isEdit) {
    storeCart.editConstructorCart(newPizza, storeConstructor.isEditIndex);
  } else {
    storeCart.addConstructorCart(newPizza);
  }

  reset();
  storeConstructor.isEditIndex = -1;
};
</script>

<style lang="scss">
.constructor-result {
  @media (max-width: 768px) {
    width: 90%;
    max-width: 520px;
    margin: 0 auto 20px;
  }

  .toggle-wrapper {
    max-width: 400px;
    margin: 0 auto 20px;
  }

  img {
    width: 100%;
  }

  &__component {
    position: absolute;
    top: 0;
    width: 100%;

    &.sauce-img img {
      opacity: 0.85;
    }
  }

  &__container {
    max-width: 420px;
    aspect-ratio: 1/1;
    width: 100%;
    position: relative;
    margin: 10px auto;
  }

  .result-description {
    font-size: 14px;
    text-align: center;
    margin-bottom: 20px;
  }

  .result-mass {
    font-size: 20px;
    font-weight: 500;
    text-align: center;
  }

  .main-button {
    margin: 20px auto 0;
    max-width: 220px;
    height: 42px;
  }

  .result-reset {
    display: flex;
    align-items: center;
    gap: 10px;
    position: absolute;
    top: 10px;
    right: 20px;
    height: 36px;
    font-size: 18px;
    border: 0;
    padding: 0;
    color: var(--accent);
    cursor: pointer;
    background-color: transparent;
    z-index: 10;
    font-weight: 600;

    svg {
      transition: all 0.6s;
      display: block;
      width: 20px;
      height: 20px;

      path {
        stroke: var(--accent);
        stroke-width: 4px;
      }
    }

    &:hover {
      svg {
        transform: rotate(-360deg);
      }
    }
  }

  .result-row {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-bottom: 20px;
    justify-content: center;
  }
}
</style>
