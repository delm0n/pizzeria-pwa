<template>
  <main class="account-main">
    <component
      v-if="Recommendation && storePizza.getPizzasByClient.length > 0"
      :is="Recommendation"
    />

    <div class="container-small">
      <personal />
      <history />

      <div class="button-container">
        <button @click="exitClient()" class="main-button">
          <span>Выйти</span>
        </button>
      </div>
    </div>

    <cart-icon />
  </main>
</template>

<script setup lang="ts">
import Personal from "~/components/account/Personal.vue";
import History from "~/components/account/History.vue";
import CartIcon from "~/components/UI/CartIcon.vue";
const router = useRouter();
const route = useRoute();

const storeClient = useClientStore();
const storeBonus = useBonusStore();
const storePizza = usePizzaStore();
const storeOrder = useOrderStore();
const storeCheque = useChequeStore();

const exitClient = () => {
  storeClient.setClientDefault();
  storeBonus.setPromocodeDefault();
  storeBonus.bonus = false;
  storeOrder.setOrderDefault();
  router.push("/");
  storeCheque.setChequeDefault();
};

onMounted(() => {
  if (!storeClient.isAutorization) {
    router.push("/");
  }
});

watch(
  () => route.path,
  () => {
    if (!storeClient.isAutorization) {
      router.push("/");
    }
  }
);

const Recommendation = ref<null | any>(null);
Recommendation.value = defineAsyncComponent({
  loader: () => import("~/components/account/Recommendation.vue"),
  delay: 500,
  timeout: 3000,
});

defineOptions({
  name: "AccountPage", // Указываем уникальное имя
});
</script>

<style lang="scss">
.account-main {
  position: relative;
  margin-bottom: 100px;
  @media (max-width: 768px) {
    margin-bottom: 50px;
  }

  .button-container {
    margin-top: 80px;
    button {
      max-width: 130px;
    }
  }
}
</style>
