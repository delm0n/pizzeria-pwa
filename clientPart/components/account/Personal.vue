<template>
  <section class="personal">
    <h2>Личные данные</h2>

    <phone-input :edit="false" />
    <name-input />
    <password-input />
    <email-input />

    <button
      :class="[
        'button',
        'loading',
        storeClient.invalidClient || storeClient.isEmptyName
          ? 'button-unactive'
          : '',
      ]"
      :disabled="loading || textButton == 'Данные обновлены'"
      @click="handleSubmit"
    >
      {{ textButton }}
    </button>
  </section>
</template>

<script setup lang="ts">
import PhoneInput from "~/components/login/PhoneInput.vue";
import PasswordInput from "~/components/login/PasswordInput.vue";
import NameInput from "~/components/login/NameInput.vue";
import EmailInput from "~/components/login/EmailInput.vue";

const storeClient = useClientStore();
const textButton = ref("Обновить данные");
const loading = ref(false);
// const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const handleSubmit = async () => {
  loading.value = true;

  try {
    const response = await fetch("http://localhost:1234/rewrite-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Password: storeClient.client.Password,
        Telephone: storeClient.client.Telephone,
        FirstName: storeClient.client.FirstName,
        Email: storeClient.client.Email,
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

      textButton.value = "Данные обновлены";

      setTimeout(() => {
        textButton.value = "Обновить данные";
      }, 3000);
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

<style lang="scss">
.personal {
  margin-bottom: 80px;
  max-width: 400px;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }

  .button {
    margin-top: 50px;
    max-width: 240px;
    height: 48px;
  }
}
</style>
