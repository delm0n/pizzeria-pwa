<template>
  <main class="login-main">
    <div class="container">
      <h2>
        {{ storeClient.badTryEnter ? "Не нашли вас :(" : "Регистрация" }}
      </h2>

      <form @submit.prevent="handleSubmit">
        <name-input />
        <phone-input />
        <password-input />
        <email-input />

        <button :disabled="loading" class="main-button" type="submit">
          Регистрация
        </button>

        <p class="policy">
          Продолжая, вы соглашаетесь
          <span
            >со сбором и обработкой персональных данных и пользовательским
            соглашением</span
          >
        </p>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import PhoneInput from "~/components/login/PhoneInput.vue";
import PasswordInput from "~/components/login/PasswordInput.vue";
import NameInput from "~/components/login/NameInput.vue";
import EmailInput from "~/components/login/EmailInput.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const storeClient = useClientStore();
const router = useRouter();

const loading = ref(false);

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
      console.log("такой номер уже есть");
    }
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss">
.login-main {
  max-width: 520px;
  width: 100%;
  margin: 30px auto 0;

  h2 {
    text-align: center;
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
