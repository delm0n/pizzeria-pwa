<template>
  <section class="cart-pizza">
    <article
      v-for="(cart, index) in storeCart.pizzas"
      :key="cart.PizzaId"
      class="pizza-item"
    >
      <button @click="storeCart.removePizzaCart(index)" class="remove-button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path
            fill="#000"
            d="M17.3 5.3a1 1 0 1 1 1.4 1.4L13.42 12l5.3 5.3a1 1 0 1 1-1.42 1.4L12 13.42l-5.3 5.3a1 1 0 0 1-1.4-1.42l5.28-5.3-5.3-5.3A1 1 0 0 1 6.7 5.3l5.3 5.28 5.3-5.3Z"
          ></path>
        </svg>
      </button>

      <div class="pizza-item__img">
        <nuxt-picture
          format="avif,webp"
          sizes="90px"
          :src="
            '/images/pizzas/' +
            storePizza.getPizza(cart.PizzaId).UrlImg +
            '.png'
          "
        />
      </div>

      <div class="pizza-item__content">
        <p
          class="content-name"
          v-html="storePizza.getPizza(cart.PizzaId).PizzaName"
        ></p>

        <p class="content-description">
          {{
            storePizza.getPizzaSizeDescription(cart.PizzaId, cart.PizzaSizeId)
          }}

          <br />
          <span
            v-for="ingredient in storeCart.getPizzaIngredients(
              cart.IngredientsId
            )"
            :key="ingredient.IngredientId"
          >
            +{{ ingredient.Name }}
          </span>
        </p>
      </div>

      <div class="pizza-item__bottom">
        <b class="price">
          {{ storeCart.getPrice(cart) }}
          ₽
        </b>

        <div class="bottom-controller">
          <p @click="storeModal.setModalCart(cart)" class="edit">Изменить</p>
          <count-calculate
            :count="cart.Count"
            @increment="(i) => storeCart.setPizzaCount(cart, i)"
            @decrement="(i) => storeCart.setPizzaCount(cart, i)"
            @remove="storeCart.removePizzaCart(index)"
          />
        </div>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import CountCalculate from "../UI/CountCalculate.vue";

const storeCart = useCartStore();
const storeModal = useModalStore();
const storePizza = usePizzaStore();
const storeIngredient = useIngredientStore();
</script>

<style lang="scss">
.cart-pizza {
  .pizza-item {
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

      .bottom-controller {
        display: flex;
        align-items: center;

        p.edit {
          color: var(--accent);
          margin-right: 15px;
          font-weight: 500;
          cursor: pointer;
        }
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
