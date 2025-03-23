<script setup lang="ts">
import ChequePizza from "~/components/cheque/Pizza.vue";
import ChequeDish from "~/components/cheque/Dish.vue";
import ChequeConstructor from "~/components/cheque/Constructor.vue";
import CartIcon from "~/components/UI/CartIcon.vue";

const storeOrder = useOrderStore();
const storeCart = useCartStore();
const storeClient = useClientStore();
const storeDish = useDishStore();

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const cheque = computed(() => {
  return storeOrder.getOrderById(id);
});

const buttonState = ref(false);
const addToCart = (id: number) => {
  storeOrder.getOrderPizzaDetailsById(id).forEach((element) => {
    storeCart.addPizzaCart(element);
  });

  storeOrder.getOrderConstructorDetailsById(id).forEach((element) => {
    storeCart.addConstructorCart(element);
  });

  storeOrder.getOrderDishDetailsById(id).forEach((element) => {
    storeDish.setDishCount(element.DishId, element.Count);
  });

  buttonState.value = true;
};

onMounted(() => {
  if (!storeClient.isAutorization || cheque == null) {
    router.push("/");
  }
});

watch(
  () => route.path,
  () => {
    if (!storeClient.isAutorization || cheque == null) {
      router.push("/");
    }
  }
);
</script>

<template>
  <main class="cheque">
    <div class="container-small" v-if="cheque !== null">
      <div class="cheque-title">
        <h2>Заказ №{{ cheque.OrderId }}</h2>
        <p class="cheque-date">от {{ cheque.OrderDate }}</p>
      </div>

      <p>Получатель: {{ cheque.OrderTelephone }}</p>

      <p>
        {{ storeOrder.getOrderAddressById(cheque.OrderId) }}
      </p>

      <cheque-constructor
        :constructors="
          storeOrder.getOrderConstructorDetailsById(cheque.OrderId)
        "
      />
      <cheque-pizza
        :pizzas="storeOrder.getOrderPizzaDetailsById(cheque.OrderId)"
      />
      <cheque-dish
        :dishes="storeOrder.getOrderDishDetailsById(cheque.OrderId)"
      />

      <div class="cheque-content accent-box" v-if="cheque.Bonus < 0">
        <div class="cheque-content__item">
          <p class="content-name">
            <span>Оплата бонусами</span><span>{{ cheque.Bonus }} ₽</span>
          </p>
        </div>
      </div>

      <div
        class="cheque-content"
        v-if="!!cheque.PromocodeId && !!storeOrder.orderPromocodeDiscount"
      >
        <div class="cheque-content__item accent-box">
          <p class="content-name">
            <span>Промокод</span
            ><span>-{{ storeOrder.orderPromocodeDiscount }}%</span>
          </p>
        </div>
      </div>

      <div
        class="cheque-content"
        v-if="storeOrder.wasDeliveryPrice(cheque.OrderId)"
      >
        <div class="cheque-content__item">
          <p class="content-name"><span>Доставка</span><span>400 ₽</span></p>
        </div>
      </div>

      <div class="cheque-box">
        <p class="cheque-price">
          <span> Итог:</span> <span>{{ cheque.LastPrice }} ₽</span>
        </p>
      </div>

      <div class="cheque-content accent-box" v-if="cheque.Bonus > 0">
        <div class="cheque-content__item">
          <p class="content-name">
            <span>Начислили бонусов</span><span>{{ cheque.Bonus }} ₽</span>
          </p>
        </div>
      </div>

      <div class="button-container">
        <button
          :disabled="buttonState"
          @click="addToCart(cheque.OrderId)"
          class="main-button"
        >
          {{ buttonState ? "Готово" : "Повторить заказ" }}
        </button>
      </div>
    </div>

    <cart-icon />
  </main>
</template>

<style lang="scss">
.cheque {
  position: relative;
  margin-bottom: 50px;

  .container-small {
    max-width: 580px;
  }

  span {
    display: block;
  }

  h2 {
    font-weight: 600;
    font-size: 28px;
    margin-bottom: 0;
  }

  .cheque-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0 20px;
    margin-bottom: 5px;
  }

  .cheque-date {
    color: var(--text-description);
  }

  .cheque-price {
    font-weight: 700;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .accent-box {
    color: var(--accent);
    font-weight: 500;
  }

  .cheque-box {
    padding: 10px 0;
    border-bottom: 1px solid var(--placeholder);
    border-top: 1px solid var(--placeholder);
    margin-top: 14px;
  }

  .cheque-content {
    margin-top: 15px;

    &__item {
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }

    .content-name,
    ul li,
    .content-count {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2px;

      span {
        &:last-child {
          flex-shrink: 0;
          margin-left: 10px;
        }
      }
    }

    ul {
      padding-left: 20px;
    }

    .content-count {
      font-weight: 500;
    }
  }

  .button-container {
    margin-top: 20px;

    button {
      width: max-content;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
