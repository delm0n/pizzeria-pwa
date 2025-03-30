<template>
  <div class="cheque" v-if="cheque !== null">
    <div
      v-if="
        activeOrder !== null &&
        cheque.Status != 'Доставлен' &&
        cheque.Status != 'Отменён'
      "
      class="cheque-cancel"
    >
      <div v-if="activeOrder.timer > 0">
        <p>Осталось времени: {{ formattedTimeLeft(activeOrder.timer) }}</p>
        <p class="p-button" @click="storeCheque.cancelOrder(activeOrder.num)">
          Отменить заказ
        </p>
      </div>

      <p v-else>Время на отмену истекло.</p>
    </div>

    <div class="cheque-title">
      <h2>
        Заказ №{{ cheque.OrderId }}
        <span>({{ cheque.Status.toLocaleLowerCase() }})</span>
      </h2>
      <p class="cheque-date">от {{ cheque.OrderDate }}</p>
    </div>

    <p>Получатель: {{ cheque.OrderTelephone }}</p>
    <p>
      {{ detali.address }}
    </p>

    <cheque-constructor :constructors="detali.constructorPizzas" />
    <cheque-pizza :pizzas="detali.pizzas" />
    <cheque-dish :dishes="detali.dishes" />

    <div
      class="cheque-content accent-box"
      v-if="cheque.Bonus < 0 && cheque.Status != 'Отменён'"
    >
      <div class="cheque-content__item">
        <p class="content-name">
          <span>Оплата бонусами</span><span>{{ cheque.Bonus }} ₽</span>
        </p>
      </div>
    </div>

    <div
      class="cheque-content"
      v-if="!!cheque.PromocodeId && !!storeCheque.orderPromocodeDiscount"
    >
      <div class="cheque-content__item accent-box">
        <p class="content-name">
          <span>Промокод</span
          ><span>-{{ storeCheque.orderPromocodeDiscount }}%</span>
        </p>
      </div>
    </div>

    <div v-if="!!cheque.Address" class="cheque-content">
      <div class="cheque-content__item">
        <p class="content-name">
          <span>Доставка</span><span>{{ cheque.DeliveryPrice }} ₽</span>
        </p>
      </div>
    </div>

    <div class="cheque-box">
      <p class="cheque-price">
        <span> Итог:</span>
        <span>{{ cheque.LastPrice + cheque.DeliveryPrice }} ₽</span>
      </p>
    </div>

    <div
      class="cheque-content accent-box"
      v-if="cheque.Bonus > 0 && cheque.Status != 'Отменён'"
    >
      <div class="cheque-content__item">
        <p class="content-name">
          <span>Начислили бонусов</span><span>{{ cheque.Bonus }} ₽</span>
        </p>
      </div>
    </div>

    <div class="button-container">
      <button :disabled="buttonState" @click="addToCart()" class="main-button">
        {{ buttonState ? "Готово" : "Повторить заказ" }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChequePizza from "~/components/cheque/Pizza.vue";
import ChequeDish from "~/components/cheque/Dish.vue";
import ChequeConstructor from "~/components/cheque/Constructor.vue";

const storeDish = useDishStore();
const storeCart = useCartStore();
const storeCheque = useChequeStore();

const detali = computed(() => {
  return storeCheque.getChequeDetailsById(props.cheque.OrderId);
});

const props = defineProps<{
  cheque: IOrder;
}>();

const activeOrder = computed(() => {
  return storeCheque.getChequeById(props.cheque.OrderId);
});

const buttonState = ref(false);

const addToCart = () => {
  detali.value.pizzas.forEach((element) => {
    storeCart.addPizzaCart(element);
  });

  detali.value.constructorPizzas.forEach((element) => {
    storeCart.addConstructorCart(element);
  });

  detali.value.dishes.forEach((element) => {
    storeDish.setDishCount(element.DishId, element.Count);
  });

  buttonState.value = true;
};

const formattedTimeLeft = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};
</script>
