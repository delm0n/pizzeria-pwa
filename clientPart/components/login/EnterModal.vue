<template>
  <Teleport to="#teleports">
    <modal-settings class="enter-modal" v-if="!!storeModal.enterModal">
      <enter />
    </modal-settings>
  </Teleport>
</template>

<script lang="ts" setup>
import ModalSettings from "../UI/ModalSettings.vue";
import Enter from "~/components/login/Enter.vue";

const storeModal = useModalStore();
</script>

<style lang="scss">
.enter-modal {
  .modal-content {
    max-width: 410px;
    padding: 30px;

    @media (max-width: 576px) {
      padding: 30px 20px;
    }
  }
}
</style>
