<template>
  <div class="cheque-content">
    <div
      class="cheque-content__item"
      v-for="(cart, index) in dishes"
      :key="index"
    >
      <p class="content-name">
        <span>
          {{ storeDish.getDishById(cart.DishId).Name }}, {{ cart.Count }} шт.
        </span>

        <span>
          {{ storeDish.getDishById(cart.DishId).Price * cart.Count }}
          ₽
        </span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const storeDish = useDishStore();
const props = defineProps<{
  dishes: IDishCart[];
}>();
</script>

<style lang="scss" scoped>
.cheque-content {
  &__item {
    margin-bottom: 2px !important;
  }
}
</style>
