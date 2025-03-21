<template>
  <span>{{ currentValue.toFixed(0) }}</span>
</template>

<script lang="ts" setup>
interface Props {
  from: number;
  to: number;
  duration?: number; // Опциональный параметр длительности анимации
  start: boolean;
}

const props = defineProps<{
  from: number;
  to: number;
  duration: number; // Опциональный параметр длительности анимации
  start: boolean;
}>();

const currentValue = ref(props.from);
const isAnimating = ref(false); // Переменная для отслеживания состояния анимации

// Функция анимации
const animate = () => {
  if (isAnimating.value) return; // Если уже анимируем, не начинаем заново
  isAnimating.value = true; // Устанавливаем состояние анимации

  const startTime = performance.now();
  const fontSizeIncrement = (props.to - props.from) / props.duration;

  const step = (currentTime: number) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / props.duration, 1);

    currentValue.value = props.from + (props.to - props.from) * progress;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      // Устанавливаем окончательные значения
      currentValue.value = props.to;
      isAnimating.value = false; // Сброс состояния анимации
    }
  };

  requestAnimationFrame(step);
};

// Начинаем анимацию при монтировании компонента или изменении свойства start
watch(
  () => props.start,
  (newValue) => {
    if (newValue) {
      animate();
    } else {
      isAnimating.value = false;
    }
  }
);
</script>
