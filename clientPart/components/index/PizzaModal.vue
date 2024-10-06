<template>
  <Teleport to="#teleports">
    <modal-settings class="pizza-modal" v-if="!!storeModal.pizzaModal">
      <div class="pizza-modal__img" v-if="viewport.isGreaterOrEquals('tablet')">
        <nuxt-picture
          format="avif,webp"
          sizes="xl:100vw lg:100vw md:100vw sm:100vw"
          :src="'/images/pizzas/' + storeModal.pizzaModal.UrlImg + '.png'"
        />
      </div>

      <div class="pizza-modal__content">
        <div class="content-scroll">
          <div class="content-scroll__container">
            <div v-if="viewport.isLessThan('tablet')" class="pizza-modal__img">
              <nuxt-picture
                format="avif,webp"
                sizes="xl:100vw lg:100vw md:100vw sm:100vw"
                :src="'/images/pizzas/' + storeModal.pizzaModal.UrlImg + '.png'"
              />
            </div>

            <h4 v-text="'Пицца «' + storeModal.pizzaModal.PizzaName + '»'"></h4>

            <p
              class="content-description"
              v-html="
                storePizza.getPizzaSizeDescription(
                  storeModal.pizzaModal.PizzaId,
                  storeModal.pizzaModal.PizzaSizes.find(
                    (element) => element.Active
                  ).PizzaSizeId
                )
              "
            ></p>

            <p
              class="content-structure"
              v-html="storeModal.pizzaModal.Structure"
            ></p>

            <pizza-modal-toggle-size />

            <p class="content-ingredients__title">Добавить к пицце</p>
            <pizza-modal-ingredients />
          </div>
        </div>
        <div class="content-bottom">
          <count-calculate
            v-if="viewport.isGreaterOrEquals('mobileMedium')"
            :count="storeModal.pizzaCountModal"
            :isRemove="false"
            @increment="(i) => storeModal.setPizzaCountModal(i)"
            @decrement="(i) => storeModal.setPizzaCountModal(i)"
          />

          <button @click="addToCart" class="main-button">
            В корзину за {{ storeModal.getLastPriceModal }} ₽
          </button>
        </div>
      </div>
    </modal-settings>
  </Teleport>
</template>

<script lang="ts" setup>
import ModalSettings from "../UI/ModalSettings.vue";
import CountCalculate from "../UI/CountCalculate.vue";
import PizzaModalToggleSize from "./PizzaModalToggleSize.vue";
import PizzaModalIngredients from "./PizzaModalIngredients.vue";
import { defineEmits } from "vue";
import { IPizzaCart } from "~/config/pizza";

const storeModal = useModalStore();
const storePizza = usePizzaStore();
const storeCart = useCartStore();
const storeIngredient = useIngredientStore();

const viewport = useViewport();
defineEmits();

const addToCart = () => {
  let newPizza: IPizzaCart = {
    PizzaId: storeModal.pizzaModal!.PizzaId,
    PizzaSizeId: storeModal.pizzaModal!.PizzaSizes.find((el) => el.Active)!
      .PizzaSizeId,
    IngredientsId: storeIngredient.ingredients
      .filter((el) => el.Active)
      .map((el) => el.IngredientId),
    Count: storeModal.pizzaCountModal,
  };

  storeCart.addPizzaCart(newPizza);
  storeModal.setModalVisible(false);
};
</script>

<style lang="scss">
.pizza-modal .modal-content {
  display: grid;
  grid-template-columns: 1fr 480px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr 420px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .pizza-modal__img {
    aspect-ratio: 1/1;
    max-width: 100%;
    width: 100%;
    flex-shrink: 0;
    padding-left: 12px;

    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 992px) {
      max-width: 340px;
    }

    @media (max-width: 768px) {
      margin: 20px auto 0;

      picture {
        justify-content: center;
        width: 100%;
      }
    }

    @media (max-width: 376px) {
      margin: 10px auto 0;
    }

    img {
      transition: all 0.3s;
      transform: scale(
        calc(0.8 + 0.1 * v-bind("storeModal.getActiveIndexPizzaSizesModal"))
      );
    }
  }

  .pizza-modal__content {
    align-self: stretch;
    padding: 10px 8px 10px 0;
    border-radius: 0 10px 10px 0;
    background: var(--background-secondary);

    @media (min-width: 769px) {
      margin-left: -12px;
    }

    .content-scroll {
      overflow: hidden;
      position: relative;
      max-height: 74vh;
      height: 460px;

      &__container {
        height: 100%;
        position: absolute;
        overflow-y: scroll;
        padding-right: 10px;
        padding-left: 12px;

        &::-webkit-scrollbar {
          width: 2px;
          background-color: var(--placeholder);
        }

        &::-webkit-scrollbar-track {
          background-color: var(--placeholder);
        }

        &::-webkit-scrollbar-thumb {
          background: var(--scrollbar-modal);
          cursor: pointer;
          z-index: 1;
        }
      }
    }

    h4 {
      font-size: 24px;
      font-weight: 700;
      margin: 20px 0 10px;

      @media (max-width: 768px) {
        margin-top: 0;
      }

      @media (max-width: 576px) {
        font-size: 20px;
      }
    }

    .content-description {
      margin-bottom: 10px;
      opacity: 0.4;
    }

    .content-structure {
      margin-bottom: 20px;

      @media (max-width: 576px) {
        font-size: 14px;
      }
    }

    .content-ingredients__title {
      font-weight: 600;
      font-size: 18px;
      margin-bottom: 10px;

      @media (max-width: 576px) {
        font-size: 16px;
      }
    }

    .content-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 10px 10px;

      .main-button {
        width: 100%;
        max-width: 220px;

        @media (max-width: 425px) {
          max-width: 100%;
        }
      }
    }
  }
}
</style>
