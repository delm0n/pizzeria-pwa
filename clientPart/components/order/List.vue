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
            {{ storeCart.getPizzaPrice(pizza) }}
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

      <div
        v-if="storeOrder.isDeliveryPrice(storeCart.getLastPrice)"
        class="order-list__item"
      >
        <p class="content-name">
          <span style="display: flex; align-items: center; gap: 5px">
            Доставка
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 40 40"
              fill="none"
            >
              <g clip-path="url(#clip0_99_2)">
                <path
                  d="M30.21 23.7815C27.4298 23.7815 25.168 26.0433 25.168 28.8235C25.168 31.6038 27.4298 33.8656 30.21 33.8656C32.9907 33.8656 35.252 31.6038 35.252 28.8235C35.252 26.0433 32.9902 23.7815 30.21 23.7815ZM30.21 31.3445C28.8197 31.3445 27.689 30.2138 27.689 28.8235C27.689 27.4332 28.8197 26.3025 30.21 26.3025C31.6003 26.3025 32.731 27.4332 32.731 28.8235C32.731 30.2139 31.6003 31.3445 30.21 31.3445Z"
                  fill="#F4576D"
                />
                <path
                  d="M12.9834 23.7815C10.2032 23.7815 7.94141 26.0433 7.94141 28.8235C7.94141 31.6038 10.2032 33.8656 12.9834 33.8656C15.7637 33.8656 18.0255 31.6038 18.0255 28.8235C18.0255 26.0433 15.7637 23.7815 12.9834 23.7815ZM12.9834 31.3445C11.5931 31.3445 10.4624 30.2138 10.4624 28.8235C10.4624 27.4332 11.5931 26.3025 12.9834 26.3025C14.3734 26.3025 15.5045 27.4332 15.5045 28.8235C15.5045 30.2139 14.3737 31.3445 12.9834 31.3445Z"
                  fill="#F4576D"
                />
                <path
                  d="M33.605 9.34966C33.3907 8.92403 32.955 8.65552 32.4785 8.65552H25.8398V11.1765H31.7012L35.1335 18.0034L37.3865 16.8706L33.605 9.34966Z"
                  fill="#F4576D"
                />
                <path
                  d="M26.4284 27.605H16.8906V30.126H26.4284V27.605Z"
                  fill="#F4576D"
                />
                <path
                  d="M9.20144 27.605H4.83176C4.13551 27.605 3.57129 28.1693 3.57129 28.8654C3.57129 29.5617 4.13559 30.1259 4.83176 30.1259H9.20152C9.89777 30.1259 10.462 29.5616 10.462 28.8654C10.462 28.1692 9.89769 27.605 9.20144 27.605Z"
                  fill="#F4576D"
                />
                <path
                  d="M39.7351 19.8992L37.2557 16.7059C37.0175 16.3983 36.6499 16.2185 36.2604 16.2185H27.1007V7.39499C27.1007 6.69874 26.5364 6.13452 25.8402 6.13452H4.83176C4.13551 6.13452 3.57129 6.69882 3.57129 7.39499C3.57129 8.09116 4.13559 8.65546 4.83176 8.65546H24.5796V17.479C24.5796 18.1752 25.1439 18.7394 25.8401 18.7394H35.6431L37.4788 21.1041V27.605H33.9914C33.2951 27.605 32.7309 28.1693 32.7309 28.8655C32.7309 29.5617 33.2952 30.1259 33.9914 30.1259H38.7393C39.4355 30.1259 39.9997 29.5616 39.9998 28.8655V20.6723C39.9998 20.3925 39.9065 20.1202 39.7351 19.8992Z"
                  fill="#F4576D"
                />
                <path
                  d="M9.11742 21.2185H3.31906C2.62281 21.2185 2.05859 21.7828 2.05859 22.479C2.05859 23.1752 2.62289 23.7394 3.31906 23.7394H9.11734C9.81359 23.7394 10.3778 23.1751 10.3778 22.479C10.3779 21.7828 9.81359 21.2185 9.11742 21.2185Z"
                  fill="#F4576D"
                />
                <path
                  d="M12.0168 16.2605H1.26047C0.564297 16.2605 0 16.8248 0 17.521C0 18.2173 0.564297 18.7815 1.26047 18.7815H12.0168C12.713 18.7815 13.2773 18.2172 13.2773 17.521C13.2773 16.8249 12.713 16.2605 12.0168 16.2605Z"
                  fill="#F4576D"
                />
                <path
                  d="M14.0754 11.3025H3.31906C2.62281 11.3025 2.05859 11.8668 2.05859 12.563C2.05859 13.2592 2.62289 13.8234 3.31906 13.8234H14.0754C14.7716 13.8234 15.3359 13.2591 15.3359 12.563C15.3359 11.8668 14.7716 11.3025 14.0754 11.3025Z"
                  fill="#F4576D"
                />
              </g>
              <defs>
                <clipPath id="clip0_99_2">
                  <rect width="40" height="40" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>

          <span class="content-name__price"> 400 ₽ </span>
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
      <div v-if="storeClient.isAutorization" class="content-bonus">
        Начислим бонусов:
        <span class="accent"
          >{{ Math.floor(storeCart.getLastPrice / 20) }} ₽</span
        >
      </div>

      <div v-else class="content-bonus">
        <span
          style="cursor: pointer"
          class="accent"
          @click="storeModal.openModalEnter()"
          >Войдите</span
        >
        и начислим

        <span class="accent"
          >{{ Math.floor(storeCart.getLastPrice / 20) }} ₽</span
        >
        бонусами
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
        <span class="accent"
          >&nbsp;{{
            storeOrder.isDeliveryPrice(storeCart.getLastPrice)
              ? storeCart.getLastPrice + 400
              : storeCart.getLastPrice
          }}
          ₽</span
        >
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
const storeClient = useClientStore();
const storeModal = useModalStore();
const storeOrder = useOrderStore();
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
