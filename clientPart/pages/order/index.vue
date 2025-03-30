<script setup lang="ts">
import Personal from "~/components/order/Personal.vue";
import Pay from "~/components/order/Pay.vue";
import TimeSection from "~/components/order/Time.vue";
import Delivery from "~/components/order/Delivery.vue";
import Pickup from "~/components/order/Pickup.vue";
import List from "~/components/order/List.vue";

const route = useRoute();
const router = useRouter();

const storeCart = useCartStore();
const storeDish = useDishStore();
const storeClient = useClientStore();
const storeBonus = useBonusStore();
const storeOrder = useOrderStore();
const storeCheque = useChequeStore();

const loading = ref(false);

const handleOrder = async () => {
  if (!storeOrder.invalidPersonal) {
    if (storeOrder.invalidAddress) {
      loading.value = true;

      try {
        const order = {
          ClientId: storeClient.client.ClientId,
          OrderName: storeOrder.orderName,
          OrderTelephone: storeOrder.orderTelephone,

          Time: storeOrder.orderTime,
          TypeOfPay: storeOrder.getTypeOfPay,

          PromocodeId: storeBonus.getValuePromocode,
          Bonus: storeBonus.getValueBonus,

          LastPrice: storeCart.getLastPrice,

          PizzasJson: storeCart.getPizzasJSON,
          ConstructorPizzasJson: storeCart.getConstructorPizzasJson,
          DishesJson: storeDish.getDishesJSON,

          Comment: storeOrder.orderComment,
          Address: storeOrder.getAddressJSON,
          Pickup: storeOrder.getPickupJSON,
          DeliveryPrice: price.value,
        };

        const response = await fetch("http://localhost:1234/send-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        });

        const orderResp: IOrder = await response.json();

        //уведомления об изменении статуса заказа
        storeCheque.startOrderStatus(orderResp);

        if (storeClient.isAutorization) {
          if (storeBonus.getValueBonus < 0) {
            // вычитание бонусов
            storeClient.client.Bonus =
              storeClient.client.Bonus + storeBonus.getValueBonus;
          }
        }

        setDefaultOrder();
      } catch (err) {
        console.log(err);
      } finally {
        loading.value = false;
      }
    } else {
      scrollTo("order-address");
    }
  } else {
    scrollTo("order-personal");
  }
};

const scrollTo = (targetId: string) => {
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const price = computed(() => {
  if (storeCart.getLastPrice < 1000 && storeOrder.isDelivery) {
    return storeOrder.priceDelivery;
  } else {
    return 0;
  }
});

const setDefaultOrder = () => {
  // установка всего по умолчанию
  router.push("/");
  storeCart.pizzas = [];
  storeCart.constructors = [];
  storeDish.setDishDefault();
  storeBonus.setPromocodeDefault();
  storeBonus.bonus = false;
  storeOrder.setOrderDefault();
};

onMounted(() => {
  if (storeCart.getLastPrice <= 0) {
    router.push("/");
  }
});
watch(
  () => route.path,
  () => {
    if (storeCart.getLastPrice <= 0) {
      router.push("/");
    }
  }
);
</script>

<template>
  <main class="order-main">
    <div class="container">
      <h2>Оформление заказа</h2>

      <div class="order-main__wrapper">
        <div class="input-container">
          <personal />
          <delivery v-show="storeOrder.isDelivery" />

          <pickup v-show="storeOrder.address[1].Active" />

          <pay />
          <time-section />
          <div class="button-row">
            <NuxtLink class="back-button" to="/cart"> Назад в корзину</NuxtLink>
            <button
              :disabled="loading"
              @click="handleOrder()"
              class="main-button loading"
            >
              Оформить заказ за
              {{ price + storeCart.getLastPrice }}
              ₽
            </button>
          </div>
        </div>

        <div class="list-container">
          <list />
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.order-main {
  margin-bottom: 100px;
  @media (max-width: 768px) {
    margin-bottom: 50px;
  }

  .container {
    max-width: 1220px;
    margin-top: 50px;

    @media (max-width: 992px) {
      max-width: 820px;
    }

    @media (max-width: 576px) {
      margin-top: 0;
    }
  }

  .input-row {
    display: flex;

    @media (max-width: 1200px) {
      flex-direction: column;
    }

    .pizza-input {
      flex-grow: 1;

      &:not(:last-child) {
        margin-right: 20px;

        @media (max-width: 1200px) {
          margin: 0 0 20px !important;
        }

        @media (max-width: 576px) {
          margin: 0 0 10px !important;
        }
      }
    }
  }

  &__wrapper {
    display: flex;
    align-items: stretch;

    @media (max-width: 992px) {
      flex-direction: column-reverse;
    }

    .input-container {
      flex-grow: 1;
    }

    .list-container {
      max-width: 420px;
      margin-left: 40px;
      width: 100%;

      @media (max-width: 1200px) {
        max-width: 380px;
      }

      @media (max-width: 992px) {
        max-width: 100%;
        margin: 0 0 30px;
      }
    }
  }

  .button-row {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 50px;

    .back-button {
      display: block;
      color: var(--text-description);
      opacity: 0.9;

      @media (max-width: 576px) {
        display: none;
      }
    }

    .main-button {
      max-width: 300px;
      height: 50px;
    }
  }
}
</style>
