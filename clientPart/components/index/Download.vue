<template>
  <div v-if="show && viewport.isLessThan('mobileWide')" class="download">
    <div class="download-header">
      <svg
        @click="show = false"
        fill="none"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 6L6 18"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        ></path>
        <path
          d="M6 6L18 18"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        ></path>
      </svg>
      <span>Pizzeria</span>
      <p>Приложение пиццерии</p>
    </div>
    <div>
      <button @click="installApp()" class="main-button">Скачать</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const viewport = useViewport();

const showInstallPrompt = ref(false);
let deferredPrompt: any = null;
const show = ref(false);

onMounted(() => {
  // Перехват события beforeinstallprompt
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    showInstallPrompt.value = true;
  });

  // Обработка события appinstalled (если приложение уже установлено)
  window.addEventListener("appinstalled", () => {
    showInstallPrompt.value = false;
    console.log("Приложение установлено");
  });

  setTimeout(() => {
    show.value = showInstallPrompt.value;
  }, 2000);
});

// Метод для запуска установки приложения
const installApp = async () => {
  if (!!deferredPrompt) {
    deferredPrompt.prompt(); // Показываем подсказку браузера
    const choiceResult = await deferredPrompt.userChoice; // Дожидаемся выбора пользователя
    if (choiceResult.outcome === "accepted") {
      console.log("Пользователь установил приложение");
    } else {
      console.log("Пользователь отклонил установку");
    }
    deferredPrompt = null; // Очищаем событие
    showInstallPrompt.value = false; // Скрываем кнопку
  }
};
</script>

<style lang="scss">
.download {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;

  .download-header {
    display: grid;
    grid-template-columns: auto auto;
    gap: 0 10px;

    svg {
      display: block;
      grid-row: 1/3;
      grid-column: 1/2;
      align-self: center;
    }

    p {
      color: var(--text-description);
      font-size: 12px;

      grid-template-rows: 2/3;
    }

    span {
      display: block;
      grid-row: 1/2;
      font-size: 14px;
      color: var(--accent);
      font-weight: 700;
    }
  }
}
</style>
