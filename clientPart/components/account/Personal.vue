<template>
  <section class="personal">
    <h2>Личные данные</h2>

    <form @submit.prevent="handleSubmit">
      <phone-input :edit="false" />
      <name-input />
      <email-input />

      <password-input :error="errorPass" v-if="step !== 0" />

      <button
        :class="[
          'button',
          'loading',
          storeClient.isEmptyName ? 'button-unactive' : '',
        ]"
        :disabled="loading || textButton == 'Данные обновлены'"
        type="submit"
      >
        {{ textButton }}
      </button>
    </form>
  </section>
</template>

<script setup lang="ts">
import PhoneInput from "~/components/login/PhoneInput.vue";
import PasswordInput from "~/components/login/PasswordInput.vue";
import EmailInput from "~/components/login/EmailInput.vue";
import NameInput from "~/components/login/NameInput.vue";

const storeClient = useClientStore();
const textButton = ref("Обновить данные");
const loading = ref(false);
const errorPass = ref(false);
const step = ref(0);

const handleSubmit = async () => {
  if (step.value == 0) {
    textButton.value = "Подтвердить";
    step.value = 1;
    return;
  }

  loading.value = true;
  if (step.value == 1) {
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
      if (responseValue == 1 || responseValue == 0) {
        // пришло 1 если пароль не подошёл
        errorPass.value = true;
        setTimeout(() => {
          errorPass.value = false;
          loading.value = false;
          textButton.value = "Обновить данные";
        }, 4000);
      } else {
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

          textButton.value = "Данные обновлены";
          step.value = 0;

          setTimeout(() => {
            textButton.value = "Обновить данные";
            loading.value = false;
          }, 4000);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
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
