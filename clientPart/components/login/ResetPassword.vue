<template>
  <form @submit.prevent="handleSubmit">
    <phone-input />
    <password-input :isReset="true" />

    <button :disabled="loading" class="main-button loading" type="submit">
      Сбросить пароль
    </button>

    <policy />
  </form>
</template>

<script setup lang="ts">
import PhoneInput from "~/components/login/PhoneInput.vue";
import PasswordInput from "~/components/login/PasswordInput.vue";
import Policy from "~/components/UI/Policy.vue";

import { ref } from "vue";
import { useRouter } from "vue-router";

const storeClient = useClientStore();
const router = useRouter();
const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;

  try {
    const response = await fetch("http://localhost:1234/reset-password", {
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
    console.log(responseValue);

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
      console.log("Ошибка");
    }
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
};
</script>
