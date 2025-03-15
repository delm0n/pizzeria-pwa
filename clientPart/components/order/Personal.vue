<template>
  <section id="order-personal" class="order-personal">
    <div class="input-row">
      <label class="pizza-input">
        <span> Имя:</span>
        <div class="input-container">
          <input
            name="name"
            type="text"
            v-model="orderStore.orderName"
            autocomplete="off"
            maxlength="20"
            required
          />
        </div>
      </label>

      <label class="pizza-input">
        <span> Телефон:</span>
        <div class="input-container">
          <input
            name="phone"
            type="text"
            v-mask="'+7 (###) ###-##-##'"
            v-model="orderStore.orderTelephone"
            autocomplete="off"
            required
          />
        </div>
      </label>
    </div>

    <toggle
      id="order-address"
      class="address-array-toggle"
      :activeIndex="orderStore.getToggleActiveIndex(orderStore.address)"
      :arrayToggle="orderStore.address"
      @click-toggle="(i: number) => orderStore.setToggleElement(orderStore.address, i)"
    />
  </section>
</template>

<script setup lang="ts">
import Toggle from "~/components/UI/Toggle.vue";
const orderStore = useOrderStore();
</script>

<style lang="scss">
.order-personal {
  .address-array-toggle {
    margin: 10px 0;
    max-width: 560px;
    height: 48px;
    @media (max-width: 1200px) {
      margin: 30px 0;
    }
    @media (max-width: 992px) {
      max-width: 100%;
    }
    @media (max-width: 576px) {
      height: 41px;
      margin: 20px 0;
    }
  }
}
</style>
