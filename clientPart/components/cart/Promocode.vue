<template>
  <div class="pizza-input">
    <div
      :class="['input-container', loading ? 'input-container__loading' : '']"
    >
      <input
        name="name"
        type="text"
        v-model="promocode"
        @input="filterInput"
        v-on:keyup.enter="checkPromocode"
        autocomplete="off"
        placeholder="Промокод"
        maxlength="16"
        :disabled="isPromoApplied"
      />

      <transition-group>
        <span
          @click="checkPromocode"
          v-show="!isPromoApplied"
          class="check-promocode"
        >
          Применить
        </span>

        <span
          @click="cancelPromocode"
          v-show="isPromoApplied"
          class="check-promocode"
        >
          Отменить
        </span>
      </transition-group>

      <div
        :class="[
          'message-promocode',
          !storePromocode.promocodeFail && isPromoApplied ? 'noerror' : '',
        ]"
      >
        <span v-show="!!storePromocode.message">
          {{ storePromocode.message }}
        </span>

        <span
          v-if="
            storePromocode.promocodeFail &&
            isPromoApplied &&
            !!storePromocode.promocode
          "
        >
          (действует от
          {{ storePromocode.promocode.Price }}
          ₽)
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const storePromocode = usePromocodeStore();
const clientStore = useClientStore();
const storeClient = useClientStore();

const promocode = ref<string>("");
const loading = ref(false);
// const message = ref<string>("");
const isPromoApplied = computed(
  () => storePromocode.message === "Промокод применён"
);
import { watch } from "vue";

// Удаляем все символы, кроме цифр
const filterInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  promocode.value = input.value.replace(/\D/g, "");
  storePromocode.message = "";
};

//отмена ввода промокода
const cancelPromocode = () => {
  storePromocode.message = "";
  promocode.value = "";
  storePromocode.promocode = null;
};

//проверка на сервере
const checkPromocode = async () => {
  loading.value = true;

  try {
    storePromocode.message = "";
    const response = await fetch(
      `http://localhost:1234/promocode/${clientStore.client.ClientId}-${promocode.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let respond = await response.json();

    //если пришёл ответ
    if (!!respond) {
      //если это сообщение об ошибке
      if (!!respond.errorMessage) {
        storePromocode.message = respond.errorMessage;
      } else {
        //если это промокод
        if (!!respond.Id) {
          storePromocode.setPromocode(
            respond.Id,
            respond.Value,
            respond.Price,
            respond.Discount
          );

          storePromocode.message = "Промокод применён";
        }
      }
    }
  } catch (err) {
    storePromocode.message = "Ошибка";
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 400);
  }
};

watch(
  () => storeClient.isAutorization,
  () => (promocode.value.length > 0 ? checkPromocode : "")
);
</script>

<style lang="scss" scoped>
.pizza-input {
  .input-container {
    overflow: visible;
    width: 100%;

    &__loading {
      animation: inProcessAnimation 3s infinite;
      background-image: linear-gradient(
        90deg,
        var(--background),
        transparent,
        var(--shadow),
        transparent,
        var(--background)
      ) !important;
      background-size: 400% 100% !important;
    }

    .check-promocode {
      font-size: 14px;
      color: var(--accent);
      cursor: pointer;
      margin-bottom: 0;
    }
  }

  .message-promocode {
    position: absolute;
    top: -25px;
    width: 100%;

    color: var(--accent);
    font-weight: 500;

    span {
      font-size: 14px;
      display: inline;

      @media (max-width: 576px) {
        font-size: 12px;
      }
    }

    &.noerror {
      color: rgb(66, 184, 131);
    }
  }
}
</style>
