<template>
  <label class="pizza-input">
    <span> Ваше имя:</span>
    <div class="input-container">
      <input
        name="name"
        type="text"
        v-model="storeClient.client.FirstName"
        autocomplete="off"
        required
      />
    </div>
  </label>
</template>

<script setup lang="ts">
const storeClient = useClientStore();
</script>
