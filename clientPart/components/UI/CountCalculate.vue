<template>
  <div class="calculate-wrapper">
    <button aria-label="Уменьшить количество" @click="decrementCount">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        class="icon"
      >
        <rect width="10" height="2" y="4" fill="#454B54" rx="1"></rect>
      </svg>
    </button>

    <div class="calculate-wrapper__count">
      <p>{{ count }}</p>
    </div>

    <button aria-label="Увеличить количество" @click="incrementCount">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        class="icon"
      >
        <g fill="#454B54">
          <rect width="2" height="10" x="4" ry="1"></rect>
          <rect width="10" height="2" y="4" rx="1"></rect>
        </g>
      </svg>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from "vue";

const props = withDefaults(
  defineProps<{
    count: number;
    isRemove?: boolean;
  }>(),
  {
    isRemove: true,
  }
);

const emit = defineEmits();

const incrementCount = () => {
  setTimeout(() => {
    if (props.count < 9) {
      emit("increment", props.count + 1);
    }
  }, 100);
};

const decrementCount = () => {
  setTimeout(() => {
    if (props.count > 1) {
      emit("increment", props.count - 1);
    } else {
      if (props.isRemove) {
        emit("remove");
      }
    }
  }, 100);
};
</script>

<style lang="scss">
.calculate-wrapper {
  display: flex;
  align-items: center;
  background: var(--placeholder);
  border-radius: 10px;
  width: 98px;

  &__count {
    margin: 0 6px;
    min-width: 20px;
    flex-grow: 1;

    p {
      font-weight: 500;
      text-align: center;
      font-size: 18px;

      @media (max-width: 576px) {
        font-size: 16px;
      }
    }
  }

  button {
    cursor: pointer;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    border-radius: 10px;
    border: none;
    background: var(--placeholder-button);
    box-shadow: 0 0.4rem 1rem var(--shadow);
  }
}
</style>
