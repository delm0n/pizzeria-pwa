<template>
  <main class="login-main">
    <div class="container">
      <h2>Регистрация</h2>

      <form @submit.prevent="handleSubmit">
        <name-input />

        <label class="pizza-input">
          <span :class="[phoneError ? 'phone-error' : '']">
            {{ phoneError ? "Такой номер уже есть!" : "Телефон:" }}</span
          >

          <div class="input-container">
            <input
              name="phone"
              type="text"
              v-mask="'+7 (###) ###-##-##'"
              v-model="storeClient.client.Telephone"
              autocomplete="off"
              required
            />
          </div>
        </label>

        <password-input />
        <email-input />

        <button
          :disabled="loading"
          :class="[
            'main-button loading',
            storeClient.invalidClient || storeClient.isEmptyName
              ? 'button-unactive'
              : '',
          ]"
          type="submit"
        >
          Регистрация
        </button>

        <policy />
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import PasswordInput from "~/components/login/PasswordInput.vue";
import NameInput from "~/components/login/NameInput.vue";
import EmailInput from "~/components/login/EmailInput.vue";
import Policy from "~/components/UI/Policy.vue";

import { ref } from "vue";
import { useRouter } from "vue-router";

const storeClient = useClientStore();
const router = useRouter();
const loading = ref(false);

const phoneError = ref(false);
const setPhoneError = () => {
  phoneError.value = true;
  setTimeout(() => {
    phoneError.value = false;
  }, 3000);
};

const handleSubmit = async () => {
  if (!storeClient.isEmptyName && !storeClient.invalidClient) {
    loading.value = true;

    try {
      const response = await fetch("http://localhost:1234/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Password: storeClient.client.Password,
          Telephone: storeClient.client.Telephone,
          Email: storeClient.client.Email,
          FirstName: storeClient.client.FirstName,
        }),
      });

      let responseValue = await response.json();

      if (!!responseValue) {
        storeClient.autorizationClient(
          responseValue.ClientId,
          responseValue.FirstName,
          responseValue.Telephone,
          responseValue.Email,
          responseValue.PizzaOrderJson,
          responseValue.Bonus,
          responseValue.Record,
          responseValue.CanPlay
        );
        router.push({ name: "account" });
      } else {
        setPhoneError();
      }
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.message-promocode {
  margin-bottom: 5px;
  font-size: 14px;
  color: var(--accent);
  font-weight: 500;
}

.phone-error {
  color: var(--accent);
  font-weight: 500;
  font-size: 16px;

  @media (max-width: 576px) {
    font-size: 14px;
  }
}
</style>

<style lang="scss">
.login-main {
  max-width: 520px;
  width: 100%;
  margin: 30px auto 0;

  h2,
  h3 {
    text-align: center;
  }

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
