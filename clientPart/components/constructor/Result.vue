<template>
  <div class="constructor-result">
    <div class="constructor-result__container">
      <button
        aria-label="Очистить"
        @click="reset()"
        class="update-icon result-reset"
      >
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
        sizes="500px"
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
            sizes="500px"
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
            sizes="500px"
            :src="'/images/constructor/' + item.UrlImg + '.png'"
            :alt="item.Name"
          />
        </div>
      </transition-group>
    </div>

    <toggle
      :activeIndex="storeConstructor.getActiveIndex"
      :arrayToggle="storeConstructor.pizzas"
      @click-toggle="(i: number) => storeConstructor.setPizzaSize(i)"
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
        @increment="(i: number) => storeConstructor.setConstructorCount(i)"
        @decrement="(i: number) => storeConstructor.setConstructorCount(i)"
      />
    </div>
    <button
      :disabled="!storeConstructor.ingredientMinValidate"
      @click="addToCart"
      class="main-button"
    >
      <transition-group>
        <span v-show="storeConstructor.ingredientMinValidate">
          В корзину за {{ storeConstructor.getConstructorPrice }} ₽
        </span>
        <span v-show="!storeConstructor.ingredientMinValidate">
          мин. 3 ингредиента
        </span>
      </transition-group>
    </button>
  </div>
</template>

<script setup lang="ts">
import Toggle from "../UI/Toggle.vue";
import CountCalculate from "../UI/CountCalculate.vue";

const router = useRouter();
const storeIngredient = useIngredientStore();
const storeConstructor = useConstructorStore();
const storeCart = useCartStore();

const reset = () => {
  storeIngredient.setIngredientsFalse();
  storeConstructor.setSauceById(storeConstructor.sauceArray[0].DishId);
  storeConstructor.setConstructorCount(1);
};

const addToCart = () => {
  let sauce = storeConstructor.sauceArray.find((el) => el.Count == 1);
  let newPizza: IPizzaConstructorCart = {
    PizzaId: storeConstructor.getActiveId,
    IngredientsId: storeIngredient.getActiveIndexArray,
    Count: storeConstructor.count,
    SauceId: !!sauce ? sauce.DishId : storeConstructor.sauceArray[0].DishId,
  };

  router.push("/cart");
  if (storeConstructor.isEdit) {
    storeCart.editConstructorCart(newPizza, storeConstructor.isEditIndex);
  } else {
    storeCart.addConstructorCart(newPizza);
  }

  setTimeout(() => {
    reset();
    storeConstructor.isEditIndex = -1;
  }, 200);
};
</script>
