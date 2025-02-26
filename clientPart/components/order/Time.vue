<template>
  <section class="order-time">
    <h2>Время доставки</h2>
  </section>
</template>

<script setup lang="ts">
const orderStore = useOrderStore();
</script>

<style lang="scss">
.order-time {
  margin-top: 50px;
  @media (max-width: 576px) {
    margin-top: 30px;
  }

  .time-array-toggle {
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
