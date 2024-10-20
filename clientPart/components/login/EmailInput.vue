<template>
  <label class="pizza-input">
    <span> Почта:</span>
    <div class="input-container">
      <input
        name="email"
        type="email"
        v-model="storeClient.client.Email"
        autocomplete="off"
      />
    </div>
  </label>
</template>

<script setup lang="ts">
const storeClient = useClientStore();
</script>
