<template>
  <main class="account-main">
    аккаунт

    {{ storeClient.client.Password }}
  </main>
</template>

<script setup lang="ts">
const storeClient = useClientStore();
</script>
