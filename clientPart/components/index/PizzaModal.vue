<template>
  <Teleport to="#teleports">
    <modal-settings class="pizza-modal" v-if="!!storeModal.pizzaModal">
      <div class="pizza-modal__img" v-if="viewport.isGreaterOrEquals('tablet')">
        <NuxtImg
          placeholder="/images/pizzas/placeholder.svg"
          sizes="xl:100vw lg:100vw md:100vw sm:100vw"
          :src="'/images/pizzas/' + storeModal.pizzaModal.UrlImg + '.png'"
          :alt="'Пицца ' + storeModal.pizzaModal.PizzaName"
        />
      </div>

      <div class="pizza-modal__content">
        <div class="content-scroll">
          <div class="content-scroll__container">
            <div v-if="viewport.isLessThan('tablet')" class="pizza-modal__img">
              <NuxtImg
                placeholder="/images/pizzas/placeholder.svg"
                sizes="xl:100vw lg:100vw md:100vw sm:100vw"
                :src="'/images/pizzas/' + storeModal.pizzaModal.UrlImg + '.png'"
                :alt="'Пицца' + storeModal.pizzaModal.PizzaName"
              />
            </div>

            <h4 v-text="'Пицца «' + storeModal.pizzaModal.PizzaName + '»'"></h4>

            <p
              class="content-description"
              v-html="
                storePizza.getPizzaSizeDescription(
                  storeModal.pizzaModal.PizzaId,
                  storeModal.pizzaModal.PizzaSizes.find(
                    (element: IPizzaSize) => element.Active
                  ).PizzaSizeId,
                  storeIngredient.getActiveIndexArray
                )
              "
            ></p>

            <p
              class="content-structure"
              v-html="storeModal.pizzaModal.Structure"
            ></p>

            <size-toggle
              :activeIndex="storeModal.getActiveIndexPizzaSizesModal"
              :arrayToggle="storeModal.pizzaModal.PizzaSizes"
              @click-toggle="(i: number) => storeModal.setPizzaSizeModal(i)"
            />

            <p class="content-ingredients__title">Добавить к пицце</p>
            <pizza-modal-ingredients />
          </div>
        </div>
        <div class="content-bottom">
          <count-calculate
            v-if="viewport.isGreaterOrEquals('mobileMedium')"
            :count="storeModal.pizzaCountModal"
            :isRemove="false"
            @increment="(i: number) => storeModal.setPizzaCountModal(i)"
            @decrement="(i: number) => storeModal.setPizzaCountModal(i)"
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
import SizeToggle from "../UI/SizeToggle.vue";
import PizzaModalIngredients from "./PizzaModalIngredients.vue";
import { defineEmits } from "vue";

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
    IngredientsId: storeIngredient.getActiveIndexArray,
    Count: storeModal.pizzaCountModal,
  };

  if (storeModal.isEdit) {
    storeCart.editPizzaCart(newPizza, storeModal.isEditIndex);
  } else {
    storeCart.addPizzaCart(newPizza);
  }

  storeModal.setModalVisible(false);
};
</script>

<style lang="scss">
.pizza-modal {
  .pizza-modal__img img {
    transform: scale(
      calc(0.8 + 0.1 * v-bind("storeModal.getActiveIndexPizzaSizesModal"))
    );
  }
}
</style>
