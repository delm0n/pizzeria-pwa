<template>
  <main class="game-main" :key="storeBonus.gameKey">
    <div class="container-small">
      <ClientOnly>
        <game />
      </ClientOnly>
    </div>
  </main>
</template>

<script setup>
import Game from "~/components/game/Game.client.vue";
const storeBonus = useBonusStore();

definePageMeta({
  layout: false,
});
defineOptions({
  name: "GamePage", // Указываем уникальное имя
});
</script>

<style>
.container-small {
  position: relative;
  overflow: hidden;
}
</style>
