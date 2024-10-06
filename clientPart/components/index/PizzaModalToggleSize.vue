<template>
  <div class="toggle-wrapper">
    <div
      class="toggle-wrapper-bg"
      :data-test="storeModal.getActiveIndexPizzaSizesModal"
      :style="
        'transform: translateX(' +
        storeModal.getActiveIndexPizzaSizesModal * 100 +
        '%)'
      "
    ></div>
    <div
      v-for="(size, index) in storeModal.pizzaModal.PizzaSizes"
      :key="size.PizzaSizeId"
      @click="storeModal.setPizzaSizeModal(index)"
      :class="['toggle-item', size.Active ? 'toggle-item--active' : '']"
    >
      <p v-html="size.NameSize"></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const storeModal = useModalStore();
</script>

<style lang="scss">
.toggle-wrapper {
  display: flex;
  align-items: center;
  background: var(--placeholder);
  position: relative;
  border-radius: 10px;
  margin-bottom: 20px;

  &-bg {
    background: var(--placeholder-button);
    width: calc(33.3333%);
    position: absolute;
    box-shadow: 0 0.5rem 1rem var(--shadow);
    border-radius: 10px;
    height: 100%;
    transition: transform 300ms ease-out;
  }

  .toggle-item {
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 34px;
    flex: 1 1 0%;
    position: relative;
    cursor: pointer;

    transition: color 200ms ease-out;

    p {
      font-weight: 500;
      user-select: none;

      @media (max-width: 576px) {
        font-size: 14px;
      }

      @media (max-width: 375px) {
        font-size: 12px;
      }
    }

    &--active {
      p {
        color: var(--accent);
        font-weight: 600;
      }
    }
  }
}
</style>
