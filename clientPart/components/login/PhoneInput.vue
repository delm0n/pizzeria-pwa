<template>
  <label class="pizza-input">
    <span> Телефон:</span>
    <div class="input-container">
      <input
        name="phone"
        type="text"
        v-mask="'+7 (###) ###-##-##'"
        v-model="storeClient.client.Telephone"
        autocomplete="off"
        required
        :disabled="!edit"
      />
    </div>
  </label>
</template>

<script setup lang="ts">
const storeClient = useClientStore();

const props = withDefaults(
  defineProps<{
    edit?: boolean;
  }>(),
  {
    edit: true,
  }
);
</script>
