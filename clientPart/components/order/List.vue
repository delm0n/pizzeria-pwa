<template>
  <div class="order-list">
    <p class="order-list__title">Состав заказа</p>

    <div class="order-list__content">
      <div
        v-for="(cart, index) in storeCart.constructors"
        :key="index"
        class="order-list__item"
      >
        <p class="content-name">
          <span>
            {{ storeConstructor.getConstructorSizeDescription(cart) }}
          </span>

          <span class="content-name__price">
            {{ cart.Count }} *
            {{ storeCart.getConstructorPrice(cart) / cart.Count }}
            ₽
          </span>
        </p>
        <p class="content-description" v-if="!!cart.IngredientsId.length">
          <span
            v-for="(ingredient, idx) in storeCart.getPizzaIngredients(
              cart.IngredientsId
            )"
            :key="ingredient.IngredientId"
          >
            {{ ingredient.Name.toLowerCase()
            }}<template
              v-if="
                idx !=
                storeCart.getPizzaIngredients(cart.IngredientsId).length - 1
              "
              >,
            </template>
          </span>
        </p>
      </div>

      <div
        v-for="(pizza, index) in storeCart.pizzas"
        :key="index"
        class="order-list__item"
      >
        <p class="content-name">
          <span>
            {{ storePizza.getPizza(pizza.PizzaId).PizzaName }}
          </span>

          <span class="content-name__price">
            {{ pizza.Count }} *
            {{
              storePizza.getPizzaSize(pizza.PizzaId, pizza.PizzaSizeId).Price
            }}
            ₽
          </span>
        </p>
        <p class="content-ingredient" v-show="!!pizza.IngredientsId.length">
          +
          <span
            v-for="(ingredient, idx) in storeCart.getPizzaIngredients(
              pizza.IngredientsId
            )"
            :key="ingredient.IngredientId"
          >
            {{ ingredient.Name.toLowerCase()
            }}<template
              v-if="
                idx !=
                storeCart.getPizzaIngredients(pizza.IngredientsId).length - 1
              "
              >,
            </template>
          </span>
        </p>
        <p
          class="content-description"
          v-html="
            storePizza.getPizzaSizeDescription(
              pizza.PizzaId,
              pizza.PizzaSizeId,
              pizza.IngredientsId
            )
          "
        ></p>
      </div>

      <div
        v-for="dish in storeCart.getCartDishes"
        :key="dish.DishId"
        class="order-list__item"
      >
        <p class="content-name">
          <span>
            {{ dish.Name }}
          </span>

          <span class="content-name__price">
            {{ dish.Count }} *
            {{ dish.Price }}
            ₽
          </span>
        </p>

        <p class="content-description">
          {{ dish.Mass + storeDish.getUnit(dish.DishType) }}
        </p>
      </div>
    </div>

    <div class="order-list__offer">
      <div
        v-if="
          !!storePromocode.promocode &&
          !!storePromocode.promocode.Discount &&
          !storePromocode.promocodeFail
        "
        class="content-promocode"
      >
        {{ storePromocode.message }}
        <span class="accent">-{{ storePromocode.promocode.Discount }}%</span>
      </div>
      <div class="content-bonus">
        Начислим бонусов:
        <span class="accent"
          >{{ Math.floor(storeCart.getLastPrice / 20) }} ₽</span
        >
      </div>
      <div
        class="content-price"
        :style="
          !!storePromocode.promocode &&
          !!storePromocode.promocode.Discount &&
          !storePromocode.promocodeFail
            ? 'margin: 20px 0 0;'
            : ''
        "
      >
        Сумма заказа:
        <span class="accent">&nbsp;{{ storeCart.getLastPrice }} ₽</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const storeCart = useCartStore();
const storeDish = useDishStore();
const storePizza = usePizzaStore();
const storePromocode = usePromocodeStore();
const storeConstructor = useConstructorStore();
</script>

<style lang="scss">
.order-list {
  background: var(--background-secondary);
  box-shadow: var(--shadow) 0px 2px 15px -2px;
  transition: all 0.25s ease-out;
  border-radius: 10px;
  padding: 20px;
  position: sticky;
  top: 20px;

  .accent {
    color: var(--accent);
    font-weight: 500;
  }

  &__title {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 15px;
  }

  &__item {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &__content {
    padding: 15px 0;
    border-bottom: 1px solid var(--placeholder);
    border-top: 1px solid var(--placeholder);
  }

  .content-name {
    font-weight: 500;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    gap: 20px;

    &__price {
      white-space: nowrap;
    }
  }

  .content-description {
    opacity: 0.6;
    font-size: 14px;
  }

  .content-ingredient {
    opacity: 0.7;
    font-size: 14px;
  }

  &__offer {
    padding: 20px 0 0;
  }

  .content-bonus,
  .content-promocode,
  .content-price {
    font-size: 16px;
    margin-bottom: 5px;
  }

  .content-price {
    font-weight: 600;
    .accent {
      font-weight: 600;
    }
  }
}
</style>
