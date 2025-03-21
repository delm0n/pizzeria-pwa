<template>
  <div class="cheque-content">
    <div
      class="cheque-content__item"
      v-for="(cart, index) in pizzas"
      :key="index"
    >
      <p class="content-name">
        <span>
          Пицца {{ storePizza.getPizza(cart.PizzaId).PizzaName.toLowerCase() }},
          {{
            storePizza
              .getPizzaSize(cart.PizzaId, cart.PizzaSizeId)
              .NameSize.toLowerCase()
          }}
        </span>

        <span>
          {{ storePizza.getPizzaSize(cart.PizzaId, cart.PizzaSizeId).Price }}
          ₽
        </span>
      </p>

      <ul>
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
        <span> {{ storeCart.getPizzaPrice(cart) }} ₽ </span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const storePizza = usePizzaStore();
const storeCart = useCartStore();

const props = defineProps<{
  pizzas: IPizzaCart[];
}>();
</script>
