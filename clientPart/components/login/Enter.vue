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

      <p
        v-if="storeModal.makeOrder"
        @click="makeOrderWithoutAccount()"
        class="p-button"
      >
        Продолжить без регистрации
      </p>

      <policy />
    </form>
  </section>
</template>

<script setup lang="ts">
import PasswordInput from "./PasswordInput.vue";
import Policy from "~/components/UI/Policy.vue";
import PhoneInput from "~/components/login/PhoneInput.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const storeModal = useModalStore();
const storeClient = useClientStore();
const router = useRouter();

const loading = ref(false);

const handleSubmit = async () => {
  if (!storeClient.invalidClient) {
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
        // пришло 1 если пароль не подошёл
        if (responseValue == 1) {
          storeClient.badPassword = true;
          router.push({ name: "login" });
        } else {
          storeClient.autorizationClient(
            responseValue.ClientId,
            responseValue.FirstName,
            responseValue.Telephone,
            responseValue.Email,
            responseValue.Password,
            responseValue.PizzaOrderJson,
            responseValue.Bonus
          );
        }
      } else {
        // пришло 0 если клиент не зарегистрирован
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
  }
};

const makeOrderWithoutAccount = () => {
  router.push({ name: "order" });
  storeModal.setModalVisible(false);
  setTimeout(() => {
    storeModal.makeOrder = false;
  }, 2000);
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

  .p-button {
    margin-top: 10px;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    height: 40px;
    color: var(--button-text);
    cursor: pointer;
  }
}
</style>
