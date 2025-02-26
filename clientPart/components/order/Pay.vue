<template>
  <section class="order-pay">
    <h2>Способ оплаты</h2>

    <size-toggle
      class="pay-array-toggle"
      :activeIndex="orderStore.getToggleActiveIndex(orderStore.pay)"
      :arrayToggle="orderStore.pay"
      @click-toggle="(i: number) => orderStore.setToggleElement(orderStore.pay, i)"
    />
  </section>
</template>

<script setup lang="ts">
import SizeToggle from "~/components/UI/SizeToggle.vue";
const orderStore = useOrderStore();
</script>

<style lang="scss">
.order-pay {
  margin-top: 50px;
  @media (max-width: 576px) {
    margin-top: 30px;
  }

  .pay-array-toggle {
    max-width: 560px;
    height: 48px;

    @media (max-width: 992px) {
      max-width: 100%;
    }
    @media (max-width: 576px) {
      height: 41px;
    }
  }
}
</style>
