<template>
  <section class="order-personal">
    <phone-input :edit="false" />
    <name-input />
    <label class="pizza-input">
      <span> Ваш адрес:</span>
      <div class="input-container">
        <textarea name="address" type="text" autocomplete="off" rows="5" />
      </div>
    </label>
  </section>
</template>

<script setup lang="ts">
import PhoneInput from "~/components/login/PhoneInput.vue";
import NameInput from "~/components/login/NameInput.vue";
</script>

<style lang="scss">
.order-personal {
  //   margin-bottom: 80px;
  //   max-width: 400px;

  //   @media (max-width: 768px) {
  //     margin-bottom: 40px;
  //   }
}
</style>
