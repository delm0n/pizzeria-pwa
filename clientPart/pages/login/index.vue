<template>
  <main class="login-main">
    <div class="container">
      <template v-if="storeClient.badPassword">
        <h2>Неверный пароль</h2>
        <reset-password />
      </template>

      <template v-else>
        <h2>Регистрация</h2>
        <registration />
      </template>
    </div>
  </main>
</template>

<script setup lang="ts">
import Registration from "~/components/login/Registration.vue";
import ResetPassword from "~/components/login/ResetPassword.vue";

const storeClient = useClientStore();
</script>

<style lang="scss">
.login-main {
  max-width: 520px;
  width: 100%;
  margin: 30px auto 0;

  h2,
  h3 {
    text-align: center;
  }

  // h3 {
  //   font-size: 28px;
  //   margin-bottom: 30px;

  //   &.first {
  //     margin-top: 40px;
  //   }

  //   &.second {
  //     margin-top: 80px;
  //   }

  //   @media (max-width: 768px) {
  //     font-size: 24px;
  //     margin-bottom: 20px;
  //   }
  // }

  form:last-child {
    margin-bottom: 120px;
  }

  .main-button {
    margin: 30px auto 0;
    height: 50px;

    @media (max-width: 576px) {
      margin: 20px auto 0;
      height: 41px;
    }
  }
}
</style>
