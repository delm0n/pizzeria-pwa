<template>
  <transition-group
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    tag="div"
    class="notification"
  >
    <div
      class="notification-continer"
      v-for="(item, index) in storeNotification.notifications"
      :key="index"
    >
      <div class="notification-item">
        <p>{{ item.title }}</p>
        <p>{{ item.text }}</p>
      </div>
    </div>
  </transition-group>
</template>

<script lang="ts" setup>
const storeNotification = useNotificationStore();

// анимация при удалении и добавлении
const afterEnter = (o: any) => {
  o.style.opacity = 1;
};

const beforeLeave = (o: any) => {
  o.style.opacity = 0;
  o.style.transition = "transition: all 0.2s;";
};

// анимация при удалении и добавлении
</script>

<style lang="scss">
.notification {
  position: absolute;
  width: 300px;
  right: 20px;
  transform: translateY(100%);
  bottom: -30px;

  .notification-continer {
    overflow: hidden;
    opacity: 0;
    transition: all 0.3s 0.1s;
    display: block;

    &:not(:last-child) .notification-item {
      margin-bottom: 20px;
    }
  }

  .notification-item {
    background: var(--background-vs-opacity);
    color: var(--background);
    border-radius: 5px;
    padding: 15px;

    p {
      font-weight: 500;
      font-size: 16px;
      &:first-child {
        font-weight: 400;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
