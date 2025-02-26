<template>
  <main class="account-main">
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
const storePromocode = usePromocodeStore();

const exitClient = () => {
  storeClient.setClientDefault();
  storePromocode.setPromocodeDefault();
  router.push("/");
};

onMounted(() => {
  if (storeClient.client == null) {
    router.push("/");
  }
});

watch(
  () => route.path,
  () => {
    if (storeClient.client == null) {
      router.push("/");
    }
  }
);
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
