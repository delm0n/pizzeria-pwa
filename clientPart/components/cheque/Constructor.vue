<template>
  <div class="cheque-content">
    <div
      class="cheque-content__item"
      v-for="(cart, index) in constructors"
      :key="index"
    >
      <p class="content-name">
        <span>
          Конструктор пиццы,
          {{
            storeConstructor
              .getConstructorById(cart.PizzaId)
              .NameSize.toLowerCase()
          }}
        </span>

        <span>
          {{ storeConstructor.getConstructorById(cart.PizzaId).Price }} ₽
        </span>
      </p>

      <ul>
        <li>
          <span>{{ storeDish.getDishById(cart.SauceId).Name }} (основание)</span
          ><span>{{ storeDish.getDishById(cart.SauceId).Price }} ₽</span>
        </li>
        <li
          v-for="ingredient in storeCart.getPizzaIngredients(
            cart.IngredientsId
          )"
          :key="ingredient.IngredientId"
        >
          <span>{{ ingredient.Name }}</span
          ><span>{{ ingredient.Price }} ₽</span>
        </li>
      </ul>

      <p class="content-count">
        <span> {{ cart.Count }} шт. </span>
        <span> {{ storeCart.getConstructorPrice(cart) }} ₽ </span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const storeCart = useCartStore();
const storeConstructor = useConstructorStore();
const storeDish = useDishStore();

const props = defineProps<{
  constructors: IPizzaConstructorCart[];
}>();
</script>
