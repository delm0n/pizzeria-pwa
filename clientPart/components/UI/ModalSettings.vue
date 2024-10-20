<template>
  <transition>
    <div
      v-show="store.modalVisible"
      class="modal-overlay"
      @click.self="store.setModalVisible(false)"
    >
      <div class="modal-content">
        <div class="close-button" @click="store.setModalVisible(false)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.3em"
            height="1.3em"
            fill="currentColor"
            viewBox="0 0 16 16"
            class="bi bi-x-lg font-semibold text-gray-400 hover:text-gray-700 ng-tns-c27-0"
          >
            <path
              fill-rule="evenodd"
              d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
              class="ng-tns-c27-0"
            ></path>
            <path
              fill-rule="evenodd"
              d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
              class="ng-tns-c27-0"
            ></path>
          </svg>
        </div>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
const store = useModalStore();
</script>

<style lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--overlay);
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: var(--background);
  border-radius: 10px;
  position: relative;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  .close-button {
    position: absolute;
    top: -30px;
    right: 0;
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;

    svg {
      fill: rgb(252 252 253);
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-enter-active .modal-content {
  animation: bounce-in 0.35s;
}
.v-leave-active .modal-content {
  animation: bounce-in 0.35s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
