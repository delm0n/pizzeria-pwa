<template>
  <modal-settings class="pizza-modal" v-if="!!storeModal.gameModal">
    <p>
      score:
      {{ storeGame.score }}
    </p>

    <p>
      successCount:
      {{ storeGame.successCount }}
    </p>
  </modal-settings>
</template>

<script lang="ts" setup>
import ModalSettings from "../UI/ModalSettings.vue";
const storeModal = useModalStore();
const storeGame = useGameStore();
</script>
