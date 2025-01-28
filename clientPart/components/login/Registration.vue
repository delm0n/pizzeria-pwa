<template>
  <form @submit.prevent="handleSubmit">
    <name-input />

    <p class="phone-error" v-show="phoneError">Такой номер уже есть!</p>

    <phone-input />
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
</template>

<script setup lang="ts">
import PhoneInput from "~/components/login/PhoneInput.vue";
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
        responseValue.Password
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
};
</script>

<style lang="scss" scoped>
.message-promocode {
  margin-bottom: 5px;
  font-size: 14px;
  color: var(--accent);
  font-weight: 500;
}
</style>
