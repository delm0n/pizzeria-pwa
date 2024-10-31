<template>
  <transition>
    <div v-show="visible" class="warning">
      <div class="warning-continer">
        <div class="warning-item">
          <p>Вы выбрали максимальное количество допов!</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
const props = defineProps<{
  visible: boolean;
}>();
</script>

<style lang="scss">
.warning {
  position: fixed;
  top: 50%;
  transform: translate(-50%, -25%);
  left: 50%;
  z-index: 10;
  pointer-events: none;

  .warning-continer {
    overflow: hidden;
    max-width: 265px;
    width: 100%;
    transition: all 0.3s 0.1s;
    display: block;

    &:not(:last-child) .warning-item {
      margin-bottom: 20px;
    }
  }

  .warning-item {
    background: var(--background-vs-opacity);
    color: var(--background);
    border-radius: 5px;
    padding: 15px;

    @media (max-width: 426px) {
      padding: 10px;
    }

    p {
      font-weight: 500;
      font-size: 16px;

      @media (max-width: 576px) {
        font-size: 14px;
      }
    }
  }
}
</style>
