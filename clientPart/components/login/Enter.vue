<template>
  <section class="section-enter">
    <h3>Вход в аккаунт</h3>
    <p class="subtitle">
      Новый клиент?
      <NuxtLink @click="storeModal.setModalVisible(false)" to="/login">
        зарегистрируйтесь <span> здесь</span>
      </NuxtLink>
    </p>
    <form @submit.prevent="handleSubmit">
      <phone-input />
      <password-input />

      <button
        :disabled="loading"
        :class="[
          'main-button loading',
          storeClient.invalidClient ? 'button-unactive' : '',
        ]"
        type="submit"
      >
        Войти
      </button>

      <policy />
    </form>
  </section>
</template>

<script setup lang="ts">
import PhoneInput from "./PhoneInput.vue";
import PasswordInput from "./PasswordInput.vue";
import Policy from "~/components/UI/Policy.vue";

import { ref } from "vue";
import { useRouter } from "vue-router";

const storeModal = useModalStore();
const storeClient = useClientStore();
const router = useRouter();

const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;

  try {
    const response = await fetch("http://localhost:1234/enter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Password: storeClient.client.Password,
        Telephone: storeClient.client.Telephone,
      }),
    });

    let responseValue = await response.json();

    storeClient.badTryEnter = false;
    storeClient.badPassword = false;

    if (!!responseValue) {
      // пришло 1
      if (responseValue == 1) {
        storeClient.badPassword = true;
        router.push({ name: "login" });
      } else {
        storeClient.autorizationClient(
          responseValue.ClientId,
          responseValue.FirstName,
          responseValue.Telephone,
          responseValue.Email,
          responseValue.Password
        );
      }
    } else {
      // пришло 0
      storeClient.badTryEnter = true;
      router.push({ name: "login" });
    }
  } catch (err) {
    console.log(err);
  } finally {
    setTimeout(() => {
      loading.value = false;
      storeModal.setModalVisible(false);
    }, 400);
  }
};
</script>

<style lang="scss">
.section-enter {
  h3 {
    font-size: 28px;
    text-align: center;
    margin-bottom: 10px;

    @media (max-width: 576px) {
      font-size: 22px;
    }
  }

  .subtitle {
    font-size: 16px;
    margin-bottom: 30px;
    font-weight: 400;
    white-space: nowrap;

    @media (max-width: 576px) {
      margin-bottom: 20px;
      white-space: normal;

      a span {
        display: none;
      }
    }

    a {
      color: var(--accent);
      cursor: pointer;
      font-weight: 600;
    }
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
