<script setup lang="ts">
import Personal from "~/components/order/Personal.vue";
import Pay from "~/components/order/Pay.vue";
import List from "~/components/order/List.vue";

const storeCart = useCartStore();
const storeDish = useDishStore();
const storeClient = useClientStore();
const storePromocode = usePromocodeStore();
const router = useRouter();
const loading = ref(false);
const storeOrder = useOrderStore();
const storeModal = useModalStore();

const handleOrder = async () => {
  loading.value = true;

  try {
    const response = await fetch("http://localhost:1234/send-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ClientId: storeClient.client.ClientId,
        TypeOfPay: "",
        LastPrice: storeCart.getLastPrice,
        Promocode: storePromocode.getValuePromocode,
        PizzasJson: storeCart.getPizzasJSON,
        ConstructorPizzasJson: storeCart.getConstructorPizzasJson,
        DishesJson: storeDish.getDishesJSON,
      }),
    });

    storeOrder.numberOrder = await response.json();
  } catch (err) {
    console.log(err);
  } finally {
    storeCart.pizzas = [];
    storeCart.constructors = [];
    storeDish.setDishDefault();
    storePromocode.setPromocodeDefault();
    storeOrder.loadData();

    loading.value = false;
    storeModal.openModalOrder();
    router.push("/");
  }
};

onMounted(() => {
  if (storeClient.client == null) {
    router.push("/");
  }
});
</script>

<template>
  <main class="order-main">
    <div class="container">
      <h2>Оформление заказа</h2>

      <div class="order-main__wrapper">
        <div class="input-container">
          <personal />
          <pay />

          <div class="button-row">
            <NuxtLink class="back-button" to="/cart"> Назад в корзину</NuxtLink>
            <button
              :disabled="loading"
              @click="handleOrder()"
              class="main-button loading"
            >
              Оформить заказ за {{ storeCart.getLastPrice }} ₽
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

  &__wrapper {
    display: flex;
    align-items: stretch;

    .input-container {
      flex-grow: 1;
    }

    .list-container {
      max-width: 420px;
      margin-left: 40px;
      width: 100%;
    }
  }

  .button-row {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 20px;

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
