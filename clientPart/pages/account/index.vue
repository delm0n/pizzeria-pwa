<template>
  <main class="account-main">
    <div class="container-small">
      <personal />
      <history />
    </div>

    <cart-icon />
  </main>
</template>

<script setup lang="ts">
import Personal from "~/components/account/Personal.vue";
import History from "~/components/account/History.vue";
import CartIcon from "~/components/UI/CartIcon.vue";
const router = useRouter();
const storeClient = useClientStore();
onMounted(() => {
  if (storeClient.client == null) {
    router.push("/");
  }
});
</script>

<style lang="scss">
.account-main {
  position: relative;
  margin-bottom: 100px;
  @media (max-width: 768px) {
    margin-bottom: 50px;
  }
}
</style>
