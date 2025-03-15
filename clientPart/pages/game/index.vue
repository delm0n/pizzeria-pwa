<template>
  <main class="game-main">
    <div class="container-small">
      <ClientOnly>
        <game />
      </ClientOnly>
    </div>
  </main>
</template>

<script setup>
import Game from "~/components/game/Game.client.vue";

definePageMeta({
  layout: false,
});
</script>

<style>
.container-small {
  position: relative;
  overflow: hidden;
}
</style>
